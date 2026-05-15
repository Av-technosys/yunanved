import crypto from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { calculateCheckoutPricing, createOrder } from "@/helper"; // adjust path
import { NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/env";
import { sendPaymentReceivedEmail } from "@/helper/emailTemplates/action";
import { getServerSideUser } from "@/hooks/getServerSideUser";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await getServerSideUser();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    address,
    couponCode,
  } = body;

  const generated_signature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  if (!user?.id) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const pricing = await calculateCheckoutPricing({
    items,
    couponCode,
    userId: user.id,
  });

  const razorpay = new Razorpay({
    key_id: NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: RAZORPAY_KEY_SECRET!,
  });
  const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);

  if (Number(razorpayOrder.amount) !== pricing.total * 100) {
    return NextResponse.json(
      { success: false, message: "Payment amount mismatch" },
      { status: 400 },
    );
  }

  const result = await createOrder({
    items,
    userId: user.id,
    address,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    couponCode,
  });

  if (!result || !result.orderId) {
    console.error("Order creation failed:", result);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
      },
      { status: 500 }
    );
  }

  await sendPaymentReceivedEmail(
    user.email,
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    result.orderId || razorpay_order_id,
    String(result.amount ?? ""),
    "Online Payment",
    "7-8 days from order date",
  );

  return NextResponse.json(result);
}

import crypto from "crypto";
import { NextResponse } from "next/server";
import { createOrder, recordCouponUsage } from "@/helper"; // adjust path
import { RAZORPAY_KEY_SECRET } from "@/env";
import { sendEmail } from "@/lib/email";
import { getOrderTemplate } from "@/helper/emailTemplates/action";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    items,
    userId,
    address,
    amount,
    couponId,
    couponCode,
    isDiscountPercentage,
    discountPercentage,
    discountFixedAmount
  } = body;

  const generated_signature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  let couponTransactionId = null;

  if (couponId) {
    couponTransactionId = await recordCouponUsage({
      userId,
      couponId,
      code: couponCode,
      isDiscountPercentage,
      discountPercentage,
      discountFixedAmount,
    });
  }

  const result = await createOrder({
    items,
    userId,
    fixedAmount: amount,
    address,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    couponTransactionId,
  });

  const baseUrl = process.env.BASE_URL!;

  const finalHtml = getOrderTemplate({
    orderId: result?.orderId || razorpay_order_id,
    customerName: address?.name || 'Customer',
    amount: amount.toString(),
    email: address?.email || '',
    baseUrl,
    paymentMethod: 'Online Payment',
  });
  sendEmail({
    to: address?.email,
    subject: 'Order Confirmed 🎉',
    html: finalHtml,
  }).catch((err) => {
    console.error('Order email failed:', err);
  });
  return NextResponse.json(result);
}
import crypto from "crypto";
import { NextResponse } from "next/server";
import { createOrder, recordCouponUsage } from "@/helper"; // adjust path
import { RAZORPAY_KEY_SECRET } from "@/env";

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

  // 1️⃣ Verify signature
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

  return NextResponse.json(result);
}
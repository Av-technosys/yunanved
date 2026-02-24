import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/env";

export async function POST(req: Request) {
  const body = await req.json();
  const { amount } = body;

  const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID!,
    key_secret: RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return NextResponse.json(order);
}
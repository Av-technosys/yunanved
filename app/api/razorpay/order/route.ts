import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/env";
import { calculateCheckoutPricing } from "@/helper";
import { getServerSideUser } from "@/hooks/getServerSideUser";

export async function POST(req: Request) {
  const body = await req.json();
  const { items, couponCode } = body;
  const user = await getServerSideUser();

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const order = await razorpay.orders.create({
    amount: pricing.total * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      userId: user.id,
      amount: String(pricing.total),
    },
  });

  return NextResponse.json(order);

}

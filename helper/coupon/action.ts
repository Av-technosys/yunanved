"use server";

import { userCoupons } from "@/db/schema";
import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCoupons() {
  try {
    return await db
      .select()
      .from(userCoupons)
      .orderBy(asc(userCoupons.createdAt));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteCoupon(id: string) {
  try {
    await db.delete(userCoupons).where(eq(userCoupons.id, id));
    revalidatePath("/admin/coupon");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function createCoupon(couponData: any) {
  try {
    await db.insert(userCoupons).values({
      ...couponData,
      discountFixedAmount: Number(couponData.discountFixedAmount) ?? null,
      discountPercentage: Number(couponData.discountPercentage) ?? null,
    });

    revalidatePath("/admin/coupon");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function updateCoupon(couponData: any, couponId: string) {
  try {
    await db
      .update(userCoupons)
      .set({
        ...couponData,
        discountFixedAmount: Number(couponData.discountFixedAmount) ?? null,
        discountPercentage: Number(couponData.discountPercentage) ?? null,
      })
      .where(eq(userCoupons.id, couponId));

    revalidatePath("/admin/coupon");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

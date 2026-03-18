/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { coupon, couponTransaction } from "@/db";
import { db } from "@/lib/db";
import { and, asc, eq, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCoupons(search = "") {
  const filters = [];

  if (search && search.trim() !== "") {
    filters.push(or(sql`${coupon.code}::text ILIKE ${`%${search}%`}`));
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  try {
    return await db
      .select()
      .from(coupon)
      .where(whereClause)
      .orderBy(asc(coupon.createdAt));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteCoupon(id: string) {
  try {
    await db.delete(coupon).where(eq(coupon.id, id));
    revalidatePath("/admin/coupon");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function createCoupon(couponData: any) {
  try {
    await db.insert(coupon).values({
      ...couponData,
      discountFixedAmount: Number(couponData.discountFixedAmount) ?? null,
      discountPercentage: Number(couponData.discountPercentage) ?? null,
    });

    revalidatePath("/admin/coupon");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function updateCoupon(couponData: any, couponId: string) {
  try {
    await db
      .update(coupon)
      .set({
        ...couponData,
        discountFixedAmount: Number(couponData.discountFixedAmount) ?? null,
        discountPercentage: Number(couponData.discountPercentage) ?? null,
      })
      .where(eq(coupon.id, couponId));

    revalidatePath("/admin/coupon");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function validateCoupon({
  code,
  subtotal,
  userId,
}: {
  code: string;
  subtotal: number;
  userId: string;
}) {
  const couponData = await db.query.coupon.findFirst({
    where: eq(coupon.code, code),
  });

  if (!couponData) {
    throw new Error("Invalid coupon");
  }

  if (subtotal < couponData.minimumOrderValue) {
    throw new Error("Minimum order value not met");
  }

  if (couponData.useOnce) {
    const alreadyUsed = await db.query.couponTransaction.findFirst({
      where: and(
        eq(couponTransaction.userId, userId),
        eq(couponTransaction.couponId, couponData.id),
      ),
    });

    if (alreadyUsed) {
      throw new Error("Coupon already used");
    }
  }

  let discount = 0;

  if (couponData.isDiscountPercentage) {
    discount = (subtotal * couponData.discountPercentage!) / 100;

    if (couponData.maximumDiscountAmount) {
      discount = Math.min(discount, couponData.maximumDiscountAmount);
    }
  } else {
    discount = couponData.discountFixedAmount ?? 0;
  }

  return {
    couponId: couponData.id,
    discount,
    isDiscountPercentage: couponData.isDiscountPercentage,
    discountPercentage: couponData.discountPercentage,
    discountFixedAmount: couponData.discountFixedAmount,
  };
}


export async function recordCouponUsage({
  userId,
  couponId,
  code,
  isDiscountPercentage,
  discountPercentage,
  discountFixedAmount,
}: {
  userId: string;
  couponId: string;
  code: string;
  isDiscountPercentage?: boolean;
  discountPercentage?: number | null;
  discountFixedAmount?: number | null;
}) {
  const result = await db
    .insert(couponTransaction)
    .values({
      userId,
      couponId,
      code,
      isDiscountPercentage,
      discountPercentage,
      discountFixedAmount,
    })
    .returning({ id: couponTransaction.id });

  return result[0].id;
}
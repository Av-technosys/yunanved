"use server";

import { coupon } from "@/db";
import { db } from "@/lib/db";
import { and, asc, eq, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCoupons(
  search = "",
) {
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
    console.log(error);
    return [];
  }
}

export async function deleteCoupon(id: string) {
  try {
    await db.delete(coupon).where(eq(coupon.id, id));
    revalidatePath("/admin/coupon");
    return { success: true };
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    return { success: false };
  }
}

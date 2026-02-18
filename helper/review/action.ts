"use server";

import { db } from "@/lib/db";
import { review } from "@/db/reviewSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";


export async function toggleApproveReview(id: string) {
  try {
    if (!id) throw new Error("Review id missing");

    await db
      .update(review)
      .set({ isAdminApproved: true })
      .where(eq(review.id, id));

    revalidatePath("/admin/reviews");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Toggle approve failed:", error);
    return { success: false, message: "Failed to update review status" };
  }
}

export async function deleteReview(id: string) {
  try {
    if (!id) throw new Error("Review id missing");

    await db.delete(review).where(eq(review.id, id));

    revalidatePath("/admin/reviews");

    return { success: true };
  } catch (error) {
    console.error("Delete review failed:", error);
    return { success: false, message: "Failed to delete review" };
  }
}



export async function getReviewStats() {
  try {
    const [data] = await db
      .select({
        total: sql<number>`count(*)::int`,
        pending: sql<number>`count(*) filter (where ${review.isAdminApproved} = false)::int`,
      })
      .from(review);

    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch review stats:", error);
    return { success: false };
  }
}
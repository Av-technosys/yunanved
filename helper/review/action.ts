"use server";

import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";
import { user, review, reviewMedia } from "@/db";

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

export async function createReview(reviewData: any) {
  try {
    const { userId, productVarientId, rating, message, media } = reviewData;
    console.log(productVarientId);

    if (!productVarientId) {
      throw new Error("Product Variant ID is required for review submission");
    }
    await db.transaction(async (tx) => {
      const userInfo = await tx.query.user.findFirst({
        where: eq(user.id, userId),
        columns: {
          first_name: true,
          last_name: true,
          email: true,
        },
      });

      const fullName = [userInfo?.first_name, userInfo?.last_name]
        .filter(Boolean)
        .join(" ");

      const reviewId = await tx
        .insert(review)
        .values({
          userId,
          productVarientId: productVarientId,
          name: fullName || "Guest User",
          email: userInfo?.email || "",
          rating: Number(rating),
          message,
        })
        .returning({ id: review.id });

      await tx.insert(reviewMedia).values(
        media.map((img: any) => ({
          reviewId: reviewId[0].id,
          mediaType: "image",
          mediaURL: img.fileKey,
        })),
      );
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false };
  }
}

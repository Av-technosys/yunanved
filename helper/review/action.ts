"use server";

import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";
import { user, review, reviewMedia, productVariant } from "@/db";

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
    const { userId, productVarientId,
      orderItemId,
      rating, message, media } = reviewData;



    if (!productVarientId) {
      throw new Error("Product Variant ID is required for review submission");
    }

    const existingReview = await db.query.review.findFirst({
      where: eq(review.orderItemId, orderItemId),
      columns: {
        id: true,
      },
    });

    if (existingReview) {
      return { "message": "You have already reviewed this purchase." };
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
          orderItemId,
          productVarientId: productVarientId,
          name: fullName || "Guest User",
          email: userInfo?.email || "",
          rating: Number(rating),
          message,
        })
        .returning({ id: review.id });

      if (media && media.length > 0) {
        await tx.insert(reviewMedia).values(
          media.map((img: any) => ({
            reviewId: reviewId[0].id,
            mediaType: "image",
            mediaURL: img,
          })),
        );
      }

      const ratingStats = await tx
        .select({
          averageRating: sql<number>`COALESCE(AVG(${review.rating}), 0)`,
          reviewCount: sql<number>`COUNT(*)`,
        })
        .from(review)
        .where(eq(review.productVarientId, productVarientId));

      await tx
        .update(productVariant)
        .set({
          rating: Math.round(Number(ratingStats[0].averageRating) * 100),
          reviewCount: Number(ratingStats[0].reviewCount),
          updatedAt: new Date(),
        })
        .where(eq(productVariant.id, productVarientId));
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false };
  }
}

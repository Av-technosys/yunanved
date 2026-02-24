"use server";

import { db } from "@/lib/db";
import { review, reviewMedia } from "@/db/reviewSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";
import { reviewMediaTable, reviewsTable, userTable } from "@/db/schema";

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
    const { userId, productId, rating, message, media } = reviewData;
    await db.transaction(async (tx) => {
      const userInfo = await tx.query.userTable.findFirst({
        where: eq(userTable.id, userId),
        columns: {
          name: true,
          email: true,
        },
      });

      const reviewId = await tx
        .insert(reviewsTable)
        .values({
          userId,
          productId,
          name: userInfo?.name || "",
          email: userInfo?.email || "",
          rating: Number(rating),
          message,
        })
        .returning({ id: reviewsTable.id });

      if (media?.length > 0) {
        await tx.insert(reviewMediaTable).values(
          media.map((image: any) => ({
            reviewId: reviewId[0].id,
            mediaType: "image",
            mediaURL: image.fileKey,
          })),
        );
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create review:", error);
    return { success: false };
  }
}

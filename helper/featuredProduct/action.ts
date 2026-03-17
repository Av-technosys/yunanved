"use server";
import { featuredProductVarient, productVariant } from "@/db";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFeaturedProducts() {
  try {
    return await db
      .select({
        id: featuredProductVarient.id,
        productId: featuredProductVarient.productVarientId,
        name: productVariant.name,
        sku: productVariant.sku,
        description: productVariant.description,
        basePrice: productVariant.basePrice,
        rating: productVariant.rating,
        reviewCount: productVariant.reviewCount,
        slug: productVariant.slug,
        bannerImage: productVariant.bannerImage,
        strikethroughPrice: productVariant.strikethroughPrice,
      })
      .from(featuredProductVarient)
      .innerJoin(
        productVariant,
        eq(featuredProductVarient.productVarientId, productVariant.id),
      )
  } catch (error) {
    throw error;
  }
}

export async function deleteFeaturedProduct(id: string) {
  try {
    await db.delete(featuredProductVarient).where(eq(featuredProductVarient.id, id));

    revalidatePath("/admin/featured-products");

    return {
      success: true,
      message: "This featured product has deleted ",
    };
  } catch (error: any) {
    console.error("delete featured product failed:", error);
    throw new Error("Failed to delete featured product");
  }
}

export async function addFeaturedProduct(productId: string) {
  try {
    await db.insert(featuredProductVarient).values({
      productVarientId: productId,
    });
    revalidatePath("/admin/featured-products");
    return { success: true, message: "Featured product added successfully" };
  } catch (error) {
    console.error("add featured product failed:", error);
    throw new Error("Failed to add featured product");
  }
}
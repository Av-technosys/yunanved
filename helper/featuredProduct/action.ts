"use server";
import { categoryTable, featuredItemsTable, productTable } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFeaturedProducts() {
  try {
    return await db
      .select({
        id: featuredItemsTable.id,
        productId: featuredItemsTable.productId,
        name: productTable.name,
        sku: productTable.sku,
        description: productTable.description,
        basePrice: productTable.basePrice,
        rating: productTable.rating,
        reviewCount: productTable.reviewCount,
        slug: productTable.slug,
        bannerImage: productTable.bannerImage,
        strikethroughPrice: productTable.strikethroughPrice,
      })
      .from(featuredItemsTable)
      .innerJoin(
        productTable,
        eq(featuredItemsTable.productId, productTable.id),
      )
      .where(eq(featuredItemsTable.isFeaturedProduct, true));
  } catch (error) {
    throw error;
  }
}

export async function deleteFeaturedProduct(id: string) {
  try {
    await db.delete(featuredItemsTable).where(eq(featuredItemsTable.id, id));

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
    await db.insert(featuredItemsTable).values({
      productId,
      isFeaturedProduct: true,
    });
    revalidatePath("/admin/featured-products");
    return { success: true, message: "Featured product added successfully" };
  } catch (error) {
    console.error("add featured product failed:", error);
    throw new Error("Failed to add featured product");
  }
}
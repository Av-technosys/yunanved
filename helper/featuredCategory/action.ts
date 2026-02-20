"use server";
import { categoryTable, featuredItemsTable, productTable } from "@/db/schema";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFeaturedCategories() {
  try {
    return await db
      .select({
        id: featuredItemsTable.id,
        categoryId: featuredItemsTable.categoryId,
        name: categoryTable.name,
        slug: categoryTable.slug,
        description: categoryTable.description,
        bannerImage: categoryTable.bannerImage,
      })
      .from(featuredItemsTable)
      .innerJoin(
        categoryTable,
        eq(featuredItemsTable.categoryId, categoryTable.id),
      )
      .where(eq(featuredItemsTable.isFeaturedProduct, false));
  } catch (error) {
    throw error;
  }
}

export async function deleteFeaturedCategory(id: string) {
  try {
    await db.delete(featuredItemsTable).where(eq(featuredItemsTable.id, id));

    revalidatePath("/admin/featured-categories");

    return {
      success: true,
      message: "This featured category has deleted ",
    };
  } catch (error: any) {
    console.error("delete featured category failed:", error);
    throw new Error("Failed to delete featured category");
  }
}


export async function addFeaturedCategory(categoryId: string) {
  try {
    await db.insert(featuredItemsTable).values({
      categoryId,
      isFeaturedProduct: false,
    });
    revalidatePath("/admin/featured-categories");
    return { success: true, message: "Featured category added successfully" };
  } catch (error) {
    console.error("add featured category failed:", error);
    throw new Error("Failed to add featured category");
  }
}
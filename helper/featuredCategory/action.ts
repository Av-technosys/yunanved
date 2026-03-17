"use server";
import { category, featuredCategory } from "@/db";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFeaturedCategories() {
  try {
    return await db
      .select({
        id: featuredCategory.id,
        categoryId: featuredCategory.categoryId,
        name: category.name,
        slug: category.slug,
        description: category.description,
        bannerImage: category.bannerImage,
      })
      .from(featuredCategory)
      .innerJoin(
        category,
        eq(featuredCategory.categoryId, category.id),
      )
  } catch (error) {
    throw error;
  }
}

export async function deleteFeaturedCategory(id: string) {
  try {
    await db.delete(featuredCategory).where(eq(featuredCategory.id, id));

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
    await db.insert(featuredCategory).values({
      categoryId,
    });
    revalidatePath("/admin/featured-categories");
    return { success: true, message: "Featured category added successfully" };
  } catch (error) {
    console.error("add featured category failed:", error);
    throw new Error("Failed to add featured category");
  }
}
"use server";

import { db } from "@/lib/db";
import { category, productCategory } from "@/db/productSchema";
import slugify from "slugify";
//import path from "path";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateUniqueSlug } from "../slug/generateUniqueSlug";

export async function createCategory(formData: FormData) {

  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const parentId = formData.get("parentId") as string | null;
    const imagePath: string | null = null;
    const slug = await generateUniqueSlug(db, name, category.slug);
    await db.insert(category).values({
      name,
      slug,
      description,
      parentId: parentId || null,
      bannerImage: imagePath,
    });


    revalidatePath("/admin/category");
    redirect("/admin/category");

  } catch (error) {
    console.error("Create category failed:", error);
    throw new Error("Failed to create category");
  }
}



export async function updateCategory(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const parentId = formData.get("parentId") as string | null;
    const isActive = formData.get("isActive") === "true";

    await db
      .update(category)
      .set({
        name,
        slug: slugify(name, { lower: true }),
        description,
        parentId: parentId || null,
        isActive,
      })
      .where(eq(category.id, id));

    revalidatePath("/admin/category");
    revalidatePath(`/admin/category/${id}`);

    redirect("/admin/category");

  } catch (error) {

    console.error("Update category failed:", error);
    throw new Error("Failed to update category");
  }
}


export const getCategories = async() => {
  try{
   const categories =  await db.select().from(category)
    return categories;
  }catch(error){
    console.error("fetch category failed:", error);
    throw new Error("Failed to fetch category");
  }
}

export const attachProductCategory = async (
  productId: string,
  categoryId: string
) => {
  if (!categoryId) return;

  await db.insert(productCategory).values({
    productId,
    categoryId,
  });
};


export async function getProductCategory(productId: string) {
  const result = await db
    .select({
      categoryId: productCategory.categoryId,
      name: category.name,
    })
    .from(productCategory)
    .leftJoin(category, eq(category.id, productCategory.categoryId))
    .where(eq(productCategory.productId, productId))
    .limit(1);

  return result[0] ?? null;
}


export async function updateProductCategory(productId: string, categoryId: string) {
  await db.delete(productCategory).where(eq(productCategory.productId, productId));

  await db.insert(productCategory).values({
    productId,
    categoryId,
  });
}
"use server";

import { db } from "@/lib/db";
import { category as categoryTable, product, productCategory } from "@/db/productSchema";
import slugify from "slugify";
//import path from "path";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateUniqueSlug } from "../slug/generateUniqueSlug";
import { and, asc, ilike, sql } from "drizzle-orm";

interface GetCategoriesOptions {
  page?: number;
  pageSize?: any;
  search?: string;
  category:any
}
export async function createCategory(formData: FormData) {

  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const parentId = formData.get("parentId") as string | null;
    const imagePath: string | null = null;
    const slug = await generateUniqueSlug(db, name, categoryTable.slug);
    await db.insert(categoryTable).values({
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
      .update(categoryTable)
      .set({
        name,
        slug: slugify(name, { lower: true }),
        description,
        parentId: parentId || null,
        isActive,
      })
      .where(eq(categoryTable.id, id));

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
   const categories =  await db.select().from(categoryTable)
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
  try{
  if (!categoryId) return;

  await db.insert(productCategory).values({
    productId,
    categoryId,
  });
} catch(error){
      console.error("attach Product Category failed:", error);
    throw new Error("attach Product Category failed");
}
};


export async function getProductCategory(productId: string) {
  try{
  const result = await db
    .select({
      categoryId: productCategory.categoryId,
      name: categoryTable.name,
    })
    .from(productCategory)
    .leftJoin(categoryTable, eq(categoryTable.id, productCategory.categoryId))
    .where(eq(productCategory.productId, productId))
    .limit(1);

  return result[0] ?? null;
  }catch(error){
        console.error("fetch product category failed:", error);
    throw new Error("fetch product category failed");
  }
}


export async function updateProductCategory(productId: string, categoryId: string) {
  try{
  await db.delete(productCategory).where(eq(productCategory.productId, productId));

  await db.insert(productCategory).values({
    productId,
    categoryId,
  });
}catch(error){
      console.error("Update product category failed:", error);
    throw new Error("Failed to update category");
}
}




export async function getCategoriesPagination({
  page = 1,
  pageSize,
  search = "",
 category: categorySlug,
}: GetCategoriesOptions) {

  const filters = [];

  if (search.trim() !== "") {
    filters.push(ilike(categoryTable.name, `%${search}%`));
  }
    if (categorySlug) {
    filters.push(eq(categoryTable.slug, categorySlug));
  }

  const whereClause = filters.length ? and(...filters) : undefined;
  const offset = (page - 1) * pageSize;

  const [items, total] = await Promise.all([
    db
      .select()
      .from(categoryTable)
      .where(whereClause)
      .orderBy(asc(categoryTable.createdAt))
      .limit(pageSize)
      .offset(offset),

    db
      .select({ count: sql<number>`count(*)` })
      .from(categoryTable)
      .where(whereClause),
  ]);

  const totalPages = Math.ceil(total[0].count / pageSize);

  return {
    items,
    totalPages,
    page,
  }; 

}

export async function deleteCategory(id: string) {
  try {
    const usage = await db
      .select({ count: sql<number>`count(*)` })
      .from(productCategory)
      .where(eq(productCategory.categoryId, id));

    if (usage[0].count > 0) {
      return {
        success: false,
        message: "Cannot delete: this category is assigned to products",
      };
    }

    await db.delete(categoryTable).where(eq(categoryTable.id, id));

    revalidatePath("/admin/category");

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Something went wrong while deleting category",
    };
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";
import {
  category as categoryTable,
  product,
  productCategory,
} from "@/db/productSchema";
import slugify from "slugify";
//import path from "path";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { productCategoryTable } from "@/db/schema";
import { generateUniqueSlug } from "../slug/generateUniqueSlug";
import { and, asc, ilike, sql } from "drizzle-orm";
import { paginate } from "@/lib/pagination";

interface GetCategoriesOptions {
  page?: number;
  pageSize?: any;
  search?: string;
  category: any;
}
export async function createCategory(categoryData: any) {
  try {
    const { name, description, parentId , bannerImage } = categoryData;
    const slug = await generateUniqueSlug(db, name, categoryTable.slug);
    await db.insert(categoryTable).values({
      name,
      slug,
      description,
      parrentId: parentId || null,
      bannerImage: bannerImage || null,
    });

    revalidatePath("/admin/category");
    return { success: true, message: "Category created successfully" };
  } catch (error) {
    console.error("Create category failed:", error);
    return { success: false, message: "Failed to create category" };
  }
  redirect("/admin/category");
}

export async function updateCategory(categoryData: any) {
  try {
    const { id, name, description, parentId, bannerImage } =
      categoryData;

    await db
      .update(categoryTable)
      .set({
        name,
        slug: slugify(name, { lower: true }),
        description,
        parrentId: parentId || null,
        bannerImage: bannerImage || null,
        
      })
      .where(eq(categoryTable.id, id));

    revalidatePath("/admin/category");
    revalidatePath(`/admin/category/${id}`);
    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    console.error("Update category failed:", error);
    return { success: false, message: "Failed to update category" };
  }
  redirect("/admin/category");
}

export const attachProductCategory = async (
  productId: string,
  categoryId: string,
) => {
  try {
    if (!categoryId) return;

    await db.insert(productCategory).values({
      productId,
      categoryId,
    });
  } catch (error) {
    console.error("attach Product Category failed:", error);
    throw new Error("attach Product Category failed");
  }
};

export async function getProductCategory(productId: string) {
  try {
    const result = await db
      .select({
        categoryId: productCategory.categoryId,
        name: categoryTable.name,
      })
      .from(productCategory)
      .leftJoin(categoryTable, eq(categoryTable.id, productCategory.categoryId))
      .where(eq(productCategory.productId, productId));

    return result;
  } catch (error) {
    console.error("fetch product category failed:", error);
    throw new Error("fetch product category failed");
  }
}
export async function updateProductCategory(
  productId: string,
  categoryId: string,
) {
  try {
    await db
      .delete(productCategory)
      .where(eq(productCategory.productId, productId));

    await db.insert(productCategory).values({
      productId,
      categoryId,
    });
  } catch (error) {
    console.error("Update product category failed:", error);
    throw new Error("Failed to update category");
  }
}

export async function getCategoriesPagination({
  page = 1,
  pageSize = 10,
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

  const result = await paginate({
    table: categoryTable,
    page,
    pageSize,
    where: whereClause,
    orderBy: desc(categoryTable.createdAt),
  });

  return {
    items: result.data,
    totalPages: result.meta.totalPages,
    page: result.meta.page,
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
export async function getCategories() {
  try {
    return await db
      .select()
      .from(categoryTable)
      .orderBy(asc(categoryTable.createdAt));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllProductsByCategorySlug(slug: string) {
  try {
    const products = await db
      .select({
        id: product.id,
        name: product.name,
        basePrice: product.basePrice,
        slug: product.slug,
        bannerImage: product.bannerImage,
        rating: product.rating,
      })
      .from(product)
      .innerJoin(
        productCategoryTable,
        eq(product.id, productCategoryTable.productId),
      )
      .innerJoin(
        categoryTable,
        eq(categoryTable.id, productCategoryTable.categoryId),
      )
      .where(eq(categoryTable.slug, slug));

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllCategoriesMeta() {
  try {
    return await db
      .select({
        id: categoryTable.id,
        name: categoryTable.name,
      })
      .from(categoryTable);
  } catch (error) {
    console.log(error);
    return [];
  }
}

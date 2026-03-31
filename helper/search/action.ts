"use server";

import { db } from "@/lib/db";
import { productVariant, category } from "@/db";
import { ilike, sql } from "drizzle-orm";

export async function searchProducts(query: string) {
  if (!query.trim()) return [];

  const products = await db
    .select({
      id: productVariant.id,
      name: productVariant.name,
      slug: productVariant.slug,
      bannerImage: productVariant.bannerImage,
      type: sql<string>`'product'`,
    })
    .from(productVariant)
    .where(ilike(productVariant.name, `%${query}%`))
    .limit(10);

  const categories = await db
    .select({
      id: category.id,
      name: category.name,
      slug: category.slug,
      bannerImage: category.bannerImage,
      type: sql<string>`'category'`,
    })
    .from(category)
    .where(ilike(category.name, `%${query}%`))
    .limit(5);

  return [...products, ...categories];
}
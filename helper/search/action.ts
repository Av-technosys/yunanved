"use server";

import { db } from "@/lib/db";
import { productVariant, category } from "@/db";
import { sql } from "drizzle-orm";

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
    .where(sql`
    to_tsvector('simple', ${productVariant.name}) @@ plainto_tsquery(${query})
    OR ${productVariant.name} ILIKE ${"%" + query + "%"}
    `)
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
    .where(sql`
    to_tsvector('simple', ${category.name}) @@ plainto_tsquery(${query})
    OR ${category.name} ILIKE ${"%" + query + "%"}
    `)
    .limit(5);

  return [...products, ...categories];
}
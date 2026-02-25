/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";
import {
  product,
  productVarientMedia,
  productVarientAttribute,
  category,
  productCategory,
  productVariant,
  review,
  reviewMedia,
} from "@/db";
import { revalidatePath } from "next/cache";
import { and, desc, eq, ilike, inArray, ne, sql } from "drizzle-orm";
import { generateUniqueSlug } from "../slug/generateUniqueSlug";

import { isUUID } from "@/const/globalconst";

interface GetProductsOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
}

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

function num(fd: FormData, key: string) {
  const v = Number(fd.get(key));
  return isNaN(v) ? 0 : v;
}

function parseMedia(fd: FormData) {
  return fd.getAll("media").filter((v) => typeof v === "string") as string[];
}

interface VariantInput {
  name: string;
  sku: string;
  description?: string;
  shortDescription?: string;
  price: number;
  strikethroughPrice?: number;
  bannerImage?: string;
  media?: string[];
  isInStock: boolean;
  attributes: { attribute: string; value: string }[];
}

export async function createProduct(formData: FormData) {
  try {
    const categoryIds = [
      ...new Set(formData.getAll("category[]").filter(Boolean)),
    ] as string[];

    const variantsData = str(formData, "variants");
    if (!variantsData) throw new Error("No variants provided");

    const variants: VariantInput[] = JSON.parse(variantsData);

    const productId = await db.transaction(async (tx) => {
      console.log("Starting transaction to create product with variants");

      // 1. Create the parent product
      const [createdProduct] = await tx
        .insert(product)
        .values({})
        .returning({ id: product.id });
      const pId = createdProduct.id;

      // 2. Attach categories to the parent product
      if (categoryIds.length) {
        await tx.insert(productCategory).values(
          categoryIds.map((catId) => ({
            productId: pId,
            categoryId: catId,
          }))
        );
      }

      // 3. Create each variant
      for (const v of variants) {
        const slug = await generateUniqueSlug(tx, v.name, productVariant.slug);
        const [createdVariant] = await tx
          .insert(productVariant)
          .values({
            productId: pId,
            name: v.name,
            slug,
            sku: v.sku,
            description: v.description,
            shortDescription: v.shortDescription,
            basePrice: v.price,
            strikethroughPrice: v.strikethroughPrice,
            bannerImage: v.bannerImage || null,
            isInStock: v.isInStock,
            rating: 0,
            reviewCount: 0,
          })
          .returning({ id: productVariant.id });

        const variantId = createdVariant.id;

        // 4. Handle variant media
        if (v.media && v.media.length) {
          await tx.insert(productVarientMedia).values(
            v.media.map((url) => ({
              productVarientId: variantId,
              mediaType: "image",
              mediaURL: url,
            }))
          );
        }

        // 5. Handle variant attributes
        if (v.attributes && v.attributes.length) {
          await tx.insert(productVarientAttribute).values(
            v.attributes.map((attr) => ({
              productVarientId: variantId,
              attribute: attr.attribute,
              value: attr.value,
            }))
          );
        }
      }

      return pId;
    });

    return { id: productId };
  } catch (error) {
    console.error("createProduct failed:", error);
    throw new Error("Unable to create product");
  }
}

export async function updateProduct(formData: FormData): Promise<void> {
  try {
    const productId = formData.get("id") as string;
    if (!productId) throw new Error("Product ID missing");

    const categoryIds = [
      ...new Set(formData.getAll("category[]").filter(Boolean)),
    ] as string[];

    const variantsData = str(formData, "variants");
    if (!variantsData) throw new Error("No variants provided");

    const variants: (VariantInput & { id?: string })[] = JSON.parse(variantsData);

    await db.transaction(async (tx) => {
      // 1. Update categories for the parent product
      await tx.delete(productCategory).where(eq(productCategory.productId, productId));
      if (categoryIds.length) {
        await tx.insert(productCategory).values(
          categoryIds.map((catId) => ({
            productId,
            categoryId: catId,
          }))
        );
      }

      // 2. Identify existing variants to keep/update and new ones to insert
      const incomingVariantIds = variants.map(v => v.id).filter(Boolean) as string[];

      // Delete variants not in the incoming list
      const existingVariants = await tx.select({ id: productVariant.id }).from(productVariant).where(eq(productVariant.productId, productId));
      const variantsToDelete = existingVariants.filter(ev => !incomingVariantIds.includes(ev.id));

      for (const v of variantsToDelete) {
        await tx.delete(productVarientMedia).where(eq(productVarientMedia.productVarientId, v.id));
        await tx.delete(productVarientAttribute).where(eq(productVarientAttribute.productVarientId, v.id));
        await tx.delete(productVariant).where(eq(productVariant.id, v.id));
      }

      // Update or Insert variants
      for (const v of variants) {
        let vId = v.id;

        if (vId) {
          // Update existing
          await tx.update(productVariant).set({
            name: v.name,
            sku: v.sku,
            description: v.description,
            shortDescription: v.shortDescription,
            basePrice: v.price,
            strikethroughPrice: v.strikethroughPrice,
            bannerImage: v.bannerImage || null,
            isInStock: v.isInStock,
            updatedAt: new Date(),
          }).where(eq(productVariant.id, vId));
        } else {
          // Insert new
          const slug = await generateUniqueSlug(tx, v.name, productVariant.slug);
          const [created] = await tx.insert(productVariant).values({
            productId,
            name: v.name,
            slug,
            sku: v.sku,
            description: v.description,
            shortDescription: v.shortDescription,
            basePrice: v.price,
            strikethroughPrice: v.strikethroughPrice,
            bannerImage: v.bannerImage || null,
            isInStock: v.isInStock,
            rating: 0,
            reviewCount: 0,
          }).returning({ id: productVariant.id });
          vId = created.id;
        }

        // Update Media
        await tx.delete(productVarientMedia).where(eq(productVarientMedia.productVarientId, vId!));
        if (v.media?.length) {
          await tx.insert(productVarientMedia).values(
            v.media.map(url => ({
              productVarientId: vId!,
              mediaType: "image",
              mediaURL: url,
            }))
          );
        }

        // Update Attributes
        await tx.delete(productVarientAttribute).where(eq(productVarientAttribute.productVarientId, vId!));
        if (v.attributes?.length) {
          await tx.insert(productVarientAttribute).values(
            v.attributes.map(attr => ({
              productVarientId: vId!,
              attribute: attr.attribute,
              value: attr.value,
            }))
          );
        }
      }
    });

    revalidatePath("/admin/product");
  } catch (error) {
    console.error("updateProduct failed:", error);
    throw new Error("Unable to update product");
  }
}

export async function getFullProduct(identifier: string) {
  try {
    if (!identifier) throw new Error("Missing product identifier");

    const isThroughId = isUUID(identifier);
    let productGroupId: string | null = null;
    let targetVariantId: string | null = null;

    if (isThroughId) {
      const pg = await db.query.product.findFirst({ where: eq(product.id, identifier) });
      if (pg) {
        productGroupId = pg.id;
      } else {
        const v = await db.query.productVariant.findFirst({ where: eq(productVariant.id, identifier) });
        if (v) {
          productGroupId = v.productId;
          targetVariantId = v.id;
        }
      }
    } else {
      const v = await db.query.productVariant.findFirst({ where: eq(productVariant.slug, identifier) });
      if (v) {
        productGroupId = v.productId;
        targetVariantId = v.id;
      }
    }

    if (!productGroupId) return null;

    const [variants, categoryLinks] = await Promise.all([
      db.select().from(productVariant).where(eq(productVariant.productId, productGroupId)),
      db.select().from(productCategory).where(eq(productCategory.productId, productGroupId)),
    ]);

    const variantsWithDetails = await Promise.all(variants.map(async (v) => {
      const [media, attributes] = await Promise.all([
        db.select().from(productVarientMedia).where(eq(productVarientMedia.productVarientId, v.id)),
        db.select().from(productVarientAttribute).where(eq(productVarientAttribute.productVarientId, v.id))
      ]);
      return { ...v, media, attributes };
    }));

    return {
      id: productGroupId,
      categoryIds: categoryLinks.map(c => c.categoryId),
      variants: variantsWithDetails,
      targetVariant: targetVariantId ? variantsWithDetails.find(v => v.id === targetVariantId) : variantsWithDetails[0]
    };
  } catch (error) {
    console.error("getFullProduct failed:", error);
    throw new Error("Unable to fetch product");
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.transaction(async (tx) => {
      const variants = await tx.select({ id: productVariant.id }).from(productVariant).where(eq(productVariant.productId, id));

      for (const v of variants) {
        await tx.delete(productVarientMedia).where(eq(productVarientMedia.productVarientId, v.id));
        await tx.delete(productVarientAttribute).where(eq(productVarientAttribute.productVarientId, v.id));
      }

      await tx.delete(productVariant).where(eq(productVariant.productId, id));
      await tx.delete(productCategory).where(eq(productCategory.productId, id));
      await tx.delete(product).where(eq(product.id, id));
    });

    revalidatePath("/admin/product");
    return { success: true, message: "Product and all variants deleted successfully" };
  } catch (error: any) {
    console.error("delete product failed:", error);
    throw new Error("Failed to delete product");
  }
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  search = "",
  category: categorySlug,
}: GetProductsOptions) {
  const filters = [];

  if (search.trim() !== "") {
    filters.push(ilike(productVariant.name, `%${search}%`));
  }

  if (categorySlug) {
    filters.push(eq(category.slug, categorySlug));
  }

  const whereClause = filters.length ? and(...filters) : undefined;
  const offset = (page - 1) * pageSize;

  // We query product variants because they hold the name and info. 
  // We effectively show variants in the main list, or distinct product variants.
  const [items, total] = await Promise.all([
    db
      .select({
        id: productVariant.id,
        name: productVariant.name,
        slug: productVariant.slug,
        basePrice: productVariant.basePrice,
        strikethroughPrice: productVariant.strikethroughPrice,
        bannerImage: productVariant.bannerImage,
        createdAt: productVariant.createdAt,
        productId: productVariant.productId,
      })
      .from(productVariant)
      .leftJoin(product, eq(product.id, productVariant.productId))
      .leftJoin(productCategory, eq(productCategory.productId, product.id))
      .leftJoin(category, eq(category.id, productCategory.categoryId))
      .where(whereClause)
      .groupBy(productVariant.id)
      .orderBy(desc(productVariant.createdAt))
      .limit(pageSize)
      .offset(offset),

    db
      .select({ count: sql<number>`count(distinct ${productVariant.id})` })
      .from(productVariant)
      .leftJoin(product, eq(product.id, productVariant.productId))
      .leftJoin(productCategory, eq(productCategory.productId, product.id))
      .leftJoin(category, eq(category.id, productCategory.categoryId))
      .where(whereClause),
  ]);

  const totalPages = Math.ceil(total[0].count / pageSize);

  return {
    items,
    totalPages,
    page,
  };
}

export async function getProductSimilarProducts(slug: string | any) {
  try {
    const v = await db.query.productVariant.findFirst({ where: eq(productVariant.slug, slug) });
    if (!v || !v.productId) return [];

    const productWithCategory = await db
      .select({ categoryId: productCategory.categoryId })
      .from(productCategory)
      .where(eq(productCategory.productId, v.productId));

    if (!productWithCategory.length) return [];

    const categoryId = productWithCategory[0].categoryId;

    const similarVariants = await db
      .select({
        id: productVariant.id,
        name: productVariant.name,
        slug: productVariant.slug,
        basePrice: productVariant.basePrice,
        bannerImage: productVariant.bannerImage,
        rating: productVariant.rating,
      })
      .from(productVariant)
      .innerJoin(productCategory, eq(productCategory.productId, productVariant.productId))
      .where(
        and(
          eq(productCategory.categoryId, categoryId),
          ne(productVariant.productId, v.productId),
        ),
      )
      .limit(10);

    return similarVariants;
  } catch (error) {
    console.error("getProductSimilarProducts failed:", error);
  }
}

export async function getProductsForCart(productIds: string[]) {
  try {
    if (!productIds || !productIds.length) return [];
    const safeIds = productIds.filter(Boolean);
    if (!safeIds.length) return [];

    const products = await db
      .select()
      .from(productVariant)
      .where(inArray(productVariant.id, safeIds));

    if (!products.length) return [];

    const media = await db
      .select()
      .from(productVarientMedia)
      .where(inArray(productVarientMedia.productVarientId, safeIds));

    const mediaMap = new Map<string, typeof media>();
    for (const m of media) {
      if (!mediaMap.has(m.productVarientId)) mediaMap.set(m.productVarientId, []);
      mediaMap.get(m.productVarientId)!.push(m);
    }

    return products.map((p) => ({
      ...p,
      media: mediaMap.get(p.id) ?? [],
    }));
  } catch (error) {
    console.error("getProductsForCart failed:", error);
    return [];
  }
}

export async function saveProductAttributes(productId: string, payload: any) {
  // Deprecated in favor of nested variant handling in updateProduct
  return { success: true };
}



"use server";

import { db } from "@/lib/db";
import { product, productMedia, productAttribute } from "@/db/productSchema";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { generateUniqueSlug } from "../slug/generateUniqueSlug";

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

function num(fd: FormData, key: string) {
  const v = Number(fd.get(key));
  return isNaN(v) ? 0 : v;
}

function parseMedia(fd: FormData) {
  return fd.getAll("media").filter(v => typeof v === "string") as string[];
}



export async function createProduct(formData: FormData) {
  try {
    const name = str(formData, "name");
    const description = str(formData, "description");
    const price = num(formData, "price");
    const isActive = str(formData, "isActive") === "true";
    const strikethroughPrice = Number(formData.get("strikethroughPrice"));
    const bannerImage = str(formData, "bannerImage");
    const mediaUrls = parseMedia(formData);
    

    const id = await db.transaction(async (tx) => {
      const slug = await generateUniqueSlug(tx, name, product.slug);
    console.log('slug generated', slug)
      const [created] = await tx
        .insert(product)
        .values({
          name,
          slug,
          description,
          basePrice: price,
          strikethroughPrice,
          bannerImage: bannerImage || null,
          isDeleted: !isActive,
          rating: 0,
          reviewCount: 0,
        })
        .returning({ id: product.id });

      const productId = created.id;

      if (mediaUrls.length) {
        await tx.insert(productMedia).values(
          mediaUrls.map(url => ({
            productId,
            mediaType: "image",
            mediaURL: url,
          }))
        );
      }

      return productId;
    });

    return { id };

  } catch (error) {
   
    console.error("createProduct failed:", error);
    throw new Error("Unable to create product");
  }
}


export async function updateProduct(formData: FormData): Promise<void> {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const strikethroughPrice = Number(formData.get("strikethroughPrice"));
    const bannerImage = formData.get("bannerImage") as string | null;

    await db
      .update(product)
      .set({
        name,
        slug: slugify(name, { lower: true }),
        description,
        basePrice: price,
        strikethroughPrice,
        bannerImage,
        updatedAt: new Date(),
      })
      .where(eq(product.id, id));

    const submittedMedia = formData.getAll("media") as string[];

    await db.delete(productMedia)
      .where(eq(productMedia.productId, id));

    if (submittedMedia.length) {
      await db.insert(productMedia).values(
        submittedMedia.map(key => ({
          productId: id,
          mediaType: "image",
          mediaURL: key,
        }))
      );
    }

  } catch (error) {
    console.error("updateProduct failed:", error);
    throw new Error("Unable to update product");
  }
}



export async function saveProductAttributes(
  productId: string,
  payload: { attribute: string; value: string }[]
) {
  try {
    if (!productId) throw new Error("Missing product id");

    await db.transaction(async (tx) => {
      await tx.delete(productAttribute)
        .where(eq(productAttribute.productId, productId));

      if (payload.length) {
        await tx.insert(productAttribute).values(
          payload.map(a => ({
            productId,
            attribute: a.attribute,
            value: a.value,
          }))
        );
      }
    });

    revalidatePath(`/admin/product/${productId}`);
    return { success: true };

  } catch (error) {
   
    console.error("saveProductAttributes failed:", error);
    throw new Error("Unable to save product attributes");
  }
}


export async function getProductAttributes(productId: string) {

  try {
    return await db
      .select()
      .from(productAttribute)
      .where(eq(productAttribute.productId, productId));

  } catch (error) {
    console.error("getProductAttributes failed:", error);
    throw new Error("Unable to fetch attributes");
  }
}

export async function getFullProduct(productId: string) {

  try {
    if (!productId) throw new Error("Missing product id");

    const [productInfo, media, attributes] = await Promise.all([
      db.query.productTable.findFirst({
        where: eq(product.id, productId),
      }),

      db.select()
        .from(productMedia)
        .where(eq(productMedia.productId, productId)),

      db.select()
        .from(productAttribute)
        .where(eq(productAttribute.productId, productId)),
    ]);

    return { productInfo, media, attributes };

  } catch (error) {
    console.error("getFullProduct failed:", error);
    throw new Error("Unable to fetch product");
  }
}

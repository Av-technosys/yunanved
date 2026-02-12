

"use server";

import { db } from "@/lib/db";
import { product, productMedia, productAttribute } from "@/db/productSchema";
import slugify from "slugify";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

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

  const name = str(formData, "name");
  const description = str(formData, "description");
  const price = num(formData, "price");
  const isActive = str(formData, "isActive") === "true";
 const strikethroughPrice = Number(formData.get("strikethroughPrice"));
  const bannerImage = str(formData, "bannerImage"); 
  const mediaUrls = parseMedia(formData);           

 const id = await db.transaction(async (tx) => {

    const [created] = await tx
      .insert(product)
      .values({
        name,
        slug: slugify(name || "product", { lower: true }),
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

    // 2️⃣ Insert gallery images
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

  revalidatePath("/admin/product");
  redirect(`/admin/product/${id}/attributes`);
}


export async function updateProduct(formData: FormData) {

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


  revalidatePath("/admin/product");
  revalidatePath(`/admin/product/${id}`);
  redirect("/admin/product");
}







export async function saveProductAttributes(productId: string, payload: {
  attribute: string;
  value: string;
}[]) {

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

  console.log("attributs added")
  revalidatePath(`/admin/product/${productId}`);
  redirect(`/admin/product/`);
}


export async function getProductAttributes(productId: string) {
  const attrs = await db
    .select()
    .from(productAttribute)
    .where(eq(productAttribute.productId, productId));

  return attrs;
}
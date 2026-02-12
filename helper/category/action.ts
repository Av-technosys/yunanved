"use server";

import { db } from "@/lib/db";
import { category } from "@/db/productSchema";
import slugify from "slugify";
//import path from "path";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const parentId = formData.get("parentId") as string | null;
//   const file = formData.get("image") as File | null;
  //  const file = null
    const imagePath: string | null = null;

//   if (file && file.size > 0) {
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const fileName = Date.now() + "-" + file.name;
//     const filePath = path.join(process.cwd(), "public/uploads", fileName);

//     await writeFile(filePath, buffer);
//     imagePath = "/uploads/" + fileName;
//   }

  await db.insert(category).values({
    name,
    slug: slugify(name, { lower: true }),
    description,
    parentId: parentId || null,
    bannerImage: imagePath,
  });

    console.log("Inserted successfully");

     revalidatePath("/admin/category");
    // move user after success
  redirect("/admin/category");
  
 
}


export async function updateCategory(formData: FormData) {
   
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
    .where(eq(category.id, id))
   

  

  revalidatePath("/admin/category");
  revalidatePath(`/admin/category/${id}`);

  redirect("/admin/category");
}

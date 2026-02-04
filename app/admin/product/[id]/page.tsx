"use server";
import { db } from "@/lib/db";
import EditProduct from "./editClient";

import { product } from "@/db/productSchema";

import { eq } from "drizzle-orm";

interface PageProps {
  params: {
    id: any;
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const productInfo = await db.select().from(product).where(eq(product.id, id));

  return (
    <>
      <EditProduct productInfo={productInfo[0]} />
    </>
  );
};

export default Page;

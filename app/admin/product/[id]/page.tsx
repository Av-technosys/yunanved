import { db } from "@/lib/db";
import EditProduct from "./editClient";

import { product, productMedia, productAttribute } from "@/db/productSchema";
import { eq } from "drizzle-orm";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
const { id } = await params;

  const productInfo = await db.query.productTable.findFirst({
  where: eq(product.id, id),
});

  const media = await db
    .select()
    .from(productMedia)
    .where(eq(productMedia.productId, id));

  const attributes = await db
    .select()
    .from(productAttribute)
    .where(eq(productAttribute.productId, id));

  return (
    <EditProduct
      productInfo={productInfo}
      media={media}
      attributes={attributes}
    />
  );
};

export default Page;

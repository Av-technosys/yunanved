import EditProduct from "./editClient";
import { getFullProduct } from "@/helper/index";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const product = await getFullProduct(id);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  // const { media, attributes, reviewWithMedia, ...productInfo } = product;

  return (
    <EditProduct
      productId={product.id}
      initialVariants={product.variants}
      initialCategoryIds={product.categoryIds}
      targetVariantId={product.targetVariant?.id}
    />
  );
};

export default Page;

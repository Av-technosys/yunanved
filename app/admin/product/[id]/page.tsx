import EditProduct from "./editClient";
import { getFullProduct } from "@/helper/index";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const product = await getFullProduct(id);

  if (!product) {
    return;
  }

  const { media, attributes, reviewWithMedia, ...productInfo } = product;

  return (
    <EditProduct
      productInfo={productInfo}
      media={media}
      attributes={attributes}
    />
  );
};

export default Page;

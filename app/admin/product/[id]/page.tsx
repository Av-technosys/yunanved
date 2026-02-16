import EditProduct from "./editClient";
import { getFullProduct } from "@/helper/index";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const { id } =  await params;

  const { productInfo, media, attributes } = await getFullProduct(id);

  return (
    <EditProduct
      productInfo={productInfo}
      media={media}
      attributes={attributes}
    />
  );
};

export default Page;

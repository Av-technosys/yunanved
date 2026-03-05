/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFullProduct,
  getProductSimilarProducts,
} from "@/helper";
import ProductClient from "./productClient";

const Page = async (props: any) => {
  const params = await props.params;
  const product = await getFullProduct(params.productslug);

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }



  const similarProducts = await getProductSimilarProducts(params.productslug) || [];

  return (
    <>
      <ProductClient
        productInfo={product.targetVariant}
        variants={product.variants}
        similarProducts={similarProducts}
      />
    </>
  );
};

export default Page;

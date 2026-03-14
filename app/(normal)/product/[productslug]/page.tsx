/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFullProduct,
  getProductSimilarProducts,
} from "@/helper";
import ProductClient from "./productClient";
import { getProductReviews } from "@/helper/product/action";

const Page = async (props: any) => {
  const params = await props.params;
  const product = await getFullProduct(params.productslug);
  

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }



  const similarProducts = await getProductSimilarProducts(params.productslug) || [];
  const reviewWithMedia = await getProductReviews(params.productslug);

  

  return (
    <>
      <ProductClient
        productInfo={product.targetVariant}
        variants={product.variants}
        similarProducts={similarProducts}
        reviewWithMedia={reviewWithMedia}
      />
    </>
  );
};

export default Page;

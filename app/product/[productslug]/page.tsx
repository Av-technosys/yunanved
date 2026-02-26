/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

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

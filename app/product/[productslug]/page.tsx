/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

import {
  getProductAttributes,
  getProductInfoByProductSlug,
  getProductSimilarProducts,
} from "@/helper";
import ProductClient from "./productClient";

const Page = async (props: any) => {
  const params = await props.params;
  const productInfo: any = await getProductInfoByProductSlug(
    params.productslug,
  );
  const similarProducts = await getProductSimilarProducts(params.productslug);

  const productAttributes = await getProductAttributes(productInfo.id);

  return (
    <>
      <Navbar />
      <ProductClient
        productInfo={productInfo}
        similarProducts={similarProducts}
        productAttributes={productAttributes}
      />
      <Footer />
    </>
  );
};

export default Page;

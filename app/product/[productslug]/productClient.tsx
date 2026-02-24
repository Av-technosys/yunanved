/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import productBannerImage from "../../../public/fortune1.png";
import productOtherImage1 from "../../../public/fortune1.png";

import Image from "next/image";
import { RefreshCw, ShoppingCart, Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import ProductCard from "@/components/productCard";

import { Button } from "@/components/ui/button";

import ReviewCard from "@/app/product/reviewCard";

import { useRef, useState, useTransition } from "react";
import { useCartStore } from "@/store/cartStore";
import { addProductToUserCart } from "@/helper";
import { toast } from "sonner";
import { tempUserId } from "@/const";
import { useAddToCart } from "@/helper/useAddToCart";

const ProductClient = ({
  productInfo,
  similarProducts,
  productAttributes,
}: any) => {
  const [bannerImage, setBannerImage] = useState<any>(productInfo.bannerImage);

  const [isAdding, setIsAdding] = useState(false);
  const clickLock = useRef(false);
  const { handleAddToCart, isPending } = useAddToCart();

  const productDetailsForCart = {
    productId: productInfo.id,
    sku: productInfo.sku,
    slug: productInfo.slug,
    title: productInfo.name,
    image: productInfo.bannerImage,
    price: productInfo.basePrice,
    originalPrice: productInfo.strikethroughPrice ?? undefined,
    attributes: [],
  };

  const attributes = productAttributes ?? [];

  const leftAttributes = attributes.slice(0, 5);

  const rightAttributes = attributes.slice(5);

  const handleClick = async () => {
    if (clickLock.current) return;

    clickLock.current = true;
    setIsAdding(true);

    try {
      await handleAddToCart(productDetailsForCart);
    } catch (err) {
      console.error("Add to cart failed", err);
    } finally {
      setIsAdding(false);
      clickLock.current = false;
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-5 my-5 px-2 md:px-4  lg:px-0 gap-10">
        <div className="col-span-5 h-[90vh] gap-4 md:gap-2 md:col-span-3 flex flex-col md:flex-row ">
          <div className="w-full order-2 md:order-1 md:w-1/4">
            <div className="flex overflow-x-auto md:flex-col w-full h-full  items-start  gap-2">
              {productInfo?.media?.map((image: any, index: number) => (
                <Button
                  onClick={() => setBannerImage(image.mediaURL)}
                  variant={"ghost"}
                  key={index}
                  className={`
                           relative h-32 w-32 rounded-lg border
                          bg-[#F5F5F5] p-1 transition
                          hover:border-blue-500
                          focus:border-blue-600
                         `}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${image.mediaURL}`}
                    alt="product thumbnail"
                    fill
                    className="object-cover rounded-md"
                  />
                </Button>
              ))}
            </div>
          </div>
          <div className="w-full h-full md:w-3/4 order-1 md:order-2  flex  items-center justify-center bg-[#F5F5F5] rounded-lg">
            <div className="h-full w-full relative flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${bannerImage ? bannerImage : productBannerImage}`}
                alt={"bannerImage"}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="col-span-5 md:col-span-2 flex flex-col gap-4 md:gap-2 ">
          <h1 className="text-2xl md:text-[14px] lg:text-2xl font-semibold text-gray-900">
            {productInfo.name}
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(productInfo.rating) }).map(
                (_, index) => (
                  <span key={index} className="text-yellow-400">
                    ★
                  </span>
                ),
              )}
              <span className="text-gray-400 ml-1">
                ({productInfo.reviewCount} Reviews)
              </span>
            </div>
            {/* 
            <span
              className={`font-medium ${
                productDetails.stock === "In Stock"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {productDetails.stock}
            </span> */}
          </div>

          <p className="text-2xl font-bold text-gray-900">
            ₹{productInfo.basePrice}
          </p>

          <p className="text-gray-600 h-24 overflow-y-auto text-sm md:text-[10px] lg:text-sm leading-relaxed">
            {productInfo.description == ""
              ? "No description"
              : productInfo.description}
          </p>

          <hr />

          <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-800">Quantity</p>

            <div className="flex gap-2 flex-wrap">
              {["5KG", "10KG", "20KG", "35KG", "40KG"].map((quantity) => (
                <button
                  key={quantity}
                  className="px-4 py-1.5 rounded-md border text-sm
                           hover:border-teal-600 hover:text-teal-700
                           focus:bg-teal-700 focus:text-white"
                >
                  {quantity}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleClick}
              disabled={isAdding}
              className={`flex-1 bg-teal-700 text-white py-2 rounded-full font-medium 
              hover:bg-teal-800 transition
              ${isAdding ? "opacity-70 pointer-events-none" : ""}`}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>
            <button className="flex-1 bg-yellow-500 text-white py-2 rounded-full font-medium hover:bg-yellow-600">
              Buy Now
            </button>
          </div>

          <div className="border rounded-lg mt-4 divide-y">
            <div className="flex gap-3 p-4">
              <span className="text-xl">
                <Truck />
              </span>
              <div>
                <p className="font-medium text-gray-800">Free Delivery</p>
                <p className="text-sm text-gray-500">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4">
              <span className="text-xl">
                <RefreshCw />
              </span>
              <div>
                <p className="font-medium text-gray-800">Return Delivery</p>
                <p className="text-sm text-gray-500">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl px-2 md:px-0 my-10 mx-auto">
        <h1 className="text-lg mt-5 font-bold">Product Specifications</h1>

        <div className="flex flex-col md:flex-row w-full my-5 gap-10">
          {productAttributes.length > 0 ? (
            <>
              <div className="w-full md:w-1/2 flex flex-col gap-2 text-sm text-gray-800">
                <h3 className="font-semibold text-base mb-2">Item Details</h3>

                {leftAttributes.map((item: any, index: number) => (
                  <div key={item.id}>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">{item.attribute}</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {item.value}
                      </span>
                    </div>
                    <Separator
                      className={`${index === leftAttributes.length - 1 ? "hidden" : ""}`}
                    />
                  </div>
                ))}
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-2 text-sm text-gray-800">
                <h3 className="font-semibold text-base mb-2">More Details</h3>

                {rightAttributes.map((item: any, index: number) => (
                  <div key={item.id}>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">{item.attribute}</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {item.value}
                      </span>
                    </div>
                    <Separator
                      className={`${index === rightAttributes.length - 1 ? "hidden" : ""}`}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-800">No Attributes Found.</p>
          )}
        </div>
      </div>

      <div className="max-w-6xl px-2 md:px-4 mb-10 lg:px-0 mt-5 mx-auto">
        <div className="text-lg mb-5 font-bold">Customer Reviews</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {productInfo.reviews.length > 0 ? (
            productInfo.reviews.map((review: any, index: number) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <p className="text-sm text-gray-800">No Reviews Found.</p>
          )}
        </div>
      </div>
      <div className="max-w-6xl mt-5 px-2  md:px-4 lg:px-0  mx-auto">
        <div className="text-lg mb-5 font-bold">Similar Products</div>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2">
          {similarProducts.length > 0 ? (
            similarProducts.map((product: any, index: number) => {
              return (
                <ProductCard product={product} key={index} className="h-60" />
              );
            })
          ) : (
            <p className="text-sm text-gray-800">No Similar Products Found.</p>
          )}
        </div>
      </div>

      {/* <div className="max-w-6xl  mt-5 px-2 md:px-4 lg:px-0 mx-auto">
              <div className="text-lg mb-5 font-bold">Customer Also Viewed</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {customerViewed.map((product: any, index) => {
                  return (
                    <ProductCard product={product} key={index} className="h-60" />
                  );
                })}
              </div>
            </div>   */}
    </>
  );
};

export default ProductClient;

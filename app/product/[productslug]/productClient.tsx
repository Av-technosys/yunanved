/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import productBannerImage from "../../../public/fortune1.png";
import Image from "next/image";
import { RefreshCw, Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import ReviewCard from "@/app/product/reviewCard";
import { useRef, useState } from "react";
import { useAddToCart } from "@/helper/useAddToCart";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import { useRouter } from "next/navigation";

const ProductClient = ({
  productInfo: initialProduct,
  variants = [],
  similarProducts = [],
}: any) => {
  const router = useRouter();
  const [activeVariant, setActiveVariant] = useState(initialProduct);
  const [bannerImage, setBannerImage] = useState<any>(activeVariant.bannerImage);

  const [isAdding, setIsAdding] = useState(false);
  const clickLock = useRef(false);
  const { handleAddToCart } = useAddToCart();

  const productDetailsForCart = {
    productId: activeVariant.id,
    sku: activeVariant.sku,
    slug: activeVariant.slug,
    title: activeVariant.name,
    image: activeVariant.bannerImage,
    price: activeVariant.basePrice,
    originalPrice: activeVariant.strikethroughPrice ?? undefined,
    attributes: [],
  };

  const attributes = activeVariant.attributes ?? [];
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

  const handleVariantChange = (variant: any) => {
    setActiveVariant(variant);
    setBannerImage(variant.bannerImage);
    // Optionally update the URL without a full reload
    window.history.replaceState(null, "", `/product/${variant.slug}`);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-5 my-5 px-2 md:px-4  lg:px-0 gap-10">
        <div className="col-span-5 h-[90vh] gap-4 md:gap-2 md:col-span-3 flex flex-col md:flex-row ">
          <div className="w-full order-2 md:order-1 md:w-1/4">
            <div className="flex overflow-x-auto md:flex-col w-full h-full  items-start  gap-2">
              {activeVariant?.media?.map((image: any, index: number) => (
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
                    src={image.mediaURL && image.mediaURL !== "null" && image.mediaURL !== "[object Object]"
                      ? `${NEXT_PUBLIC_S3_BASE_URL}/${image.mediaURL}`
                      : "/fortune1.png"}
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
                src={bannerImage && bannerImage !== "null" && bannerImage !== "[object Object]"
                  ? `${NEXT_PUBLIC_S3_BASE_URL}/${bannerImage}`
                  : "/fortune1.png"}
                alt={"bannerImage"}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="col-span-5 md:col-span-2 flex flex-col gap-4 md:gap-2 ">
          <h1 className="text-2xl md:text-[14px] lg:text-2xl font-semibold text-gray-900">
            {activeVariant.name}
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(activeVariant.rating || 0) }).map(
                (_, index) => (
                  <span key={index} className="text-yellow-400">
                    ★
                  </span>
                ),
              )}
              <span className="text-gray-400 ml-1">
                ({activeVariant.reviewCount || 0} Reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">
              ₹{activeVariant.basePrice}
            </p>
            {activeVariant.strikethroughPrice > 0 && (
              <p className="text-lg text-gray-400 line-through">
                ₹{activeVariant.strikethroughPrice}
              </p>
            )}
          </div>

          <p className="text-gray-600 h-24 overflow-y-auto text-sm md:text-[10px] lg:text-sm leading-relaxed">
            {activeVariant.description == ""
              ? "No description"
              : activeVariant.description}
          </p>

          <hr />

          {variants.length > 1 && (
            <div className="flex flex-col gap-2">
              <p className="font-medium text-gray-800">Variants</p>
              <div className="flex gap-2 flex-wrap">
                {variants.map((v: any) => (
                  <button
                    key={v.id}
                    onClick={() => handleVariantChange(v)}
                    className={`px-4 py-1.5 rounded-md border text-sm transition-colors
                            ${activeVariant.id === v.id
                        ? "bg-teal-700 text-white border-teal-700"
                        : "hover:border-teal-600 hover:text-teal-700"
                      }`}
                  >
                    {v.name.replace(initialProduct.name, "").trim() || "Default"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleClick}
              disabled={isAdding || !activeVariant.isInStock}
              className={`flex-1 bg-teal-700 text-white py-2 rounded-full font-medium 
              hover:bg-teal-800 transition
              ${(isAdding || !activeVariant.isInStock) ? "opacity-70 pointer-events-none" : ""}`}
            >
              {activeVariant.isInStock ? (isAdding ? "Adding..." : "Add to Cart") : "Out of Stock"}
            </button>
            <button
              disabled={!activeVariant.isInStock}
              className="flex-1 bg-yellow-500 text-white py-2 rounded-full font-medium hover:bg-yellow-600 disabled:opacity-50"
            >
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
          {attributes.length > 0 ? (
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
          {(activeVariant.reviewWithMedia || []).length > 0 ? (
            activeVariant.reviewWithMedia.map((review: any, index: number) => (
              <ReviewCard key={review.id} review={review} />
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
    </>
  );
};

export default ProductClient;

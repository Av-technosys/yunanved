/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { RefreshCw, Star, Truck, Undo2 } from "lucide-react";
import { ProductCard } from "@/components/productCard";
import { Button } from "@/components/ui";
import { useRef, useState } from "react";
import { useAddToCart } from "@/helper/useAddToCart";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import { cn } from "@/lib/utils";
import ReviewCard from "../reviewCard";
import { useRouter } from "next/navigation";
import { useClientSideUser } from "@/hooks/getClientSideUser";
import { useCartStore } from "@/store/cartStore";
import { removeCartItem } from "@/helper";
import { toast } from "sonner";
import { startTransition } from "react";
import StarRatings from "react-star-ratings";
const ProductClient = ({
  productInfo: initialProduct,
  variants = [],
  similarProducts = [],
  reviewWithMedia = [],
}: any) => {
  const router = useRouter();
  const { userDetails } = useClientSideUser();
  const [activeVariant, setActiveVariant] = useState(initialProduct);
  const [bannerImage, setBannerImage] = useState<any>(
    activeVariant.bannerImage,
  );
  const [isAdding, setIsAdding] = useState(false);
  const clickLock = useRef(false);
  const { handleAddToCart } = useAddToCart(userDetails?.id);
  const items = useCartStore((state) => state.items) || [];
  const removeItem = useCartStore((state) => state.removeItem);
  const userId = userDetails?.id;

  const isInCart = items.some((i) => i.productId === activeVariant.id);
  const productDetailsForCart = {
    productId: activeVariant.id,
    sku: activeVariant.sku,
    slug: activeVariant.slug,
    title: activeVariant.name,
    image: activeVariant.bannerImage,
    price: activeVariant.basePrice,
    originalPrice: activeVariant.strikethroughPrice ?? undefined,
    isReturnable: activeVariant.isReturnable,
    isReplacement: activeVariant.isReplacement,
    returnDays: activeVariant.returnDays,
    replacementDays: activeVariant.replacementDays,
    isFreeDelivery: activeVariant.isCancelable,
    attributes: [],
  };

  const handleRemove = () => {
    const item = {
      productId: activeVariant.id,
      slug: activeVariant.slug,
      title: activeVariant.name,
      image: activeVariant.bannerImage,
      price: activeVariant.basePrice,
      attributes: [],
    };

    removeItem(item.productId, item.attributes);

    startTransition(async () => {
      try {
        await removeCartItem(userId, item.productId);
      } catch {
        useCartStore.getState().addItem(item);
        toast.error("Failed to remove item");
      }
    });
  };
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
    // window.history.replaceState(null, "", `/product/${variant.slug}`);
    router.push(`/product/${variant.slug}`);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-5 my-5 px-2 md:px-4  lg:px-0 gap-10">
        <div className="col-span-5  h-112 md:h-140  gap-4 md:gap-2 md:col-span-3 flex flex-col md:flex-row ">
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
                    src={
                      image.mediaURL &&
                      image.mediaURL !== "null" &&
                      image.mediaURL !== "[object Object]"
                        ? `${NEXT_PUBLIC_S3_BASE_URL}/${image.mediaURL}`
                        : "/fortune1.png"
                    }
                    alt="product thumbnail"
                    fill
                    className="object-cover rounded-md"
                  />
                </Button>
              ))}
            </div>
          </div>
          <div className="w-full h-full md:w-3/4 order-1 md:order-2  flex  items-center justify-center bg-[#F5F5F5] rounded-lg">
            <div className="h-[80%] w-full relative flex items-center justify-center">
              <Image
                src={
                  bannerImage &&
                  bannerImage !== "null" &&
                  bannerImage !== "[object Object]"
                    ? `${NEXT_PUBLIC_S3_BASE_URL}/${bannerImage}`
                    : "/fortune1.png"
                }
                alt={"bannerImage"}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="col-span-5   md:col-span-2 flex flex-col">
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 md:gap-2 p-2">
            <h1 className="text-2xl md:text-[14px] lg:text-2xl font-semibold text-gray-900">
              {activeVariant.name}
            </h1>

            <ProductReview activeVariant={activeVariant} />

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

            <ProductDescription description={activeVariant.description} />
            <hr />

            <ProductVarient
              variants={variants}
              handleVariantChange={handleVariantChange}
              activeVariant={activeVariant}
            />

            <div className="flex gap-4 mt-2">
              <Button
                onClick={() => {
                  if (isInCart) {
                    handleRemove();
                  } else {
                    handleClick();
                  }
                }}
                disabled={isAdding || !activeVariant.isInStock}
                variant={isInCart ? "outline" : "default"}
                className={`flex-1 rounded-full font-medium transition
    ${isAdding || !activeVariant.isInStock ? "opacity-70 pointer-events-none" : ""}
  `}
              >
                {activeVariant.isInStock
                  ? isInCart
                    ? "Remove"
                    : isAdding
                      ? "Adding..."
                      : "Add to Cart"
                  : "Out of Stock"}
              </Button>
              <Button
                variant={"default"}
                disabled={!activeVariant.isInStock}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-full font-medium hover:bg-yellow-600 disabled:opacity-50"
              >
                Buy Now
              </Button>
            </div>

            <div className="border rounded-lg mt-4 divide-y">
              {/* managing free delivery by isCancelable */}
              {activeVariant.isCancelable && <FreeDelivery />}
              {activeVariant.isReturnable && (
                <ReturnDelivery days={activeVariant.returnDays} />
              )}
              {activeVariant.isReplacement && (
                <ReplacementDelivery days={activeVariant.replacementDays} />
              )}
            </div>
          </div>
        </div>
      </div>

      <ProductSpecification attributes={activeVariant.attributes ?? []} />

      <div className="max-w-6xl px-2 md:px-4 mb-10 lg:px-0 mt-5 mx-auto">
        <div className="text-lg mb-5 font-bold">Customer Reviews</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(reviewWithMedia || []).length > 0 ? (
            reviewWithMedia?.map((review: any, index: number) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <p className="text-sm text-gray-800">No Reviews Found.</p>
          )}
        </div>
        <SimilarProducts similarProducts={similarProducts} />
      </div>
    </>
  );
};

export default ProductClient;

function ProductReview({ activeVariant }: { activeVariant: any }) {
  const rating = Number(activeVariant.rating) || 0;

  return (
    <div className="flex items-center gap-2 text-sm">
      
      {/* ⭐ Stars */}
      <StarRatings
        rating={rating}
        starRatedColor="#facc15"   // yellow-400
        starEmptyColor="#e5e7eb"   // gray-200
        numberOfStars={5}
        starDimension="18px"
        starSpacing="2px"
        name="rating"
      />

      {/* ⭐ Rating number */}
      <span className="font-medium text-gray-800">
        {rating.toFixed(1)}
      </span>

      {/* 📝 Review count */}
      <span className="text-gray-400">
        ({activeVariant.reviewCount || 0} reviews)
      </span>
    </div>
  );
}

function ProductDescription({ description }: { description: string }) {
  const [showMore, setShowMore] = useState(false);

  const LIMIT = 120;

  const isLong = description && description.length > LIMIT;

  const displayedText =
    !description || description === ""
      ? "No description"
      : showMore
        ? description
        : description.slice(0, LIMIT);

  return (
    <p className="text-gray-600 leading-relaxed">
      {displayedText}

      {!showMore && isLong && (
        <>
          ...{" "}
          <span
            onClick={() => setShowMore(true)}
            className="text-blue-500 cursor-pointer text-sm font-medium"
          >
            See more
          </span>
        </>
      )}

      {showMore && isLong && (
        <span
          onClick={() => setShowMore(false)}
          className="text-blue-500 cursor-pointer text-sm font-medium ml-1"
        >
          See less
        </span>
      )}
    </p>
  );
}

function ProductSpecification({ attributes }: { attributes: any }) {
  return (
    <>
      <div className="max-w-6xl px-2 md:px-0 my-10 mx-auto">
        <h1 className="text-lg mt-4 font-bold">Product Specifications</h1>

        <div className=" text-sm grid divide-y grid-cols-1 md:grid-cols-2 gap-4 gap-x-12 mt-6">
          {attributes.map((item: any, index: number) => (
            <div key={item.id}>
              <div className="grid-cols-2 grid  py-2">
                <span className="text-gray-600">{item.attribute}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProductVarient({
  variants,
  handleVariantChange,
  activeVariant,
}: {
  variants: any;
  handleVariantChange: any;
  activeVariant: any;
}) {
  return (
    <>
      {variants.length > 1 && (
        <div className=" space-y-2">
          <p className="font-medium text-gray-800">Variants</p>
          <div className=" flex flex-wrap gap-2">
            {variants.map((v: any, index: number) => (
              <div key={index} className="">
                <Button
                  variant={"outline"}
                  key={v.id}
                  onClick={() => handleVariantChange(v)}
                  className={cn(
                    `h-auto cursor-pointer  flex flex-col gap-2`,
                    v.id === activeVariant.id && "bg-gray-100",
                  )}
                >
                  <div className="w-28 h-28 relative rounded-md overflow-hidden">
                    <Image
                      src={`${NEXT_PUBLIC_S3_BASE_URL}/${v.bannerImage}`}
                      alt="product thumbnail"
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <span className=" max-w-32 whitespace-break-spaces">
                    {v.name.replace(activeVariant.name, "").trim() || v.name}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function SimilarProducts({ similarProducts }: { similarProducts: any }) {
  return (
    <>
      <div className="max-w-6xl mt-5 px-2  md:px-4 lg:px-0  mx-auto">
        <div className="text-lg mb-5 font-bold">Similar Products</div>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3">
          {similarProducts.length > 0 ? (
            similarProducts.map((product: any, index: number) => {
              return <ProductCard product={product} key={index} />;
            })
          ) : (
            <p className="text-sm text-gray-800">No Similar Products Found.</p>
          )}
        </div>
      </div>
    </>
  );
}

function ReturnDelivery({ days }: { days: number }) {
  return (
    <div className="flex gap-3 p-4">
      <span className="text-xl">
        <Undo2 />
      </span>
      <div>
        <p className="font-medium text-gray-800">Return Product</p>
        <p className="text-sm text-gray-500">
          Free {days} Days Return.{" "}
          <span className="underline cursor-pointer">Details</span>
        </p>
      </div>
    </div>
  );
}
function FreeDelivery() {
  return (
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
  );
}

function ReplacementDelivery({ days }: { days: number }) {
  return (
    <div className="flex gap-3 p-4">
      <span className="text-xl">
        <RefreshCw />
      </span>
      <div>
        <p className="font-medium text-gray-800">Replacement Product</p>
        <p className="text-sm text-gray-500">
          Free {days} Days Replacement.{" "}
          <span className="underline cursor-pointer">Details</span>
        </p>
      </div>
    </div>
  );
}

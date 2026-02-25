/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card } from "../ui/card";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { useAddToCart } from "@/helper/useAddToCart";
import { useRef, useState } from "react";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";

const FeaturedProductCard = ({ product, key }: any) => {
  const { handleAddToCart, isPending } = useAddToCart();

  const [isAdding, setIsAdding] = useState(false);
  const clickLock = useRef(false);


  const addToCartHandler = async () => {
    if (clickLock.current) return;

    clickLock.current = true;
    setIsAdding(true);

    const productDetailsForCart = {
      productId: product.productId,
      sku: product.sku,
      slug: product.slug,
      title: product.name,
      image: product.bannerImage,
      price: product.basePrice,
      originalPrice: product.strikethroughPrice ?? undefined,
      attributes: [],
    };

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
    <div>
      <Card
        key={key}
        className=" flex flex-col py-1  overflow-hidden border-none rounded-3xl shadow-sm bg-white hover:shadow-xl transition-shadow"
      >
        {/* Image */}
        <Link href={`/product/${product.slug}`}>
          <div className="h-52 flex items-center justify-center p-4">
            <img
              src={`${NEXT_PUBLIC_S3_BASE_URL}/${product.bannerImage}`}
              alt={"Product Image"}
              className="object-contain h-full"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 bg-white border-t border-gray-100">
          {/* Name + Category */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-sm text-black line-clamp-1">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.round(product.rating) ? "#FFC107" : "none"}
                stroke="#FFC107"
              />
            ))}
            <span className="text-[10px] text-gray-400">
              ({product.reviewCount})
            </span>
          </div>

          {/* Description */}
          <p className="text-[12px] text-gray-500 mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* Price + Button */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-black">
              ₹{product.basePrice}
            </span>

         <Button
            onClick={addToCartHandler}
            disabled={isAdding}
            className="bg-[#414141] text-white hover:bg-black rounded-lg text-xs h-8 px-4 font-bold"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedProductCard;

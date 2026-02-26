/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

import StarRatings from "react-star-ratings";

import { useAddToCart } from "@/helper/useAddToCart";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";

const ProductCard = ({ product, index, className = "", slug = "" }: any) => {

  const { handleAddToCart, isPending } = useAddToCart();
  const [isAdding, setIsAdding] = useState(false);
  const clickLock = useRef(false);

  const productDetailsForCart = {
    productId: product.id,
    sku: product.sku,
    slug: product.slug,
    title: product.name,
    image: product.bannerImage,
    price: product.basePrice,
    originalPrice: product.strikethroughPrice ?? undefined,
    attributes: [],
  };

  const handleClick = async () => {
    if (clickLock.current || isAdding) return;

    clickLock.current = true;
    setIsAdding(true);

    try {
      await handleAddToCart(productDetailsForCart);
    } finally {
      setIsAdding(false);
      clickLock.current = false;
    }
  };

  return (
    <>
      <Card key={index} className="p-0">
        <CardContent className="p-2">
          <Link href={`/product/${product.slug}`}>
            <div className={cn(`relative h-52 w-full`, className)}>
              <Image
                src={product.bannerImage && product.bannerImage !== "null" && product.bannerImage !== "[object Object]"
                  ? `${NEXT_PUBLIC_S3_BASE_URL}/${product.bannerImage}`
                  : "/fortune1.png"}
                alt={product.name}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </Link>
          <div className="p-2">
            <Link href={`/product/${product.slug}`}>
              <div className="text-black mt-2 font-semibold line-clamp-1">
                {product.name}
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <StarRatings
                  rating={product.rating}
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  starRatedColor="#facc15"
                  name="rating"
                />
              </div>

            </div>
          </div>


        </CardContent>
        <CardFooter >
          <div className="flex mb-4 w-full items-center justify-between">
            <div className=" font-semibold text-lg">₹{product.basePrice}</div>
            <Button
              disabled={isAdding}
              className={cn(
                "transition-colors bg-[#235A62] hover:bg-[#1b454c] text-white",
                isAdding && "opacity-70 pointer-events-none"
              )}
              onClick={handleClick}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
              <ShoppingCart />
            </Button>
          </div>
        </CardFooter>
      </Card>

     
    </>
  );
};

export default ProductCard;

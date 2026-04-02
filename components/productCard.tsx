/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { startTransition, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

import StarRatings from "react-star-ratings";

import { useAddToCart } from "@/helper/useAddToCart";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { removeCartItem } from "@/helper";
import { useClientSideUser } from "@/hooks/getClientSideUser";

export const ProductCard = ({ product, index, className = "" }: any) => {
  const { userDetails } = useClientSideUser();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const { handleAddToCart, isPending } = useAddToCart(userDetails?.id);
  const [isAdding, setIsAdding] = useState(false);
  const userId = userDetails?.id;

  const clickLock = useRef(false);
  const isInCart = items.some(
    (i: { productId: any; attributes: any }) =>
      i.productId === product.id &&
      JSON.stringify(i.attributes) === JSON.stringify([]),
  );
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

  const handleRemove = (item: any) => {
    removeItem(item.productId, item.attributes);

    startTransition(async () => {
      try {
        await removeCartItem(userId, item.productId);
      } catch {
        useCartStore.getState().addItem(item); // rollback
        toast.error("Failed to remove item");
      }
    });
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
const rating = Number(product.rating) || 0;
  return (
    <>
      <Card key={index} className="p-0">
        <CardContent className="p-2">
          <Link href={`/product/${product.slug}`}>
            <div className={cn(`relative h-52 w-full`, className)}>
              <Image
                src={
                  product.bannerImage &&
                  product.bannerImage !== "null" &&
                  product.bannerImage !== "[object Object]"
                    ? `${NEXT_PUBLIC_S3_BASE_URL}/${product.bannerImage}`
                    : "/fortune1.png"
                }
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
                  rating={rating}
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
        <CardFooter className="">
          <div className="flex flex-col md:flex-row gap-2 mb-4 w-full md:items-center justify-between">
            <div className=" font-semibold text-lg">₹{product.basePrice}</div>
            <Button
              disabled={isAdding}
           variant={isInCart ? "outline" : "default"}
              onClick={() => {
                if (isInCart) {
                  handleRemove({
                    productId: product.id,
                    attributes: [],
                  });
                } else {
                  handleClick();
                }
              }}
            >
              {isInCart ? "Remove" : isAdding ? "Adding..." : "Add to Cart"}
             {isInCart ? <Undo2 className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

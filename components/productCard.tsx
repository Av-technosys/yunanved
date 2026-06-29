/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { startTransition, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import StarRatings from "react-star-ratings";

import { useAddToCart } from "@/helper/useAddToCart";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { decreaseCartItem, increaseCartItem, removeCartItem } from "@/helper";

export const ProductCard = ({ product, index, className = "" }: any) => {
  const rawItems = useCartStore((state) => state.items);

  const items = Array.isArray(rawItems) ? rawItems : [];

  const removeItem = useCartStore((state) => state.removeItem);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const { handleAddToCart } = useAddToCart();
  const [isAdding, setIsAdding] = useState(false);

  const clickLock = useRef(false);

  const cartItem = items.find(
    (i: { productId: any; attributes: any }) =>
      i.productId === product.id &&
      JSON.stringify(i.attributes ?? []) === JSON.stringify([]),
  );
  const isInCart = Boolean(cartItem);
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
        const result = await removeCartItem(item.productId);
        if (!result?.success) throw new Error("Failed to remove item");
      } catch {
        useCartStore.getState().addItem(item); // rollback
        toast.error("Failed to remove item");
      }
    });
  };

  const handleIncrease = (item: any) => {
    increase(item.productId, item.attributes);

    startTransition(async () => {
      try {
        const result = await increaseCartItem(item.productId);
        if (!result?.success) throw new Error("Failed to update quantity");
      } catch {
        decrease(item.productId, item.attributes);
        toast.error("Failed to update quantity");
      }
    });
  };

  const handleDecrease = (item: any) => {
    decrease(item.productId, item.attributes);

    startTransition(async () => {
      try {
        const result = await decreaseCartItem(item.productId);
        if (!result?.success) throw new Error("Failed to update quantity");
      } catch {
        if (item.quantity <= 1) {
          useCartStore.getState().addItem(item);
        } else {
          increase(item.productId, item.attributes);
        }
        toast.error("Failed to update quantity");
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
  const rawRating = Number(product.rating) || 0;

  const rating = rawRating >= 100 ? rawRating / 100 : rawRating;

  return (
    <>
      <Card
        key={index}
        className="relative h-full gap-0 overflow-hidden rounded-xl border border-slate-50 bg-white p-0 shadow-md transition-shadow hover:shadow-md"
      > 
        <div className="absolute left-4 top-2 z-10 rounded-sm bg-[#96C948] px-3 py-1 text-[12px] font-bold text-white">
          -10%
        </div>

        <CardContent className="flex flex-1 flex-col p-2 pb-0">
          <Link href={`/product/${product.slug}`}>
            <div className={cn(`relative h-48 w-full md:h-52 group`, className)}>
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
                className={cn("object-contain rounded-md px-1 pt-8 transition-opacity duration-300", product.hoverImage ? "group-hover:opacity-0" : "")}
              />
              {product.hoverImage && (
                <Image
                  src={`${NEXT_PUBLIC_S3_BASE_URL}/${product.hoverImage}`}
                  alt={product.name}
                  fill
                  className="object-contain rounded-md px-1 pt-8 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0"
                />
              )}
            </div>
          </Link>
          <div className="flex flex-1 flex-col px-0.5 pb-1.5 pt-2">
            <Link href={`/product/${product.slug}`}>
              <div className="min-h-10 text-[16px] font-semibold leading-tight text-slate-950 line-clamp-2">
                {product.name}
              </div>
            </Link>
            <div className="mt-2 flex items-center justify-between">
              <div className="leading-none">
                <StarRatings
                  rating={rating}
                  numberOfStars={5}
                  starDimension="16px"
                  starSpacing="1px"
                  starRatedColor="#facc15"
                  starEmptyColor="#e5e7eb"
                />
              </div>
              <span className="text-[12px] text-slate-500">
                ({product.reviewCount ?? 0})
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-2.5 pb-2.5 pt-0">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-md font-bold text-[#96C948]">
                ₹{product.basePrice}
              </span>
              {product.strikethroughPrice ? (
                <span className="text-sm font-semibold text-slate-400 line-through">
                  ₹{product.strikethroughPrice}
                </span>
              ) : null}
            </div>

            {isInCart ? (
              <div className="flex w-full items-center gap-2">
                <div className="flex h-10 flex-1 items-center justify-center rounded-md border border-slate-200 bg-gray-50 px-1">
                  <button
                    type="button"
                    onClick={() => handleDecrease(cartItem)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold">
                    {cartItem?.quantity ?? 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleIncrease(cartItem)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => handleRemove(cartItem)}
                  aria-label="Remove from cart"
                  className="h-10 w-10 rounded-md"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                disabled={isAdding || !product.isInStock}
                variant={!product.isInStock ? "outline" : "default"}
                onClick={handleClick}
                className="h-10 w-full rounded-md bg-[#02A9E5] text-[12px] font-bold uppercase tracking-wide text-white shadow-none hover:bg-[#0298cf]"
              >
                {!product.isInStock
                  ? "Out of Stock"
                  : isAdding
                    ? "Adding..."
                    : "Add to Cart"}

                {/* {!product.isInStock ? null : (
                  <ShoppingCart className="h-4 w-4" />
                )} */}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

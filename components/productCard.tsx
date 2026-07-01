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
        className="relative flex h-full flex-col gap-0 overflow-hidden rounded-md border border-[#e0e0e0] bg-white p-0 shadow-sm transition-shadow hover:shadow-md"
      > 
        <CardContent className="flex flex-1 flex-col p-0">
          <Link href={`/product/${product.slug}`} className="w-full">
            <div className={cn(`relative h-64 w-full bg-[#f9f9f9]`, className)}>
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
                className="object-cover"
              />
            </div>
          </Link>
          <div className="flex flex-1 flex-col items-start px-4 pb-4 pt-5 text-left">
            <Link href={`/product/${product.slug}`}>
              <div className="min-h-10 text-[15px] font-semibold leading-tight text-[#333] line-clamp-2">
                {product.name}
              </div>
            </Link>
            <p className="mt-2 text-[13px] font-medium text-[#4a9e22]">
              Boosts Hair Growth | Adds Strength & Shine
            </p>
            <div className="mt-1 text-[13px] text-[#333]">250ml</div>
            
            <div className="mt-1.5 flex items-center justify-start gap-1.5 text-[13px] text-[#333]">
              <span className="text-[14px] text-[#ffc107]">★</span>
              <span className="font-medium">{rating > 0 ? rating.toFixed(1) : "5.0"}</span>
              <span className="ml-1 text-[14px] font-bold text-[#00a5f5]">✓</span>
              <span>{product.reviewCount ?? 144} Reviews</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <div className="flex w-full flex-col">
            <div className="mb-4 mt-2 flex items-center justify-start gap-2 px-4">
              <span className="text-[18px] font-bold text-[#333]">
                ₹ {product.basePrice}
              </span>
              {product.strikethroughPrice ? (
                <span className="text-[16px] text-[#999] line-through">
                  ₹{product.strikethroughPrice}
                </span>
              ) : null}
              <span className="rounded-[2px] bg-[#aed581] px-1.5 py-0.5 text-[11px] font-semibold text-[#33691e]">
                30% off
              </span>
            </div>

            {isInCart ? (
              <div className="flex w-full items-center gap-2 px-2 pb-2">
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
                className="h-12 w-full rounded-none bg-[#00a5f5] text-[14px] font-semibold uppercase tracking-wide text-white shadow-none hover:bg-[#0094dd]"
              >
                {!product.isInStock
                  ? "Out of Stock"
                  : isAdding
                    ? "Adding..."
                    : "Add to Cart"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

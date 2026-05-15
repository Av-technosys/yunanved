/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { startTransition, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
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
                  starEmptyColor="#e5e7eb"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="">
          <div className="flex flex-col md:flex-row gap-2 mb-4 w-full md:items-center justify-between">
            <div className=" font-semibold text-lg">₹{product.basePrice}</div>

            {isInCart ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full border bg-gray-50 px-1 py-1">
                  <button
                    type="button"
                    onClick={() => handleDecrease(cartItem)}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-6 text-center text-sm font-semibold">
                    {cartItem?.quantity ?? 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleIncrease(cartItem)}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white"
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
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                disabled={isAdding || !product.isInStock}
                variant={!product.isInStock ? "outline" : "default"}
                onClick={handleClick}
              >
                {!product.isInStock
                  ? "Out of Stock"
                  : isAdding
                    ? "Adding..."
                    : "Add to Cart"}

                {!product.isInStock ? null : (
                  <ShoppingCart className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

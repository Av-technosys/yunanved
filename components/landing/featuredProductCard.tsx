/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Star, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAddToCart } from "@/helper/useAddToCart";
import { startTransition, useRef, useState } from "react";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import { useCartStore } from "@/store/cartStore";
import { decreaseCartItem, increaseCartItem, removeCartItem } from "@/helper";
import { toast } from "sonner";

export const FeaturedProductCard = ({ product, key }: any) => {
  const { handleAddToCart } = useAddToCart();

  const [isAdding, setIsAdding] = useState(false);
  const clickLock = useRef(false);
  const items = useCartStore((state) => state.items) || [];
  const removeItem = useCartStore((state) => state.removeItem);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);

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

  const cartItem = Array.isArray(items)
    ? items.find((i) => i.productId === product.productId)
    : undefined;
  const isInCart = Boolean(cartItem);
  const rawRating = Number(product.rating) || 0;
  const rating = rawRating >= 100 ? rawRating / 100 : rawRating;

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
        <CardContent className="p-4 bg-white border-t border-gray-100">
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
                fill={i < Math.round(rating) ? "#FFC107" : "none"}
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
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <span className="font-bold text-lg mb-2 sm:mb-0 text-black">
              ₹{product.basePrice}
            </span>

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
                onClick={addToCartHandler}
                disabled={isAdding || !product.isInStock}
                variant={!product.isInStock ? "outline" : "default"}
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
        </CardContent>
      </Card>
    </div>
  );
};

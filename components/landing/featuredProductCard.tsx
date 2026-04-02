/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { ShoppingCart, Star, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAddToCart } from "@/helper/useAddToCart";
import { startTransition, useRef, useState } from "react";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/env";
import { useCartStore } from "@/store/cartStore";
import { removeCartItem } from "@/helper";
import { toast } from "sonner";

export const FeaturedProductCard = ({ product, key, userDetails }: any) => {
  const { handleAddToCart } = useAddToCart(userDetails?.id);

  const [isAdding, setIsAdding] = useState(false);
  const clickLock = useRef(false);
  const items = useCartStore((state) => state.items) || [];
  const removeItem = useCartStore((state) => state.removeItem);
  const userId = userDetails?.id;

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

  const isInCart =
    Array.isArray(items) &&
    items.some((i) => i.productId === product.productId);

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
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <span className="font-bold text-lg mb-2 sm:mb-0 text-black">
              ₹{product.basePrice}
            </span>

            <Button
              onClick={() => {
                if (isInCart) {
                  handleRemove({
                    productId: product.productId,
                    attributes: [],
                  });
                } else {
                  addToCartHandler();
                }
              }}
              disabled={isAdding}
              variant={isInCart ? "outline" : "default"}
            >
              {isInCart ? "Remove" : isAdding ? "Adding..." : "Add to Cart"}
              {isInCart ? (
                <Undo2 className="h-4 w-4" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

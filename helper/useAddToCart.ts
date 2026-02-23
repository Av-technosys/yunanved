/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCartStore } from "@/store/cartStore";
import { useTransition } from "react";
import { addProductToUserCart } from "./cart/action";
import { toast } from "sonner";
import { tempUserId } from "@/const";

export const useAddToCart = () => {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = (product: any) => {
    addItem(product);

    startTransition(async () => {
      try {
        await addProductToUserCart(
          tempUserId,
          product.productId,
          1
        );

        toast.success(`${product.title} added to cart`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to sync cart");
        removeItem(product.productId, []);
      }
    });
  };

  return { handleAddToCart, isPending };
};
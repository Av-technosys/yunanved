"use client";

import { useCartStore } from "@/store/cartStore";
import { addProductToUserCart, getUserCart } from "./cart/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { tempUserId } from "@/const/globalconst";

export const useAddToCart = () => {
  const setCart = useCartStore((s) => s.setCart);
  const addItemOptimistic = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const router = useRouter();

  const handleAddToCart = async (product: any) => {
    addItemOptimistic(product);

    try {
      const result: { success: boolean; userIsNotLoggedIn?: boolean } =
        await addProductToUserCart(product.productId, 1);

      if (result?.userIsNotLoggedIn) {
        removeItem(product.productId, product.attributes);
        toast.warning("Please log in to add items to your cart");
        router.push("/sign-in");
        return;
      }

      if (!result?.success) {
        removeItem(product.productId, product.attributes);
        toast.error("Failed to sync cart");
        return;
      }

      const updatedCart: any = await getUserCart();
      setCart(updatedCart);

      toast.success(`${product.title} added to cart`);
    } catch (err: any) {
      console.error(err);
      removeItem(product.productId, product.attributes);
      toast.error("Failed to sync cart");
    }
  };

  return { handleAddToCart };
};

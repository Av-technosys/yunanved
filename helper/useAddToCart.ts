// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useCartStore } from "@/store/cartStore";
// import { useTransition } from "react";
// import { addProductToUserCart, getUserCart } from "./cart/action";
// import { toast } from "sonner";
// import { useClientSideUser } from "@/hooks/getClientSideUser";
// // import { tempUserId } from "@/const/globalconst";

// export const useAddToCart = () => {
//   const setCart = useCartStore((s) => s.setCart); // you need this
//   const addItemOptimistic = useCartStore((s) => s.addItem);
//   const removeItem = useCartStore((s) => s.removeItem);

//   const [isPending, startTransition] = useTransition();
//   const { userDetails } = useClientSideUser();

//   const tempUserId = userDetails?.id;

//   const handleAddToCart = (product: any) => {
//     // 1️⃣ Optimistic UI
//     addItemOptimistic(product);

//     startTransition(async () => {
//       try {
//         await addProductToUserCart(tempUserId, product.productId, 1);

//         // 🔥 Fetch authoritative cart from DB
//         const updatedCart: any = await getUserCart(tempUserId);

//         // 🔥 Replace Zustand state completely
//         setCart(updatedCart);

//         toast.success(`${product.title} added to cart`);
//       } catch (err: any) {
//         console.error(err);

//         // Rollback optimistic update
//         removeItem(product.productId, product.attributes);
//         console.error("SYNC ERROR:", err);
//         console.error("Message:", err?.message);
//         console.error("Stack:", err?.stack);

//         removeItem(product.productId, product.attributes);
//         toast.error("Failed to sync cart");
//         toast.error("Failed to sync cart");
//       }
//     });
//   };

//   return { handleAddToCart, isPending };
// };





"use client";

import { useCartStore } from "@/store/cartStore";
import { useTransition } from "react";
import { addProductToUserCart, getUserCart } from "./cart/action";
import { toast } from "sonner";
import { useClientSideUser } from "@/hooks/getClientSideUser";
import { useRouter } from "next/navigation";
// import { tempUserId } from "@/const/globalconst";

export const useAddToCart = (userId: string) => {
  const setCart = useCartStore((s) => s.setCart);
  const addItemOptimistic = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = (product: any) => {
    addItemOptimistic(product);

    startTransition(async () => {
      try {
        const result: { success: boolean; userIsNotLoggedIn?: boolean } = await addProductToUserCart(
          userId,
          product.productId,
          1
        );
        if (result?.userIsNotLoggedIn) {
          removeItem(product.productId, product.attributes); // rollback
          toast.warning("Please log in to add items to your cart");
          router.push("/sign-in");
          return;
        }
        // 🔥 Fetch authoritative cart from DB
        const updatedCart: any = await getUserCart(userId);

        // 🔥 Replace Zustand state completely
        setCart(updatedCart);

        toast.success(`${product.title} added to cart`);
      } catch (err: any) {
        console.error(err);

        removeItem(product.productId, product.attributes);

        toast.error("Failed to sync cart");
      }
    });
  };

  return { handleAddToCart, isPending };
};
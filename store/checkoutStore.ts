import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutItem {
  productId: string;
  slug: string;
  quantity: number;
  price: number;
}

interface CheckoutState {
  items: CheckoutItem[];
  total: number;
  userId: string | null;
  paymentStatus: "idle" | "processing" | "success" | "failed";

  initializeCheckout: (data: {
    items: CheckoutItem[];
    total: number;
    userId: string;
  }) => void;

  setPaymentStatus: (
    status: "idle" | "processing" | "success" | "failed"
  ) => void;

  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      userId: null,
      paymentStatus: "idle",

      initializeCheckout: ({ items, total, userId }) =>
        set({
          items,
          total,
          userId,
          paymentStatus: "idle",
        }),

      setPaymentStatus: (status) =>
        set({
          paymentStatus: status,
        }),

      clearCheckout: () =>
        set({
          items: [],
          total: 0,
          userId: null,
          paymentStatus: "idle",
        }),
    }),
    {
      name: "checkout-storage",
    }
  )
);
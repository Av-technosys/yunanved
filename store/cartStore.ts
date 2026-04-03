/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./cartTypes";

type CartState = {
  items: CartItem[];
  setCart: (items: CartItem[]) => void;
  addItem: (item: Omit<CartItem, "quantity" | "addedAt">) => void;
  removeItem: (productId: string, attributes: CartItem["attributes"]) => void;
  increase: (productId: string, attributes: CartItem["attributes"]) => void;
  decrease: (productId: string, attributes: CartItem["attributes"]) => void;
  clearCart: () => void;
  lineItems: () => number;

  totalItems: () => number;
  subtotal: () => number;
};

function normalizeAttributes(attrs?: CartItem["attributes"]) {
  return (attrs ?? []).slice().sort((a, b) =>
    JSON.stringify(a).localeCompare(JSON.stringify(b))
  );
}

function sameVariant(
  a: CartItem,
  b: { productId: string; attributes?: CartItem["attributes"] }
) {
  if (a.productId !== b.productId) return false;

  const aAttrs = normalizeAttributes(a.attributes);
  const bAttrs = normalizeAttributes(b.attributes);

  return JSON.stringify(aAttrs) === JSON.stringify(bAttrs);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const safeItems = Array.isArray(state.items) ? state.items : [];

          const existing = safeItems.find((i) => sameVariant(i, item));

          if (existing) {
            return {
              items: safeItems.map((i) =>
                sameVariant(i, item)
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [
              ...safeItems,
              { ...item, quantity: 1, addedAt: Date.now() },
            ],
          };
        }),

      removeItem: (productId, attributes) =>
        set((state) => ({
          items: (Array.isArray(state.items) ? state.items : []).filter(
            (i) => !sameVariant(i, { productId, attributes })
          ),
        })),

      increase: (productId, attributes) =>
        set((state) => ({
          items: (Array.isArray(state.items) ? state.items : []).map((i) =>
            sameVariant(i, { productId, attributes })
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decrease: (productId, attributes) =>
        set((state) => ({
          items: (Array.isArray(state.items) ? state.items : [])
            .map((i) =>
              sameVariant(i, { productId, attributes })
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      lineItems: () => get().items.length,

      clearCart: () => set({ items: [] }),

      setCart: (items) =>
        set(() => ({
          items, // 🔥 FULL REPLACE
        })),
      totalItems: () =>
        (Array.isArray(get().items) ? get().items : []).reduce((t, i) => t + i.quantity, 0),

      subtotal: () =>
        (Array.isArray(get().items) ? get().items : []).reduce((t, i) => t + i.price * i.quantity, 0),
    }),

    {
      name: "yunanved-cart",
      storage: createJSONStorage(() => localStorage),

      merge: (persistedState: any, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          items: Array.isArray(persistedState?.items)
            ? persistedState.items
            : [],
        };
      },
    }
  )
);

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartState, CartItem } from "@/types/cart";
import type { Product, ProductColor, SizeName } from "@/types/product";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, color: ProductColor, size: SizeName, quantity = 1) => {
        const itemId = `${product.id}-${color.name}-${size}`;
        const existing = get().items.find((i) => i.id === itemId);

        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
            ),
          }));
        } else {
          const newItem: CartItem = {
            id: itemId,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
          };
          set((state) => ({ items: [...state.items, newItem] }));
        }
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, i) =>
            sum + (i.product.salePrice ?? i.product.price) * i.quantity,
          0
        ),
    }),
    {
      name: "maisonotto-cart",
    }
  )
);

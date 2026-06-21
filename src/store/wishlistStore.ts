"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getTotalItems: () => number;
  clearAll: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      toggleItem: (product: Product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId: string) =>
        get().items.some((p) => p.id === productId),

      getTotalItems: () => get().items.length,

      clearAll: () => set({ items: [] }),
    }),
    {
      name: "maisonotto-wishlist",
    }
  )
);

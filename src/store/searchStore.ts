"use client";

import { create } from "zustand";
import type { Product } from "@/types/product";

interface SearchState {
  isOpen: boolean;
  query: string;
  results: Product[];
  isLoading: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  setResults: (results: Product[]) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  isOpen: false,
  query: "",
  results: [],
  isLoading: false,

  openSearch: () => {
    set({ isOpen: true });
    document.body.classList.add("modal-open");
  },

  closeSearch: () => {
    set({ isOpen: false });
    document.body.classList.remove("modal-open");
  },

  setQuery: (query: string) => set({ query }),
  setResults: (results: Product[]) => set({ results }),
  setLoading: (isLoading: boolean) => set({ isLoading }),

  reset: () => {
    set({ query: "", results: [], isLoading: false });
    document.body.classList.remove("modal-open");
  },
}));

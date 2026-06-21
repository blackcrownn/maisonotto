"use client";

import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIState>()((set, get) => ({
  isMobileMenuOpen: false,

  openMobileMenu: () => {
    set({ isMobileMenuOpen: true });
    document.body.classList.add("menu-open");
  },

  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false });
    document.body.classList.remove("menu-open");
  },

  toggleMobileMenu: () => {
    if (get().isMobileMenuOpen) {
      get().closeMobileMenu();
    } else {
      get().openMobileMenu();
    }
  },
}));

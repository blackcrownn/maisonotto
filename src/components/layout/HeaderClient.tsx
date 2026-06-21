"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSearchStore } from "@/store/searchStore";
import { useUIStore } from "@/store/uiStore";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";

export function HeaderClient() {
  const [mounted, setMounted] = useState(false);
  const totalCartItems = useCartStore((s) => s.getTotalItems());
  const totalWishlistItems = useWishlistStore((s) => s.getTotalItems());
  const openSearch = useSearchStore((s) => s.openSearch);
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-1 md:gap-2">
      {/* Search */}
      <button
        id="header-search-btn"
        onClick={openSearch}
        aria-label="Arama yap"
        className="relative flex h-10 w-10 items-center justify-center text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-muted)]"
      >
        <Search size={18} strokeWidth={1.5} />
      </button>

      {/* Wishlist */}
      <Link
        id="header-wishlist-btn"
        href="/wishlist"
        aria-label={`Favoriler (${mounted ? totalWishlistItems : 0} ürün)`}
        className="relative flex h-10 w-10 items-center justify-center text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-muted)]"
      >
        <Heart size={18} strokeWidth={1.5} />
        {mounted && totalWishlistItems > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-ink)] text-[9px] font-medium text-white">
            {totalWishlistItems > 9 ? "9+" : totalWishlistItems}
          </span>
        )}
      </Link>

      {/* Cart */}
      <Link
        id="header-cart-btn"
        href="/cart"
        aria-label={`Sepet (${mounted ? totalCartItems : 0} ürün)`}
        className="relative flex h-10 w-10 items-center justify-center text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-muted)]"
      >
        <ShoppingBag size={18} strokeWidth={1.5} />
        {mounted && totalCartItems > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-ink)] text-[9px] font-medium text-white">
            {totalCartItems > 9 ? "9+" : totalCartItems}
          </span>
        )}
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        id="header-mobile-menu-btn"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isMobileMenuOpen}
        className="flex h-10 w-10 items-center justify-center text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-muted)] md:hidden"
      >
        {isMobileMenuOpen ? (
          <X size={18} strokeWidth={1.5} />
        ) : (
          <Menu size={18} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}

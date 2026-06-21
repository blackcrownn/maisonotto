"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSearchStore } from "@/store/searchStore";
import { useUIStore } from "@/store/uiStore";
import { ShoppingBag, Heart, Search, Menu, X, User } from "lucide-react";

interface HeaderClientProps {
  transparent?: boolean;
}

export function HeaderClient({ transparent = false }: HeaderClientProps) {
  const [mounted, setMounted] = useState(false);
  const totalCartItems    = useCartStore((s) => s.getTotalItems());
  const totalWishlistItems = useWishlistStore((s) => s.getTotalItems());
  const openSearch        = useSearchStore((s) => s.openSearch);
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  useEffect(() => { setMounted(true); }, []);

  const iconClass = [
    "relative flex h-10 w-10 items-center justify-center transition-opacity duration-300 hover:opacity-50",
    transparent ? "text-white" : "text-[var(--color-ink)]",
  ].join(" ");

  return (
    <div className="flex items-center gap-0.5">
      {/* Search */}
      <button
        id="header-search-btn"
        onClick={openSearch}
        aria-label="Arama yap"
        className="header-search-bar relative flex h-10 w-10 md:w-[240px] items-center justify-center md:justify-start rounded-full px-0 md:px-4 gap-2.5 transition-all duration-300 focus:outline-none mr-1 md:mr-3"
      >
        <Search size={16} strokeWidth={1.2} className="flex-shrink-0" />
        <span className="hidden md:inline text-xs font-light tracking-wide text-neutral-500">
          Ara...
        </span>
      </button>

      {/* Account */}
      <Link
        id="header-account-btn"
        href="/account"
        aria-label="Hesabım"
        className={iconClass}
      >
        <User size={17} strokeWidth={1.2} />
      </Link>

      {/* Wishlist */}
      <Link
        id="header-wishlist-btn"
        href="/wishlist"
        aria-label={`Favoriler (${mounted ? totalWishlistItems : 0} ürün)`}
        className={iconClass}
      >
        <Heart size={17} strokeWidth={1.2} />
        {mounted && totalWishlistItems > 0 && (
          <span
            className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-medium"
            style={{ backgroundColor: transparent ? "#fff" : "#0d0d0d", color: transparent ? "#0d0d0d" : "#fff" }}
          >
            {totalWishlistItems > 9 ? "9+" : totalWishlistItems}
          </span>
        )}
      </Link>

      {/* Cart */}
      <Link
        id="header-cart-btn"
        href="/cart"
        aria-label={`Sepet (${mounted ? totalCartItems : 0} ürün)`}
        className={iconClass}
      >
        <ShoppingBag size={17} strokeWidth={1.2} />
        {mounted && totalCartItems > 0 && (
          <span
            className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-medium"
            style={{ backgroundColor: transparent ? "#fff" : "#0d0d0d", color: transparent ? "#0d0d0d" : "#fff" }}
          >
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
        className={`${iconClass} md:hidden`}
      >
        {isMobileMenuOpen
          ? <X size={17} strokeWidth={1.2} />
          : <Menu size={17} strokeWidth={1.2} />
        }
      </button>
    </div>
  );
}

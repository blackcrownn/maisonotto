"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSearchStore } from "@/store/searchStore";
import { useUIStore } from "@/store/uiStore";
import { SearchModal } from "@/components/layout/SearchModal";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function HomeClient() {
  const [mounted, setMounted] = useState(false);
  const totalCartItems = useCartStore((s) => s.getTotalItems());
  const totalWishlistItems = useWishlistStore((s) => s.getTotalItems());
  const openSearch = useSearchStore((s) => s.openSearch);
  const { toggleMobileMenu } = useUIStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const navContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const navItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-stone-100 font-sans text-black">
      {/* Background Lookbook Image */}
      <div className="absolute inset-0 -z-10 h-full w-full select-none pointer-events-none">
        <Image
          src="/images/hero-bg.png"
          alt="MAISON OTTO SS25 Collection"
          fill
          priority
          quality={95}
          className="object-cover object-center"
        />
        {/* Subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 md:p-12">
        {/* Top Header Bar */}
        <header className="flex w-full items-start justify-between">
          {/* Mobile Hamburger menu on left, hidden on desktop */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-black/10 text-black shadow-sm backdrop-blur-md hover:bg-white transition-all duration-200 active:scale-95"
              aria-label="Menüyü Aç"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Desktop Left Spacer */}
          <div className="hidden lg:block w-48" />

          {/* Center Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center select-none"
          >
            <Link href="/" className="group flex flex-col items-center">
              <span className="font-sans text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.25em] text-black transition-transform duration-300 group-hover:scale-102">
                OTTO
              </span>
              <span className="text-[9px] md:text-[11px] tracking-[0.35em] font-semibold text-black/60 pl-[0.35em] mt-0.5">
                MAISON
              </span>
            </Link>
          </motion.div>

          {/* Right Tools Bar */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Pill */}
            <button
              onClick={openSearch}
              className="group relative flex items-center h-10 px-3 md:px-4 rounded-full border border-black/10 bg-white/80 shadow-sm backdrop-blur-md cursor-pointer hover:bg-white hover:border-black/20 transition-all duration-300 w-10 md:w-48 lg:w-56"
              aria-label="Arama yap"
            >
              <Search size={16} className="text-black/50 md:mr-2 flex-shrink-0 group-hover:text-black transition-colors" />
              <span className="hidden md:inline text-xs text-black/40 font-medium group-hover:text-black/60 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                Arama yap...
              </span>
            </button>

            {/* Profile */}
            <button
              onClick={() => alert("Profil modülü çok yakında!")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-black/10 shadow-sm backdrop-blur-md text-black hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Kullanıcı Profili"
            >
              <User size={18} strokeWidth={1.5} />
            </button>

            {/* Favorites (Wishlist) */}
            <Link
              href="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-black/10 shadow-sm backdrop-blur-md text-black hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label={`Favorilerim (${mounted ? totalWishlistItems : 0})`}
            >
              <Heart size={18} strokeWidth={1.5} />
              {mounted && totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white shadow-sm">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-black/10 shadow-sm backdrop-blur-md text-black hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label={`Sepetim (${mounted ? totalCartItems : 0})`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {mounted && totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white shadow-sm">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Desktop Left Vertical Menu Navigation */}
        <motion.div
          variants={navContainer}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col justify-between h-[360px] z-20 py-2"
        >
          {/* Top Links */}
          <div className="flex flex-col gap-6">
            <motion.div variants={navItem}>
              <Link
                href="/about"
                className="group inline-flex flex-col text-sm font-bold tracking-[0.25em] text-black/80 hover:text-black transition-all duration-300"
              >
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  OTTO ATELIER
                </span>
              </Link>
            </motion.div>

            <motion.div variants={navItem}>
              <Link
                href="/collections/ss25"
                className="group inline-flex flex-col text-sm font-bold tracking-[0.25em] text-black/80 hover:text-black transition-all duration-300"
              >
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  KOLEKSİYONLAR
                </span>
              </Link>
            </motion.div>

            <motion.div variants={navItem}>
              <Link
                href="/men"
                className="group inline-flex flex-col text-sm font-bold tracking-[0.25em] text-black/80 hover:text-black transition-all duration-300"
              >
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  ERKEK
                </span>
              </Link>
            </motion.div>

            <motion.div variants={navItem}>
              <Link
                href="/men"
                onClick={(e) => {
                  // Women category is mock only in this men clothing brand
                  e.preventDefault();
                  alert("Kadın koleksiyonu çok yakında sizlerle!");
                }}
                className="group inline-flex flex-col text-sm font-bold tracking-[0.25em] text-black/40 hover:text-black transition-all duration-300"
              >
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  KADIN
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Social Tagline Info */}
          <motion.div variants={navItem} className="flex flex-col mt-8 select-none">
            <span className="font-serif italic text-xs text-black/60">
              Love for Otto 💜
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-black/80 mt-1 pl-[0.1em]">
              #ottoculture
            </span>
          </motion.div>
        </motion.div>

        {/* Visual focal element for bottom content / footer alignment */}
        <footer className="w-full flex items-end justify-between text-[10px] tracking-[0.15em] font-medium text-black/40 uppercase">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="hidden md:block"
          >
            © {new Date().getFullYear()} MAISON OTTO. Tüm Hakları Saklıdır.
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex gap-6 mx-auto md:mx-0 font-semibold"
          >
            <Link href="/privacy" className="hover:text-black transition-colors">GİZLİLİK</Link>
            <Link href="/terms" className="hover:text-black transition-colors">KULLANIM KOŞULLARI</Link>
            <Link href="/contact" className="hover:text-black transition-colors">İLETİŞİM</Link>
          </motion.div>
        </footer>
      </div>

      {/* Global Modals rendered on Homepage */}
      <SearchModal />
      <MobileMenu />
    </div>
  );
}

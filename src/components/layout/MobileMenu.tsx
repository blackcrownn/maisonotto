"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { mainNavLinks } from "@/constants/navigation";
import { X } from "lucide-react";

const secondaryLinks = [
  { label: "Hakkımızda", href: "/about" },
  { label: "İletişim", href: "/contact" },
  { label: "Boyut Rehberi", href: "/size-guide" },
  { label: "Kargo & İade", href: "/shipping" },
];

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMobileMenu]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            className="overlay md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer — slides from right, full height, white */}
          <motion.nav
            key="mobile-drawer"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasyon menüsü"
            className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col bg-white md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-light)]">
              <span className="font-serif text-xs font-light tracking-[0.3em] text-[var(--color-ink)]">
                MAISON OTTO
              </span>
              <button
                onClick={closeMobileMenu}
                aria-label="Menüyü kapat"
                className="flex h-8 w-8 items-center justify-center text-[var(--color-ink)] hover:opacity-50 transition-opacity"
              >
                <X size={16} strokeWidth={1.2} />
              </button>
            </div>

            {/* Main nav links */}
            <ul className="flex flex-col px-6 pt-10 pb-6 gap-0">
              {mainNavLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.07, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block py-4 font-serif text-3xl font-light text-[var(--color-ink)] hover:text-[var(--color-muted)] transition-colors duration-200 border-b border-[var(--border-light)] last:border-none"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Secondary links */}
            <div className="mt-auto px-6 pb-8 border-t border-[var(--border-light)] pt-6">
              <div className="flex flex-col gap-4">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-[11px] font-light tracking-[0.15em] uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

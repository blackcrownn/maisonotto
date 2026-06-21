"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { mainNavLinks } from "@/constants/navigation";
import { X } from "lucide-react";

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  // Close on route change / Escape key
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
            transition={{ duration: 0.25 }}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            key="mobile-drawer"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasyon menüsü"
            className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[90vw] flex-col bg-[var(--color-white)] md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-light)] px-6 py-5">
              <span className="text-label text-[var(--color-ink)]">Menü</span>
              <button
                onClick={closeMobileMenu}
                aria-label="Menüyü kapat"
                className="flex h-8 w-8 items-center justify-center text-[var(--color-ink)]"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav Links */}
            <ul className="flex flex-col px-6 py-8 gap-1">
              {mainNavLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block py-3 font-serif text-2xl font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-muted)]"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Footer links */}
            <div className="mt-auto border-t border-[var(--border-light)] px-6 py-6">
              <div className="flex flex-col gap-3">
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="text-caption text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  Hakkımızda
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="text-caption text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  İletişim
                </Link>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

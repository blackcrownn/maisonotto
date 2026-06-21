"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderClient } from "./HeaderClient";
import { MobileMenu } from "./MobileMenu";
import { SearchModal } from "./SearchModal";
import { mainNavLinks } from "@/constants/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-30 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[var(--border-light)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
        style={{ height: "var(--header-height)" }}
      >
        <div className="container-site flex h-full items-center justify-between">

          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-10">
            <Link
              href="/"
              id="header-logo"
              aria-label="MAISON OTTO Ana Sayfa"
              className="flex-shrink-0 group"
            >
              <span
                className={[
                  "font-serif text-base font-light tracking-[0.3em] transition-colors duration-300",
                  scrolled || !isHome
                    ? "text-[var(--color-ink)]"
                    : "text-white",
                ].join(" ")}
              >
                MAISON OTTO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Ana navigasyon" className="hidden md:flex">
              <ul className="flex items-center gap-8">
                {mainNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        "text-label transition-opacity duration-300 hover:opacity-60",
                        scrolled || !isHome ? "text-[var(--color-ink)]" : "text-white",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Icons */}
          <HeaderClient transparent={!scrolled && isHome} />
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Search Modal */}
      <SearchModal />

      {/* Spacer — only on non-home pages (home hero handles spacing itself) */}
      {!isHome && (
        <div style={{ height: "var(--header-height)" }} aria-hidden="true" />
      )}
    </>
  );
}

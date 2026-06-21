import Link from "next/link";
import { HeaderClient } from "./HeaderClient";
import { MobileMenu } from "./MobileMenu";
import { SearchModal } from "./SearchModal";
import { mainNavLinks } from "@/constants/navigation";

export function Header() {
  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 border-b border-[var(--border-light)] bg-[var(--color-white)]"
        style={{ height: "var(--header-height)" }}
      >
        <div className="container-site flex h-full items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            id="header-logo"
            aria-label="MAISON OTTO Ana Sayfa"
            className="flex-shrink-0"
          >
            <span className="font-serif text-xl font-medium tracking-[0.12em] text-[var(--color-ink)]">
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
                    className="text-label text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-muted)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons (cart, wishlist, search, mobile toggle) */}
          <HeaderClient />
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Search Modal */}
      <SearchModal />

      {/* Spacer to offset fixed header */}
      <div style={{ height: "var(--header-height)" }} aria-hidden="true" />
    </>
  );
}

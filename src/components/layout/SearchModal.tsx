"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchStore } from "@/store/searchStore";
import { searchService } from "@/services/searchService";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PriceDisplay } from "../ui/PriceDisplay";

export function SearchModal() {
  const {
    isOpen,
    query,
    results,
    isLoading,
    closeSearch,
    setQuery,
    setResults,
    setLoading,
    reset,
  } = useSearchStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = await searchService.search(query);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, setResults, setLoading]);

  // Focus input when opened & setup key listeners
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, closeSearch]);

  const handleLinkClick = () => {
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Ürün Arama">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-10%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            ref={modalRef}
            className="relative mx-auto w-full border-b border-[var(--border-light)] bg-white px-6 py-8 md:px-12 md:py-12"
          >
            <div className="mx-auto max-w-3xl">
              {/* Top Search Input row */}
              <div className="flex items-center justify-between border-b border-[var(--border-strong)] pb-4">
                <div className="flex flex-1 items-center gap-4">
                  <Search size={20} className="text-[var(--color-muted)]" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ürün veya kategori arayın..."
                    className="w-full bg-transparent font-sans text-base text-[var(--color-ink)] placeholder:text-stone-400 focus:outline-none md:text-lg"
                  />
                  {isLoading && (
                    <Loader2 size={18} className="animate-spin text-[var(--color-muted)]" />
                  )}
                </div>
                <button
                  onClick={closeSearch}
                  aria-label="Aramayı kapat"
                  className="flex h-10 w-10 items-center justify-center text-[var(--color-ink)] transition-colors hover:text-[var(--color-muted)]"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Search Results Area */}
              <div className="mt-8 max-h-[60vh] overflow-y-auto pr-2">
                {query.trim() === "" ? (
                  <div className="py-8 text-center">
                    <p className="text-caption text-stone-400">
                      Aramaya başlamak için bir kelime girin.
                    </p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="grid gap-6">
                    <h3 className="text-label text-[var(--color-muted)] mb-2">Arama Sonuçları</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={handleLinkClick}
                          className="flex gap-4 border border-[var(--border-light)] p-3 transition-colors hover:bg-[var(--color-off-white)]"
                        >
                          <div className="relative h-20 w-16 flex-shrink-0">
                            <ImageWithFallback
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-serif text-sm font-medium text-[var(--color-ink)] leading-snug">
                              {product.name}
                            </h4>
                            <p className="text-[11px] font-sans text-[var(--color-muted)] uppercase tracking-wider mt-0.5">
                              {product.category}
                            </p>
                            <PriceDisplay
                              price={product.price}
                              salePrice={product.salePrice}
                              size="sm"
                              className="mt-1"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  !isLoading && (
                    <div className="py-12 text-center">
                      <p className="font-serif text-sm text-[var(--color-ink)]">
                        Aradığınız kriterlerde bir ürün bulunamadı.
                      </p>
                      <p className="text-caption text-stone-400 mt-2">
                        Farklı bir arama kelimesi denemeyi veya ana sayfamızı incelemeyi unutmayın.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchStore } from "@/store/searchStore";
import { searchService } from "@/services/searchService";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PriceDisplay } from "../ui/PriceDisplay";

const QUICK_SEARCHES = ["Kaban", "Ceket", "Pantolon", "Gömlek"];

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
  const router = useRouter();

  const handleSubmit = () => {
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    closeSearch();
  };

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchService.search(query);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, setResults, setLoading]);

  // Focus & body lock
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, closeSearch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeSearch}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* Panel — slides down from top */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Ürün Arama"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 51,
              background: "#ffffff",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            }}
          >
            {/* Input row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "0 40px",
                height: "76px",
                borderBottom: "1px solid #ebebeb",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              <Search
                size={20}
                strokeWidth={1.5}
                style={{ color: "#aaa", flexShrink: 0 }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ne arıyorsunuz?"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  fontSize: "18px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "#0d0d0d",
                  letterSpacing: "0.01em",
                  padding: 0,
                }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              />
              {isLoading && (
                <Loader2
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: "#bbb", flexShrink: 0, animation: "spin 1s linear infinite" }}
                />
              )}
              <button
                onClick={closeSearch}
                aria-label="Kapat"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "#888",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "32px 40px 40px",
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {/* Empty state */}
              {query.trim() === "" && (
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#bbb",
                      marginBottom: "16px",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Hızlı Arama
                  </p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {QUICK_SEARCHES.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        style={{
                          padding: "8px 20px",
                          fontSize: "13px",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 300,
                          color: "#333",
                          background: "#f5f5f5",
                          border: "none",
                          cursor: "pointer",
                          letterSpacing: "0.03em",
                          transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#0d0d0d";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#f5f5f5";
                          e.currentTarget.style.color = "#333";
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {query.trim() !== "" && results.length > 0 && (
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#bbb",
                      marginBottom: "20px",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {results.length} Sonuç
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={reset}
                        style={{ display: "block", textDecoration: "none" }}
                      >
                        <div
                          style={{
                            position: "relative",
                            aspectRatio: "3/4",
                            background: "#f7f7f7",
                            overflow: "hidden",
                            marginBottom: "12px",
                          }}
                        >
                          <ImageWithFallback
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="240px"
                            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                            onMouseEnter={(e) =>
                              ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")
                            }
                            onMouseLeave={(e) =>
                              ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
                            }
                          />
                        </div>
                        <p
                          style={{
                            fontSize: "13px",
                            fontFamily: "var(--font-sans)",
                            fontWeight: 300,
                            color: "#0d0d0d",
                            marginBottom: "4px",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {product.name}
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-sans)",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#aaa",
                            marginBottom: "4px",
                          }}
                        >
                          {product.category}
                        </p>
                        <PriceDisplay
                          price={product.price}
                          salePrice={product.salePrice}
                          size="sm"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {query.trim() !== "" && !isLoading && results.length === 0 && (
                <div style={{ paddingTop: "24px" }}>
                  <p
                    style={{
                      fontSize: "15px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      color: "#555",
                      marginBottom: "8px",
                    }}
                  >
                    &ldquo;{query}&rdquo; için sonuç bulunamadı.
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      color: "#aaa",
                    }}
                  >
                    Farklı bir kelime deneyin veya yukarıdaki kategorilere göz atın.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

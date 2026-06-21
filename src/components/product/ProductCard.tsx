"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types/product";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { items: wishlistItems, addItem, removeItem } = useWishlistStore();

  const isFavorite = wishlistItems.some((item) => item.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const hasDiscount = product.salePrice !== undefined && product.salePrice < product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("group relative flex flex-col", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image — borderless, full-bleed */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden bg-[var(--color-stone-50)]"
        style={{ aspectRatio: "3/4" }}
      >
        <ImageWithFallback
          src={
            isHovered && product.images[1]
              ? product.images[1]
              : product.images[0]
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]"
          priority={priority ?? product.isFeatured}
        />

        {/* Badges — minimal, top-left */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-white text-[var(--color-ink)] text-[8px] font-medium tracking-[0.15em] uppercase px-2 py-0.5">
              YENİ
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[var(--color-ink)] text-white text-[8px] font-medium tracking-[0.15em] uppercase px-2 py-0.5">
              İNDİRİM
            </span>
          )}
        </div>

        {/* Wishlist button — appears on hover */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorite ? "Favorilerimden çıkar" : "Favorilerime ekle"}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-white/90 backdrop-blur-sm text-[var(--color-ink)] opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white active:scale-95"
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            className={cn(
              "transition-colors duration-200",
              isFavorite
                ? "fill-[var(--color-ink)] text-[var(--color-ink)]"
                : "text-[var(--color-ink)]"
            )}
          />
        </button>
      </Link>

      {/* Info area — ultra-minimal */}
      <div className="pt-4 flex flex-col gap-1">
        <Link
          href={`/product/${product.slug}`}
          className="font-serif text-sm font-light text-[var(--color-ink)] hover:text-[var(--color-muted)] transition-colors leading-snug"
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xs font-light text-[var(--color-ink)]">
                  ₺{product.salePrice?.toLocaleString("tr-TR")}
                </span>
                <span className="text-[10px] font-light text-[var(--color-muted)] line-through">
                  ₺{product.price.toLocaleString("tr-TR")}
                </span>
              </>
            ) : (
              <span className="text-xs font-light text-[var(--color-ink)]">
                ₺{product.price.toLocaleString("tr-TR")}
              </span>
            )}
          </div>

          {/* Color count — only if >1 */}
          {product.colors.length > 1 && (
            <span className="text-[9px] font-sans text-[var(--color-muted)] tracking-widest uppercase">
              {product.colors.length} Renk
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

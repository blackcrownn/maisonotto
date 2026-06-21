"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types/product";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PriceDisplay } from "../ui/PriceDisplay";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
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
  const showBadge = product.isNew || hasDiscount;

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white border border-[var(--border-light)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-[var(--color-stone-50)]"
      >
        <ImageWithFallback
          src={
            isHovered && product.images[1]
              ? product.images[1]
              : product.images[0]
          }
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
          priority={product.isFeatured}
        />

        {/* Badges */}
        {showBadge && (
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="primary">Yeni</Badge>}
            {hasDiscount && <Badge variant="sale">İndirim</Badge>}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorite ? "Favorilerimden çıkar" : "Favorilerime ekle"}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-white/90 backdrop-blur-xs text-[var(--color-ink)] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white active:scale-95 rounded-none"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={cn(
              "transition-colors",
              isFavorite ? "fill-[var(--color-ink)] text-[var(--color-ink)]" : "text-[var(--color-ink)]"
            )}
          />
        </button>
      </Link>

      {/* Info Area */}
      <div className="flex flex-col p-4 flex-grow">
        <span className="text-[10px] font-sans text-[var(--color-muted)] uppercase tracking-widest mb-1">
          {product.category}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="font-serif text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-muted)] transition-colors leading-tight mb-2 flex-grow"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between mt-auto">
          <PriceDisplay
            price={product.price}
            salePrice={product.salePrice}
            size="sm"
          />
          {product.colors.length > 1 && (
            <span className="text-[10px] font-sans text-[var(--color-muted)] tracking-wider">
              {product.colors.length} Renk
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

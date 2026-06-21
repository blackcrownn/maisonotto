"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, X, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types/product";

function WishlistCard({ product }: { product: Product }) {
  const { removeItem } = useWishlistStore();
  const { addItem: addToCart, items: cartItems } = useCartStore();
  const { addToast } = useToastStore();

  const isInCart = cartItems.some((i) => i.product.id === product.id);
  const firstAvailableColor = product.colors[0];
  const firstAvailableSize = product.sizes.find((s) => s.available)?.name;

  const handleRemoveFromWishlist = () => {
    removeItem(product.id);
    addToast({
      type: "info",
      message: "Favorilerden çıkarıldı",
      description: product.name,
    });
  };

  const handleAddToCart = () => {
    if (!firstAvailableSize) {
      addToast({ type: "error", message: "Stok bulunmuyor", description: product.name });
      return;
    }
    addToCart(product, firstAvailableColor, firstAvailableSize, 1);
    addToast({
      type: "cart",
      message: "Sepete eklendi",
      description: `${product.name} · ${firstAvailableSize}`,
    });
  };

  const hasDiscount = product.salePrice !== undefined && product.salePrice < product.price;

  return (
    <div className="group relative bg-white border border-[var(--border-light)] flex flex-col">
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-[var(--color-stone-50)]"
      >
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="primary">Yeni</Badge>}
          {hasDiscount && <Badge variant="sale">İndirim</Badge>}
          {!product.inStock && <Badge variant="secondary">Tükendi</Badge>}
        </div>

        {/* Remove from wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRemoveFromWishlist();
          }}
          aria-label={`${product.name} favorilerden çıkar`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-white/90 backdrop-blur-xs text-[var(--color-ink)] shadow-sm hover:bg-white transition-all rounded-none"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className="fill-[var(--color-ink)] text-[var(--color-ink)]"
          />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col p-4 flex-grow">
        <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-0.5">
          {product.category}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="font-serif text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-muted)] transition-colors leading-tight mb-3 flex-grow"
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between mb-3">
          <PriceDisplay price={product.price} salePrice={product.salePrice} size="sm" />
          {product.colors.length > 1 && (
            <span className="font-sans text-[10px] text-[var(--color-muted)] tracking-wider">
              {product.colors.length} Renk
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isInCart}
          aria-label={isInCart ? "Sepette mevcut" : `${product.name} sepete ekle`}
          className="flex w-full items-center justify-center gap-2 border border-[var(--color-ink)] bg-transparent px-4 py-2.5 font-sans text-[10px] uppercase tracking-widest text-[var(--color-ink)] transition-all hover:bg-[var(--color-ink)] hover:text-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingBag size={13} strokeWidth={1.5} />
          {isInCart ? "Sepette" : !product.inStock ? "Stok Yok" : "Sepete Ekle"}
        </button>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, clearAll } = useWishlistStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClearAll = () => {
    clearAll();
    addToast({ type: "info", message: "Tüm favoriler temizlendi" });
  };

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="skeleton h-8 w-48 rounded" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      <div className="container-site py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-8 flex items-baseline justify-between border-b border-[var(--border-light)] pb-6">
          <h1 className="font-serif text-2xl font-medium text-[var(--color-ink)] md:text-3xl">
            Favorilerim
            {items.length > 0 && (
              <span className="ml-3 font-sans text-sm font-normal text-[var(--color-muted)]">
                ({items.length} ürün)
              </span>
            )}
          </h1>
          {items.length > 0 && (
            <button
              onClick={handleClearAll}
              className="font-sans text-xs text-[var(--color-muted)] underline-offset-2 hover:underline transition-all"
            >
              Tümünü Temizle
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center border border-[var(--border-base)]">
              <Heart size={32} strokeWidth={1} className="text-[var(--color-muted)]" />
            </div>
            <h2 className="font-serif text-xl font-medium text-[var(--color-ink)] mb-2">
              Favori listeniz boş
            </h2>
            <p className="font-sans text-sm text-[var(--color-muted)] mb-8 max-w-sm">
              Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilerinize ekleyin.
            </p>
            <Link
              href="/collections/ss25"
              className="inline-flex items-center justify-center font-sans text-label transition-all duration-200 bg-[var(--color-ink)] text-[var(--color-white)] hover:bg-neutral-800 active:bg-neutral-900 px-8 py-3.5 text-xs tracking-[0.15em]"
            >
              Koleksiyonu Keşfet
            </Link>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-px bg-[var(--border-light)] md:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <WishlistCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="font-sans text-sm text-[var(--color-muted)]">
                Tüm favorilerinizi sepetinize eklemek ister misiniz?
              </p>
              <Link
                href="/collections/ss25"
                className="font-sans text-xs uppercase tracking-widest text-[var(--color-muted)] underline-offset-4 hover:underline hover:text-[var(--color-ink)] transition-colors"
              >
                Daha Fazla Keşfet
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

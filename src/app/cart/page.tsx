"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemove = (itemId: string, productName: string) => {
    removeItem(itemId);
    addToast({
      type: "info",
      message: "Ürün sepetten çıkarıldı",
      description: productName,
    });
  };

  const handleClearCart = () => {
    clearCart();
    addToast({
      type: "info",
      message: "Sepet temizlendi",
    });
  };

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="skeleton h-8 w-48 rounded" />
      </main>
    );
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const shippingThreshold = 3000;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - totalPrice);
  const shippingProgress = Math.min(100, (totalPrice / shippingThreshold) * 100);

  return (
    <main className="min-h-screen bg-[var(--color-off-white)]">
      <div className="container-site py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-8 flex items-baseline justify-between border-b border-[var(--border-light)] pb-6">
          <h1 className="font-serif text-2xl font-medium text-[var(--color-ink)] md:text-3xl">
            Sepetim
            {totalItems > 0 && (
              <span className="ml-3 font-sans text-sm font-normal text-[var(--color-muted)]">
                ({totalItems} ürün)
              </span>
            )}
          </h1>
          {totalItems > 0 && (
            <button
              onClick={handleClearCart}
              className="font-sans text-xs text-[var(--color-muted)] underline-offset-2 hover:underline transition-all"
            >
              Sepeti Temizle
            </button>
          )}
        </div>

        {totalItems === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center border border-[var(--border-base)]">
              <ShoppingBag size={32} strokeWidth={1} className="text-[var(--color-muted)]" />
            </div>
            <h2 className="font-serif text-xl font-medium text-[var(--color-ink)] mb-2">
              Sepetiniz boş
            </h2>
            <p className="font-sans text-sm text-[var(--color-muted)] mb-8 max-w-sm">
              Koleksiyonumuzu keşfedin ve beğendiğiniz ürünleri sepetinize ekleyin.
            </p>
            <Link
              href="/collections/ss25"
              className="inline-flex items-center justify-center font-sans text-label transition-all duration-200 bg-[var(--color-ink)] text-[var(--color-white)] hover:bg-neutral-800 active:bg-neutral-900 px-8 py-3.5 text-xs tracking-[0.15em]"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            {/* Cart Items */}
            <div className="space-y-0 border border-[var(--border-light)] bg-white divide-y divide-[var(--border-light)]">
              {items.map((item) => {
                const displayPrice = item.product.salePrice ?? item.product.price;
                const lineTotal = displayPrice * item.quantity;

                return (
                  <div key={item.id} className="flex gap-4 p-4 md:p-5">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="relative h-28 w-20 shrink-0 overflow-hidden bg-[var(--color-stone-50)] md:h-36 md:w-24"
                    >
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="block font-sans text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-0.5">
                            {item.product.category}
                          </span>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-serif text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-muted)] transition-colors leading-tight block"
                          >
                            {item.product.name}
                          </Link>
                          <div className="mt-1.5 flex flex-wrap gap-3">
                            <span className="font-sans text-xs text-[var(--color-muted)]">
                              Renk: {item.selectedColor.label}
                            </span>
                            <span className="font-sans text-xs text-[var(--color-muted)]">
                              Beden: {item.selectedSize}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item.id, item.product.name)}
                          aria-label={`${item.product.name} ürününü sepetten çıkar`}
                          className="shrink-0 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                        >
                          <X size={16} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-[var(--border-base)]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Adet azalt"
                            className="flex h-8 w-8 items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-stone-50)] transition-colors"
                          >
                            <Minus size={12} strokeWidth={2} />
                          </button>
                          <span className="flex h-8 w-10 items-center justify-center border-x border-[var(--border-base)] font-sans text-xs font-medium text-[var(--color-ink)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Adet artır"
                            className="flex h-8 w-8 items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-stone-50)] transition-colors"
                          >
                            <Plus size={12} strokeWidth={2} />
                          </button>
                        </div>

                        {/* Line price */}
                        <div className="text-right">
                          <span className="block font-sans text-sm font-medium text-[var(--color-ink)]">
                            {formatPrice(lineTotal)}
                          </span>
                          {item.product.salePrice && (
                            <span className="block font-sans text-[10px] text-[var(--color-muted)] line-through">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="border border-[var(--border-light)] bg-white p-6">
                <h2 className="font-serif text-lg font-medium text-[var(--color-ink)] mb-5">
                  Sipariş Özeti
                </h2>

                {/* Free Shipping Progress */}
                {remainingForFreeShipping > 0 ? (
                  <div className="mb-5 rounded-none border border-[var(--border-light)] bg-[var(--color-off-white)] p-3">
                    <p className="font-sans text-[11px] text-[var(--color-muted)] mb-2 leading-snug">
                      Ücretsiz kargo için{" "}
                      <span className="font-semibold text-[var(--color-ink)]">
                        {formatPrice(remainingForFreeShipping)}
                      </span>{" "}
                      daha ekleyin
                    </p>
                    <div className="h-0.5 bg-[var(--border-light)]">
                      <div
                        className="h-full bg-[var(--color-ink)] transition-all duration-500"
                        style={{ width: `${shippingProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-5 rounded-none border border-[var(--border-light)] bg-[var(--color-stone-50)] p-3">
                    <p className="font-sans text-[11px] text-[var(--color-ink)] font-medium">
                      ✓ Ücretsiz kargo hakkı kazandınız!
                    </p>
                  </div>
                )}

                <div className="space-y-3 border-t border-[var(--border-light)] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-[var(--color-muted)]">Ara Toplam</span>
                    <span className="font-sans text-xs text-[var(--color-ink)]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-[var(--color-muted)]">Kargo</span>
                    <span className="font-sans text-xs text-[var(--color-ink)]">
                      {remainingForFreeShipping === 0 ? "Ücretsiz" : formatPrice(150)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--border-light)] pt-3">
                    <span className="font-sans text-sm font-medium text-[var(--color-ink)]">Toplam</span>
                    <span className="font-serif text-lg font-medium text-[var(--color-ink)]">
                      {formatPrice(totalPrice + (remainingForFreeShipping === 0 ? 0 : 150))}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="full"
                  className="mt-6"
                  onClick={() =>
                    addToast({ type: "info", message: "Ödeme sayfası yakında aktif olacak." })
                  }
                >
                  <span>Ödemeye Geç</span>
                  <ArrowRight size={14} strokeWidth={1.5} className="ml-2" />
                </Button>

                <Link
                  href="/collections/ss25"
                  className="mt-3 flex items-center justify-center gap-1 font-sans text-[11px] uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                >
                  Alışverişe Devam Et
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="border border-[var(--border-light)] bg-white divide-y divide-[var(--border-light)]">
                {[
                  { label: "Güvenli Ödeme", sub: "256-bit SSL şifreli" },
                  { label: "Ücretsiz İade", sub: "30 gün içinde iade" },
                  { label: "Hızlı Teslimat", sub: "1–3 iş günü" },
                ].map(({ label, sub }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-ink)]" />
                    <div>
                      <p className="font-sans text-[11px] font-medium text-[var(--color-ink)]">{label}</p>
                      <p className="font-sans text-[10px] text-[var(--color-muted)]">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product, ProductColor, SizeName } from "@/types/product";
import { PriceDisplay } from "../ui/PriceDisplay";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<SizeName | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const addItemToCart = useCartStore((s) => s.addItem);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  const isFavorite = wishlistItems.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const incrementQty = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrementQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    setErrorMsg("");
    if (!selectedSize) {
      setErrorMsg("Lütfen bir beden seçin.");
      return;
    }

    addItemToCart(product, selectedColor, selectedSize, quantity);
    setShowSuccessToast(true);
    setQuantity(1);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col">
      {/* Category & Title */}
      <span className="text-[10px] font-sans text-[var(--color-muted)] uppercase tracking-widest mb-2 select-none">
        {product.category}
      </span>
      <h1 className="text-title font-serif font-light text-[var(--color-ink)] mb-4">
        {product.name}
      </h1>

      {/* Price */}
      <div className="mb-6">
        <PriceDisplay price={product.price} salePrice={product.salePrice} size="lg" />
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border-light)] w-full mb-6" />

      {/* Description */}
      <p className="text-caption text-sm leading-relaxed mb-6 font-light">
        {product.description}
      </p>

      {/* Color Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-label text-[var(--color-ink)] select-none">Renk</span>
          <span className="font-light text-[var(--color-muted)]">{selectedColor.label}</span>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color) => {
            const isColorSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "h-8 w-8 border border-black/10 transition-all",
                  isColorSelected && "ring-1 ring-[var(--color-ink)] ring-offset-2"
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={`Renk seç: ${color.label}`}
              />
            );
          })}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-label text-[var(--color-ink)] select-none">Beden</span>
          {errorMsg && <span className="text-red-500 text-xs font-light">{errorMsg}</span>}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((size) => {
            const isSizeSelected = selectedSize === size.name;
            const isAvailable = size.available;

            return (
              <button
                key={size.name}
                disabled={!isAvailable}
                onClick={() => {
                  setSelectedSize(size.name);
                  if (errorMsg) setErrorMsg("");
                }}
                className={cn(
                  "relative flex h-11 items-center justify-center border text-xs font-light transition-all",
                  isSizeSelected
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white font-medium"
                    : isAvailable
                    ? "border-[var(--border-base)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                    : "border-[var(--border-light)] text-[var(--color-stone-300)] cursor-not-allowed select-none bg-stone-50"
                )}
              >
                {size.name}
                {!isAvailable && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-[120%] h-px bg-[var(--color-stone-200)] -rotate-45 block" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Quantity Selector */}
        <div className="flex items-center gap-3">
          <span className="text-label text-[var(--color-ink)] select-none mr-2">Adet</span>
          <div className="flex items-center border border-[var(--border-base)] h-11 bg-white">
            <button
              onClick={decrementQty}
              aria-label="Adeti azalt"
              className="flex h-full w-10 items-center justify-center text-[var(--color-ink)] hover:bg-stone-50 active:bg-stone-100 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-10 text-center text-xs font-light select-none">
              {quantity}
            </span>
            <button
              onClick={incrementQty}
              aria-label="Adeti arttır"
              className="flex h-full w-10 items-center justify-center text-[var(--color-ink)] hover:bg-stone-50 active:bg-stone-100 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex gap-3 mt-2">
          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            variant="primary"
            className="flex-1 flex items-center justify-center gap-2.5 h-12"
          >
            <ShoppingBag size={15} />
            Sepete Ekle
          </Button>

          {/* Add to Favorites */}
          <Button
            onClick={handleWishlistToggle}
            variant="outline"
            className={cn(
              "w-12 h-12 p-0 flex items-center justify-center border transition-colors",
              isFavorite
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white hover:bg-stone-900"
                : "border-[var(--border-base)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
            )}
            aria-label={isFavorite ? "Favorilerimden çıkar" : "Favorilerime ekle"}
          >
            <Heart size={16} className={isFavorite ? "fill-white text-white" : ""} />
          </Button>
        </div>

        {/* Success Alert */}
        {showSuccessToast && (
          <div className="flex items-center gap-2 bg-stone-50 border border-green-200 px-4 py-3 text-xs text-stone-700 animate-fade-in">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-800 text-white">
              <Check size={12} />
            </div>
            <span>Ürün başarıyla sepete eklendi!</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border-light)] w-full my-8" />

      {/* Details list */}
      <div className="flex flex-col gap-3.5">
        {product.material && (
          <div className="flex justify-between text-xs">
            <span className="text-[var(--color-muted)] font-light select-none">Kumaş Karışımı</span>
            <span className="text-[var(--color-ink)] font-normal">{product.material}</span>
          </div>
        )}
        {product.fit && (
          <div className="flex justify-between text-xs">
            <span className="text-[var(--color-muted)] font-light select-none">Kalıp Bilgisi</span>
            <span className="text-[var(--color-ink)] font-normal">{product.fit}</span>
          </div>
        )}
        <div className="flex justify-between text-xs">
          <span className="text-[var(--color-muted)] font-light select-none">Teslimat & İade</span>
          <span className="text-[var(--color-ink)] font-normal">2.000 TL üzeri ücretsiz kargo</span>
        </div>
      </div>
    </div>
  );
}

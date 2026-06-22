import type { ProductCategory, ColorName, SizeName } from "@/types/product";
import type { SortOption } from "@/types/filter";

export const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "t-shirt", label: "T-Shirt" },
  { value: "shirt",   label: "Gömlek" },
  { value: "pant",    label: "Pantolon" },
  { value: "jacket",  label: "Ceket" },
  { value: "knitwear", label: "Triko" },
  { value: "outerwear", label: "Dış Giyim" },
];

export const COLOR_OPTIONS: { value: ColorName; label: string; hex: string }[] = [
  { value: "black",    label: "Siyah",       hex: "#0a0a0a" },
  { value: "white",    label: "Beyaz",        hex: "#f5f5f5" },
  { value: "ecru",     label: "Ekru",         hex: "#f5f0e8" },
  { value: "stone",    label: "Taş",          hex: "#b8b0a5" },
  { value: "navy",     label: "Lacivert",     hex: "#1b2a4a" },
  { value: "charcoal", label: "Antrasit",     hex: "#3d3d3d" },
  { value: "camel",    label: "Camel",        hex: "#c19a6b" },
  { value: "olive",    label: "Haki",         hex: "#6b7c4f" },
  { value: "burgundy", label: "Bordo",        hex: "#6d2b3d" },
];

export const SIZE_OPTIONS: SizeName[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest",     label: "En Yeni" },
  { value: "featured",   label: "Öne Çıkanlar" },
  { value: "price-asc",  label: "Fiyat: Düşükten Yükseğe" },
  { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
];

export const PRICE_RANGE = {
  min: 0,
  max: 10000,
  step: 100,
};

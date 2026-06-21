import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely (clsx + tailwind-merge)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Turkish Lira
 * e.g. 2499 → "₺2.499"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Slugify a string
 * e.g. "Essential T-Shirt" → "essential-t-shirt"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to a max length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Calculate the discount percentage between original and sale price
 */
export function getDiscountPercent(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}

/**
 * Build an Unsplash image URL with specific dimensions and quality
 */
export function unsplashUrl(
  photoId: string,
  width = 800,
  height?: number,
  quality = 80
): string {
  const base = `https://images.unsplash.com/photo-${photoId}`;
  const params = new URLSearchParams({
    w: String(width),
    q: String(quality),
    fit: "crop",
    auto: "format",
  });
  if (height) params.set("h", String(height));
  return `${base}?${params.toString()}`;
}

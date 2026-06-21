import type { ProductCategory, CollectionSlug, SizeName, ColorName } from "./product";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "featured";

export interface FilterParams {
  category?: ProductCategory;
  collection?: CollectionSlug;
  size?: SizeName;
  color?: ColorName;
  sort?: SortOption;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isNew?: boolean;
}

export interface ActiveFilter {
  key: keyof FilterParams;
  label: string;
  value: string;
}

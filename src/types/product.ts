export type ColorName =
  | "black"
  | "white"
  | "ecru"
  | "stone"
  | "navy"
  | "charcoal"
  | "camel"
  | "olive"
  | "burgundy";

export interface ProductColor {
  name: ColorName;
  label: string;
  hex: string;
}

export type SizeName = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface ProductSize {
  name: SizeName;
  available: boolean;
}

export type ProductCategory =
  | "t-shirt"
  | "pant"
  | "jacket"
  | "knitwear"
  | "outerwear";

export type CollectionSlug = "ss25" | "fw24" | "essentials" | "new-arrivals";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: ProductCategory;
  collectionSlug: CollectionSlug;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  inStock: boolean;
  material?: string;
  fit?: string;
}

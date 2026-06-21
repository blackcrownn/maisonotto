import type { CollectionSlug } from "./product";

export interface Collection {
  id: string;
  slug: CollectionSlug;
  name: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  season?: string;
  year?: number;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

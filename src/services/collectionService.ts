import { collections } from "@/data/collections";
import type { Collection } from "@/types/collection";

export const collectionService = {
  async getAll(): Promise<Collection[]> {
    return collections;
  },

  async getBySlug(slug: string): Promise<Collection | null> {
    return collections.find((c) => c.slug === slug) ?? null;
  },

  async getFeatured(): Promise<Collection[]> {
    return collections.filter((c) => c.isFeatured);
  },
};

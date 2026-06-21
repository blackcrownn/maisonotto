import { categories } from "@/data/categories";
import type { Category } from "@/types/collection";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    return categories;
  },

  async getBySlug(slug: string): Promise<Category | null> {
    return categories.find((c) => c.slug === slug) ?? null;
  },
};

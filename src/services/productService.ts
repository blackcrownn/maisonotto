import { products } from "@/data/products";
import type { Product } from "@/types/product";
import type { FilterParams } from "@/types/filter";

/**
 * Product Service
 *
 * Currently reads from mock data.
 * To switch to a real API, replace the implementations below
 * with fetch() calls — component code stays unchanged.
 */
export const productService = {
  async getAll(filters?: FilterParams): Promise<Product[]> {
    let result = [...products];

    if (filters?.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters?.collection) {
      result = result.filter((p) => p.collectionSlug === filters.collection);
    }
    if (filters?.isNew !== undefined) {
      result = result.filter((p) => p.isNew === filters.isNew);
    }
    if (filters?.size) {
      result = result.filter((p) =>
        p.sizes.some((s) => s.name === filters.size && s.available)
      );
    }
    if (filters?.color) {
      result = result.filter((p) =>
        p.colors.some((c) => c.name === filters.color)
      );
    }
    if (filters?.minPrice !== undefined) {
      result = result.filter(
        (p) => (p.salePrice ?? p.price) >= filters.minPrice!
      );
    }
    if (filters?.maxPrice !== undefined) {
      result = result.filter(
        (p) => (p.salePrice ?? p.price) <= filters.maxPrice!
      );
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (filters?.sort) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "featured":
        result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        break;
      case "newest":
      default:
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
    }

    return result;
  },

  async getBySlug(slug: string): Promise<Product | null> {
    return products.find((p) => p.slug === slug) ?? null;
  },

  async getFeatured(): Promise<Product[]> {
    return products.filter((p) => p.isFeatured).slice(0, 8);
  },

  async getNewArrivals(): Promise<Product[]> {
    return products.filter((p) => p.isNew);
  },

  async getRelated(productId: string, category: string): Promise<Product[]> {
    return products
      .filter((p) => p.id !== productId && p.category === category)
      .slice(0, 4);
  },

  async search(query: string): Promise<Product[]> {
    return this.getAll({ search: query });
  },
};

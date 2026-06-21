import { productService } from "./productService";
import type { Product } from "@/types/product";

export const searchService = {
  async search(query: string): Promise<Product[]> {
    if (!query.trim()) return [];
    return productService.search(query.trim());
  },
};

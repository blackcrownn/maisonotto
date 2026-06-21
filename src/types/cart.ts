import type { Product, ProductColor, SizeName } from "./product";

export interface CartItem {
  id: string; // unique: productId + color + size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: SizeName;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    color: ProductColor,
    size: SizeName,
    quantity?: number
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

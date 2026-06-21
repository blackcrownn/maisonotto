import type { SizeName } from "@/types/product";

export const AVAILABLE_SIZES: SizeName[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const SIZE_GUIDE: Record<SizeName, { chest: string; waist: string; hip: string }> = {
  XS: { chest: "84-88", waist: "70-74", hip: "90-94" },
  S:  { chest: "88-92", waist: "74-78", hip: "94-98" },
  M:  { chest: "92-96", waist: "78-82", hip: "98-102" },
  L:  { chest: "96-100", waist: "82-86", hip: "102-106" },
  XL: { chest: "100-104", waist: "86-90", hip: "106-110" },
  XXL:{ chest: "104-110", waist: "90-96", hip: "110-116" },
};

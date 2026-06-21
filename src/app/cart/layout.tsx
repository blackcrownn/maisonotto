import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sepetim — ${SITE_NAME}`,
  description: "Alışveriş sepetinizdeki premium minimal erkek giyim ürünleri.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

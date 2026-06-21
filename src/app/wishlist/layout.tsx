import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Favorilerim — ${SITE_NAME}`,
  description: "Favorilerinize eklediğiniz zamansız Maison Otto tasarımları.",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

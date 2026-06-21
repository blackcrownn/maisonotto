import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `İletişim — ${SITE_NAME}`,
  description: "Sorularınız, önerileriniz veya destek talepleriniz için Maison Otto ekibine ulaşın.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

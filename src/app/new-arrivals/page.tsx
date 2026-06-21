import type { Metadata } from "next";
import { productService } from "@/services/productService";
import { CollectionPageContent } from "@/components/collection/CollectionPageContent";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { ProductCategory, ColorName, SizeName } from "@/types/product";
import type { SortOption } from "@/types/filter";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    size?: string;
    color?: string;
    sort?: string;
  }>;
}

export const metadata: Metadata = {
  title: `Yeni Gelenler — ${SITE_NAME}`,
  description: "Maison Otto'nun en yeni minimal parçaları. Stoklar tükenmeden en yeni tasarımları keşfedin.",
  openGraph: {
    title: `Yeni Gelenler — ${SITE_NAME}`,
    description: "Maison Otto'nun en yeni minimal parçaları. Stoklar tükenmeden en yeni tasarımları keşfedin.",
    url: `${SITE_URL}/new-arrivals`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&h=1600&fit=crop&q=80",
        width: 1200,
        height: 1600,
        alt: "Maison Otto Yeni Gelenler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yeni Gelenler — ${SITE_NAME}`,
    description: "Maison Otto'nun en yeni minimal parçaları. Stoklar tükenmeden en yeni tasarımları keşfedin.",
    images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&h=1600&fit=crop&q=80"],
  },
};

export default async function NewArrivalsPage({ searchParams }: PageProps) {
  const sParams = await searchParams;

  const products = await productService.getAll({
    isNew: true,
    category: sParams.category as ProductCategory,
    size: sParams.size as SizeName,
    color: sParams.color as ColorName,
    sort: sParams.sort as SortOption,
  });

  return (
    <CollectionPageContent
      title="Yeni Gelenler"
      description="Gardırobunuza taze bir soluk getirecek, en son eklenen premium minimal tasarımlarımız."
      products={products}
    />
  );
}

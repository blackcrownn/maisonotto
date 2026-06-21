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
  title: `Erkek Giyim Koleksiyonu — ${SITE_NAME}`,
  description: "Maison Otto'nun tüm premium minimal erkek giyim parçaları. T-shirt, ceket, triko, pantolon ve dış giyim.",
  openGraph: {
    title: `Erkek Giyim Koleksiyonu — ${SITE_NAME}`,
    description: "Maison Otto'nun tüm premium minimal erkek giyim parçaları. T-shirt, ceket, triko, pantolon ve dış giyim.",
    url: `${SITE_URL}/men`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1617952236317-0bd127407984?w=1200&h=1600&fit=crop&q=80",
        width: 1200,
        height: 1600,
        alt: "Maison Otto Erkek Giyim Koleksiyonu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Erkek Giyim Koleksiyonu — ${SITE_NAME}`,
    description: "Maison Otto'nun tüm premium minimal erkek giyim parçaları. T-shirt, ceket, triko, pantolon ve dış giyim.",
    images: ["https://images.unsplash.com/photo-1617952236317-0bd127407984?w=1200&h=1600&fit=crop&q=80"],
  },
};

export default async function MenPage({ searchParams }: PageProps) {
  const sParams = await searchParams;

  const products = await productService.getAll({
    category: sParams.category as ProductCategory,
    size: sParams.size as SizeName,
    color: sParams.color as ColorName,
    sort: sParams.sort as SortOption,
  });

  return (
    <CollectionPageContent
      title="Erkek Giyim"
      description="Modern silüetler, sürdürülebilir zanaat ve zamansız kaliteyle örülen tüm erkek koleksiyonumuz."
      products={products}
      heroImage="https://images.unsplash.com/photo-1617952236317-0bd127407984?w=1600&h=900&fit=crop&q=80"
    />
  );
}

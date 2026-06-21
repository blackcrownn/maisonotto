import type { Metadata } from "next";
import { productService } from "@/services/productService";
import { CollectionPageContent } from "@/components/collection/CollectionPageContent";
import { SITE_NAME } from "@/lib/constants";

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
};

export default async function MenPage({ searchParams }: PageProps) {
  const sParams = await searchParams;

  const products = await productService.getAll({
    category: sParams.category as any,
    size: sParams.size as any,
    color: sParams.color as any,
    sort: sParams.sort as any,
  });

  return (
    <CollectionPageContent
      title="Erkek Giyim"
      description="Modern silüetler, sürdürülebilir zanaat ve zamansız kaliteyle örülen tüm erkek koleksiyonumuz."
      products={products}
    />
  );
}

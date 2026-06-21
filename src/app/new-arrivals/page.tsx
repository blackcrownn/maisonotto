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
  title: `Yeni Gelenler — ${SITE_NAME}`,
  description: "Maison Otto'nun en yeni minimal parçaları. Stoklar tükenmeden en yeni tasarımları keşfedin.",
};

export default async function NewArrivalsPage({ searchParams }: PageProps) {
  const sParams = await searchParams;

  const products = await productService.getAll({
    isNew: true,
    category: sParams.category as any,
    size: sParams.size as any,
    color: sParams.color as any,
    sort: sParams.sort as any,
  });

  return (
    <CollectionPageContent
      title="Yeni Gelenler"
      description="Gardırobunuza taze bir soluk getirecek, en son eklenen premium minimal tasarımlarımız."
      products={products}
    />
  );
}

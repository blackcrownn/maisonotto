import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { collectionService } from "@/services/collectionService";
import { productService } from "@/services/productService";
import { CollectionPageContent } from "@/components/collection/CollectionPageContent";
import type { CollectionSlug, ProductCategory, ColorName, SizeName } from "@/types/product";
import type { SortOption } from "@/types/filter";
import { generateCollectionMetadata } from "@/lib/seo";


interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    category?: string;
    size?: string;
    color?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = await collectionService.getBySlug(slug);
  if (!collection) return { title: "Koleksiyon Bulunamadı" };

  return generateCollectionMetadata(collection);
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const collection = await collectionService.getBySlug(slug);
  if (!collection) {
    notFound();
  }

  const products = await productService.getAll({
    collection: slug as CollectionSlug,
    category: sParams.category as ProductCategory,
    size: sParams.size as SizeName,
    color: sParams.color as ColorName,
    sort: sParams.sort as SortOption,
  });

  return (
    <CollectionPageContent
      title={collection.name}
      description={collection.description}
      products={products}
    />
  );
}

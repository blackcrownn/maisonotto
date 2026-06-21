import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { collectionService } from "@/services/collectionService";
import { productService } from "@/services/productService";
import { CollectionPageContent } from "@/components/collection/CollectionPageContent";
import { SITE_NAME } from "@/lib/constants";

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

  return {
    title: `${collection.name} Koleksiyonu — ${SITE_NAME}`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const collection = await collectionService.getBySlug(slug);
  if (!collection) {
    notFound();
  }

  const products = await productService.getAll({
    collection: slug as any,
    category: sParams.category as any,
    size: sParams.size as any,
    color: sParams.color as any,
    sort: sParams.sort as any,
  });

  return (
    <CollectionPageContent
      title={collection.name}
      description={collection.description}
      products={products}
    />
  );
}

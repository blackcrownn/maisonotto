import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productService } from "@/services/productService";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CATEGORY_OPTIONS } from "@/constants/filters";
import {
  generateProductMetadata,
  generateProductJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  if (!product) return { title: "Ürün Bulunamadı" };

  return generateProductMetadata(product);
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get category label for breadcrumb
  const categoryLabel = CATEGORY_OPTIONS.find((c) => c.value === product.category)?.label || product.category;

  const breadcrumbItems = [
    { label: "Erkek Giyim", href: "/men" },
    { label: categoryLabel, href: `/men?category=${product.category}` },
    { label: product.name },
  ];

  // Schema LD-JSON structures
  const productSchema = generateProductJsonLd(product);
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: "https://maisonotto.com" },
    { name: "Erkek Giyim", url: "https://maisonotto.com/men" },
    { name: categoryLabel, url: `https://maisonotto.com/men?category=${product.category}` },
    { name: product.name, url: `https://maisonotto.com/product/${product.slug}` },
  ]);

  return (
    <>
      {/* Inject Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white pb-20">
        {/* Breadcrumb section */}
        <div className="border-b border-[var(--border-light)] py-2">
          <div className="container-site">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Detail grid section */}
        <div className="container-site pt-8 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Gallery Column */}
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} alt={product.name} />
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5">
              <ProductInfo product={product} />
            </div>

          </div>
        </div>

        {/* Related products section */}
        <div className="mt-20">
          <RelatedProducts productId={product.id} category={product.category} />
        </div>
      </main>
    </>
  );
}

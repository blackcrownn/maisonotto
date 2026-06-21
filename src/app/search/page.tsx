import type { Metadata } from "next";
import { productService } from "@/services/productService";
import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/product/EmptyState";
import { SITE_NAME } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  return {
    title: query
      ? `"${query}" arama sonuçları — ${SITE_NAME}`
      : `Arama — ${SITE_NAME}`,
    description: query
      ? `"${query}" için MAISON OTTO arama sonuçları.`
      : "MAISON OTTO ürün arama.",
    robots: { index: false, follow: false },
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const products = query
    ? await productService.getAll({ search: query })
    : [];

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingTop: "120px",
          paddingBottom: "40px",
        }}
      >
        <div className="container-site">
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#aaa",
              fontFamily: "var(--font-sans)",
              marginBottom: "12px",
            }}
          >
            Arama Sonuçları
          </p>
          {query ? (
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#0d0d0d",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              &ldquo;{query}&rdquo;
            </h1>
          ) : (
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#0d0d0d",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Arama
            </h1>
          )}
          {query && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 300,
                color: "#aaa",
                marginTop: "16px",
              }}
            >
              {products.length > 0
                ? `${products.length} ürün bulundu`
                : "Sonuç bulunamadı"}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-site" style={{ paddingTop: "48px" }}>
        {!query ? (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 300,
              color: "#aaa",
              textAlign: "center",
              paddingTop: "80px",
            }}
          >
            Aramak istediğiniz ürünü yukarıdaki arama çubuğundan girin.
          </p>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div style={{ paddingTop: "40px" }}>
            <EmptyState />
          </div>
        )}
      </div>
    </main>
  );
}

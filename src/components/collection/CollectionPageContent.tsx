import Image from "next/image";
import { Breadcrumb } from "../layout/Breadcrumb";
import { FilterDrawer } from "./FilterDrawer";
import { SortBar } from "./SortBar";
import { CategoryBar } from "./CategoryBar";
import { ActiveFilters } from "./ActiveFilters";
import { ProductGrid } from "../product/ProductGrid";
import { EmptyState } from "../product/EmptyState";
import type { Product } from "@/types/product";

interface CollectionPageContentProps {
  title: string;
  description?: string;
  products: Product[];
  heroImage?: string;
  showCategoryBar?: boolean;
}

export function CollectionPageContent({
  title,
  description,
  products,
  heroImage,
  showCategoryBar = false,
}: CollectionPageContentProps) {
  const breadcrumbItems = [
    { label: "Koleksiyonlar" },
    { label: title },
  ];

  return (
    <main className="min-h-screen bg-white pb-24">

      {/* ── Editorial Hero Banner ── */}
      {heroImage ? (
        <div className="relative w-full overflow-hidden" style={{ height: "62vh", minHeight: "420px" }}>
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          {/* Gradient overlay — bottom-heavy so text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          {/* Title block — bottom left */}
          <div className="absolute inset-0 flex flex-col justify-end pb-14 px-10 md:px-20">
            <span
              className="text-[10px] font-sans tracking-[0.35em] uppercase mb-3 block"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              KOLEKSİYON
            </span>
            <h1
              className="font-serif text-5xl md:text-7xl font-light leading-[1.0] tracking-tight mb-4"
              style={{ color: "#ffffff" }}
            >
              {title}
            </h1>
            {description && (
              <p
                className="text-[13px] font-sans font-light max-w-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* No hero — plain text header */
        <div className="bg-[#faf9f7] border-b border-[var(--border-light)]">
          <div className="container-site py-16 md:py-20">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[var(--color-muted)] uppercase mb-4 block">
              KOLEKSİYON
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-[var(--color-ink)] mb-4 tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-sm font-light text-[var(--color-muted)] leading-relaxed max-w-xl">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <div className="border-b border-[var(--border-light)] py-3 bg-white">
        <div className="container-site">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* ── Category Icon Bar ── */}
      {showCategoryBar && <CategoryBar />}

      {/* ── Toolbar: sort pills left, count + filter right ── */}
      <div className="border-b border-[var(--border-light)] bg-white">
        <div className="container-site">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Sort pills */}
            <SortBar />

            {/* Right: count + mobile filter trigger */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="hidden md:block text-[11px] font-light text-[var(--color-muted)] tracking-wide">
                {products.length} ürün
              </span>
              <FilterDrawer />
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid (full width, 3 cols) ── */}
      <div className="container-site pt-10">
        <ActiveFilters />
        {products.length > 0 ? (
          <ProductGrid products={products} columns={3} />
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
}

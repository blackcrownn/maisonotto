import { Breadcrumb } from "../layout/Breadcrumb";
import { FilterSidebar } from "./FilterSidebar";
import { FilterDrawer } from "./FilterDrawer";
import { SortSelect } from "./SortSelect";
import { ActiveFilters } from "./ActiveFilters";
import { ProductGrid } from "../product/ProductGrid";
import { EmptyState } from "../product/EmptyState";
import type { Product } from "@/types/product";

interface CollectionPageContentProps {
  title: string;
  description?: string;
  products: Product[];
  heroImage?: string;
}

export function CollectionPageContent({
  title,
  description,
  products,
  heroImage,
}: CollectionPageContentProps) {
  const breadcrumbItems = [
    { label: "Koleksiyonlar" },
    { label: title },
  ];

  return (
    <main className="min-h-screen bg-white pb-24">

      {/* Editorial hero banner — full-width, tall */}
      {heroImage ? (
        <div className="relative w-full overflow-hidden" style={{ height: "55vh", minHeight: "380px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Title overlay */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-8 md:px-16">
            <span className="text-[10px] font-sans tracking-[0.3em] text-white/60 uppercase mb-4">
              KOLEKSİYON
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-white leading-[1.0]">
              {title}
            </h1>
            {description && (
              <p className="text-sm font-light text-white/60 mt-4 max-w-md leading-loose">
                {description}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* No hero image — plain text header */
        <div className="container-site pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[var(--color-muted)] uppercase mb-4 block">
              KOLEKSİYON
            </span>
            <h1 className="text-headline font-serif font-light text-[var(--color-ink)]">
              {title}
            </h1>
            {description && (
              <p className="text-caption text-sm font-light leading-loose max-w-xl mt-4">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Breadcrumb — slim, below hero */}
      <div className="border-b border-[var(--border-light)] py-3">
        <div className="container-site">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main grid layout */}
      <div className="container-site pt-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4 mb-10 md:justify-end gap-4">
          <FilterDrawer />
          <SortSelect />
        </div>

        {/* Desktop layout: sidebar + grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          <FilterSidebar className="hidden md:flex" />

          <div className="md:col-span-3">
            <ActiveFilters />
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

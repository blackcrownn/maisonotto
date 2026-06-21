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
}

export function CollectionPageContent({
  title,
  description,
  products,
}: CollectionPageContentProps) {
  const breadcrumbItems = [
    { label: "Koleksiyonlar" },
    { label: title },
  ];

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border-light)] py-4">
        <div className="container-site">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Collection Header */}
      <div className="container-site pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="max-w-2xl">
          <h1 className="text-headline font-serif font-light text-[var(--color-ink)] mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-caption text-sm font-light leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="container-site">
        {/* Toolbar (Mobile Filters / Desktop Sort Only) */}
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4 mb-6 md:justify-end">
          <FilterDrawer />
          <SortSelect />
        </div>

        {/* Desktop grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filters - Desktop */}
          <FilterSidebar className="hidden md:flex" />

          {/* Grid Products / Empty State */}
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

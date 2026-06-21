"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CATEGORY_OPTIONS, COLOR_OPTIONS, SIZE_OPTIONS } from "@/constants/filters";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  className?: string;
  hideCategory?: boolean;
}

export function FilterSidebar({ className, hideCategory = false }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category");
  const activeColor = searchParams.get("color");
  const activeSize = searchParams.get("size");

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    router.push(pathname);
  };

  const hasActiveFilters = activeCategory || activeColor || activeSize;

  return (
    <aside className={cn("w-full flex flex-col gap-8 bg-white p-6 border border-[var(--border-light)]", className)}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)]">
        <span className="font-serif text-base font-medium text-[var(--color-ink)]">Filtreler</span>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-[10px] font-sans tracking-wider uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors underline underline-offset-2"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Category Filter */}
      {!hideCategory && (
        <div className="flex flex-col gap-3">
          <h4 className="text-label text-[var(--color-ink)] mb-1">Kategori</h4>
          <ul className="flex flex-col gap-2">
            {CATEGORY_OPTIONS.map((opt) => {
              const isSelected = activeCategory === opt.value;
              return (
                <li key={opt.value}>
                  <button
                    onClick={() => updateParam("category", isSelected ? null : opt.value)}
                    className={cn(
                      "text-sm font-light text-[var(--color-charcoal)] hover:text-[var(--color-ink)] transition-colors text-left w-full",
                      isSelected && "font-medium text-[var(--color-ink)]"
                    )}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Size Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-label text-[var(--color-ink)] mb-1">Beden</h4>
        <div className="grid grid-cols-4 gap-2">
          {SIZE_OPTIONS.map((size) => {
            const isSelected = activeSize === size;
            return (
              <button
                key={size}
                onClick={() => updateParam("size", isSelected ? null : size)}
                className={cn(
                  "flex h-10 items-center justify-center border text-xs font-light transition-all",
                  isSelected
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                    : "border-[var(--border-base)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-label text-[var(--color-ink)] mb-1">Renk</h4>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-3">
          {COLOR_OPTIONS.map((opt) => {
            const isSelected = activeColor === opt.value;
            return (
              <li key={opt.value}>
                <button
                  onClick={() => updateParam("color", isSelected ? null : opt.value)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-light text-[var(--color-charcoal)] hover:text-[var(--color-ink)] transition-colors w-full",
                    isSelected && "font-medium text-[var(--color-ink)]"
                  )}
                >
                  <span
                    className={cn(
                      "h-3.5 w-3.5 border border-black/10 shrink-0",
                      isSelected && "ring-1 ring-[var(--color-ink)] ring-offset-2"
                    )}
                    style={{ backgroundColor: opt.hex }}
                  />
                  <span className="truncate">{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

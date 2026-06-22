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
    <aside className={cn("w-full flex flex-col gap-7", className)}>

      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-[var(--border-light)]">
        <span className="text-[11px] font-sans uppercase tracking-[0.18em] font-medium text-[var(--color-ink)]">
          Filtreler
        </span>
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
        <div className="flex flex-col gap-2.5">
          <h4 className="text-[10px] font-sans uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
            Kategori
          </h4>
          <ul className="flex flex-col gap-1">
            {CATEGORY_OPTIONS.map((opt) => {
              const isSelected = activeCategory === opt.value;
              return (
                <li key={opt.value}>
                  <button
                    onClick={() => updateParam("category", isSelected ? null : opt.value)}
                    className={cn(
                      "text-[13px] font-light text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors text-left w-full py-1",
                      isSelected && "font-normal text-[var(--color-ink)]"
                    )}
                    aria-label={`Kategori filtrele: ${opt.label}`}
                    aria-pressed={isSelected}
                  >
                    <span className="flex items-center gap-2">
                      {isSelected && (
                        <span className="w-1 h-1 rounded-full bg-[var(--color-ink)] flex-shrink-0" />
                      )}
                      {!isSelected && <span className="w-1 h-1 flex-shrink-0" />}
                      {opt.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-[var(--border-light)]" />

      {/* Size Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[10px] font-sans uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
          Beden
        </h4>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => {
            const isSelected = activeSize === size;
            return (
              <button
                key={size}
                onClick={() => updateParam("size", isSelected ? null : size)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center border text-[11px] font-light transition-all",
                  isSelected
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                    : "border-[var(--border-base)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                )}
                aria-label={`Beden filtrele: ${size}`}
                aria-pressed={isSelected}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border-light)]" />

      {/* Color Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[10px] font-sans uppercase tracking-[0.18em] text-[var(--color-muted)] mb-1">
          Renk
        </h4>
        <ul className="flex flex-col gap-2.5">
          {COLOR_OPTIONS.map((opt) => {
            const isSelected = activeColor === opt.value;
            return (
              <li key={opt.value}>
                <button
                  onClick={() => updateParam("color", isSelected ? null : opt.value)}
                  className={cn(
                    "flex items-center gap-3 text-[13px] font-light text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors w-full py-0.5",
                    isSelected && "font-normal text-[var(--color-ink)]"
                  )}
                  aria-label={`Renk filtrele: ${opt.label}`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={cn(
                      "h-4 w-4 border border-black/8 shrink-0 rounded-sm",
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

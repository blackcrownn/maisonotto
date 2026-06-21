"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { CATEGORY_OPTIONS, COLOR_OPTIONS } from "@/constants/filters";

export function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category");
  const activeColor = searchParams.get("color");
  const activeSize = searchParams.get("size");

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const getCategoryLabel = (val: string) => {
    return CATEGORY_OPTIONS.find((c) => c.value === val)?.label || val;
  };

  const getColorLabel = (val: string) => {
    return COLOR_OPTIONS.find((c) => c.value === val)?.label || val;
  };

  const activeFiltersList = [
    { key: "category", val: activeCategory, label: activeCategory ? `Kategori: ${getCategoryLabel(activeCategory)}` : "" },
    { key: "size", val: activeSize, label: activeSize ? `Beden: ${activeSize}` : "" },
    { key: "color", val: activeColor, label: activeColor ? `Renk: ${getColorLabel(activeColor)}` : "" },
  ].filter((f) => f.val);

  if (activeFiltersList.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-[10px] font-sans tracking-wider uppercase text-[var(--color-muted)] mr-2 select-none">
        Aktif Filtreler:
      </span>
      {activeFiltersList.map((filter) => (
        <button
          key={filter.key}
          onClick={() => removeParam(filter.key)}
          className="inline-flex items-center gap-1.5 border border-[var(--border-strong)] bg-white px-2.5 py-1 text-xs text-[var(--color-ink)] hover:bg-[var(--color-stone-50)] transition-colors rounded-none"
        >
          <span>{filter.label}</span>
          <X size={10} strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}

"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SORT_OPTIONS } from "@/constants/filters";
import { ChevronDown } from "lucide-react";

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeSort = searchParams.get("sort") || "newest";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center gap-2">
      <label
        htmlFor="collection-sort-select"
        className="text-[10px] font-sans uppercase tracking-[0.18em] text-[var(--color-muted)] shrink-0 select-none"
      >
        Sıralama
      </label>
      <div className="relative">
        <select
          id="collection-sort-select"
          value={activeSort}
          onChange={handleSortChange}
          className="appearance-none font-sans text-[12px] font-light text-[var(--color-ink)] bg-white border border-[var(--border-base)] py-2 pl-3 pr-8 focus:border-[var(--color-ink)] focus:outline-none cursor-pointer rounded-none hover:border-[var(--color-ink)] transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-muted)]"
        />
      </div>
    </div>
  );
}

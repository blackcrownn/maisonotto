"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SORT_OPTIONS } from "@/constants/filters";

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
    <div className="flex items-center gap-2">
      <label htmlFor="collection-sort-select" className="text-label text-[var(--color-muted)] shrink-0 select-none">
        Sıralama:
      </label>
      <select
        id="collection-sort-select"
        value={activeSort}
        onChange={handleSortChange}
        className="font-sans text-xs font-light text-[var(--color-ink)] bg-white border border-[var(--border-base)] py-2.5 pl-3 pr-8 focus:border-[var(--color-ink)] focus:outline-none cursor-pointer rounded-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

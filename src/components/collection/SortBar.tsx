"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SORT_OPTIONS } from "@/constants/filters";

export function SortBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeSort = searchParams.get("sort") || "newest";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {SORT_OPTIONS.map((opt) => {
        const isActive = activeSort === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => handleSort(opt.value)}
            className="transition-all duration-200"
            style={{
              height: "34px",
              padding: "0 14px",
              borderRadius: "0px",
              border: isActive ? "1px solid #111" : "1px solid #ddd",
              backgroundColor: isActive ? "#111" : "transparent",
              color: isActive ? "#fff" : "#555",
              fontSize: "11px",
              fontFamily: "var(--font-sans, Inter, sans-serif)",
              fontWeight: isActive ? 500 : 300,
              letterSpacing: "0.04em",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

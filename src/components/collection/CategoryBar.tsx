"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { CATEGORY_OPTIONS } from "@/constants/filters";

const CATEGORY_ICONS: Record<string, string> = {
  "t-shirt":   "/images/cat_tshirt.png",
  "shirt":     "/images/cat_shirt.png",
  "pant":      "/images/cat_pant.png",
  "jacket":    "/images/cat_jacket.png",
  "knitwear":  "/images/cat_knitwear.png",
  "outerwear": "/images/cat_outerwear.png",
};

export function CategoryBar() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const pathname     = usePathname();

  const activeCategory = searchParams.get("category");

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeCategory === value) {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full border-b border-[var(--border-light)] bg-white">
      {/* Full-width — items spread evenly across the row */}
      <div
        className="flex items-end justify-around overflow-x-auto no-scrollbar"
        style={{ padding: "32px 48px 0 48px" }}
      >
        {CATEGORY_OPTIONS.map((cat) => {
          const isActive = activeCategory === cat.value;
          const icon = CATEGORY_ICONS[cat.value];

          return (
            <button
              key={cat.value}
              onClick={() => handleSelect(cat.value)}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
              style={{ gap: "16px" }}
            >
              {/* Icon container — large, uniform neutral bg */}
              <div
                className="relative transition-all duration-300"
                style={{
                  width: "200px",
                  height: "240px",
                  backgroundColor: isActive ? "#ede9e3" : "#f2f2f0",
                  outline: isActive ? "2px solid #111" : "2px solid transparent",
                  outlineOffset: "-2px",
                }}
              >
                {icon ? (
                  <Image
                    src={icon}
                    alt={cat.label}
                    fill
                    sizes="200px"
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                    ?
                  </div>
                )}
              </div>

              {/* Label + active underline */}
              <div className="flex flex-col items-center pb-4" style={{ gap: "6px" }}>
                <span
                  className="font-sans whitespace-nowrap transition-colors duration-200"
                  style={{
                    fontSize: "14px",
                    color: isActive ? "#111" : "#555",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  {cat.label}
                </span>
                {/* Active indicator */}
                <div
                  style={{
                    height: "2px",
                    width: "32px",
                    backgroundColor: isActive ? "#111" : "transparent",
                    transition: "background-color 0.2s",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

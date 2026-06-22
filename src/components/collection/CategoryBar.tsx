"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
    <div
      className="w-full border-b border-[var(--border-light)]"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        className="flex items-end justify-around overflow-x-auto no-scrollbar"
        style={{ padding: "36px 48px 0 48px" }}
      >
        {CATEGORY_OPTIONS.map((cat) => {
          const isActive = activeCategory === cat.value;
          const icon = CATEGORY_ICONS[cat.value];

          return (
            <button
              key={cat.value}
              onClick={() => handleSelect(cat.value)}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
              style={{ gap: "14px" }}
            >
              {/* No wrapping container div — image sits directly on white page */}
              {icon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={icon}
                  alt={cat.label}
                  style={{
                    width: "190px",
                    height: "220px",
                    objectFit: "contain",
                    display: "block",
                    mixBlendMode: "multiply",
                    transition: "transform 0.3s ease",
                    borderBottom: isActive ? "3px solid #111" : "3px solid transparent",
                  }}
                  className="group-hover:scale-[1.04]"
                />
              ) : (
                <div
                  style={{ width: "190px", height: "220px" }}
                  className="flex items-center justify-center text-neutral-400 text-sm"
                >
                  ?
                </div>
              )}

              {/* Label */}
              <div className="pb-4">
                <span
                  className="font-sans whitespace-nowrap transition-colors duration-200 block"
                  style={{
                    fontSize: "14px",
                    color: isActive ? "#111" : "#555",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  {cat.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

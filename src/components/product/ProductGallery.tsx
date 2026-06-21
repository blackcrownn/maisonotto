"use client";

import { useState } from "react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0 pb-2 md:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative h-20 w-16 md:h-24 md:w-20 bg-[var(--color-stone-50)] border transition-all overflow-hidden shrink-0",
                activeIndex === idx
                  ? "border-[var(--color-ink)]"
                  : "border-[var(--border-light)] hover:border-[var(--border-strong)]"
              )}
              aria-label={`${alt} - görsel ${idx + 1}`}
              aria-selected={activeIndex === idx}
            >
              <ImageWithFallback
                src={img}
                alt={`${alt} küçük resim ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Viewport with Hover Zoom Effect */}
      <div className="relative aspect-[4/5] w-full flex-1 bg-[var(--color-stone-50)] border border-[var(--border-light)] overflow-hidden group">
        <ImageWithFallback
          src={images[activeIndex]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}

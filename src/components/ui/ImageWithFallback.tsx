"use client";

import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", // Premium grey suit/placeholder
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  return (
    <div className="relative overflow-hidden w-full h-full bg-[var(--color-stone-50)]">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt || "Maison Otto product image"}
        className={cn(
          "transition-all duration-700 ease-out object-cover w-full h-full",
          isLoading ? "scale-105 blur-sm opacity-0" : "scale-100 blur-0 opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setImgSrc(fallbackSrc);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

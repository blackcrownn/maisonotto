"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  title = "Ürün Bulunamadı",
  description = "Seçtiğiniz filtrelere uygun ürün bulunmamaktadır. Lütfen filtrelerinizi sıfırlayıp tekrar deneyin.",
  actionLabel = "Filtreleri Temizle",
  onClearFilters,
}: EmptyStateProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClear = () => {
    if (onClearFilters) {
      onClearFilters();
    } else {
      router.push(pathname); // Clears search params
    }
  };

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center p-8 border border-[var(--border-light)] bg-white">
      <h3 className="font-serif text-lg font-medium text-[var(--color-ink)] mb-2">
        {title}
      </h3>
      <p className="text-caption max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      <Button variant="outline" size="sm" onClick={handleClear}>
        {actionLabel}
      </Button>
    </div>
  );
}

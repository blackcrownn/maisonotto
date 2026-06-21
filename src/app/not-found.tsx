import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
  description: "Aradığınız sayfa mevcut değil.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-label text-[var(--color-muted)] mb-6 tracking-widest">404</p>
      <h1 className="text-headline text-[var(--color-ink)] mb-4">
        Sayfa Bulunamadı
      </h1>
      <p className="text-caption max-w-sm leading-relaxed mb-10 text-[var(--color-muted)]">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-[var(--color-ink)] px-8 py-3 text-label text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
      >
        Ana Sayfaya Dön
      </Link>
    </main>
  );
}

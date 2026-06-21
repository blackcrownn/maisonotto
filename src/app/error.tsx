"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-label text-[var(--color-muted)] mb-6 tracking-widest">Hata</p>
      <h1 className="text-headline text-[var(--color-ink)] mb-4">
        Bir Şeyler Yanlış Gitti
      </h1>
      <p className="text-caption max-w-sm leading-relaxed mb-10 text-[var(--color-muted)]">
        {error.message ?? "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-[var(--color-ink)] px-8 py-3 text-label text-white transition-opacity hover:opacity-80"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-[var(--color-ink)] px-8 py-3 text-label text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
        >
          Ana Sayfa
        </Link>
      </div>
    </main>
  );
}

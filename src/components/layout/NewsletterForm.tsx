"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { newsletterSchema } from "@/lib/schema";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setStatus("error");
      return;
    }
    // Mock submit
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="relative">
        <input
          id="footer-newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          aria-label="Bülten e-posta adresi"
          className="w-full border border-[var(--border-base)] bg-transparent px-4 py-3 pr-12 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-stone-300)] focus:border-[var(--color-ink)] focus:outline-none transition-colors"
        />
        <button
          type="submit"
          aria-label="Abone ol"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink)] transition-transform hover:translate-x-0.5 hover:-translate-y-1/2"
        >
          <ArrowRight size={16} strokeWidth={1.5} />
        </button>
      </div>
      {status === "success" && (
        <p className="text-caption text-green-700">
          ✓ Başarıyla abone oldunuz.
        </p>
      )}
      {status === "error" && (
        <p className="text-caption text-red-600">
          Geçerli bir e-posta adresi girin.
        </p>
      )}
    </form>
  );
}

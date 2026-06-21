"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { newsletterSchema } from "@/lib/schema";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setStatus("loading");
    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="section-spacing bg-white border-t border-[var(--border-light)]" aria-label="Bülten Aboneliği">
      <div className="container-site max-w-4xl">
        <div className="flex flex-col items-center text-center p-8 md:p-16 bg-[var(--color-cream)] border border-[var(--border-light)]">
          <span className="text-label text-[var(--color-muted)] mb-4">Ayrıcalıklı Dünya</span>
          <h2 className="text-headline leading-tight font-serif font-light mb-4 text-[var(--color-ink)]">
            Maison Otto'ya Katılın
          </h2>
          <p className="text-caption text-sm leading-relaxed max-w-md mx-auto mb-8 font-light">
            Yeni koleksiyonlardan, editoryal makalelerden ve özel öncelikli erişim haklarından haberdar olmak için bültenimize kaydolun.
          </p>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-4 animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-ink)] text-white mb-4">
                <Check size={20} />
              </div>
              <p className="font-serif text-base text-[var(--color-ink)]">
                Aboneliğiniz başarıyla tamamlandı.
              </p>
              <p className="text-caption mt-1">
                İlginiz için teşekkür ederiz.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-2" noValidate>
              <div className="relative flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    id="home-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="E-posta adresiniz"
                    aria-label="Bülten e-posta adresi"
                    className="w-full border border-[var(--border-base)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-stone-400 focus:border-[var(--color-ink)] focus:outline-none transition-colors rounded-none"
                    disabled={status === "loading"}
                  />
                </div>
                <Button
                  type="submit"
                  isLoading={status === "loading"}
                  variant="primary"
                  className="sm:w-auto w-full flex items-center justify-center gap-2"
                >
                  Abone Ol
                  <ArrowRight size={14} />
                </Button>
              </div>
              {error && (
                <p className="text-caption text-red-600 text-left mt-1 text-xs">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

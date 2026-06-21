"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
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
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      className="section-spacing bg-[var(--color-ink)]"
      aria-label="Bülten Aboneliği"
    >
      <div className="container-site">
        <div className="max-w-2xl">
          <span className="text-label text-white/40 block mb-6 tracking-[0.3em] text-[10px]">
            BÜLTEN
          </span>
          <h2 className="text-headline font-serif font-light text-white mb-6 leading-[1.05]">
            Maison Otto<br />Dünyasına Katılın
          </h2>
          <p className="text-[13px] font-light text-white/50 leading-loose mb-12 max-w-sm">
            Yeni koleksiyonlar, editoryal içerikler ve özel erişim öncelikleri
            için bültenimize kaydolun.
          </p>

          {status === "success" ? (
            <div className="flex items-center gap-4 animate-fade-in">
              <Check size={16} className="text-white/60 shrink-0" />
              <p className="font-serif text-sm font-light text-white/80">
                Aboneliğiniz tamamlandı. Teşekkürler.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-0 border-b border-white/20 pb-0">
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
                  className="flex-1 bg-transparent text-sm font-light text-white placeholder:text-white/30 focus:outline-none pb-3 tracking-wide"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 flex items-center gap-2 pb-3 text-[10px] text-label tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 disabled:opacity-50 sm:pl-8"
                >
                  {status === "loading" ? (
                    <span>Gönderiliyor...</span>
                  ) : (
                    <>
                      <span>ABONE OL</span>
                      <ArrowRight size={13} strokeWidth={1.5} />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-[11px] font-light text-red-400 tracking-wide">
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

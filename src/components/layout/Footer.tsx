"use client";

import { useState } from "react";
import Link from "next/link";
import { footerLinks, socialLinks } from "@/constants/navigation";
import { newsletterSchema } from "@/lib/schema";
import { ArrowRight } from "lucide-react";

export function Footer() {
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
    <footer className="border-t border-[var(--border-light)] bg-[var(--color-white)]">
      {/* Main footer */}
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-lg font-medium tracking-[0.12em] text-[var(--color-ink)]">
                MAISON OTTO
              </span>
            </Link>
            <p className="text-caption max-w-xs leading-relaxed">
              Premium minimal erkek giyim. Zamansız tasarım, olağanüstü kalite.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-label text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-label text-[var(--color-ink)] mb-5">Koleksiyonlar</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="text-label text-[var(--color-ink)] mb-5">Bilgi</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-label text-[var(--color-ink)] mb-5">Bülten</h3>
            <p className="text-caption mb-5 leading-relaxed">
              Yeni koleksiyonlar ve ayrıcalıklı tekliflerden ilk siz haberdar olun.
            </p>
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
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-light)]">
        <div className="container-site flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-caption">
            © {new Date().getFullYear()} MAISON OTTO. Tüm hakları saklıdır.
          </p>
          <ul className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-caption text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

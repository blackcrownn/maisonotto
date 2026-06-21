import Link from "next/link";
import { footerLinks, socialLinks } from "@/constants/navigation";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border-light)]">
      {/* Main footer */}
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-4">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-base font-light tracking-[0.3em] text-[var(--color-ink)]">
                MAISON OTTO
              </span>
            </Link>
            <p className="text-[12px] font-light text-[var(--color-muted)] leading-loose max-w-xs mb-6">
              Premium minimal erkek giyim.<br />Zamansız tasarım, olağanüstü kalite.
            </p>
            <div className="flex gap-5">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-[10px] font-sans tracking-[0.15em] uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-label text-[var(--color-ink)] mb-6 tracking-[0.2em] text-[10px]">
              KOLEKSIYONLAR
            </h3>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] font-light text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="text-label text-[var(--color-ink)] mb-6 tracking-[0.2em] text-[10px]">
              BİLGİ
            </h3>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] font-light text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter — minimal */}
          <div>
            <h3 className="text-label text-[var(--color-ink)] mb-6 tracking-[0.2em] text-[10px]">
              BÜLTEN
            </h3>
            <p className="text-[12px] font-light text-[var(--color-muted)] leading-loose mb-5">
              Yeni koleksiyonlardan ilk siz haberdar olun.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-light)]">
        <div className="container-site flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] font-light text-[var(--color-muted)]">
            © {new Date().getFullYear()} MAISON OTTO. Tüm hakları saklıdır.
          </p>
          <ul className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] font-light text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
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

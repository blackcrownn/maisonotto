import Link from "next/link";
import { footerLinks, socialLinks } from "@/constants/navigation";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
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
            <NewsletterForm />
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

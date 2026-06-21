import type { Metadata } from "next";
import { SITE_NAME, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Kargo & İade — ${SITE_NAME}`,
  description: "Teslimat süreleri, kargo ücretleri ve kolay iade politikamız.",
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-site max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-label text-[var(--color-muted)] uppercase tracking-widest block mb-4">Politikamız</span>
          <h1 className="text-title font-serif font-light text-[var(--color-ink)] mb-4">
            Kargo ve İade
          </h1>
          <p className="text-caption text-sm font-light leading-relaxed">
            Maison Otto'dan yapacağınız tüm alışverişlerde hızlı ve güvenli teslimat ile kolay iade imkanı sunuyoruz.
          </p>
        </div>

        <div className="space-y-12 font-light text-sm md:text-base text-[var(--color-charcoal)] leading-relaxed">
          {/* Shipping */}
          <section className="space-y-4">
            <h2 className="font-serif text-lg font-medium text-[var(--color-ink)]">Teslimat & Kargo Ücretleri</h2>
            <div className="space-y-2">
              <p>
                * Siparişleriniz <strong>1-3 iş günü</strong> içerisinde kargoya teslim edilir. Kargolarınız Yurtiçi Kargo güvencesiyle adresinize ulaştırılır.
              </p>
              <p>
                * {formatPrice(FREE_SHIPPING_THRESHOLD)} ve üzeri alışverişlerinizde kargo <strong>ücretsizdir</strong>.
              </p>
              <p>
                * {formatPrice(FREE_SHIPPING_THRESHOLD)} altındaki siparişlerinizde kargo ücreti sabit olarak <strong>{formatPrice(SHIPPING_COST)}</strong> olarak yansıtılır.
              </p>
            </div>
          </section>

          {/* Returns */}
          <section className="space-y-4">
            <h2 className="font-serif text-lg font-medium text-[var(--color-ink)]">Kolay İade Politikası</h2>
            <div className="space-y-2">
              <p>
                * Satın aldığınız ürünleri, teslim aldığınız tarihten itibaren <strong>30 gün</strong> içerisinde ücretsiz olarak iade edebilirsiniz.
              </p>
              <p>
                * İade edilecek ürünlerin kullanılmamış, yıkanmamış, etiketi koparılmamış ve orijinal ambalajında olması gerekmektedir.
              </p>
              <p>
                * İade işlemlerinizi başlatmak için üye panelinizden iade talebi oluşturabilir veya kargo kodu almak için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="font-serif text-lg font-medium text-[var(--color-ink)]">Destek</h2>
            <p>
              Kargo ve iade süreçleriyle ilgili her türlü sorunuz için <a href="/contact" className="underline underline-offset-4 hover:text-[var(--color-ink)]">İletişim</a> sayfamızdan bize ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

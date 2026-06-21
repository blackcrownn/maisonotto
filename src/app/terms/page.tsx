import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Kullanım Koşulları — ${SITE_NAME}`,
  description: "Web sitemizin kullanımı ve sipariş koşulları hakkında kurallar.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-site max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-label text-[var(--color-muted)] uppercase tracking-widest block mb-4">Sözleşme</span>
          <h1 className="text-title font-serif font-light text-[var(--color-ink)] mb-4">
            Kullanım Koşulları
          </h1>
          <div className="h-px bg-[var(--border-light)] w-16 mx-auto" />
        </div>

        <div className="space-y-8 font-light text-sm md:text-base text-[var(--color-charcoal)] leading-relaxed">
          <p>
            Maison Otto web sitesine hoş geldiniz. Sitemizi kullanarak ve sipariş oluşturarak aşağıda yer alan kullanım
            koşullarını kabul etmiş bulunuyorsunuz. Lütfen alışveriş yapmadan önce bu koşulları dikkatlice okuyunuz.
          </p>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">1. Hizmetlerin Kullanımı</h2>
            <p>
              Bu siteyi yalnızca yasal amaçlarla ve bu sözleşmeye uygun olarak kullanabilirsiniz. Sitedeki içeriklerin,
              görsellerin ve tasarımların telif hakları Maison Otto'ya ait olup yazılı izin olmaksızın kopyalanamaz veya
              ticari amaçlarla kullanılamaz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">2. Ürün ve Fiyat Bilgileri</h2>
            <p>
              Sitede yer alan ürün açıklamaları, stok durumları ve fiyatlar zaman zaman güncellenebilir. Maison Otto,
              fiyatlarda ve stoklarda oluşabilecek yazım veya sistemsel hataları düzeltme ve siparişleri iptal etme
              hakkını saklı tutar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">3. Sorumluluk Sınırları</h2>
            <p>
              Sitenin kullanımı sırasında oluşabilecek teknik aksaklıklardan, bağlantı sorunlarından veya sistemsel
              gecikmelerden Maison Otto sorumlu tutulamaz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

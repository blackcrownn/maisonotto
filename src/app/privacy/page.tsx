import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Gizlilik Politikası — ${SITE_NAME}`,
  description: "Kişisel verilerinizin korunması ve güvenliği ile ilgili bilgilendirme.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-site max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-label text-[var(--color-muted)] uppercase tracking-widest block mb-4">Gizlilik</span>
          <h1 className="text-title font-serif font-light text-[var(--color-ink)] mb-4">
            Gizlilik Politikası
          </h1>
          <div className="h-px bg-[var(--border-light)] w-16 mx-auto" />
        </div>

        <div className="space-y-8 font-light text-sm md:text-base text-[var(--color-charcoal)] leading-relaxed">
          <p>
            Maison Otto olarak, ziyaretçilerimizin ve müşterilerimizin gizlilik haklarına saygı duyuyor ve kişisel
            verilerinizin güvenliğini en üst düzeyde korumaya özen gösteriyoruz. Bu Gizlilik Politikası, web sitemiz
            aracılığıyla toplanan bilgilerin nasıl kullanıldığını, saklandığını ve korunduğunu açıklar.
          </p>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">1. Toplanan Veriler</h2>
            <p>
              Siparişlerinizin işlenmesi, teslim edilmesi ve size daha iyi bir alışveriş deneyimi sunulabilmesi için
              isim, e-posta adresi, teslimat adresi, telefon numarası gibi kişisel verilerinizi topluyoruz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">2. Verilerin Kullanımı</h2>
            <p>
              Toplanan veriler yalnızca sipariş işlemlerinin yürütülmesi, müşteri hizmetleri desteği sağlanması,
              yasal yükümlülüklerin yerine getirilmesi ve onay vermeniz halinde bülten gönderimleri için kullanılır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">3. Veri Güvenliği</h2>
            <p>
              Verileriniz, endüstri standardı olan 256-bit SSL şifreleme teknolojileri ile korunmaktadır. Ödeme
              bilgileriniz doğrudan aracı banka ve ödeme kuruluşlarına iletilmekte olup tarafımızca saklanmamaktadır.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

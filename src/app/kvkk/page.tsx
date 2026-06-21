import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `KVKK Aydınlatma Metni — ${SITE_NAME}`,
  description: "6698 Sayılı Kişisel Verilerin Korunması Kanunu uyarınca aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-site max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-label text-[var(--color-muted)] uppercase tracking-widest block mb-4">Yasal</span>
          <h1 className="text-title font-serif font-light text-[var(--color-ink)] mb-4">
            KVKK Aydınlatma Metni
          </h1>
          <div className="h-px bg-[var(--border-light)] w-16 mx-auto" />
        </div>

        <div className="space-y-8 font-light text-sm md:text-base text-[var(--color-charcoal)] leading-relaxed">
          <p>
            Maison Otto olarak, 6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu
            sıfatıyla kişisel verilerinizin işlenme amaçları, hukuki sebepleri ve haklarınız konusunda sizleri
            bilgilendirmek istiyoruz.
          </p>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">1. Verilerin İşlenme Amacı</h2>
            <p>
              Kişisel verileriniz; fatura düzenlenmesi, kargo gönderiminin yapılması, satış sonrası destek
              hizmetlerinin sunulması ve yasal bildirim yükümlülüklerinin yerine getirilmesi amacıyla işlenmektedir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">2. Verilerin Aktarılması</h2>
            <p>
              İşlenen kişisel verileriniz, yalnızca siparişin teslim edilmesi amacıyla kargo şirketleriyle ve yasal
              zorunluluklar gereği yetkili kamu kurum ve kuruluşlarıyla paylaşılmaktadır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-base font-medium text-[var(--color-ink)]">3. Haklarınız</h2>
            <p>
              Kanunun 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme,
              yanlış işlenmişse düzeltilmesini isteme ve verilerinizin silinmesini talep etme haklarına sahipsiniz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

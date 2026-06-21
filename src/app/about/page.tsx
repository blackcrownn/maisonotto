import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Hikayemiz — ${SITE_NAME}`,
  description: "Maison Otto'nun kuruluşu, zanaat anlayışı ve minimal lüks felsefesi.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-site max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-label text-[var(--color-muted)] uppercase tracking-widest block mb-4">Hikayemiz</span>
          <h1 className="text-title font-serif font-light text-[var(--color-ink)] mb-6">
            Maison Otto'nun Hikayesi
          </h1>
          <div className="h-px bg-[var(--border-light)] w-24 mx-auto" />
        </div>

        <div className="prose prose-stone max-w-none font-light leading-relaxed text-[var(--color-charcoal)] space-y-8 text-sm md:text-base">
          <p>
            Maison Otto, hızlı tüketim kültürünün ve geçici trendlerin ötesinde, kalıcı ve zamansız bir gardırop
            yaratma vizyonuyla kuruldu. İsmini sadelik ve düzenden alan markamız, modern erkeğin günlük
            yaşamında ihtiyaç duyduğu rafine silüetleri en yalın haliyle sunmayı amaçlar.
          </p>

          <h2 className="font-serif text-lg font-medium text-[var(--color-ink)] mt-12 mb-4">Zanaatkarlık ve Detaylar</h2>
          <p>
            Bizim için lüks, abartılı logolar veya karmaşık detaylar değil; kusursuz bir kesim, dikiş kalitesi ve
            kumaşın teninizde bıraktığı o eşsiz histir. Tasarımlarımızda organik Pima pamuğu, saf İtalyan merino yünü,
            premium keten ve kaşmir iplikleri tercih ediyoruz. Her bir parça, yıllar boyunca formunu ve kalitesini
            koruyacak şekilde yerel zanaatkarlar tarafından titizlikle üretilir.
          </p>

          <h2 className="font-serif text-lg font-medium text-[var(--color-ink)] mt-12 mb-4">Sürdürülebilirlik</h2>
          <p>
            Doğaya ve emeğe saygı, Maison Otto'nun temel taşıdır. Sınırlı sayıda üretim yaparak israfın önüne geçiyor,
            karbon ayak izimizi azaltmak amacıyla düşük emisyonlu yerel üreticilerle iş birliği yapıyoruz. Az ama öz
            tüketim felsefesini destekleyerek, gelecek nesillere daha temiz bir dünya bırakmayı hedefliyoruz.
          </p>

          <blockquote className="border-l-2 border-[var(--color-ink)] pl-6 italic font-serif text-base text-[var(--color-ink)] my-8">
            "Sadelik, en yüksek gelişmişlik düzeyidir."
          </blockquote>

          <p>
            Gardırobunuzu karmaşadan arındırmak ve her parçasıyla güven veren, zamansız bir stille tanışmak için
            koleksiyonlarımızı keşfedebilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}

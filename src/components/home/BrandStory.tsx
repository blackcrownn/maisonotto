import { ShieldCheck, Sparkles, Feather } from "lucide-react";

export function BrandStory() {
  const values = [
    {
      icon: <Feather size={24} strokeWidth={1} className="text-[var(--color-ink)]" />,
      title: "Olağanüstü Kalite",
      description: "Yalnızca Pima pamuğu, saf kaşmir ve İtalyan merino yünü gibi en kaliteli ham maddeleri seçerek zamansız dokumalar üretiyoruz."
    },
    {
      icon: <Sparkles size={24} strokeWidth={1} className="text-[var(--color-ink)]" />,
      title: "Rafine Tasarım",
      description: "Gereksiz detaylardan ve logolardan arındırılmış minimal kalıplarımızla silüeti ve kumaş dokusunu en saf haliyle sunuyoruz."
    },
    {
      icon: <ShieldCheck size={24} strokeWidth={1} className="text-[var(--color-ink)]" />,
      title: "Sürdürülebilir Yaklaşım",
      description: "Düşük karbon ayak izli yerel üreticilerle çalışarak, çevreye saygılı ve etik moda felsefesini destekliyoruz."
    }
  ];

  return (
    <section className="section-spacing bg-[var(--color-off-white)] border-t border-[var(--border-light)]" aria-label="Marka Değerleri">
      <div className="container-site">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-label text-[var(--color-muted)] mb-3 block">Felsefemiz</span>
          <h2 className="text-headline font-serif font-light mb-4 text-[var(--color-ink)]">
            Zamansız Giyim Anlayışı
          </h2>
          <p className="text-caption text-sm leading-relaxed max-w-lg mx-auto">
            Hızlı tüketimin ötesinde, her parçası özenle tasarlanmış ve uzun yıllar formunu koruması için üretilmiş rafine bir gardırop sunuyoruz.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {values.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start max-w-sm mx-auto md:mx-0">
              <div className="mb-6 flex h-12 w-12 items-center justify-center bg-white border border-[var(--border-light)]">
                {val.icon}
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--color-ink)] mb-3">
                {val.title}
              </h3>
              <p className="text-caption leading-relaxed font-light">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ShieldCheck, Sparkles, Feather } from "lucide-react";

const values = [
  {
    icon: <Feather size={18} strokeWidth={1} />,
    title: "Olağanüstü Kalite",
    description:
      "Pima pamuğu, saf kaşmir ve İtalyan merino yünü gibi en kaliteli ham maddelerle zamansız dokumalar.",
  },
  {
    icon: <Sparkles size={18} strokeWidth={1} />,
    title: "Rafine Tasarım",
    description:
      "Logolardan ve gereksiz detaylardan arındırılmış minimal kalıplar — silüet ve kumaş dokusu ön planda.",
  },
  {
    icon: <ShieldCheck size={18} strokeWidth={1} />,
    title: "Sürdürülebilirlik",
    description:
      "Düşük karbon ayak izli yerel üreticilerle; çevreye saygılı ve etik moda felsefesiyle.",
  },
];

export function BrandStory() {
  return (
    <section
      className="section-spacing bg-[var(--color-stone-50)]"
      aria-label="Marka Değerleri"
    >
      <div className="container-site">
        {/* Header */}
        <div className="max-w-lg mb-16 md:mb-20">
          <span className="text-label text-[var(--color-muted)] block mb-4 tracking-[0.25em] text-[10px]">
            FELSEFEMİZ
          </span>
          <h2 className="text-headline font-serif font-light text-[var(--color-ink)]">
            Zamansız Giyim<br />Anlayışı
          </h2>
        </div>

        {/* Values — horizontal rule separators, no icon boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[var(--border-light)]">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="flex flex-col py-10 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0 gap-5"
            >
              <div className="text-[var(--color-muted)]">{val.icon}</div>
              <h3 className="font-serif text-base font-light text-[var(--color-ink)]">
                {val.title}
              </h3>
              <p className="text-[13px] font-light text-[var(--color-muted)] leading-loose">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

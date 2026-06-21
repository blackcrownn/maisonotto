import Link from "next/link";
import { collections } from "@/data/collections";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export function CollectionShowcase() {
  // Show featured collections on home page
  const featuredCollections = collections.filter((c) => c.isFeatured);

  return (
    <section className="section-spacing bg-white border-t border-[var(--border-light)]" aria-label="Koleksiyon Vitrini">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div className="max-w-xl">
            <span className="text-label text-[var(--color-muted)] mb-3 block">Küratörlük</span>
            <h2 className="text-headline leading-none font-serif font-light">Özel Koleksiyonlar</h2>
          </div>
          <p className="text-caption max-w-sm mt-4 md:mt-0 text-[var(--color-muted)] font-light leading-relaxed">
            Maison Otto'nun her koleksiyonu, zamansız tarzı yeniden tanımlayan eşsiz parçalar sunar.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCollections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative flex flex-col overflow-hidden bg-[var(--color-stone-50)] aspect-[3/4] border border-[var(--border-light)]"
            >
              {/* Cover Image */}
              <div className="relative h-full w-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-103">
                <ImageWithFallback
                  src={col.coverImage}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Info inside overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/80 mb-2">
                  {col.season || "Capsule"} {col.year || ""}
                </span>
                <h3 className="font-serif text-2xl font-light tracking-tight mb-2">
                  {col.name}
                </h3>
                <p className="text-xs text-white/85 font-light max-w-xs mb-4 line-clamp-2 transition-all duration-300 opacity-80 group-hover:opacity-100">
                  {col.shortDescription}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase mt-2">
                  <span className="border-b border-white pb-0.5 transition-colors group-hover:border-white/50">
                    Koleksiyonu İncele
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

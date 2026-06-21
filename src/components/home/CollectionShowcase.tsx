"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { collections } from "@/data/collections";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export function CollectionShowcase() {
  const featuredCollections = collections.filter((c) => c.isFeatured);

  return (
    <section
      className="section-spacing bg-white"
      aria-label="Koleksiyon Vitrini"
    >
      <div className="container-site">
        {/* Section header — minimal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <span className="text-label text-[var(--color-muted)] block mb-4 tracking-[0.25em]">
            KOLEKSIYONLAR
          </span>
          <h2 className="text-headline font-serif font-light text-[var(--color-ink)]">
            Özel Editörler
          </h2>
        </motion.div>

        {/* Grid — asymmetric magazine layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {featuredCollections.map((col, idx) => {
            // First collection: large (spans 7 cols), rest: smaller (5 cols)
            const isLarge = idx === 0;
            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.12 }}
                className={isLarge ? "md:col-span-7" : "md:col-span-5"}
              >
                <Link
                  href={`/collections/${col.slug}`}
                  className="group relative flex flex-col overflow-hidden"
                  style={{ aspectRatio: isLarge ? "4/5" : "3/4" }}
                >
                  {/* Cover image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <ImageWithFallback
                      src={col.coverImage}
                      alt={col.name}
                      fill
                      sizes={isLarge ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/65" />

                  {/* Info */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                    <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-white/60 mb-3">
                      {col.season || "Capsule"} {col.year || ""}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight mb-3 leading-tight">
                      {col.name}
                    </h3>
                    <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-white/50 border-b border-white/25 pb-0.5 w-fit transition-colors duration-300 group-hover:text-white/80 group-hover:border-white/50">
                      İNCELE
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

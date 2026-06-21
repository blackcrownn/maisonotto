"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function EditorialBanner() {
  return (
    <section
      className="section-spacing bg-white"
      aria-label="Editoryal Tanıtım"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[70vh]">

          {/* Left — full-bleed image, no border */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-7 relative overflow-hidden"
            style={{ minHeight: "520px" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?w=1200&q=85"
              alt="Maison Otto tailoring craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </motion.div>

          {/* Right — editorial narrative, generous whitespace */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center px-0 lg:px-14 py-14 lg:py-0"
          >
            <span className="text-label text-[var(--color-muted)] tracking-[0.3em] mb-6 text-[10px]">
              MAISON OTTO ZANAATI
            </span>

            <h2 className="text-headline font-serif font-light text-[var(--color-ink)] mb-8 leading-[1.05]">
              Kusursuz<br />
              <em className="not-italic">Kesimler.</em>
            </h2>

            <p className="text-caption leading-loose font-light mb-5 max-w-sm text-[var(--color-muted)] text-[13px]">
              Maison Otto olarak, her dikişte zanaatkarlık ruhunu yaşatıyoruz.
              Organik Pima pamuğu, saf İtalyan merino yünü ve premium keten
              iplikleri ile hazırladığımız koleksiyonumuz zamansız modayı
              dolabınıza taşır.
            </p>
            <p className="text-caption leading-loose font-light mb-10 max-w-sm text-[var(--color-muted)] text-[13px]">
              Gereksiz detaylardan arındırılmış, silüeti ve kumaş kalitesini
              ön plana çıkaran kalıplar — uzun yıllar boyunca keyifle
              giyeceğiniz gardırop temelleri.
            </p>

            <Link
              href="/about"
              className="text-label text-[var(--color-ink)] tracking-[0.25em] border-b border-[var(--color-ink)]/40 pb-1 hover:border-[var(--color-ink)] transition-colors duration-300 text-[10px] w-fit"
            >
              HİKAYEMİZİ OKUYUN
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

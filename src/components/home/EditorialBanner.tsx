"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Button } from "../ui/Button";

export function EditorialBanner() {
  return (
    <section className="section-spacing bg-white border-t border-[var(--border-light)]" aria-label="Editoryal Tanıtım">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Image */}
          <div className="lg:col-span-6 relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none bg-[var(--color-stone-50)] border border-[var(--border-light)] overflow-hidden">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full w-full"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?w=1000&q=80" // Premium linen look or suit details
                alt="Maison Otto tailoring details"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Right Column: Narrative / Editorial */}
          <div className="lg:col-span-6 flex flex-col items-start max-w-xl mx-auto lg:mx-0">
            <span className="text-label text-[var(--color-muted)] mb-4">Maison Otto Zanaati</span>
            <h2 className="text-headline font-serif font-light mb-6 tracking-tight leading-[1.1] text-[var(--color-ink)]">
              Kusursuz Kesimler,<br />Sürdürülebilir Lüks.
            </h2>
            <p className="text-caption text-base leading-relaxed text-[var(--color-charcoal)] mb-6 font-light">
              Maison Otto olarak, her dikişte zanaatkarlık ruhunu yaşatıyoruz. Organik Pima pamuğu, saf İtalyan merino yünü ve premium keten iplikleri kullanarak hazırladığımız koleksiyonumuzla zamansız modayı dolabınıza taşıyoruz.
            </p>
            <p className="text-caption leading-relaxed mb-8 font-light">
              Gereksiz detaylardan arındırılmış, silüeti ve kumaş kalitesini ön plana çıkaran kalıplarımız sayesinde uzun yıllar boyunca keyifle giyebileceğiniz gardırop temellerini oluşturuyoruz.
            </p>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/about">
                <Button variant="outline" size="md">
                  Hikayemizi Okuyun
                </Button>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

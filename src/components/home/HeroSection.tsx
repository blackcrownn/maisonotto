"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center bg-[var(--color-cream)] overflow-hidden"
      aria-label="Kapak Görseli"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1600&q=80')] bg-cover bg-center bg-no-repeat opacity-85" />
      <div className="absolute inset-0 bg-black/15" />

      {/* Hero content */}
      <div className="container-site relative z-10 flex flex-col items-center text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-label text-white/95 tracking-[0.25em] mb-4 text-[10px] md:text-xs"
        >
          MAISON OTTO — EDITORIAL SS25
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-display text-white max-w-4xl tracking-tight leading-[0.95] mb-8 font-serif font-light"
        >
          Zamansız Silüetler.<br />Modern Klasikler.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm md:text-base font-light text-white/90 max-w-lg mb-10 tracking-wide leading-relaxed"
        >
          Hafif dokular ve nötr tonlarla tanımlanan yeni sezon parçalarını keşfedin. Sınırlı sayıda üretilen premium tasarımlar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/men">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-[var(--color-ink)] border-transparent hover:bg-neutral-100 hover:text-[var(--color-ink)] w-full sm:w-auto"
            >
              Koleksiyonu Keşfet
            </Button>
          </Link>
          <Link href="/collections/essentials">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--color-ink)] w-full sm:w-auto"
            >
              Essentials
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Editorial border/accent */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </section>
  );
}

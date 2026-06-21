"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      className="relative flex h-screen min-h-[600px] w-full items-end overflow-hidden"
      aria-label="Kapak Görseli"
    >
      {/* Full-bleed background image */}
      <Image
        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1920&q=85"
        alt="Maison Otto SS25 Koleksiyonu Erkek Giyim"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay — bottom heavy for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5 pointer-events-none" />

      {/* Content — bottom-left editorial layout */}
      <div className="relative z-10 w-full pb-16 md:pb-24 container-site">
        <div className="max-w-2xl">
          {/* Eyebrow label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="text-label text-white/70 tracking-[0.3em] mb-6 text-[10px]"
          >
            SS25 KOLEKSIYONU
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="text-display text-white font-serif font-light leading-[0.92] mb-8"
          >
            Zamansız<br />
            <em className="not-italic">Silüetler.</em>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.65 }}
            className="text-sm font-light text-white/70 leading-relaxed tracking-wide mb-10 max-w-sm"
          >
            Sınırlı sayıda üretilen premium parçalar. Her dikişte zanaat.
          </motion.p>

          {/* CTA links — pure text, editorial style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-8"
          >
            <Link
              href="/men"
              className="text-label text-white tracking-[0.2em] border-b border-white/50 pb-0.5 hover:border-white transition-colors duration-300 text-[10px]"
            >
              KOLEKSIYONU KEŞFEDİN
            </Link>
            <Link
              href="/collections/essentials"
              className="text-label text-white/50 tracking-[0.2em] hover:text-white/80 transition-colors duration-300 text-[10px]"
            >
              ESSENTIALS
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom right: scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-sans tracking-[0.25em] text-white/40 uppercase rotate-90 origin-center translate-x-4">
          Scroll
        </span>
        <div className="w-px h-10 bg-white/20" />
      </motion.div>
    </section>
  );
}

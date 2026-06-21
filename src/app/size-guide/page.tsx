import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { SIZE_GUIDE } from "@/constants/sizes";
import type { SizeName } from "@/types/product";

export const metadata: Metadata = {
  title: `Beden Rehberi — ${SITE_NAME}`,
  description: "Erkek giyim koleksiyonlarımız için göğüs, bel ve basen ölçüm rehberi.",
};

export default function SizeGuidePage() {
  const sizes = Object.keys(SIZE_GUIDE) as SizeName[];

  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-site max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-label text-[var(--color-muted)] uppercase tracking-widest block mb-4">Rehber</span>
          <h1 className="text-title font-serif font-light text-[var(--color-ink)] mb-4">
            Beden Rehberi
          </h1>
          <p className="text-caption text-sm font-light leading-relaxed">
            Maison Otto kalıpları standart kesim olup, kendi bedeninizi tercih etmeniz önerilir. Detaylı ölçü tablosuna aşağıdan ulaşabilirsiniz.
          </p>
        </div>

        <div className="overflow-x-auto border border-[var(--border-light)] bg-white">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-[var(--border-light)] bg-[var(--color-off-white)] uppercase tracking-widest text-[10px] text-[var(--color-ink)] font-medium">
                <th className="px-6 py-4">Beden</th>
                <th className="px-6 py-4">Göğüs (cm)</th>
                <th className="px-6 py-4">Bel (cm)</th>
                <th className="px-6 py-4">Basen (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-light)] text-[var(--color-charcoal)] font-light">
              {sizes.map((size) => {
                const measure = SIZE_GUIDE[size];
                return (
                  <tr key={size} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--color-ink)]">{size}</td>
                    <td className="px-6 py-4">{measure.chest}</td>
                    <td className="px-6 py-4">{measure.waist}</td>
                    <td className="px-6 py-4">{measure.hip}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-xs text-[var(--color-muted)] font-light space-y-2 leading-relaxed">
          <p>* Ölçüler santimetre (cm) cinsinden verilmiştir ve vücut ölçülerinizi temsil eder.</p>
          <p>* İki beden arasındaysanız; daha dökümlü bir duruş için büyük bedeni, vücuda oturan bir duruş için küçük bedeni seçebilirsiniz.</p>
        </div>
      </div>
    </main>
  );
}

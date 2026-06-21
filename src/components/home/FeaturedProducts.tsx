import Link from "next/link";
import { productService } from "@/services/productService";
import { ProductCard } from "../product/ProductCard";

export async function FeaturedProducts() {
  const featured = await productService.getFeatured();

  return (
    <section
      className="section-spacing bg-[var(--color-off-white)]"
      aria-label="Öne Çıkan Ürünler"
    >
      <div className="container-site">
        {/* Section header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-label text-[var(--color-muted)] block mb-4 tracking-[0.25em]">
              SEÇKI
            </span>
            <h2 className="text-headline font-serif font-light text-[var(--color-ink)]">
              Öne Çıkan Parçalar
            </h2>
          </div>
          <p className="text-caption max-w-xs leading-relaxed font-light md:text-right">
            Her sezonu tanımlayan temiz silüetler ve olağanüstü dokumalar.
          </p>
        </div>

        {/* Product grid — no card borders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all — editorial text link */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/men"
            className="text-label text-[var(--color-ink)] tracking-[0.25em] border-b border-[var(--color-ink)]/40 pb-1 hover:border-[var(--color-ink)] transition-colors duration-300 text-[10px]"
          >
            TÜM ÜRÜNLERİ GÖRÜNTÜLE
          </Link>
        </div>
      </div>
    </section>
  );
}

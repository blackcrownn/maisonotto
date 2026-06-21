import Link from "next/link";
import { productService } from "@/services/productService";
import { ProductCard } from "../product/ProductCard";
import { Button } from "../ui/Button";

export async function FeaturedProducts() {
  const featured = await productService.getFeatured();

  return (
    <section className="section-spacing bg-[var(--color-off-white)] border-t border-[var(--border-light)]" aria-label="Öne Çıkan Ürünler">
      <div className="container-site">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div className="max-w-xl">
            <span className="text-label text-[var(--color-muted)] mb-3 block">Küratörlük</span>
            <h2 className="text-headline leading-none font-serif font-light">Öne Çıkan Ürünler</h2>
          </div>
          <p className="text-caption max-w-sm mt-4 md:mt-0 text-[var(--color-muted)] font-light leading-relaxed">
            Sezonun en dikkat çeken, temiz çizgiler ve yüksek kaliteli dokumalarla harmanlanmış tasarımları.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link href="/men">
            <Button variant="outline" size="lg">
              Tüm Ürünleri Gör
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

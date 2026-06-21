import { productService } from "@/services/productService";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  productId: string;
  category: string;
}

export async function RelatedProducts({ productId, category }: RelatedProductsProps) {
  const related = await productService.getRelated(productId, category);

  if (related.length === 0) return null;

  return (
    <section className="section-spacing border-t border-[var(--border-light)]" aria-label="Benzer Ürünler">
      <div className="container-site">
        <div className="max-w-xl mb-12">
          <span className="text-label text-[var(--color-muted)] mb-3 block">Seçki</span>
          <h2 className="text-headline leading-none font-serif font-light">Benzer Ürünler</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

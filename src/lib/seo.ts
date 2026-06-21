import type { Metadata } from "next";
import type { Product } from "@/types/product";
import type { Collection } from "@/types/collection";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";

// ─── Base Metadata ────────────────────────────────────────────
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?w=800&q=80",
        width: 800,
        height: 1000,
        alt: "MAISON OTTO Premium Minimal Tailoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@maisonotto",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Product Metadata ─────────────────────────────────────────
export function generateProductMetadata(product: Product): Metadata {
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${SITE_NAME}`,
      description: product.description,
      type: "website",
      url: `${SITE_URL}/product/${product.slug}`,
      images: [{ url: product.images[0], width: 800, height: 1000, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ${SITE_NAME}`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

// ─── Collection Metadata ──────────────────────────────────────
export function generateCollectionMetadata(collection: Collection): Metadata {
  return {
    title: collection.name,
    description: collection.shortDescription,
    openGraph: {
      title: `${collection.name} — ${SITE_NAME}`,
      description: collection.shortDescription,
      url: `${SITE_URL}/collections/${collection.slug}`,
      images: [{ url: collection.coverImage, alt: collection.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.name} — ${SITE_NAME}`,
      description: collection.shortDescription,
      images: [collection.coverImage],
    },
  };
}

// ─── JSON-LD: Product Schema ──────────────────────────────────
export function generateProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      price: product.salePrice ?? product.price,
      priceCurrency: "TRY",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/product/${product.slug}`,
    },
  };
}

// ─── JSON-LD: Breadcrumb Schema ───────────────────────────────
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

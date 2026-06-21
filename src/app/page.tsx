import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { EditorialBanner } from "@/components/home/EditorialBanner";
import { BrandStory } from "@/components/home/BrandStory";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Premium Minimal Erkek Giyim`,
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <main>
      {/* Full-viewport editorial hero — transparent header overlaps */}
      <HeroSection />

      {/* Collection cards */}
      <CollectionShowcase />

      {/* Featured product grid */}
      <FeaturedProducts />

      {/* Editorial split banner */}
      <EditorialBanner />

      {/* Brand story */}
      <BrandStory />

      {/* Newsletter */}
      <NewsletterSection />
    </main>
  );
}

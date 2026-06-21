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
      {/* Hero Header */}
      <HeroSection />

      {/* Collection Cards Showcase */}
      <CollectionShowcase />

      {/* Featured Curated Products Grid */}
      <FeaturedProducts />

      {/* Editorial Split Banner */}
      <EditorialBanner />

      {/* Brand Values & Story */}
      <BrandStory />

      {/* Newsletter Signup Form */}
      <NewsletterSection />
    </main>
  );
}

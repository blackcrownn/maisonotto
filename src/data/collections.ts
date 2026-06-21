import type { Collection } from "@/types/collection";
import { unsplashUrl } from "@/lib/utils";

export const collections: Collection[] = [
  {
    id: "col-1",
    slug: "ss25",
    name: "SS25",
    description:
      "İlkbahar/Yaz 2025 koleksiyonu. Hafif dokular, nötr tonlar ve temiz silüetlerle tanımlanan bir mevsim.",
    shortDescription: "Minimalizmin doruk noktası.",
    coverImage: unsplashUrl("1617952236317-0bd127407984", 1200, 1600),
    season: "Spring/Summer",
    year: 2025,
    isFeatured: true,
  },
  {
    id: "col-2",
    slug: "fw24",
    name: "FW24",
    description:
      "Sonbahar/Kış 2024 koleksiyonu. Ağır dokular, katmanlamalı giyim anlayışı ve koyu palet.",
    shortDescription: "Derinlik ve sıcaklık.",
    coverImage: unsplashUrl("1490481651871-ab68de25d43d", 1200, 1600),
    season: "Fall/Winter",
    year: 2024,
    isFeatured: true,
  },
  {
    id: "col-3",
    slug: "essentials",
    name: "Essentials",
    description:
      "Zamansız temel parçalar. Her gardrobun vazgeçilmezi olan, sezonsuz giyilebilir koleksiyon.",
    shortDescription: "Her zaman, her yerde.",
    coverImage: unsplashUrl("1489987707025-aec79ddec2b2", 1200, 1600),
    season: undefined,
    year: undefined,
    isFeatured: true,
  },
  {
    id: "col-4",
    slug: "new-arrivals",
    name: "New Arrivals",
    description: "En yeni eklemeler. Stoklar tükenmeden keşfedin.",
    shortDescription: "Yeni gelenler.",
    coverImage: unsplashUrl("1551488831-00ddcb6c6bd3", 1200, 1600),
    season: undefined,
    year: undefined,
    isFeatured: false,
  },
];

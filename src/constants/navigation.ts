export interface NavLink {
  label: string;
  href: string;
}

export const mainNavLinks: NavLink[] = [
  { label: "Men", href: "/men" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Collections", href: "/collections/ss25" },
];

export const footerLinks = {
  shop: [
    { label: "Men", href: "/men" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "SS25 Collection", href: "/collections/ss25" },
    { label: "FW24 Collection", href: "/collections/fw24" },
    { label: "Essentials", href: "/collections/essentials" },
  ],
  info: [
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "/contact" },
    { label: "Boyut Rehberi", href: "/size-guide" },
    { label: "Kargo & İade", href: "/shipping" },
  ],
  legal: [
    { label: "Gizlilik Politikası", href: "/privacy" },
    { label: "Kullanım Koşulları", href: "/terms" },
    { label: "KVKK", href: "/kvkk" },
  ],
};

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/maisonotto" },
  { label: "TikTok", href: "https://tiktok.com/@maisonotto" },
];

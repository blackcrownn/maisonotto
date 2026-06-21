import type { Metadata } from "next";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { baseMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...baseMetadata,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductDetailScreen",
  description: "Product detail with size selector, quantity picker, and CTA",
  alternates: { canonical: "/blocks/product-detail" },
  openGraph: { title: "ProductDetailScreen", description: "Product detail with size selector, quantity picker, and CTA", url: "https://aniui.dev/blocks/product-detail" },
  twitter: { title: "ProductDetailScreen", description: "Product detail with size selector, quantity picker, and CTA" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

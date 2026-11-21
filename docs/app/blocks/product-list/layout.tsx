import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductListScreen",
  description: "E-commerce product grid with category filters and wishlist",
  alternates: { canonical: "/blocks/product-list" },
  openGraph: { title: "ProductListScreen", description: "E-commerce product grid with category filters and wishlist", url: "https://aniui.dev/blocks/product-list" },
  twitter: { title: "ProductListScreen", description: "E-commerce product grid with category filters and wishlist" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

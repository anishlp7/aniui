import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price",
  description: "AniUI Price — formatted currency display with locale support and strikethrough for discounts.",
  alternates: { canonical: "/docs/price" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

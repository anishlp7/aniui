import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carousel",
  description: "AniUI Carousel — horizontal scrollable list with pagination dots and autoPlay for React Native.",
  alternates: { canonical: "/docs/carousel" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

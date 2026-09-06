import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carousel Parallax",
  description: "AniUI Carousel Parallax — Horizontal carousel with scale and opacity parallax on scroll.",
  alternates: { canonical: "/docs/carousel-parallax" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

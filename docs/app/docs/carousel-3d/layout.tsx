import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carousel 3D",
  description: "AniUI Carousel 3D — 3D cylindrical carousel with pan gestures and snap physics.",
  alternates: { canonical: "/docs/carousel-3d" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

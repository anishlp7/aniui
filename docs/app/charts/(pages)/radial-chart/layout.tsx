import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RadialChart",
  description: "Skia concentric radial progress rings with grow-in, data morphing, and a drag-to-select tooltip",
  alternates: { canonical: "/charts/radial-chart" },
  openGraph: { title: "RadialChart", description: "Skia concentric radial progress rings with grow-in, data morphing, and a drag-to-select tooltip", url: "https://aniui.dev/charts/radial-chart" },
  twitter: { title: "RadialChart", description: "Skia concentric radial progress rings with grow-in, data morphing, and a drag-to-select tooltip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RadarChart",
  description: "Skia radar/spider chart with staggered grow-in, data morphing, and a drag-to-select axis tooltip",
  alternates: { canonical: "/charts/radar-chart" },
  openGraph: { title: "RadarChart", description: "Skia radar/spider chart with staggered grow-in, data morphing, and a drag-to-select axis tooltip", url: "https://aniui.dev/charts/radar-chart" },
  twitter: { title: "RadarChart", description: "Skia radar/spider chart with staggered grow-in, data morphing, and a drag-to-select axis tooltip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

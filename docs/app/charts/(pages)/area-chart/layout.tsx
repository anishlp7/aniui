import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AreaChart",
  description: "Skia area chart with entrance draw-on, data morphing, and a drag-to-scrub tooltip",
  alternates: { canonical: "/charts/area-chart" },
  openGraph: { title: "AreaChart", description: "Skia area chart with entrance draw-on, data morphing, and a drag-to-scrub tooltip", url: "https://aniui.dev/charts/area-chart" },
  twitter: { title: "AreaChart", description: "Skia area chart with entrance draw-on, data morphing, and a drag-to-scrub tooltip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

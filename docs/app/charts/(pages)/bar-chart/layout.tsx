import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BarChart",
  description: "Skia bar chart with staggered grow-in, data morphing, and a drag-to-scrub tooltip",
  alternates: { canonical: "/charts/bar-chart" },
  openGraph: { title: "BarChart", description: "Skia bar chart with staggered grow-in, data morphing, and a drag-to-scrub tooltip", url: "https://aniui.dev/charts/bar-chart" },
  twitter: { title: "BarChart", description: "Skia bar chart with staggered grow-in, data morphing, and a drag-to-scrub tooltip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

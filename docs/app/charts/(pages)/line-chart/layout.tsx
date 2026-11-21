import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LineChart",
  description: "Skia line chart with draw-on entrance, morph-on-data-change, and a scrubbing crosshair tooltip",
  alternates: { canonical: "/charts/line-chart" },
  openGraph: { title: "LineChart", description: "Skia line chart with draw-on entrance, morph-on-data-change, and a scrubbing crosshair tooltip", url: "https://aniui.dev/charts/line-chart" },
  twitter: { title: "LineChart", description: "Skia line chart with draw-on entrance, morph-on-data-change, and a scrubbing crosshair tooltip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

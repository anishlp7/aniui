import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PieChart",
  description: "Skia pie/donut chart with grow-in sweep, data morphing, and drag-to-select slice push-out",
  alternates: { canonical: "/charts/pie-chart" },
  openGraph: { title: "PieChart", description: "Skia pie/donut chart with grow-in sweep, data morphing, and drag-to-select slice push-out", url: "https://aniui.dev/charts/pie-chart" },
  twitter: { title: "PieChart", description: "Skia pie/donut chart with grow-in sweep, data morphing, and drag-to-select slice push-out" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

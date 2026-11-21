import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChartTooltip",
  description: "Tooltip overlay for chart data points",
  alternates: { canonical: "/charts/tooltip" },
  openGraph: { title: "ChartTooltip", description: "Tooltip overlay for chart data points", url: "https://aniui.dev/charts/tooltip" },
  twitter: { title: "ChartTooltip", description: "Tooltip overlay for chart data points" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

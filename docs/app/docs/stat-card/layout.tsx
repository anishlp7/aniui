import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stat Card",
  description: "AniUI Stat Card — KPI display with value, trend indicator, and change percentage.",
  alternates: { canonical: "/docs/stat-card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

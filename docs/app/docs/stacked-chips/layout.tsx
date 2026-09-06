import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stacked Chips",
  description: "AniUI Stacked Chips — Nested, depth-aware expandable chip menu — a trigger reveals further stacked chips.",
  alternates: { canonical: "/docs/stacked-chips" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shimmer",
  description: "AniUI Shimmer — Animated shimmer loading placeholder with a sweeping highlight.",
  alternates: { canonical: "/docs/shimmer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

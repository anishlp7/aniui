import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hover Card",
  description: "AniUI Hover Card — preview content card triggered by long-press. Positioned with rn-primitives.",
  alternates: { canonical: "/docs/hover-card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

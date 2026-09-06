import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flexi Button",
  description: "AniUI Flexi Button — Adaptive-width pill button that springs open to reveal a label, with a dimension-change callback.",
  alternates: { canonical: "/docs/flexi-button" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

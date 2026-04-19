import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Segmented Control",
  description: "AniUI Segmented Control — iOS-style segment switcher with animated indicator. 3 sizes.",
  alternates: { canonical: "/docs/segmented-control" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

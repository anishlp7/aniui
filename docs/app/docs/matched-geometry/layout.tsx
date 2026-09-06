import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matched Geometry",
  description: "AniUI Matched Geometry — SwiftUI-style shared-element layout transition primitive that morphs one tagged view into another's position and size when they swap.",
  alternates: { canonical: "/docs/matched-geometry" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

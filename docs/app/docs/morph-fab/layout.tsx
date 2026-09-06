import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Morph Fab",
  description: "AniUI Morph Fab — Skia gooey radial/directional FAB menu with staggered blob-merge spring animation.",
  alternates: { canonical: "/docs/morph-fab" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

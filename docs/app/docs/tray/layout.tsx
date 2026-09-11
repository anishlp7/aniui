import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tray",
  description: "AniUI Tray — Compound bottom-sheet/navigation-tray system with multi-view push/back navigation, draggable detents, and scroll hand-off.",
  alternates: { canonical: "/docs/tray" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

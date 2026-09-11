import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flip Card",
  description: "AniUI Flip Card — Tap-to-flip card with 3D rotateY animation.",
  alternates: { canonical: "/docs/flip-card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

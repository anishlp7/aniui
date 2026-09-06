import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polaroid",
  description: "AniUI Polaroid — Polaroid-style photo frame with optional caption.",
  alternates: { canonical: "/docs/polaroid" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

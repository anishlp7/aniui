import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marquee",
  description: "AniUI Marquee — Horizontally scrolling marquee text with seamless loop.",
  alternates: { canonical: "/docs/marquee" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

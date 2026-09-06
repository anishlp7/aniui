import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filling Stack",
  description: "AniUI Filling Stack — Vertically browsable card stack with fling gestures and a blur \"filling\" transition between cards.",
  alternates: { canonical: "/docs/filling-stack" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

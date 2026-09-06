import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hamburger",
  description: "AniUI Hamburger — Animated hamburger ⇄ close icon morph driven by a single progress value.",
  alternates: { canonical: "/docs/hamburger" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

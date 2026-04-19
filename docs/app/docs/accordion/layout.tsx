import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accordion",
  description: "AniUI Accordion — expandable content sections with animated expand/collapse. Built with rn-primitives.",
  alternates: { canonical: "/docs/accordion" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

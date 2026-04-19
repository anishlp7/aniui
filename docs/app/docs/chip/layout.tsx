import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chip",
  description: "AniUI Chip — interactive tag for filters and multi-select. Selectable, closable, 4 variants, 3 sizes.",
  alternates: { canonical: "/docs/chip" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

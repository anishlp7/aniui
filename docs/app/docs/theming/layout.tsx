import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theming",
  description: "AniUI Theming — AniUI with CSS variables. Light and dark mode, color presets, and full theme editor.",
  alternates: { canonical: "/docs/theming" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unfold Menu",
  description: "AniUI Unfold Menu — menu whose trigger unfolds into a full panel, its label morphing into the panel's title as it expands.",
  alternates: { canonical: "/docs/unfold-menu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

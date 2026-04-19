import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bottom Sheet",
  description: "AniUI Bottom Sheet — swipeable overlay panel with snap points. Built with @gorhom/bottom-sheet.",
  alternates: { canonical: "/docs/bottom-sheet" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

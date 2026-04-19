import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infinite List",
  description: "AniUI Infinite List — FlatList wrapper with automatic load-more on scroll and loading spinner.",
  alternates: { canonical: "/docs/infinite-list" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

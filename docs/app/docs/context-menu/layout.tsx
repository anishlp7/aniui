import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Context Menu",
  description: "AniUI Context Menu — long-press menu with items, separators, and destructive actions.",
  alternates: { canonical: "/docs/context-menu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

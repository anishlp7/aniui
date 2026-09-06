import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gooey Search Tabs",
  description: "AniUI Gooey Search Tabs — Skia gooey pill that morphs between a search bar and a tab switcher.",
  alternates: { canonical: "/docs/gooey-search-tabs" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SearchScreen",
  description: "Search screen with recent searches, trending, and live results",
  alternates: { canonical: "/blocks/search" },
  openGraph: { title: "SearchScreen", description: "Search screen with recent searches, trending, and live results", url: "https://aniui.dev/blocks/search" },
  twitter: { title: "SearchScreen", description: "Search screen with recent searches, trending, and live results" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

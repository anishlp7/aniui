import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Bar",
  description: "AniUI Search Bar — search input with icon, clear button, and cancel action. 3 sizes.",
  alternates: { canonical: "/docs/search-bar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

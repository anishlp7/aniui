import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sidebar",
  description: "AniUI Sidebar — collapsible side navigation panel with a toggle trigger.",
  alternates: { canonical: "/docs/sidebar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

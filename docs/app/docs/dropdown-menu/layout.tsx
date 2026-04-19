import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dropdown Menu",
  description: "AniUI Dropdown Menu — popup menu with items, separators, and destructive actions.",
  alternates: { canonical: "/docs/dropdown-menu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

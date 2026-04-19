import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Command Menu",
  description: "AniUI Command Menu — Spotlight-style searchable palette with groups and keyboard shortcuts.",
  alternates: { canonical: "/docs/command-menu" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

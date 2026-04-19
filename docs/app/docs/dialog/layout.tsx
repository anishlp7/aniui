import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dialog",
  description: "AniUI Dialog — modal overlay with fade and scale animation. Header, title, description, footer.",
  alternates: { canonical: "/docs/dialog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

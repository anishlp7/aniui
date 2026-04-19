import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drawer",
  description: "AniUI Drawer — slide-in side navigation panel with spring animation. Left or right side.",
  alternates: { canonical: "/docs/drawer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

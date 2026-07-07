import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menubar",
  description: "AniUI Menubar — horizontal bar of menus with dropdown items.",
  alternates: { canonical: "/docs/menubar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

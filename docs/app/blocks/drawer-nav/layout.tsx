import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DrawerNavContent",
  description: "Side drawer with user profile and icon-labeled navigation",
  alternates: { canonical: "/blocks/drawer-nav" },
  openGraph: { title: "DrawerNavContent", description: "Side drawer with user profile and icon-labeled navigation", url: "https://aniui.dev/blocks/drawer-nav" },
  twitter: { title: "DrawerNavContent", description: "Side drawer with user profile and icon-labeled navigation" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

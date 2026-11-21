import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProfileScreen",
  description: "User profile with avatar, stats, menu items, and log out",
  alternates: { canonical: "/blocks/profile" },
  openGraph: { title: "ProfileScreen", description: "User profile with avatar, stats, menu items, and log out", url: "https://aniui.dev/blocks/profile" },
  twitter: { title: "ProfileScreen", description: "User profile with avatar, stats, menu items, and log out" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

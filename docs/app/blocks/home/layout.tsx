import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomeScreen",
  description: "Dashboard home with greeting, quick actions, stats, and activity",
  alternates: { canonical: "/blocks/home" },
  openGraph: { title: "HomeScreen", description: "Dashboard home with greeting, quick actions, stats, and activity", url: "https://aniui.dev/blocks/home" },
  twitter: { title: "HomeScreen", description: "Dashboard home with greeting, quick actions, stats, and activity" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

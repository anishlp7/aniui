import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BottomTabsScreen",
  description: "Bottom tab navigation bar with active state indicators",
  alternates: { canonical: "/blocks/bottom-tabs" },
  openGraph: { title: "BottomTabsScreen", description: "Bottom tab navigation bar with active state indicators", url: "https://aniui.dev/blocks/bottom-tabs" },
  twitter: { title: "BottomTabsScreen", description: "Bottom tab navigation bar with active state indicators" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

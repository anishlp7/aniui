import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refresh Control",
  description: "AniUI Refresh Control — themed pull-to-refresh for ScrollView and FlatList. Dark mode aware.",
  alternates: { canonical: "/docs/refresh-control" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

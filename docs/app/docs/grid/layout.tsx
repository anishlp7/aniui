import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grid",
  description: "AniUI Grid — FlatList-based grid layout with configurable columns and gap spacing.",
  alternates: { canonical: "/docs/grid" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

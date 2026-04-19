import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table",
  description: "AniUI Table — data layout with Header, Body, Row, Head, and Cell sub-components.",
  alternates: { canonical: "/docs/table" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

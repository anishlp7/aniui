import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Table",
  description: "AniUI Data Table — sortable, filterable table with pagination, custom cells, and striped rows.",
  alternates: { canonical: "/docs/data-table" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

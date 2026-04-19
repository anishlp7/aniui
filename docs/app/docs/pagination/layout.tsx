import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagination",
  description: "AniUI Pagination — page navigation with numbered buttons and prev/next controls.",
  alternates: { canonical: "/docs/pagination" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

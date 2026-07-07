import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breadcrumb",
  description: "AniUI Breadcrumb — navigation trail showing the current page's location in a hierarchy.",
  alternates: { canonical: "/docs/breadcrumb" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

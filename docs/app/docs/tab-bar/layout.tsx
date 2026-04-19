import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tab Bar",
  description: "AniUI Tab Bar — bottom navigation with badge support and active state indicators.",
  alternates: { canonical: "/docs/tab-bar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

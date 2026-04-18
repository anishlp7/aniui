import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse all 89 AniUI React Native components. Searchable, categorized, with live examples.",
  alternates: { canonical: "/docs/components" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

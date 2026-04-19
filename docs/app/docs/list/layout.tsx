import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List",
  description: "AniUI List — styled list with ListItem, Title, and Description sub-components for React Native.",
  alternates: { canonical: "/docs/list" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

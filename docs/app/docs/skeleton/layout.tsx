import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skeleton",
  description: "AniUI Skeleton — animated loading placeholder with pulse opacity. Built with Reanimated.",
  alternates: { canonical: "/docs/skeleton" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

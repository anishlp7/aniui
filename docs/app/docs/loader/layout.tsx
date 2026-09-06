import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loader",
  description: "AniUI Loader — Animated loading indicator with circle and dots variants.",
  alternates: { canonical: "/docs/loader" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

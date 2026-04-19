import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spinner",
  description: "AniUI Spinner — loading indicator with 3 sizes (sm, md, lg) for React Native.",
  alternates: { canonical: "/docs/spinner" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

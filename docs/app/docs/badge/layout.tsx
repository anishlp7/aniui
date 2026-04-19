import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badge",
  description: "AniUI Badge — small status indicator with default, secondary, outline, and destructive variants.",
  alternates: { canonical: "/docs/badge" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress",
  description: "AniUI Progress — percentage bar with accessible fill indicator. Built with rn-primitives.",
  alternates: { canonical: "/docs/progress" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

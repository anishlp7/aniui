import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radio Group",
  description: "AniUI Radio Group — single-selection radio buttons with accessible states. rn-primitives based.",
  alternates: { canonical: "/docs/radio-group" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

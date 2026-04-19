import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Action Sheet",
  description: "AniUI Action Sheet — iOS-style option sheet with destructive actions. Built with @gorhom/bottom-sheet.",
  alternates: { canonical: "/docs/action-sheet" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

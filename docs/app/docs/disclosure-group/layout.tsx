import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure Group",
  description: "AniUI Disclosure Group — iOS-style grouped expandable disclosure sections.",
  alternates: { canonical: "/docs/disclosure-group" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

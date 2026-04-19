import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "input",
  description: "AniUI Input — text field with default/ghost variants, 3 sizes, and leading/trailing icon support.",
  alternates: { canonical: "/docs/input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Action Rail",
  description: "AniUI Action Rail — expandable icon toolbar that reveals labeled actions, with its own light/dark palette system.",
  alternates: { canonical: "/docs/action-rail" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

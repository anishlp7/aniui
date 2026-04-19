import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JavaScript",
  description: "Using AniUI components in JavaScript projects. CLI auto-strips TypeScript types.",
  alternates: { canonical: "/docs/javascript" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

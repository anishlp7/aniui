import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toggle Group",
  description: "AniUI Toggle Group — exclusive selection from multiple toggle options.",
  alternates: { canonical: "/docs/toggle-group" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

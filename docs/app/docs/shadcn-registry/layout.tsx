import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "shadcn / RNR Registry",
  description: "Add AniUI components via the shadcn CLI or React Native Reusables, using AniUI's own registry endpoint.",
  alternates: { canonical: "/docs/shadcn-registry" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

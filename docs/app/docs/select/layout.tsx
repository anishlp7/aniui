import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "select",
  description: "AniUI Select — dropdown picker with search support and smart positioning for React Native.",
  alternates: { canonical: "/docs/select" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

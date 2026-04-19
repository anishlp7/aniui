import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text",
  description: "AniUI Text — typography with h1-h4, paragraph, lead, large, small, and muted variants.",
  alternates: { canonical: "/docs/text" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

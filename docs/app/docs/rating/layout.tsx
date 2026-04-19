import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rating",
  description: "AniUI Rating — star rating with interactive and read-only modes. 3 sizes (sm, md, lg).",
  alternates: { canonical: "/docs/rating" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

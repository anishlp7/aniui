import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aspect Ratio",
  description: "AniUI Aspect Ratio — constrain content to a fixed width/height ratio.",
  alternates: { canonical: "/docs/aspect-ratio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

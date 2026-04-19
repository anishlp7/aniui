import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labeled Separator",
  description: "AniUI Labeled Separator — horizontal divider with centered text label for sections.",
  alternates: { canonical: "/docs/labeled-separator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Separator",
  description: "AniUI Separator — visual divider with horizontal and vertical orientations.",
  alternates: { canonical: "/docs/separator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

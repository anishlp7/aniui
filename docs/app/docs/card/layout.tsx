import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card",
  description: "AniUI Card — container with Header, Title, Description, Content, and Footer sub-components.",
  alternates: { canonical: "/docs/card" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

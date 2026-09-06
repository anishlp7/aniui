import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expandable View",
  description: "AniUI Expandable View — generic expand/collapse container with spring-driven width/height/corner-radius morphing and a slot API.",
  alternates: { canonical: "/docs/expandable-view" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

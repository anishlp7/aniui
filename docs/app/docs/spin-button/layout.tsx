import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spin Button",
  description: "AniUI Spin Button — Toggle button with a custom SVG arc spinner and crossfading label on press.",
  alternates: { canonical: "/docs/spin-button" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popover",
  description: "AniUI Popover — floating overlay with trigger positioning. Side, offset, and alignment control.",
  alternates: { canonical: "/docs/popover" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

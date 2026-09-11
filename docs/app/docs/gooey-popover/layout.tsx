import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gooey Popover",
  description: "AniUI Gooey Popover — Skia gooey popover that morphs its trigger into the content panel.",
  alternates: { canonical: "/docs/gooey-popover" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

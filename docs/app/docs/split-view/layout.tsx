import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split View",
  description: "AniUI Split View — draggable, resizable top/bottom split pane with snap points and spring physics.",
  alternates: { canonical: "/docs/split-view" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

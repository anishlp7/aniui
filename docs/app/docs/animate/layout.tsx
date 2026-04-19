import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animate",
  description: "AniUI Animate — spring presets, layout animations, easing curves, and hooks for Reanimated 4.",
  alternates: { canonical: "/docs/animate" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

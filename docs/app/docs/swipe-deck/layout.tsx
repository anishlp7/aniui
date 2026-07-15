import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swipe Deck",
  description: "AniUI Swipe Deck — Tinder-style swipeable card stack with fling physics, drag rotation, and left/right swipe callbacks.",
  alternates: { canonical: "/docs/swipe-deck" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

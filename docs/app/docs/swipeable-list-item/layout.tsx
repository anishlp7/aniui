import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swipeable List Item",
  description: "AniUI Swipeable List Item — swipe-to-reveal action buttons with spring physics.",
  alternates: { canonical: "/docs/swipeable-list-item" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swipeable List Item",
  description: "AniUI Swipeable List Item component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/swipeable-list-item" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

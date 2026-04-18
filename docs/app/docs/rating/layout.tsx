import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rating",
  description: "AniUI Rating component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/rating" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

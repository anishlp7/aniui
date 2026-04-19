import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connection Banner",
  description: "AniUI Connection Banner — animated online/offline status indicator for React Native.",
  alternates: { canonical: "/docs/connection-banner" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

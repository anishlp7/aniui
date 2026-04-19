import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Header",
  description: "AniUI Header — navigation bar with back button, title, and right action area for React Native.",
  alternates: { canonical: "/docs/header" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

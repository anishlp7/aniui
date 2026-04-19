import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Provider",
  description: "AniUI Theme Provider — light, dark, and system mode context with toggle for React Native.",
  alternates: { canonical: "/docs/theme-provider" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

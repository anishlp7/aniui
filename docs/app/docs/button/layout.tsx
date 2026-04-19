import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button",
  description: "AniUI Button — pressable with 5 variants, 3 sizes, loading state, and icon support for React Native.",
  alternates: { canonical: "/docs/button" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

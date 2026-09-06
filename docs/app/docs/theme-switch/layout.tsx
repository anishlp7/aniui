import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Switch",
  description: "AniUI Theme Switch — Sun/moon icon-morph theme toggle with an optional full-screen circular wipe transition.",
  alternates: { canonical: "/docs/theme-switch" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

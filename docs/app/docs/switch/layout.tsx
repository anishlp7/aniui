import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Switch",
  description: "AniUI Switch — toggle control with theme-aware track colors for iOS and Android.",
  alternates: { canonical: "/docs/switch" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

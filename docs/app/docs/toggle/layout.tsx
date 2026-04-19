import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toggle",
  description: "AniUI Toggle — two-state pressable button with visual feedback for React Native.",
  alternates: { canonical: "/docs/toggle" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

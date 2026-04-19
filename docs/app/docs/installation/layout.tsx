import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation",
  description: "AniUI Installation — AniUI set up in your React Native project. One command auto-installs NativeWind or Uniwind, Tailwind, and all dependencies.",
  alternates: { canonical: "/docs/installation" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

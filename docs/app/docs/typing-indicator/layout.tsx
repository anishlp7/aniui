import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typing Indicator",
  description: "AniUI Typing Indicator component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/typing-indicator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

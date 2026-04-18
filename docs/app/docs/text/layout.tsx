import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text",
  description: "AniUI Text component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/text" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

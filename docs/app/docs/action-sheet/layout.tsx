import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Action Sheet",
  description: "AniUI Action Sheet component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/action-sheet" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

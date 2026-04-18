import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert",
  description: "AniUI Alert component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/alert" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

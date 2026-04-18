import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description: "AniUI Calendar component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/calendar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

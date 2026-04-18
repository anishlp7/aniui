import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert Dialog",
  description: "AniUI Alert Dialog component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/alert-dialog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

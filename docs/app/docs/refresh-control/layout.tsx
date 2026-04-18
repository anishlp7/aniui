import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refresh Control",
  description: "AniUI Refresh Control component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/refresh-control" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

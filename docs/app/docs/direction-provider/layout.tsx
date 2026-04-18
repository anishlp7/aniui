import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direction Provider",
  description: "AniUI Direction Provider component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/direction-provider" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

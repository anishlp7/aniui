import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Steps",
  description: "AniUI Progress Steps component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/progress-steps" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

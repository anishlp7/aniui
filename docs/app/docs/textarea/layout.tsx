import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Textarea",
  description: "AniUI Textarea component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/textarea" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

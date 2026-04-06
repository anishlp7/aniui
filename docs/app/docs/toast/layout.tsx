import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "toast",
  description: "AniUI toast component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/toast" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

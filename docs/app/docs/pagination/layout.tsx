import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagination",
  description: "AniUI Pagination component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/pagination" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

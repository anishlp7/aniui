import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Squircle View",
  description: "AniUI Squircle View — True superellipse squircle container with an animatable corner-smoothing parameter.",
  alternates: { canonical: "/docs/squircle-view" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "All notable changes to AniUI. New components, bug fixes, and improvements.",
  alternates: { canonical: "/docs/changelog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

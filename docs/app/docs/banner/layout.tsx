import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner",
  description: "AniUI Banner — full-width notification with info, warning, destructive, success variants and dismiss.",
  alternates: { canonical: "/docs/banner" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

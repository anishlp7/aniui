import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert",
  description: "AniUI Alert — notification banners with default, destructive, success, and warning variants.",
  alternates: { canonical: "/docs/alert" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

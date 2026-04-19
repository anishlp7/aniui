import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description: "AniUI Timeline — vertical event tracker for order status, activity feeds, and history.",
  alternates: { canonical: "/docs/timeline" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

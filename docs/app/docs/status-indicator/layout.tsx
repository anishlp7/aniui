import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status Indicator",
  description: "AniUI Status Indicator — colored dot for online, offline, away, busy with pulse animation.",
  alternates: { canonical: "/docs/status-indicator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

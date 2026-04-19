import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description: "AniUI Calendar — month grid with single date and range selection. Day, month, and year views.",
  alternates: { canonical: "/docs/calendar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

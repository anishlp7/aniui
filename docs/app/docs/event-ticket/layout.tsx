import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Ticket",
  description: "AniUI Event Ticket — Event ticket card with perforated edge, date, venue, and seat.",
  alternates: { canonical: "/docs/event-ticket" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Bubble",
  description: "AniUI Chat Bubble — sent/received message bubbles with timestamps and delivery status.",
  alternates: { canonical: "/docs/chat-bubble" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

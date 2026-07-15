import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Streaming Text",
  description: "AniUI Streaming Text — typewriter reveal for AI responses with a blinking cursor, append-safe streaming, and configurable speed.",
  alternates: { canonical: "/docs/streaming-text" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

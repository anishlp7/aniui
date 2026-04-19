import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typing Indicator",
  description: "AniUI Typing Indicator — animated bouncing dots for chat typing status.",
  alternates: { canonical: "/docs/typing-indicator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

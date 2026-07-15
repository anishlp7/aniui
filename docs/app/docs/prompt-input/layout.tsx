import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Input",
  description: "AniUI Prompt Input — compound ChatGPT/Claude-style AI composer: auto-growing textarea on top, a toolbar slot for attach/model/voice buttons below, and a send arrow that becomes a stop button while streaming.",
  alternates: { canonical: "/docs/prompt-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

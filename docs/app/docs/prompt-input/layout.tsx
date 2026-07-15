import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Input",
  description: "AniUI Prompt Input — ChatGPT/Claude-style AI chat composer with auto-growing input, attach and voice buttons, and a send arrow that becomes a stop button while streaming.",
  alternates: { canonical: "/docs/prompt-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

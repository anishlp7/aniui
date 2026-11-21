import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatScreen",
  description: "Messaging screen with chat bubbles and input bar",
  alternates: { canonical: "/blocks/chat" },
  openGraph: { title: "ChatScreen", description: "Messaging screen with chat bubbles and input bar", url: "https://aniui.dev/blocks/chat" },
  twitter: { title: "ChatScreen", description: "Messaging screen with chat bubbles and input bar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

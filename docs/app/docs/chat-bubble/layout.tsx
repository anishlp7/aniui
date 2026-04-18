import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Bubble",
  description: "AniUI Chat Bubble component for React Native. Accessible, customizable, built with NativeWind and TypeScript.",
  alternates: { canonical: "/docs/chat-bubble" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

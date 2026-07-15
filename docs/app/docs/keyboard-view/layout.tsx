import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyboard View",
  description: "AniUI Keyboard View — KeyboardAvoidingView wrapper with platform-correct defaults and a simple offset prop.",
  alternates: { canonical: "/docs/keyboard-view" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

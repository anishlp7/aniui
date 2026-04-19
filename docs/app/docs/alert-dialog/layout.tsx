import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert Dialog",
  description: "AniUI Alert Dialog — confirmation modal with action and cancel buttons. Animated with Reanimated.",
  alternates: { canonical: "/docs/alert-dialog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

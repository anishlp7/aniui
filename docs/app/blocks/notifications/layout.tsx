import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NotificationsScreen",
  description: "Grouped notifications list with unread indicators",
  alternates: { canonical: "/blocks/notifications" },
  openGraph: { title: "NotificationsScreen", description: "Grouped notifications list with unread indicators", url: "https://aniui.dev/blocks/notifications" },
  twitter: { title: "NotificationsScreen", description: "Grouped notifications list with unread indicators" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

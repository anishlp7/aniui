import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SettingsScreen",
  description: "Settings screen with toggles, navigation rows, and danger zone",
  alternates: { canonical: "/blocks/settings" },
  openGraph: { title: "SettingsScreen", description: "Settings screen with toggles, navigation rows, and danger zone", url: "https://aniui.dev/blocks/settings" },
  twitter: { title: "SettingsScreen", description: "Settings screen with toggles, navigation rows, and danger zone" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

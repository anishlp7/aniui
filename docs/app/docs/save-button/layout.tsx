import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Save Button",
  description: "AniUI Save Button — Idle → loading → success → done state-machine save button with animated phase transitions.",
  alternates: { canonical: "/docs/save-button" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

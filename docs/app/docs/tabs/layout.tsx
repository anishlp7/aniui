import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tabs",
  description: "AniUI Tabs — navigation with filled/line variants, sm/md/lg sizes, vertical, disabled, icons, RTL.",
  alternates: { canonical: "/docs/tabs" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

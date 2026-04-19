import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direction Provider",
  description: "AniUI Direction Provider — RTL/LTR context with I18nManager and useDirection hook.",
  alternates: { canonical: "/docs/direction-provider" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

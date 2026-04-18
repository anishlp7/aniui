import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTL Support",
  description: "Right-to-left layout support for AniUI React Native components. Arabic, Hebrew, Persian, and Urdu with logical properties.",
  alternates: { canonical: "/docs/rtl" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phone Input",
  description: "AniUI Phone Input — phone number field with country code selector and dial code formatting.",
  alternates: { canonical: "/docs/phone-input" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input OTP",
  description: "AniUI Input OTP — one-time password input with individual cells and auto-focus navigation.",
  alternates: { canonical: "/docs/input-otp" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

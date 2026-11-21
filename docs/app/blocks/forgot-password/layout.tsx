import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ForgotPasswordScreen",
  description: "Password reset flow with email input and confirmation",
  alternates: { canonical: "/blocks/forgot-password" },
  openGraph: { title: "ForgotPasswordScreen", description: "Password reset flow with email input and confirmation", url: "https://aniui.dev/blocks/forgot-password" },
  twitter: { title: "ForgotPasswordScreen", description: "Password reset flow with email input and confirmation" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

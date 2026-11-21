import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LoginScreen",
  description: "Email/password login with social sign-in",
  alternates: { canonical: "/blocks/login" },
  openGraph: { title: "LoginScreen", description: "Email/password login with social sign-in", url: "https://aniui.dev/blocks/login" },
  twitter: { title: "LoginScreen", description: "Email/password login with social sign-in" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

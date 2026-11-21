import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUpScreen",
  description: "Registration with name, email, password, and terms checkbox",
  alternates: { canonical: "/blocks/signup" },
  openGraph: { title: "SignUpScreen", description: "Registration with name, email, password, and terms checkbox", url: "https://aniui.dev/blocks/signup" },
  twitter: { title: "SignUpScreen", description: "Registration with name, email, password, and terms checkbox" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

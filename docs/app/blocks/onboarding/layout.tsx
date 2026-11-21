import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OnboardingScreen",
  description: "Welcome carousel with step indicators and skip option",
  alternates: { canonical: "/blocks/onboarding" },
  openGraph: { title: "OnboardingScreen", description: "Welcome carousel with step indicators and skip option", url: "https://aniui.dev/blocks/onboarding" },
  twitter: { title: "OnboardingScreen", description: "Welcome carousel with step indicators and skip option" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

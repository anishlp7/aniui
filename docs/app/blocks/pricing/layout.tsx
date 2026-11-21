import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PricingScreen",
  description: "Subscription plan selector with monthly/yearly toggle",
  alternates: { canonical: "/blocks/pricing" },
  openGraph: { title: "PricingScreen", description: "Subscription plan selector with monthly/yearly toggle", url: "https://aniui.dev/blocks/pricing" },
  twitter: { title: "PricingScreen", description: "Subscription plan selector with monthly/yearly toggle" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

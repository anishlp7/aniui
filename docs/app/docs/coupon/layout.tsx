import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coupon",
  description: "AniUI Coupon — Promotional coupon card with dashed border and promo code.",
  alternates: { canonical: "/docs/coupon" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

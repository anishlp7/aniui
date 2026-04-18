import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compatibility",
  description: "AniUI compatibility matrix. Expo SDK 53-55, NativeWind v4-v5, bare React Native, New Architecture support.",
  alternates: { canonical: "/docs/compatibility" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

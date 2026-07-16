import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expo SDK 57",
  description:
    "Set up AniUI on Expo SDK 57 (React 19.2.3, React Native 0.86, Reanimated 4.5). Uniwind is the default styling engine; NativeWind v5 preview and v4 stable remain fully supported.",
  alternates: { canonical: "/docs/expo-57" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

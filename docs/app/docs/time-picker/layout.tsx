import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Picker",
  description: "AniUI Time Picker — native time and datetime selection for React Native via @react-native-community/datetimepicker.",
  alternates: { canonical: "/docs/time-picker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waveform",
  description: "AniUI Waveform — animated audio waveform bars for voice-recording and playback states, with configurable bar count, size, and color.",
  alternates: { canonical: "/docs/waveform" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

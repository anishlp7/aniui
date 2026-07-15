"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sizes = { sm: 12, md: 20, lg: 28 } as const;

// Deterministic per-bar amplitude — mirrors components/ui/waveform.tsx so the
// web preview draws the same organic wave without Math.random.
const amp = (i: number) => 0.35 + 0.65 * Math.abs(Math.sin(i * 2.4) * Math.cos(i * 0.7));

export interface PreviewWaveformProps {
  className?: string;
  bars?: number;
  /** Real audio amplitudes 0–1 — the newest `bars` values are shown, newest right, left-padded with silence (mirrors the RN source). */
  levels?: number[];
  active?: boolean;
  size?: keyof typeof sizes;
  color?: string;
}

export function PreviewWaveform({ className, bars = 28, levels, active = true, size = "md", color }: PreviewWaveformProps) {
  const max = sizes[size];
  const window = levels?.slice(-bars);
  const pad = window ? bars - window.length : 0;
  return (
    <div
      className={cn("flex items-center justify-center gap-0.5", className)}
      role="img"
      aria-label={active ? "Recording" : "Audio waveform"}
    >
      {Array.from({ length: bars }, (_, i) => {
        const level = window ? (i < pad ? 0 : window[i - pad]) : undefined;
        return (
          <div
            key={i}
            className={cn("w-0.5 rounded-full", !color && "bg-foreground")}
            style={{
              height:
                level !== undefined
                  ? Math.max(3, max * Math.min(1, Math.max(0, level)))
                  : Math.max(3, max * amp(i)),
              backgroundColor: color,
              // Audio-driven bars follow the signal (~100ms, like the RN source);
              // otherwise the ambient pulse animation is the fallback.
              transition: level !== undefined ? "height 100ms linear" : undefined,
              animation:
                level === undefined && active
                  ? `waveformPulse ${(260 + (i % 5) * 70) * 2}ms ease-in-out infinite`
                  : undefined,
            }}
          />
        );
      })}
      <style>{`@keyframes waveformPulse { 0%, 100% { transform: scaleY(1) } 50% { transform: scaleY(0.25) } }`}</style>
    </div>
  );
}

// Smooth pseudo-audio signal — a speech-like envelope (syllable pulses with
// pauses) that stands in for real mic metering. Deterministic per tick.
function micSample(t: number) {
  const syllable = 0.45 + 0.55 * Math.abs(Math.sin(t * 3.1) * Math.sin(t * 1.3));
  const pause = Math.sin(t * 0.55) > -0.35 ? 1 : 0.06;
  const jitter = 0.85 + 0.15 * Math.sin(t * 17);
  return Math.min(1, syllable * pause * jitter);
}

// Rolling last-N window at ~100ms — the same shape expo-av metering produces.
function useSimulatedMic(enabled: boolean, bars = 28) {
  const [levels, setLevels] = useState<number[]>([]);
  useEffect(() => {
    if (!enabled) {
      setLevels([]);
      return;
    }
    const start = performance.now();
    const id = setInterval(() => {
      const t = (performance.now() - start) / 1000;
      setLevels((prev) => [...prev.slice(-(bars - 1)), micSample(t)]);
    }, 100);
    return () => clearInterval(id);
  }, [enabled, bars]);
  return levels;
}

const modes = [
  { id: "mic", label: "Live mic" },
  { id: "ambient", label: "Ambient" },
  { id: "static", label: "Static" },
] as const;
type Mode = (typeof modes)[number]["id"];

export function PreviewWaveformDemo() {
  const [mode, setMode] = useState<Mode>("mic");
  const levels = useSimulatedMic(mode === "mic");
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="flex h-16 w-full items-center gap-3 rounded-2xl border border-input bg-background px-4">
        {mode === "mic" && <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-red-500" />}
        <PreviewWaveform levels={mode === "mic" ? levels : undefined} active={mode !== "static"} className="flex-1" />
      </div>
      <div className="flex items-center gap-1 rounded-full border border-input bg-background p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
              mode === m.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {mode === "mic" && "levels — bars follow a (simulated) mic signal, newest on the right."}
        {mode === "ambient" && "active — the ambient animation, the fallback when no levels are wired."}
        {mode === "static" && "active={false} — a frozen wave."}
      </p>
    </div>
  );
}

export function PreviewWaveformLevelsDemo() {
  const [listening, setListening] = useState(true);
  const levels = useSimulatedMic(listening);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="flex w-full items-center gap-3 rounded-2xl border border-input bg-background px-4 py-3">
        <span className={cn("h-2 w-2 shrink-0 rounded-full", listening ? "animate-pulse bg-red-500" : "bg-muted-foreground/40")} />
        <PreviewWaveform levels={listening ? levels : undefined} active={false} className="flex-1" />
      </div>
      <button
        type="button"
        onClick={() => setListening((l) => !l)}
        className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
      >
        {listening ? "Stop mic" : "Start mic"}
      </button>
      <p className="text-center text-xs text-muted-foreground">Simulated metering — on device this is real expo-av mic data.</p>
    </div>
  );
}

// Deterministic "decoded peaks" — the 0–1 amplitudes you'd extract from an
// audio file for a playback scrubber.
const decodedPeaks = Array.from({ length: 32 }, (_, i) =>
  Math.min(1, Math.max(0.08, Math.abs(Math.sin(i * 0.9) * 0.8 + Math.sin(i * 0.35) * 0.5)))
);

export function PreviewWaveformPlaybackDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-input bg-background px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <svg className="h-4 w-4 translate-x-px" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </div>
      <PreviewWaveform levels={decodedPeaks} active={false} bars={32} size="sm" className="flex-1" />
      <span className="text-xs tabular-nums text-muted-foreground">0:12</span>
    </div>
  );
}

export function PreviewWaveformCustomDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <PreviewWaveform size="sm" bars={16} />
      <PreviewWaveform size="md" />
      <PreviewWaveform size="lg" bars={40} color="#ef4444" />
    </div>
  );
}

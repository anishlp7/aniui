"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const sizes = { sm: 12, md: 20, lg: 28 } as const;

// Deterministic per-bar amplitude — mirrors components/ui/waveform.tsx so the
// web preview draws the same organic wave without Math.random.
const amp = (i: number) => 0.35 + 0.65 * Math.abs(Math.sin(i * 2.4) * Math.cos(i * 0.7));

export interface PreviewWaveformProps {
  className?: string;
  bars?: number;
  active?: boolean;
  size?: keyof typeof sizes;
  color?: string;
}

export function PreviewWaveform({ className, bars = 28, active = true, size = "md", color }: PreviewWaveformProps) {
  const max = sizes[size];
  return (
    <div
      className={cn("flex items-center justify-center gap-0.5", className)}
      role="img"
      aria-label={active ? "Recording" : "Audio waveform"}
    >
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className={cn("w-0.5 rounded-full", !color && "bg-foreground")}
          style={{
            height: Math.max(3, max * amp(i)),
            backgroundColor: color,
            animation: active ? `waveformPulse ${(260 + (i % 5) * 70) * 2}ms ease-in-out infinite` : undefined,
          }}
        />
      ))}
      <style>{`@keyframes waveformPulse { 0%, 100% { transform: scaleY(1) } 50% { transform: scaleY(0.25) } }`}</style>
    </div>
  );
}

export function PreviewWaveformDemo() {
  const [active, setActive] = useState(true);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <PreviewWaveform active={active} />
      <button
        type="button"
        onClick={() => setActive((a) => !a)}
        className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
      >
        {active ? "Stop — static wave" : "Animate — recording"}
      </button>
    </div>
  );
}

export function PreviewWaveformStaticDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-input bg-background px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <svg className="h-4 w-4 translate-x-px" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </div>
      <PreviewWaveform active={false} size="sm" className="flex-1" />
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

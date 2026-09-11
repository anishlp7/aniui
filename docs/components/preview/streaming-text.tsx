"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewStreamingTextProps {
  className?: string;
  text: string;
  typewriter?: boolean;
  speed?: number;
  streaming?: boolean;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function PreviewStreamingText({
  className, text, typewriter = true, speed = 60, streaming, showCursor = true, onComplete,
}: PreviewStreamingTextProps) {
  const [count, setCount] = useState(typewriter ? 0 : text.length);
  const shown = useRef("");

  // If `text` was replaced (not appended to), restart the reveal.
  useEffect(() => {
    if (!text.startsWith(shown.current)) setCount(typewriter ? 0 : text.length);
  }, [text, typewriter]);

  useEffect(() => {
    if (!typewriter || count >= text.length) return;
    const tick = 33;
    const chars = Math.max(1, Math.round((speed * tick) / 1000));
    const timer = setInterval(() => {
      setCount((c) => Math.min(text.length, c + chars));
    }, tick);
    return () => clearInterval(timer);
  }, [typewriter, count, text, speed]);

  const completed = useRef(false);
  useEffect(() => {
    const isDone = count >= text.length && text.length > 0 && !streaming;
    if (isDone && !completed.current) { completed.current = true; onComplete?.(); }
    if (!isDone) completed.current = false;
  }, [count, text, streaming, onComplete]);

  const visible = typewriter ? text.slice(0, count) : text;
  shown.current = visible;
  const done = visible.length >= text.length && !streaming;

  return (
    <p className={cn("text-base text-foreground", className)}>
      {visible}
      {showCursor && !done && <span className="animate-pulse text-foreground">▍</span>}
    </p>
  );
}

const RESPONSE =
  "AniUI ships 148 components you copy into your own project — no npm dependency, no black box.";

export function PreviewStreamingTextDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="w-full max-w-sm space-y-3">
      <PreviewStreamingText key={run} text={RESPONSE} className="text-sm" />
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
      >
        Replay
      </button>
    </div>
  );
}

const CHUNKS = [
  "Sure — ",
  "three reasons to copy components ",
  "instead of installing them: ",
  "you own the code, ",
  "you can patch bugs instantly, ",
  "and your bundle only ships what you use.",
];

export function PreviewStreamingTextChunksDemo() {
  const [chunkCount, setChunkCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (chunkCount >= CHUNKS.length) { setRunning(false); return; }
    const t = setTimeout(() => setChunkCount((c) => c + 1), 550);
    return () => clearTimeout(t);
  }, [running, chunkCount]);

  const text = CHUNKS.slice(0, chunkCount).join("");

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="min-h-20 rounded-xl border border-border bg-card p-3">
        {text || running ? (
          <PreviewStreamingText text={text} streaming={running} className="text-sm" />
        ) : (
          <p className="text-sm text-muted-foreground">Press start to simulate an API stream — tokens arrive in chunks, the reveal never stutters.</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => { setChunkCount(0); setRunning(true); }}
        className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
      >
        Start stream
      </button>
    </div>
  );
}

export function PreviewStreamingTextBubbleDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5">
          <PreviewStreamingText
            key={run}
            text="Of course! Your order #4821 shipped this morning and should arrive by Thursday."
            className="text-sm text-secondary-foreground"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
      >
        Replay
      </button>
    </div>
  );
}

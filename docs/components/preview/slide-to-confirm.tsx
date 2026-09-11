"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const THUMB = 48;
const PAD = 4;

function ChevronRightIcon() {
  return <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>;
}
function CheckIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
}

export interface PreviewSlideToConfirmProps {
  className?: string;
  label?: string;
  confirmedLabel?: string;
  disabled?: boolean;
  onConfirm?: () => void;
}

export function PreviewSlideToConfirm({
  className, label = "Slide to confirm", confirmedLabel = "Confirmed", disabled, onConfirm,
}: PreviewSlideToConfirmProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [tx, setTx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled || confirmed) return;
    const track = trackRef.current;
    if (!track) return;
    const end = Math.max(0, track.clientWidth - THUMB - PAD * 2);
    const startX = e.clientX;
    setDragging(true);

    const onMove = (ev: PointerEvent) => {
      setTx(Math.max(0, Math.min(end, ev.clientX - startX)));
    };
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setDragging(false);
      const travel = Math.max(0, Math.min(end, ev.clientX - startX));
      // Mirror the native behavior: confirm at 92% travel, spring back otherwise.
      if (travel >= end * 0.92) {
        setTx(end);
        setConfirmed(true);
        onConfirm?.();
      } else {
        setTx(0);
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const end = trackRef.current ? Math.max(1, trackRef.current.clientWidth - THUMB - PAD * 2) : 1;

  return (
    <div
      ref={trackRef}
      role="button"
      aria-label={confirmed ? confirmedLabel : label}
      aria-disabled={disabled}
      className={cn(
        "relative flex h-14 w-full max-w-xs items-center rounded-full bg-secondary select-none",
        disabled && "opacity-50",
        className
      )}
    >
      <span
        className="absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground pointer-events-none"
        style={{ opacity: confirmed ? 0 : 1 - tx / end }}
      >
        {label}
      </span>
      {confirmed && (
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-foreground pointer-events-none">
          {confirmedLabel}
        </span>
      )}
      <div
        className={cn(
          "relative ml-1 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground touch-none",
          !disabled && !confirmed && "cursor-grab",
          dragging ? "cursor-grabbing" : "transition-transform duration-200"
        )}
        style={{ transform: `translateX(${tx}px)` }}
        onPointerDown={handlePointerDown}
      >
        {confirmed ? <CheckIcon /> : <ChevronRightIcon />}
      </div>
    </div>
  );
}

export function PreviewSlideToConfirmDemo() {
  const [attempt, setAttempt] = useState(0);
  const [paid, setPaid] = useState(false);
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-3">
      {/* Remount via key to reset — same pattern as the native component */}
      <PreviewSlideToConfirm
        key={attempt}
        label="Slide to pay $12.00"
        confirmedLabel="Payment sent!"
        onConfirm={() => setPaid(true)}
      />
      {paid && (
        <button
          type="button"
          onClick={() => { setAttempt((a) => a + 1); setPaid(false); }}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          Reset (remount via key)
        </button>
      )}
    </div>
  );
}

export function PreviewSlideToConfirmDestructiveDemo() {
  const [attempt, setAttempt] = useState(0);
  const [deleted, setDeleted] = useState(false);
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-3">
      <PreviewSlideToConfirm
        key={attempt}
        className="bg-destructive/15"
        label="Slide to delete account"
        confirmedLabel="Account deleted"
        onConfirm={() => setDeleted(true)}
      />
      {deleted && (
        <button
          type="button"
          onClick={() => { setAttempt((a) => a + 1); setDeleted(false); }}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          Reset
        </button>
      )}
    </div>
  );
}

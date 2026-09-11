"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Profile = { name: string; age: number; bio: string; tint: string };

const PROFILES: Profile[] = [
  { name: "Aria", age: 27, bio: "Product designer · 3 mi away", tint: "from-rose-500/25" },
  { name: "Jules", age: 31, bio: "Backend engineer · 5 mi away", tint: "from-sky-500/25" },
  { name: "Nova", age: 24, bio: "Mobile developer · 1 mi away", tint: "from-emerald-500/25" },
];

const CARD_WIDTH = 240;

function DeckCard({
  profile,
  onSwipe,
}: {
  profile: Profile;
  onSwipe: (dir: "left" | "right") => void;
}) {
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (leaving) return;
    const startX = e.clientX;
    const startY = e.clientY;
    setDragging(true);

    const onMove = (ev: PointerEvent) => {
      setDx(ev.clientX - startX);
      setDy(ev.clientY - startY);
    };
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setDragging(false);
      const travel = ev.clientX - startX;
      // Mirror the native fling physics: 35% of the width, or a fast fling.
      if (Math.abs(travel) > CARD_WIDTH * 0.35) {
        const dir = travel > 0 ? "right" : "left";
        setLeaving(true);
        setDx(travel > 0 ? CARD_WIDTH * 1.6 : -CARD_WIDTH * 1.6);
        setTimeout(() => onSwipe(dir), 200);
      } else {
        setDx(0);
        setDy(0);
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div
      className={cn(
        "absolute inset-0 cursor-grab touch-none select-none",
        dragging ? "" : "transition-transform duration-200",
        dragging && "cursor-grabbing"
      )}
      style={{ transform: `translate(${dx}px, ${dy}px) rotate(${(dx / CARD_WIDTH) * 12}deg)` }}
      onPointerDown={handlePointerDown}
    >
      <div className={cn("flex h-full flex-col justify-end rounded-3xl border border-border bg-gradient-to-b to-card p-5 shadow-lg", profile.tint)}>
        {/* Like / Nope stamps fade in with drag direction */}
        <span
          className="absolute left-4 top-4 rounded-md border-2 border-emerald-500 px-2 py-0.5 text-sm font-bold text-emerald-500 -rotate-12"
          style={{ opacity: Math.max(0, Math.min(1, dx / 60)) }}
        >
          LIKE
        </span>
        <span
          className="absolute right-4 top-4 rounded-md border-2 border-destructive px-2 py-0.5 text-sm font-bold text-destructive rotate-12"
          style={{ opacity: Math.max(0, Math.min(1, -dx / 60)) }}
        >
          NOPE
        </span>
        <p className="text-xl font-bold text-foreground">
          {profile.name}, {profile.age}
        </p>
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
      </div>
    </div>
  );
}

export function PreviewSwipeDeckDemo() {
  const [index, setIndex] = useState(0);
  const [last, setLast] = useState<string | null>(null);
  const top = PROFILES[index];
  const next = PROFILES[index + 1];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-72" style={{ width: CARD_WIDTH }}>
        {next && (
          <div className="absolute inset-0 scale-95 translate-y-2 pointer-events-none">
            <div className={cn("flex h-full flex-col justify-end rounded-3xl border border-border bg-gradient-to-b to-card p-5", next.tint)}>
              <p className="text-xl font-bold text-foreground">
                {next.name}, {next.age}
              </p>
              <p className="text-sm text-muted-foreground">{next.bio}</p>
            </div>
          </div>
        )}
        {top ? (
          <DeckCard
            key={`${top.name}-${index}`}
            profile={top}
            onSwipe={(dir) => {
              setLast(dir === "right" ? `Liked ${top.name}` : `Passed on ${top.name}`);
              setIndex((i) => i + 1);
            }}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-border">
            <p className="text-sm font-medium text-foreground">You&rsquo;re all caught up</p>
            <p className="text-xs text-muted-foreground">onEmpty just fired.</p>
            <button
              type="button"
              onClick={() => { setIndex(0); setLast(null); }}
              className="mt-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              Reset deck
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{last ?? "Drag the card left or right."}</p>
    </div>
  );
}

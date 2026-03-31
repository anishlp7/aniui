"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewSwipeableListItem({ className }: { className?: string }) {
  const [swiped, setSwiped] = useState<string | null>(null);

  const items = [
    { id: "1", title: "Design Review", desc: "Review the new onboarding flow mockups" },
    { id: "2", title: "Team Standup", desc: "Daily sync at 10:00 AM" },
    { id: "3", title: "Deploy v2.1", desc: "Push release to production" },
  ];

  return (
    <div className={cn("w-full space-y-0 rounded-lg border border-border overflow-hidden", className)}>
      {items.map((item, i) => (
        <SwipeableRow
          key={item.id}
          title={item.title}
          desc={item.desc}
          isLast={i === items.length - 1}
          onAction={(action) => setSwiped(`${action}: ${item.title}`)}
        />
      ))}
      {swiped && (
        <div className="px-4 py-2 bg-muted text-xs text-muted-foreground text-center">
          Action: {swiped}
        </div>
      )}
    </div>
  );
}

function SwipeableRow({
  title,
  desc,
  isLast,
  onAction,
}: {
  title: string;
  desc: string;
  isLast: boolean;
  onAction: (action: string) => void;
}) {
  const [offsetX, setOffsetX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const actionWidth = 80;

  return (
    <div className="relative overflow-hidden">
      {/* Right actions (revealed on swipe left) */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-row">
        <button
          type="button"
          className="w-20 flex items-center justify-center bg-amber-500 text-white text-xs font-medium cursor-pointer"
          onClick={() => { onAction("Archive"); setOffsetX(0); }}
        >
          Archive
        </button>
        <button
          type="button"
          className="w-20 flex items-center justify-center bg-destructive text-white text-xs font-medium cursor-pointer"
          onClick={() => { onAction("Delete"); setOffsetX(0); }}
        >
          Delete
        </button>
      </div>
      {/* Left actions (revealed on swipe right) */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-row">
        <button
          type="button"
          className="w-20 flex items-center justify-center bg-green-600 text-white text-xs font-medium cursor-pointer"
          onClick={() => { onAction("Pin"); setOffsetX(0); }}
        >
          Pin
        </button>
      </div>
      {/* Content */}
      <div
        className={cn(
          "relative bg-card px-4 py-3 select-none",
          !isLast && "border-b border-border",
          dragging ? "" : "transition-transform duration-200"
        )}
        style={{ transform: `translateX(${offsetX}px)` }}
        draggable={false}
        onPointerDown={(e) => {
          const startX = e.clientX;
          const startOffset = offsetX;
          setDragging(true);

          const onMove = (ev: PointerEvent) => {
            const dx = ev.clientX - startX;
            const next = startOffset + dx;
            setOffsetX(Math.max(-actionWidth * 2, Math.min(actionWidth, next)));
          };
          const onUp = () => {
            setDragging(false);
            setOffsetX((prev) => {
              if (prev < -actionWidth) return -actionWidth * 2;
              if (prev > actionWidth * 0.5) return actionWidth;
              return 0;
            });
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
          };
          window.addEventListener("pointermove", onMove);
          window.addEventListener("pointerup", onUp);
        }}
      >
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

const seeds = ["a", "b", "c"];

export function PreviewPhotoStack({ className }: { className?: string }) {
  const offsets = [
    { rotate: -8, x: -12, z: 1 },
    { rotate: 4, x: 0, z: 2 },
    { rotate: 12, x: 12, z: 3 },
  ];

  return (
    <div className={cn("relative h-32 w-40", className)}>
      {offsets.map((o, i) => (
        <img
          key={i}
          src={`https://picsum.photos/seed/${seeds[i]}/200/200`}
          alt=""
          className="absolute inset-0 h-full w-full rounded-xl border border-border object-cover shadow-md"
          style={{ transform: `translateX(${o.x}px) rotate(${o.rotate}deg)`, zIndex: o.z }}
        />
      ))}
    </div>
  );
}

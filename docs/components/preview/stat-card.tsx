"use client";

import React, { useState } from "react";

const stats = [
  { label: "Revenue", value: "$12,345", change: "+12.5%", up: true },
  { label: "Users", value: "1,234", change: "+8.2%", up: true },
  { label: "Bounce Rate", value: "24.5%", change: "-3.1%", up: false },
];

export function PreviewStatCardDemo() {
  const [idx, setIdx] = useState(0);
  const stat = stats[idx];

  return (
    <button onClick={() => setIdx((i) => (i + 1) % stats.length)} className="rounded-lg border border-border bg-card p-4 w-full max-w-[200px] text-left cursor-pointer hover:bg-accent/50 transition-colors">
      <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
      <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className={`text-sm font-medium ${stat.up ? "text-green-500" : "text-destructive"}`}>
          {stat.up ? "\u2191" : "\u2193"} {stat.change}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-2">Click to cycle stats</p>
    </button>
  );
}

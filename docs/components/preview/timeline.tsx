"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const events = [
  { title: "Order placed", desc: "Your order has been confirmed", time: "2:00 PM", color: "bg-green-500" },
  { title: "Processing", desc: "Your order is being prepared", time: "2:15 PM", color: "bg-primary" },
  { title: "Shipping", desc: "Waiting for pickup", time: "Pending", color: "bg-muted-foreground", last: true },
];

export function PreviewTimelineDemo() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-full max-w-sm">
      {events.map((e, i) => (
        <div key={i} className="flex">
          <div className="flex flex-col items-center mr-3">
            <div className={cn("h-3 w-3 rounded-full z-10", e.color)} />
            {!e.last && <div className="flex-1 w-0.5 bg-border mt-1" />}
          </div>
          <div className={cn("flex-1", !e.last && "pb-6")}>
            <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{e.title}</span>
                <span className="text-xs text-muted-foreground">{e.time}</span>
              </div>
            </button>
            {expanded === i && <p className="text-sm text-muted-foreground mt-1 animate-in fade-in slide-in-from-top-1">{e.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

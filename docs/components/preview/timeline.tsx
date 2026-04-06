"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Variant = "completed" | "active" | "pending";
const events: { title: string; desc: string; time: string; variant: Variant }[] = [
  { title: "Order confirmed", desc: "Your order #4821 has been placed", time: "Mon 9:00 AM", variant: "completed" },
  { title: "Payment received", desc: "Visa ending in 4242", time: "Mon 9:01 AM", variant: "completed" },
  { title: "Preparing shipment", desc: "Warehouse is packing your items", time: "Tue 11:30 AM", variant: "active" },
  { title: "In transit", desc: "Estimated delivery Wed", time: "Pending", variant: "pending" },
  { title: "Delivered", desc: "Package will arrive at your door", time: "Pending", variant: "pending" },
];

export function PreviewTimelineDemo() {
  return (
    <div className="w-full max-w-sm">
      {events.map((e, i) => {
        const isLast = i === events.length - 1;
        return (
          <div key={i} className="flex">
            <div className="flex flex-col items-center w-6" style={{ paddingTop: 4 }}>
              <div className={cn(
                "h-3 w-3 rounded-full flex items-center justify-center",
                e.variant === "completed" && "bg-green-500",
                e.variant === "active" && "bg-primary border-2 border-primary/30",
                e.variant === "pending" && "bg-muted-foreground/40",
              )}>
                {e.variant === "completed" && <span className="text-[7px] leading-none text-white font-bold">&#x2713;</span>}
              </div>
              {!isLast && <div className="flex-1 w-px bg-border mt-1.5" />}
            </div>
            <div className={cn("flex-1 ml-3", isLast ? "pb-0" : "pb-6")}>
              <div className="flex items-start justify-between gap-2">
                <span className={cn("text-sm font-medium flex-1", e.variant === "pending" ? "text-muted-foreground" : "text-foreground")}>{e.title}</span>
                <span className="text-[11px] text-muted-foreground">{e.time}</span>
              </div>
              <p className={cn("text-[13px] leading-5 mt-1", e.variant === "pending" ? "text-muted-foreground/60" : "text-muted-foreground")}>{e.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

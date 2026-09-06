"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Shipping", body: "Free delivery on orders over $50." },
  { title: "Returns", body: "30-day hassle-free returns." },
  { title: "Support", body: "24/7 chat with our team." },
];

export function PreviewDisclosureGroup({ className }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("w-full max-w-[280px] rounded-xl border border-border divide-y divide-border overflow-hidden", className)}>
      {items.map((item, i) => (
        <div key={item.title}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-accent/50 cursor-pointer"
          >
            {item.title}
            <span className="text-muted-foreground">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <p className="px-4 pb-3 text-xs text-muted-foreground">{item.body}</p>}
        </div>
      ))}
    </div>
  );
}

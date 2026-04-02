"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const steps = ["Account", "Profile", "Review"];

export function PreviewProgressStepsDemo() {
  const [current, setCurrent] = useState(1);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center w-full">
        {steps.map((label, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className={cn("flex-1 h-0.5 mx-2", i <= current ? "bg-primary" : "bg-muted")} />}
            <div className="flex flex-col items-center gap-1">
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold",
                i < current ? "bg-primary text-primary-foreground" :
                i === current ? "border-2 border-primary bg-background text-primary" :
                "bg-muted text-muted-foreground"
              )}>
                {i < current ? "\u2713" : i + 1}
              </div>
              <span className={cn("text-xs", i === current ? "text-primary font-medium" : "text-muted-foreground")}>{label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} className="px-4 py-1.5 rounded-md border border-input text-sm text-foreground cursor-pointer hover:bg-accent disabled:opacity-30 disabled:pointer-events-none">Back</button>
        <button onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))} disabled={current === steps.length - 1} className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm cursor-pointer hover:bg-primary/90 disabled:opacity-30 disabled:pointer-events-none">Next</button>
      </div>
    </div>
  );
}

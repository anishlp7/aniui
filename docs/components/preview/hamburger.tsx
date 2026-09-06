"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewHamburger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className={cn("relative flex h-12 w-12 items-center justify-center cursor-pointer", className)}
    >
      <span
        className="absolute h-0.5 w-6 rounded-full bg-foreground transition-transform duration-300"
        style={{ transform: open ? "translateY(0) rotate(45deg)" : "translateY(-7px) rotate(0deg)" }}
      />
      <span
        className="absolute h-0.5 w-6 rounded-full bg-foreground transition-all duration-200"
        style={{ opacity: open ? 0 : 1, transform: open ? "scale(0)" : "scale(1)" }}
      />
      <span
        className="absolute h-0.5 w-6 rounded-full bg-foreground transition-transform duration-300"
        style={{ transform: open ? "translateY(0) rotate(-45deg)" : "translateY(7px) rotate(0deg)" }}
      />
    </button>
  );
}

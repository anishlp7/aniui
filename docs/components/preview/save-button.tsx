"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "loading" | "success" | "done";

export function PreviewSaveButton({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("idle");

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("loading");
    setTimeout(() => setPhase("success"), 900);
    setTimeout(() => setPhase("done"), 1400);
    setTimeout(() => setPhase("idle"), 2600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={phase !== "idle"}
      className={cn(
        "flex h-12 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
        phase === "loading" ? "w-12 bg-foreground" : "w-28",
        phase === "idle" && "bg-secondary text-secondary-foreground",
        phase === "success" && "bg-foreground text-background",
        phase === "done" && "bg-foreground text-background",
        className
      )}
    >
      {phase === "idle" && "Save"}
      {phase === "loading" && <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />}
      {phase === "success" && "✓"}
      {phase === "done" && "Saved"}
    </button>
  );
}

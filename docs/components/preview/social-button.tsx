"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewSocialButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-12 items-center gap-3 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-accent cursor-pointer",
        className
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">G</span>
      Continue with Google
    </button>
  );
}

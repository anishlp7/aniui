"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewSpinButton({ className }: { className?: string }) {
  const [saving, setSaving] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSaving((s) => !s)}
      className={cn("flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground cursor-pointer", className)}
    >
      <span>{saving ? "Saving" : "Save"}</span>
      {saving && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="14 40" />
        </svg>
      )}
    </button>
  );
}

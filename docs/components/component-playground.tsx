"use client";

import React, { useState } from "react";

interface ComponentPlaygroundProps {
  code: string;
  /** Pre-rendered highlighted HTML from server-side shiki — the sole caller
   * (highlighted-playground.tsx) always computes and passes this. */
  highlightedCode: string;
  children: React.ReactNode;
  /** Use "inline" for overlay components (dialog, drawer, toast) that escape containment */
  variant?: "phone" | "inline";
  /** Optional Expo Snack URL for real device preview */
  snackUrl?: string;
}

export function ComponentPlaygroundClient({ code, highlightedCode, children, variant = "phone", snackUrl }: ComponentPlaygroundProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      {/* Preview area */}
      <div className="flex items-center justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 p-4 sm:p-8">
        {variant === "phone" ? (
          /* Phone frame mockup */
          <div className="relative w-full max-w-[320px] overflow-hidden rounded-[2.75rem] border-[3px] border-foreground/[0.08] bg-background shadow-xl shadow-black/10 ring-1 ring-black/5 dark:border-foreground/[0.14] dark:ring-white/5">
            {/* Dynamic Island */}
            <div className="flex justify-center pt-2.5 pb-1.5">
              <div className="h-[22px] w-[84px] rounded-full bg-zinc-950 ring-1 ring-white/5 dark:bg-black dark:ring-white/10" />
            </div>
            {/* Screen content */}
            <div className="flex min-h-[220px] items-center justify-center px-5 py-5">
              {children}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center pb-2.5 pt-1.5">
              <div className="h-1 w-28 rounded-full bg-foreground/20" />
            </div>
          </div>
        ) : (
          /* Inline preview for overlay components */
          <div className="w-full min-h-[200px] flex items-center justify-center rounded-lg bg-background p-6">
            {children}
          </div>
        )}
      </div>

      {/* Web preview disclaimer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
        <span>Web preview — components render natively on iOS &amp; Android</span>
        {snackUrl && (
          <a href={snackUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
            Open in Expo Snack →
          </a>
        )}
      </div>

      {/* Code section */}
      <div className="relative border-t border-border">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors z-10 cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <div
          className="shiki-wrapper overflow-x-auto bg-secondary/50 p-4 text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}

/** Alias for backward compatibility with "use client" pages */
export const ComponentPlayground = ComponentPlaygroundClient;

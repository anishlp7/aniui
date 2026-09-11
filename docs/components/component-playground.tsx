"use client";

import React, { useState } from "react";

interface ComponentPlaygroundProps {
  code: string;
  /** Pre-rendered highlighted HTML from server-side shiki — the sole caller
   * (highlighted-playground.tsx) always computes and passes this. */
  highlightedCode: string;
  children?: React.ReactNode;
  /** Optional Expo Snack URL for real device preview */
  snackUrl?: string;
}

export function ComponentPlaygroundClient({ code, highlightedCode, children, snackUrl }: ComponentPlaygroundProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      {children ? (
        <>
          {/* Preview area — a plain, generously-sized canvas. No device-frame
              chrome: a fixed phone bezel squeezed every preview into ~270px
              regardless of what the component actually needed, which made
              wide/horizontal components (carousels, tab bars, etc.) look
              cramped and hard to read. */}
          <div className="flex items-center justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 p-6 sm:p-10">
            <div className="flex min-h-[260px] w-full max-w-2xl items-center justify-center rounded-xl border border-border/60 bg-background p-8 shadow-sm">
              {children}
            </div>
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
        </>
      ) : null}

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

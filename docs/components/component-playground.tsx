"use client";

import React, { useState, useMemo } from "react";
import { highlight } from "sugar-high";

interface ComponentPlaygroundProps {
  code: string;
  /** Pre-rendered highlighted HTML from server-side shiki */
  highlightedCode?: string;
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
          <div className="relative w-full max-w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
            {/* Dynamic Island */}
            <div className="flex justify-center pt-2 pb-1 bg-background">
              <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
            </div>
            {/* Screen content */}
            <div className="px-5 py-4 min-h-[200px] flex items-center justify-center">
              {children}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center pb-2 pt-1 bg-background">
              <div className="h-1 w-28 rounded-full bg-foreground/15" />
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
        {highlightedCode ? (
          <div
            className="shiki-wrapper overflow-x-auto bg-secondary/50 p-4 text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <SugarHighBlock code={code} />
        )}
      </div>
    </div>
  );
}

function SugarHighBlock({ code }: { code: string }) {
  const html = useMemo(() => highlight(code), [code]);
  return (
    <pre className="overflow-x-auto bg-secondary/50 p-4 text-sm leading-relaxed">
      <code className="font-mono" dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

/** Alias for backward compatibility with "use client" pages */
export const ComponentPlayground = ComponentPlaygroundClient;

"use client";

import React, { useState } from "react";

interface ComponentPlaygroundProps {
  code: string;
  children: React.ReactNode;
}

export function ComponentPlayground({ code, children }: ComponentPlaygroundProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden">
      <div className="flex min-h-[200px] items-center justify-center bg-background p-10">
        {children}
      </div>
      <div className="relative border-t border-border">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className="overflow-x-auto bg-secondary/50 p-4 text-sm leading-relaxed">
          <code className="text-foreground font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}

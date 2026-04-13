"use client";

import React, { useState, useMemo } from "react";
import { highlight } from "sugar-high";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlight(code), [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="border-b border-border bg-secondary/50 px-4 py-2 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors z-10"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="overflow-x-auto bg-secondary/30 p-4 text-sm leading-relaxed">
        <code className="font-mono" dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

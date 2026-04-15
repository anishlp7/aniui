"use client";

import React from "react";

function KbdPreview({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md border border-border bg-muted px-1.5 min-h-6">
      <span className="text-xs font-mono text-muted-foreground">{children}</span>
    </span>
  );
}

export function PreviewKbdDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <KbdPreview>Ctrl</KbdPreview>
      <KbdPreview>Shift</KbdPreview>
      <KbdPreview>Enter</KbdPreview>
      <KbdPreview>Esc</KbdPreview>
    </div>
  );
}

export function PreviewKbdGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-1">
        <KbdPreview>Cmd</KbdPreview>
        <span className="text-xs text-muted-foreground">+</span>
        <KbdPreview>C</KbdPreview>
      </div>
      <div className="flex items-center gap-1">
        <KbdPreview>Cmd</KbdPreview>
        <span className="text-xs text-muted-foreground">+</span>
        <KbdPreview>Shift</KbdPreview>
        <span className="text-xs text-muted-foreground">+</span>
        <KbdPreview>P</KbdPreview>
      </div>
    </div>
  );
}

export function PreviewKbdSizes() {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex items-center justify-center rounded-md border border-border bg-muted px-1 min-h-5"><span className="text-[10px] font-mono text-muted-foreground">sm</span></span>
      <KbdPreview>md</KbdPreview>
      <span className="inline-flex items-center justify-center rounded-md border border-border bg-muted px-2 min-h-7"><span className="text-sm font-mono text-muted-foreground">lg</span></span>
    </div>
  );
}

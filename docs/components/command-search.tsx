"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  gettingStartedItems,
  componentItems,
  chartItems,
  blockItems,
} from "@/lib/nav-data";

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [router, onOpenChange]
  );

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-[15%] z-50 w-full max-w-2xl -translate-x-1/2 px-4">
        <Command
          className="rounded-xl border border-border bg-background shadow-2xl overflow-hidden w-full"
          label="Search documentation"
        >
          {/* Input */}
          <div className="flex items-center gap-3 border-b border-border px-4 h-12">
            <SearchIcon />
            <Command.Input
              placeholder="Search..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
            <button
              onClick={() => onOpenChange(false)}
              className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 hover:bg-accent transition-colors"
            >
              Esc
            </button>
          </div>

          {/* Results */}
          <Command.List className="max-h-[320px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Getting Started"
              className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {gettingStartedItems.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.title}
                  onSelect={() => navigate(item.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground cursor-pointer data-[selected=true]:bg-accent"
                >
                  <FileIcon />
                  {item.title}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Components"
              className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {componentItems.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.title}
                  onSelect={() => navigate(item.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground cursor-pointer data-[selected=true]:bg-accent"
                >
                  <FileIcon />
                  {item.title}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Charts"
              className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {chartItems.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.title}
                  onSelect={() => navigate(item.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground cursor-pointer data-[selected=true]:bg-accent"
                >
                  <FileIcon />
                  {item.title}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Blocks"
              className="[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
            >
              {blockItems.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.title}
                  onSelect={() => navigate(item.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground cursor-pointer data-[selected=true]:bg-accent"
                >
                  <FileIcon />
                  {item.title}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </>
  );
}

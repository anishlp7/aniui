"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface CommandItem {
  label: string;
  value: string;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
}

const sampleItems: CommandItem[] = [
  { label: "New File", value: "new-file", shortcut: "Cmd+N", group: "Actions" },
  { label: "Save", value: "save", shortcut: "Cmd+S", group: "Actions" },
  { label: "Export", value: "export", shortcut: "Cmd+E", group: "Actions" },
  { label: "Home", value: "home", group: "Navigation" },
  { label: "Settings", value: "settings", shortcut: "Cmd+,", group: "Navigation" },
  { label: "Profile", value: "profile", group: "Navigation" },
];

export function PreviewCommandMenuDemo() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return sampleItems;
    const q = search.toLowerCase();
    return sampleItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.value.toLowerCase().includes(q) ||
        (item.group ?? "").toLowerCase().includes(q)
    );
  }, [search]);

  const groups = useMemo(() => {
    const map: Record<string, CommandItem[]> = {};
    for (const item of filtered) {
      const key = item.group ?? "";
      (map[key] ??= []).push(item);
    }
    return Object.entries(map);
  }, [filtered]);

  const handleSelect = (item: CommandItem) => {
    if (item.disabled) return;
    setSelected(item.label);
    setOpen(false);
    setSearch("");
  };

  const close = () => {
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors"
      >
        Open Command Menu
      </button>
      {selected && (
        <p className="text-sm text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{selected}</span>
        </p>
      )}

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={close}>
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-border">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5Z" />
                <path d="m16 16 4.5 4.5" />
              </svg>
              <input
                type="text"
                className="flex-1 h-12 pl-3 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              ) : (
                groups.map(([title, items]) => (
                  <div key={title}>
                    {title && (
                      <div className="px-4 pt-3 pb-1.5">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {title}
                        </span>
                      </div>
                    )}
                    {items.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleSelect(item)}
                        disabled={item.disabled}
                        className={cn(
                          "w-full flex items-center px-4 py-2.5 gap-3 text-left cursor-pointer transition-colors hover:bg-muted/50",
                          item.disabled && "opacity-40 cursor-not-allowed"
                        )}
                      >
                        <span className="flex-1 text-sm text-foreground">{item.label}</span>
                        {item.shortcut && (
                          <span className="flex items-center gap-0.5">
                            {item.shortcut.split("+").map((key, i) => (
                              <React.Fragment key={i}>
                                {i > 0 && <span className="text-[10px] text-muted-foreground">+</span>}
                                <span className="inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 min-h-5 text-[10px] font-mono text-muted-foreground">
                                  {key.trim()}
                                </span>
                              </React.Fragment>
                            ))}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

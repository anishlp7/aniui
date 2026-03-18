"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const blockCategories = [
  {
    label: "Authentication",
    blocks: [
      { title: "Login", href: "/blocks/login" },
      { title: "Sign Up", href: "/blocks/signup" },
      { title: "Forgot Password", href: "/blocks/forgot-password" },
    ],
  },
  {
    label: "Navigation",
    blocks: [
      { title: "Home Screen", href: "/blocks/home" },
      { title: "Bottom Tabs", href: "/blocks/bottom-tabs" },
      { title: "Drawer Nav", href: "/blocks/drawer-nav" },
    ],
  },
  {
    label: "User",
    blocks: [
      { title: "Profile", href: "/blocks/profile" },
      { title: "Settings", href: "/blocks/settings" },
    ],
  },
  {
    label: "Flow",
    blocks: [
      { title: "Onboarding", href: "/blocks/onboarding" },
      { title: "Chat", href: "/blocks/chat" },
    ],
  },
  {
    label: "Commerce",
    blocks: [
      { title: "Product List", href: "/blocks/product-list" },
      { title: "Product Detail", href: "/blocks/product-detail" },
      { title: "Pricing", href: "/blocks/pricing" },
    ],
  },
  {
    label: "Utility",
    blocks: [
      { title: "Notifications", href: "/blocks/notifications" },
      { title: "Search", href: "/blocks/search" },
    ],
  },
];

export { blockCategories };

// Flat ordered list for prev/next
const allBlocks = blockCategories.flatMap((cat) =>
  cat.blocks.map((b) => ({ ...b, category: cat.label }))
);

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9" /></svg>
  );
}

function ArrowLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
  );
}

function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
  );
}

/** Dropdown block selector — shows current block, grouped by category */
export function BlockNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isIndex = pathname === "/blocks";
  const current = allBlocks.find((b) => b.href === pathname);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isIndex) return null;

  return (
    <div className="mb-8" ref={ref}>
      {/* Breadcrumb + Selector Row */}
      <div className="flex items-center gap-2 mb-3">
        <Link
          href="/blocks"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Blocks
        </Link>
        <span className="text-muted-foreground/40">/</span>
        {current && (
          <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
            {current.category}
          </span>
        )}
      </div>

      {/* Dropdown trigger */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center justify-between w-full max-w-xs rounded-xl border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/50",
            open ? "border-primary/40 ring-2 ring-primary/10" : "border-border"
          )}
        >
          <span>{current?.title ?? "Select a block"}</span>
          <ChevronDown
            className={cn(
              "text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown panel */}
        {open && (
          <div className="absolute z-50 top-full left-0 mt-1.5 w-full max-w-xs rounded-xl border border-border bg-card shadow-lg overflow-hidden">
            <div className="max-h-[360px] overflow-y-auto py-1.5">
              {blockCategories.map((cat) => (
                <div key={cat.label}>
                  <div className="px-3 pt-3 pb-1.5">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                      {cat.label}
                    </span>
                  </div>
                  {cat.blocks.map((block) => {
                    const isActive = pathname === block.href;
                    return (
                      <Link
                        key={block.href}
                        href={block.href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 mx-1.5 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-accent"
                        )}
                      >
                        <span className="flex-1">{block.title}</span>
                        {isActive && (
                          <span className="text-primary">
                            <CheckIcon />
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Previous / Next links at the bottom of each block page */
export function BlockPagination() {
  const pathname = usePathname();
  const isIndex = pathname === "/blocks";
  if (isIndex) return null;

  const currentIndex = allBlocks.findIndex((b) => b.href === pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allBlocks[currentIndex - 1] : null;
  const next =
    currentIndex < allBlocks.length - 1 ? allBlocks[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-6 border-t border-border flex items-stretch gap-3">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex-1 flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
        >
          <span className="text-muted-foreground group-hover:text-primary transition-colors">
            <ArrowLeft />
          </span>
          <div className="min-w-0">
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
              Previous
            </span>
            <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex-1 flex items-center justify-end gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm text-right"
        >
          <div className="min-w-0">
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
              Next
            </span>
            <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {next.title}
            </span>
          </div>
          <span className="text-muted-foreground group-hover:text-primary transition-colors">
            <ArrowRight />
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}

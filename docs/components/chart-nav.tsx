"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const chartTypes = [
  { title: "Area Chart", href: "/charts/area-chart" },
  { title: "Bar Chart", href: "/charts/bar-chart" },
  { title: "Line Chart", href: "/charts/line-chart" },
  { title: "Pie Chart", href: "/charts/pie-chart" },
  { title: "Radar Chart", href: "/charts/radar-chart" },
  { title: "Radial Chart", href: "/charts/radial-chart" },
  { title: "Tooltip", href: "/charts/tooltip" },
];

export { chartTypes };

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

/** Dropdown chart selector — shows current chart type */
export function ChartNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isIndex = pathname === "/charts";
  const current = chartTypes.find((c) => c.href === pathname);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isIndex) return null;

  return (
    <div className="mb-8" ref={ref}>
      <div className="flex items-center gap-2 mb-3">
        <Link
          href="/charts"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Charts
        </Link>
        <span className="text-muted-foreground/40">/</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center justify-between w-full max-w-xs rounded-xl border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/50",
            open ? "border-primary/40 ring-2 ring-primary/10" : "border-border"
          )}
        >
          <span>{current?.title ?? "Select a chart"}</span>
          <ChevronDown
            className={cn(
              "text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute z-50 top-full left-0 mt-1.5 w-full max-w-xs rounded-xl border border-border bg-card shadow-lg overflow-hidden">
            <div className="max-h-[360px] overflow-y-auto py-1.5">
              {chartTypes.map((chart) => {
                const isActive = pathname === chart.href;
                return (
                  <Link
                    key={chart.href}
                    href={chart.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 mx-1.5 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    <span className="flex-1">{chart.title}</span>
                    {isActive && (
                      <span className="text-primary">
                        <CheckIcon />
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Previous / Next links at the bottom of each chart page */
export function ChartPagination() {
  const pathname = usePathname();
  const isIndex = pathname === "/charts";
  if (isIndex) return null;

  const currentIndex = chartTypes.findIndex((c) => c.href === pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? chartTypes[currentIndex - 1] : null;
  const next =
    currentIndex < chartTypes.length - 1 ? chartTypes[currentIndex + 1] : null;

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

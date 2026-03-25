"use client";
import React from "react";

function TooltipBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex flex-col rounded-lg border border-border bg-card px-3 py-2 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />;
}

function LineIndicator({ color }: { color: string }) {
  return <span className="inline-block w-1 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />;
}

function DashedIndicator({ color }: { color: string }) {
  return <span className="inline-block w-1 h-3 rounded-full shrink-0 opacity-50" style={{ backgroundColor: color }} />;
}

export function PreviewChartTooltipDefault() {
  return (
    <div className="flex items-center justify-center py-8">
      <TooltipBox>
        <span className="text-xs text-muted-foreground mb-1">January</span>
        <div className="flex items-center gap-2">
          <Dot color="hsl(var(--primary))" />
          <span className="text-sm font-medium text-foreground">186</span>
        </div>
      </TooltipBox>
    </div>
  );
}

export function PreviewChartTooltipCustom() {
  return (
    <div className="flex items-center justify-center py-8">
      <TooltipBox>
        <span className="text-xs text-muted-foreground mb-1.5">January 2024</span>
        <div className="flex items-center gap-2 py-0.5">
          <Dot color="hsl(var(--primary))" />
          <span className="text-xs text-muted-foreground">Desktop</span>
          <span className="text-xs font-medium text-foreground ml-auto pl-4">186</span>
        </div>
        <div className="flex items-center gap-2 py-0.5">
          <Dot color="#f97316" />
          <span className="text-xs text-muted-foreground">Mobile</span>
          <span className="text-xs font-medium text-foreground ml-auto pl-4">120</span>
        </div>
      </TooltipBox>
    </div>
  );
}

export function PreviewChartTooltipIndicator() {
  return (
    <div className="flex items-center justify-center py-8">
      <TooltipBox>
        <span className="text-xs text-muted-foreground mb-1.5">Revenue</span>
        <div className="flex items-center gap-2 py-0.5">
          <LineIndicator color="hsl(var(--primary))" />
          <span className="text-xs text-muted-foreground">Current</span>
          <span className="text-xs font-medium text-foreground ml-auto pl-4">$1,234</span>
        </div>
        <div className="flex items-center gap-2 py-0.5">
          <LineIndicator color="#f97316" />
          <span className="text-xs text-muted-foreground">Previous</span>
          <span className="text-xs font-medium text-foreground ml-auto pl-4">$987</span>
        </div>
      </TooltipBox>
    </div>
  );
}

export function PreviewChartTooltipAnimated() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <TooltipBox>
          <span className="text-xs text-muted-foreground mb-1">March</span>
          <div className="flex items-center gap-2">
            <Dot color="#8b5cf6" />
            <span className="text-sm font-medium text-foreground">237</span>
          </div>
        </TooltipBox>
      </div>
    </div>
  );
}

export function PreviewChartTooltipStyled() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="inline-flex flex-col rounded-xl bg-primary px-4 py-2.5 shadow-lg">
        <span className="text-xs text-primary-foreground/70 mb-1">Revenue</span>
        <span className="text-lg font-bold text-primary-foreground">$4,890</span>
        <span className="text-xs text-primary-foreground/60">+12.5% from last month</span>
      </div>
    </div>
  );
}

export function PreviewChartTooltipFormatter() {
  return (
    <div className="flex items-center justify-center py-8">
      <TooltipBox>
        <span className="text-xs text-muted-foreground mb-1.5">Sales Report</span>
        <div className="flex items-center gap-2 py-0.5">
          <DashedIndicator color="hsl(var(--primary))" />
          <span className="text-xs text-muted-foreground">Units</span>
          <span className="text-xs font-medium text-foreground ml-auto pl-4">1,234 pcs</span>
        </div>
        <div className="flex items-center gap-2 py-0.5">
          <DashedIndicator color="#f97316" />
          <span className="text-xs text-muted-foreground">Revenue</span>
          <span className="text-xs font-medium text-foreground ml-auto pl-4">$12.3K</span>
        </div>
      </TooltipBox>
    </div>
  );
}

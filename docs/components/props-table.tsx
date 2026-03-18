"use client";

import React from "react";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description?: string;
  component?: string;
}

export interface ComponentDef {
  name: string;
  description: string;
}

export function ComponentTable({ components }: { components: ComponentDef[] }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Component
        </span>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Description
        </span>
      </div>
      <div className="divide-y divide-border">
        {components.map((comp) => (
          <div
            key={comp.name}
            className="grid grid-cols-[0.8fr_1.2fr] gap-2 px-4 py-3 items-start"
          >
            <div>
              <code className="text-xs font-mono font-semibold text-foreground bg-primary/5 px-1.5 py-0.5 rounded">
                {comp.name}
              </code>
            </div>
            <p className="text-xs text-muted-foreground">{comp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PropsTable({ props }: { props: PropDef[] }) {
  const hasComponent = props.some((p) => p.component);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div
        className={`grid gap-2 px-4 py-2.5 bg-muted/50 border-b border-border ${
          hasComponent
            ? "grid-cols-[0.8fr_0.8fr_1.2fr_0.6fr]"
            : "grid-cols-[1fr_1.5fr_0.7fr]"
        }`}
      >
        {hasComponent && (
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Component
          </span>
        )}
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Prop
        </span>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Type
        </span>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Default
        </span>
      </div>
      {/* Rows */}
      <div className="divide-y divide-border">
        {props.map((prop, i) => (
          <div
            key={`${prop.component ?? ""}-${prop.name}-${i}`}
            className={`grid gap-2 px-4 py-3 items-start ${
              hasComponent
                ? "grid-cols-[0.8fr_0.8fr_1.2fr_0.6fr]"
                : "grid-cols-[1fr_1.5fr_0.7fr]"
            }`}
          >
            {hasComponent && (
              <div>
                {prop.component && (
                  <code className="text-xs font-mono text-muted-foreground">
                    {prop.component}
                  </code>
                )}
              </div>
            )}
            <div>
              <code className="text-xs font-mono font-semibold text-foreground bg-primary/5 px-1.5 py-0.5 rounded">
                {prop.name}
              </code>
            </div>
            <div>
              <code className="text-xs font-mono text-muted-foreground break-all">
                {prop.type}
              </code>
            </div>
            <div>
              <code className="text-xs font-mono text-muted-foreground">
                {prop.default ?? "—"}
              </code>
            </div>
            {prop.description && (
              <p
                className={`text-xs text-muted-foreground mt-1 ${
                  hasComponent ? "col-span-4" : "col-span-3"
                }`}
              >
                {prop.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

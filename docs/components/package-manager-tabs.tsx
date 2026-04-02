"use client";

import React, { useState } from "react";

type PM = "npm" | "pnpm" | "yarn" | "bun";

interface PackageManagerTabsProps {
  commands: Record<PM, string>;
}

const labels: Record<PM, string> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
};

export function PackageManagerTabs({ commands }: PackageManagerTabsProps) {
  const [active, setActive] = useState<PM>("npm");

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden my-4">
      <div className="flex border-b border-border bg-secondary/30">
        {(Object.keys(labels) as PM[]).map((pm) => (
          <button
            key={pm}
            onClick={() => setActive(pm)}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              active === pm
                ? "text-foreground border-b-2 border-primary bg-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {labels[pm]}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto bg-secondary/50 p-4 text-sm leading-relaxed">
        <code className="text-foreground font-mono">{commands[active]}</code>
      </pre>
    </div>
  );
}

/** Convenience helper for common install patterns */
export function InstallTabs({ pkg }: { pkg: string }) {
  return (
    <PackageManagerTabs
      commands={{
        npm: `npx ${pkg}`,
        pnpm: `pnpm dlx ${pkg}`,
        yarn: `yarn dlx ${pkg}`,
        bun: `bunx ${pkg}`,
      }}
    />
  );
}

export function AddComponentTabs({ names }: { names: string }) {
  return (
    <PackageManagerTabs
      commands={{
        npm: `npx @aniui/cli add ${names}`,
        pnpm: `pnpm dlx @aniui/cli add ${names}`,
        yarn: `yarn dlx @aniui/cli add ${names}`,
        bun: `bunx @aniui/cli add ${names}`,
      }}
    />
  );
}

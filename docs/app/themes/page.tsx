"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const baseLight = {
  "--background": "0 0% 100%",
  "--foreground": "240 10% 3.9%",
  "--card": "0 0% 100%",
  "--card-foreground": "240 10% 3.9%",
  "--primary": "240 5.9% 10%",
  "--primary-foreground": "0 0% 98%",
  "--secondary": "240 4.8% 95.9%",
  "--secondary-foreground": "240 5.9% 10%",
  "--muted": "240 4.8% 95.9%",
  "--muted-foreground": "240 3.8% 46.1%",
  "--accent": "240 4.8% 95.9%",
  "--accent-foreground": "240 5.9% 10%",
  "--destructive": "0 84.2% 60.2%",
  "--destructive-foreground": "0 0% 98%",
  "--border": "240 5.9% 90%",
  "--input": "240 5.9% 90%",
  "--ring": "240 5.9% 10%",
};

const baseDark = {
  "--background": "240 10% 3.9%",
  "--foreground": "0 0% 98%",
  "--card": "240 10% 3.9%",
  "--card-foreground": "0 0% 98%",
  "--primary": "0 0% 98%",
  "--primary-foreground": "240 5.9% 10%",
  "--secondary": "240 3.7% 15.9%",
  "--secondary-foreground": "0 0% 98%",
  "--muted": "240 3.7% 15.9%",
  "--muted-foreground": "240 5% 64.9%",
  "--accent": "240 3.7% 15.9%",
  "--accent-foreground": "0 0% 98%",
  "--destructive": "0 62.8% 30.6%",
  "--destructive-foreground": "0 0% 98%",
  "--border": "240 3.7% 15.9%",
  "--input": "240 3.7% 15.9%",
  "--ring": "240 4.9% 83.9%",
};

interface ThemePreset {
  name: string;
  label: string;
  lightOverrides: Record<string, string>;
  darkOverrides: Record<string, string>;
}

const themes: ThemePreset[] = [
  {
    name: "default",
    label: "Default",
    lightOverrides: {},
    darkOverrides: {},
  },
  {
    name: "blue",
    label: "Blue",
    lightOverrides: {
      "--primary": "221.2 83.2% 53.3%",
      "--primary-foreground": "210 40% 98%",
      "--ring": "221.2 83.2% 53.3%",
    },
    darkOverrides: {
      "--primary": "217.2 91.2% 59.8%",
      "--primary-foreground": "222.2 47.4% 11.2%",
      "--ring": "217.2 91.2% 59.8%",
    },
  },
  {
    name: "green",
    label: "Green",
    lightOverrides: {
      "--primary": "142.1 76.2% 36.3%",
      "--primary-foreground": "355.7 100% 97.3%",
      "--ring": "142.1 76.2% 36.3%",
    },
    darkOverrides: {
      "--primary": "142.1 70.6% 45.3%",
      "--primary-foreground": "144.9 80.4% 10%",
      "--ring": "142.1 70.6% 45.3%",
    },
  },
  {
    name: "orange",
    label: "Orange",
    lightOverrides: {
      "--primary": "24.6 95% 53.1%",
      "--primary-foreground": "60 9.1% 97.8%",
      "--ring": "24.6 95% 53.1%",
    },
    darkOverrides: {
      "--primary": "20.5 90.2% 48.2%",
      "--primary-foreground": "60 9.1% 97.8%",
      "--ring": "20.5 90.2% 48.2%",
    },
  },
  {
    name: "rose",
    label: "Rose",
    lightOverrides: {
      "--primary": "346.8 77.2% 49.8%",
      "--primary-foreground": "355.7 100% 97.3%",
      "--ring": "346.8 77.2% 49.8%",
    },
    darkOverrides: {
      "--primary": "346.8 77.2% 49.8%",
      "--primary-foreground": "355.7 100% 97.3%",
      "--ring": "346.8 77.2% 49.8%",
    },
  },
  {
    name: "violet",
    label: "Violet",
    lightOverrides: {
      "--primary": "263.4 70% 50.4%",
      "--primary-foreground": "210 20% 98%",
      "--ring": "263.4 70% 50.4%",
    },
    darkOverrides: {
      "--primary": "263.4 70% 50.4%",
      "--primary-foreground": "210 20% 98%",
      "--ring": "263.4 70% 50.4%",
    },
  },
  {
    name: "slate",
    label: "Slate",
    lightOverrides: {
      "--primary": "215.4 16.3% 46.9%",
      "--primary-foreground": "210 20% 98%",
      "--ring": "215.4 16.3% 46.9%",
    },
    darkOverrides: {
      "--primary": "217.2 32.6% 17.5%",
      "--primary-foreground": "210 40% 98%",
      "--ring": "217.2 32.6% 17.5%",
    },
  },
  {
    name: "red",
    label: "Red",
    lightOverrides: {
      "--primary": "0 72.2% 50.6%",
      "--primary-foreground": "0 85.7% 97.3%",
      "--ring": "0 72.2% 50.6%",
    },
    darkOverrides: {
      "--primary": "0 72.2% 50.6%",
      "--primary-foreground": "0 85.7% 97.3%",
      "--ring": "0 72.2% 50.6%",
    },
  },
  {
    name: "yellow",
    label: "Yellow",
    lightOverrides: {
      "--primary": "47.9 95.8% 53.1%",
      "--primary-foreground": "26 83.3% 14.1%",
      "--ring": "47.9 95.8% 53.1%",
    },
    darkOverrides: {
      "--primary": "47.9 95.8% 53.1%",
      "--primary-foreground": "26 83.3% 14.1%",
      "--ring": "47.9 95.8% 53.1%",
    },
  },
];

function mergeTheme(base: Record<string, string>, overrides: Record<string, string>): Record<string, string> {
  return { ...base, ...overrides };
}

function generateCSS(theme: ThemePreset): string {
  const light = mergeTheme(baseLight, theme.lightOverrides);
  const dark = mergeTheme(baseDark, theme.darkOverrides);

  const indent = "    ";
  const lightVars = Object.entries(light)
    .map(([key, value]) => `${indent}${key}: ${value};`)
    .join("\n");
  const darkVars = Object.entries(dark)
    .map(([key, value]) => `${indent}${key}: ${value};`)
    .join("\n");

  return `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n${lightVars}\n  }\n  .dark {\n${darkVars}\n  }\n}`;
}

function hslToStyle(hslValue: string): string {
  return `hsl(${hslValue})`;
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ThemeCard({
  theme,
  selected,
  onClick,
}: {
  theme: ThemePreset;
  selected: boolean;
  onClick: () => void;
}) {
  const light = mergeTheme(baseLight, theme.lightOverrides);

  const primary = hslToStyle(light["--primary"]);
  const primaryFg = hslToStyle(light["--primary-foreground"]);
  const secondary = hslToStyle(light["--secondary"]);
  const accent = hslToStyle(light["--accent"]);
  const destructive = hslToStyle(light["--destructive"]);
  const bg = hslToStyle(light["--background"]);
  const fg = hslToStyle(light["--foreground"]);
  const border = hslToStyle(light["--border"]);
  const muted = hslToStyle(light["--muted"]);
  const mutedFg = hslToStyle(light["--muted-foreground"]);
  const cardBg = hslToStyle(light["--card"]);

  return (
    <button
      onClick={onClick}
      className={`relative text-left rounded-xl border-2 p-4 transition-all hover:shadow-md ${
        selected
          ? "border-primary ring-2 ring-primary/20 shadow-md"
          : "border-border hover:border-muted-foreground/30"
      }`}
    >
      {selected && (
        <div className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckIcon />
        </div>
      )}

      <p className="text-sm font-semibold text-foreground mb-3">{theme.label}</p>

      {/* Color swatches */}
      <div className="flex items-center gap-1.5 mb-3">
        <div
          className="h-5 w-5 rounded-full border border-black/10"
          style={{ backgroundColor: primary }}
          title="Primary"
        />
        <div
          className="h-5 w-5 rounded-full border border-black/10"
          style={{ backgroundColor: secondary }}
          title="Secondary"
        />
        <div
          className="h-5 w-5 rounded-full border border-black/10"
          style={{ backgroundColor: accent }}
          title="Accent"
        />
        <div
          className="h-5 w-5 rounded-full border border-black/10"
          style={{ backgroundColor: destructive }}
          title="Destructive"
        />
      </div>

      {/* Mini mockup */}
      <div
        className="rounded-lg p-3 space-y-2"
        style={{ backgroundColor: bg, border: `1px solid ${border}` }}
      >
        {/* Mini card */}
        <div
          className="rounded-md p-2"
          style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        >
          <div
            className="text-[10px] font-semibold leading-tight"
            style={{ color: fg }}
          >
            Card Title
          </div>
          <div
            className="text-[9px] mt-0.5 leading-tight"
            style={{ color: mutedFg }}
          >
            Card description text
          </div>
        </div>

        {/* Mini buttons row */}
        <div className="flex gap-1.5">
          <div
            className="rounded-md px-2.5 py-1 text-[9px] font-medium"
            style={{ backgroundColor: primary, color: primaryFg }}
          >
            Primary
          </div>
          <div
            className="rounded-md px-2.5 py-1 text-[9px] font-medium"
            style={{ backgroundColor: muted, color: fg }}
          >
            Secondary
          </div>
        </div>
      </div>
    </button>
  );
}

export default function ThemesPage() {
  const [selected, setSelected] = useState("default");
  const selectedTheme = themes.find((t) => t.name === selected) ?? themes[0];
  const cssCode = generateCSS(selectedTheme);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Themes
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Hand-picked theme presets for your app. Click a theme to preview it, then copy the CSS into your project.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
          Copy the CSS below into your{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">
            global.css
          </code>{" "}
          file, or run{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">
            npx aniui theme
          </code>{" "}
          to switch presets from the command line.
        </div>

        {/* Theme grid */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">
            Choose a theme
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.name}
                theme={theme}
                selected={selected === theme.name}
                onClick={() => setSelected(theme.name)}
              />
            ))}
          </div>
        </div>

        {/* CSS output */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">
            CSS for{" "}
            <span className="text-primary">{selectedTheme.label}</span> theme
          </h2>
          <CodeBlock code={cssCode} title="global.css" language="css" />
        </div>
      </div>
    </div>
  );
}

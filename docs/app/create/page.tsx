"use client";

import React, { useState, useMemo } from "react";
import { CodeBlock } from "@/components/code-block";
import { ThemePreview } from "@/components/theme-preview";
import { type ColorDef, themeColors, radiusOptions, hsl, resolveVars, generateCSS, shuffleTheme } from "@/lib/theme-data";

/* ── Icons ──────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>
  );
}

/* ── Main Page ──────────────────────────────────────────────── */

export default function ThemesPage() {
  const [selectedPreset, setSelectedPreset] = useState("zinc");
  const [customColor, setCustomColor] = useState<ColorDef | null>(null);
  const [selectedRadius, setSelectedRadius] = useState("0.75rem");
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");
  const [copied, setCopied] = useState(false);

  const color = customColor ?? themeColors.find((c) => c.name === selectedPreset) ?? themeColors[0];
  const vars = useMemo(() => resolveVars(color, previewMode), [color, previewMode]);
  const cssCode = useMemo(() => generateCSS(color, selectedRadius), [color, selectedRadius]);

  const handlePresetSelect = (name: string) => {
    setSelectedPreset(name);
    setCustomColor(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShuffle = () => {
    const result = shuffleTheme(selectedRadius, previewMode);
    setCustomColor(result.color);
    setSelectedRadius(result.radius);
    setPreviewMode(result.mode);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Build your theme. Pick a preset or generate a random color, then copy the CSS into your project.
        </p>
      </div>

      <div className="flex gap-8">
        {/* ── Left Control Panel ─── */}
        <div className="hidden md:block w-[220px] shrink-0">
          <div className="sticky top-20 space-y-6">
            {/* Color picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Color</p>
                <button
                  onClick={handleShuffle}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Shuffle theme"
                >
                  <ShuffleIcon />
                  <span>Random</span>
                </button>
              </div>
              {customColor && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: hsl(customColor.light["--primary"]) }} />
                  <span className="text-xs text-muted-foreground">{customColor.label}</span>
                </div>
              )}
              <div className="grid grid-cols-4 gap-2">
                {themeColors.map((c) => {
                  const active = !customColor && selectedPreset === c.name;
                  const preview = hsl(c.light["--primary"]);
                  return (
                    <button
                      key={c.name}
                      onClick={() => handlePresetSelect(c.name)}
                      className={`group relative h-8 w-full rounded-md border-2 transition-all cursor-pointer ${active ? "border-foreground scale-110 shadow-sm" : "border-transparent hover:border-muted-foreground/30"}`}
                      style={{ backgroundColor: preview }}
                      title={c.label}
                    >
                      {active && (
                        <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-sm">
                          <CheckIcon />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Radius */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Radius</p>
              <div className="flex gap-1.5">
                {radiusOptions.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setSelectedRadius(r.value)}
                    className={`flex-1 h-8 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                      selectedRadius === r.value
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Mode</p>
              <div className="flex gap-1.5">
                {(["light", "dark"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPreviewMode(mode)}
                    className={`flex-1 h-8 rounded-md border text-xs font-medium capitalize transition-colors cursor-pointer ${
                      previewMode === mode
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="w-full h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy CSS</>}
            </button>

            <p className="text-xs text-muted-foreground">
              Or run <code className="rounded bg-secondary px-1 py-0.5 text-xs font-mono">npx @aniui/cli theme</code> from your project.
            </p>
          </div>
        </div>

        {/* ── Right Preview Area ─── */}
        <div className="flex-1 min-w-0">
          {/* Mobile controls */}
          <div className="md:hidden mb-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Color</p>
                <button onClick={handleShuffle} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                  <ShuffleIcon /> Random
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {themeColors.map((c) => {
                  const active = !customColor && selectedPreset === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => handlePresetSelect(c.name)}
                      className={`h-8 w-8 rounded-full border-2 transition-all cursor-pointer ${active ? "border-foreground scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: hsl(c.light["--primary"]) }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Radius</p>
                <div className="flex gap-1">
                  {radiusOptions.map((r) => (
                    <button key={r.value} onClick={() => setSelectedRadius(r.value)} className={`flex-1 h-7 rounded text-xs font-medium border cursor-pointer ${selectedRadius === r.value ? "bg-foreground text-background border-foreground" : "border-border"}`}>{r.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Mode</p>
                <div className="flex gap-1">
                  {(["light", "dark"] as const).map((m) => (
                    <button key={m} onClick={() => setPreviewMode(m)} className={`h-7 px-3 rounded text-xs font-medium border capitalize cursor-pointer ${previewMode === m ? "bg-foreground text-background border-foreground" : "border-border"}`}>{m}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live preview */}
          <div className="rounded-xl border border-border p-6" style={{ backgroundColor: hsl(vars["--background"]) }}>
            <ThemePreview vars={vars} radius={selectedRadius} />
          </div>

          {/* CSS Output */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                CSS for <span className="text-primary">{customColor ? customColor.label : color.label}</span> theme
              </h2>
              <button
                onClick={handleCopy}
                className="md:hidden h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <CodeBlock code={cssCode} title="global.css" />
          </div>
        </div>
      </div>
    </div>
  );
}

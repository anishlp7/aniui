"use client";

import React, { useState, useMemo } from "react";
import { CodeBlock } from "@/components/code-block";

/* ── Theme data ─────────────────────────────────────────────── */

const baseLight: Record<string, string> = {
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

const baseDark: Record<string, string> = {
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

type ColorDef = { name: string; label: string; hue: string; light: Record<string, string>; dark: Record<string, string> };

const colors: ColorDef[] = [
  { name: "zinc", label: "Zinc", hue: "240 5.9%", light: { "--primary": "240 5.9% 10%", "--primary-foreground": "0 0% 98%", "--ring": "240 5.9% 10%" }, dark: { "--primary": "0 0% 98%", "--primary-foreground": "240 5.9% 10%", "--ring": "240 4.9% 83.9%" } },
  { name: "slate", label: "Slate", hue: "215 16%", light: { "--primary": "215.4 16.3% 46.9%", "--primary-foreground": "210 40% 98%", "--ring": "215.4 16.3% 46.9%", "--secondary": "210 40% 96.1%", "--secondary-foreground": "222.2 47.4% 11.2%", "--muted": "210 40% 96.1%", "--accent": "210 40% 96.1%" }, dark: { "--primary": "210 40% 98%", "--primary-foreground": "222.2 47.4% 11.2%", "--ring": "212.7 26.8% 83.9%", "--secondary": "217.2 32.6% 17.5%", "--secondary-foreground": "210 40% 98%", "--muted": "217.2 32.6% 17.5%", "--accent": "217.2 32.6% 17.5%" } },
  { name: "stone", label: "Stone", hue: "25 5.3%", light: { "--primary": "25 5.3% 44.7%", "--primary-foreground": "60 9.1% 97.8%", "--ring": "25 5.3% 44.7%", "--secondary": "60 4.8% 95.9%", "--secondary-foreground": "24 9.8% 10%", "--muted": "60 4.8% 95.9%", "--accent": "60 4.8% 95.9%" }, dark: { "--primary": "60 9.1% 97.8%", "--primary-foreground": "24 9.8% 10%", "--ring": "60 5% 83.9%", "--secondary": "12 6.5% 15.1%", "--secondary-foreground": "60 9.1% 97.8%", "--muted": "12 6.5% 15.1%", "--accent": "12 6.5% 15.1%" } },
  { name: "gray", label: "Gray", hue: "220 8.9%", light: { "--primary": "220.9 39.3% 11%", "--primary-foreground": "210 20% 98%", "--ring": "220.9 39.3% 11%", "--secondary": "220 14.3% 95.9%", "--secondary-foreground": "220.9 39.3% 11%", "--muted": "220 14.3% 95.9%", "--accent": "220 14.3% 95.9%" }, dark: { "--primary": "210 20% 98%", "--primary-foreground": "220.9 39.3% 11%", "--ring": "216 12.2% 83.9%", "--secondary": "215 27.9% 16.9%", "--secondary-foreground": "210 20% 98%", "--muted": "215 27.9% 16.9%", "--accent": "215 27.9% 16.9%" } },
  { name: "neutral", label: "Neutral", hue: "0 0%", light: { "--primary": "0 0% 9%", "--primary-foreground": "0 0% 98%", "--ring": "0 0% 9%", "--secondary": "0 0% 96.1%", "--secondary-foreground": "0 0% 9%", "--muted": "0 0% 96.1%", "--accent": "0 0% 96.1%" }, dark: { "--primary": "0 0% 98%", "--primary-foreground": "0 0% 9%", "--ring": "0 0% 83.9%", "--secondary": "0 0% 14.9%", "--secondary-foreground": "0 0% 98%", "--muted": "0 0% 14.9%", "--accent": "0 0% 14.9%" } },
  { name: "blue", label: "Blue", hue: "221 83%", light: { "--primary": "221.2 83.2% 53.3%", "--primary-foreground": "210 40% 98%", "--ring": "221.2 83.2% 53.3%" }, dark: { "--primary": "217.2 91.2% 59.8%", "--primary-foreground": "222.2 47.4% 11.2%", "--ring": "217.2 91.2% 59.8%" } },
  { name: "green", label: "Green", hue: "142 76%", light: { "--primary": "142.1 76.2% 36.3%", "--primary-foreground": "355.7 100% 97.3%", "--ring": "142.1 76.2% 36.3%" }, dark: { "--primary": "142.1 70.6% 45.3%", "--primary-foreground": "144.9 80.4% 10%", "--ring": "142.1 70.6% 45.3%" } },
  { name: "orange", label: "Orange", hue: "24 95%", light: { "--primary": "24.6 95% 53.1%", "--primary-foreground": "60 9.1% 97.8%", "--ring": "24.6 95% 53.1%" }, dark: { "--primary": "20.5 90.2% 48.2%", "--primary-foreground": "60 9.1% 97.8%", "--ring": "20.5 90.2% 48.2%" } },
  { name: "rose", label: "Rose", hue: "347 77%", light: { "--primary": "346.8 77.2% 49.8%", "--primary-foreground": "355.7 100% 97.3%", "--ring": "346.8 77.2% 49.8%" }, dark: { "--primary": "346.8 77.2% 49.8%", "--primary-foreground": "355.7 100% 97.3%", "--ring": "346.8 77.2% 49.8%" } },
  { name: "violet", label: "Violet", hue: "263 70%", light: { "--primary": "263.4 70% 50.4%", "--primary-foreground": "210 20% 98%", "--ring": "263.4 70% 50.4%" }, dark: { "--primary": "263.4 70% 50.4%", "--primary-foreground": "210 20% 98%", "--ring": "263.4 70% 50.4%" } },
  { name: "red", label: "Red", hue: "0 72%", light: { "--primary": "0 72.2% 50.6%", "--primary-foreground": "0 85.7% 97.3%", "--ring": "0 72.2% 50.6%" }, dark: { "--primary": "0 72.2% 50.6%", "--primary-foreground": "0 85.7% 97.3%", "--ring": "0 72.2% 50.6%" } },
  { name: "yellow", label: "Yellow", hue: "48 96%", light: { "--primary": "47.9 95.8% 53.1%", "--primary-foreground": "26 83.3% 14.1%", "--ring": "47.9 95.8% 53.1%" }, dark: { "--primary": "47.9 95.8% 53.1%", "--primary-foreground": "26 83.3% 14.1%", "--ring": "47.9 95.8% 53.1%" } },
  { name: "teal", label: "Teal", hue: "166 72%", light: { "--primary": "166.1 72.4% 39.2%", "--primary-foreground": "0 0% 98%", "--ring": "166.1 72.4% 39.2%" }, dark: { "--primary": "166.1 72.4% 46.7%", "--primary-foreground": "166 84% 7.3%", "--ring": "166.1 72.4% 46.7%" } },
  { name: "pink", label: "Pink", hue: "330 81%", light: { "--primary": "330.4 81.2% 60.4%", "--primary-foreground": "0 0% 98%", "--ring": "330.4 81.2% 60.4%" }, dark: { "--primary": "330.4 81.2% 60.4%", "--primary-foreground": "0 0% 98%", "--ring": "330.4 81.2% 60.4%" } },
  { name: "indigo", label: "Indigo", hue: "234 89%", light: { "--primary": "234.5 89.5% 73.9%", "--primary-foreground": "226 100% 10%", "--ring": "234.5 89.5% 73.9%" }, dark: { "--primary": "234.5 89.5% 73.9%", "--primary-foreground": "226 100% 10%", "--ring": "234.5 89.5% 73.9%" } },
  { name: "cyan", label: "Cyan", hue: "189 94%", light: { "--primary": "189.3 94.5% 42.7%", "--primary-foreground": "0 0% 98%", "--ring": "189.3 94.5% 42.7%" }, dark: { "--primary": "189.3 94.5% 51.2%", "--primary-foreground": "190 95% 8%", "--ring": "189.3 94.5% 51.2%" } },
];

const radiusOptions = [
  { label: "0", value: "0" },
  { label: "0.3", value: "0.3rem" },
  { label: "0.5", value: "0.5rem" },
  { label: "0.75", value: "0.75rem" },
  { label: "1.0", value: "1rem" },
];

type StyleDef = { name: string; label: string; description: string };

const styles: StyleDef[] = [
  { name: "default", label: "Default", description: "Clean and minimal" },
  { name: "bold", label: "Bold", description: "Stronger contrast, heavier fonts" },
];

/* ── Helpers ────────────────────────────────────────────────── */

function h(hsl: string) { return `hsl(${hsl})`; }

function generateCSS(color: ColorDef, radius: string, mode: "light" | "dark"): string {
  const lightVars = { ...baseLight, ...color.light, "--radius": radius };
  const darkVars = { ...baseDark, ...color.dark, "--radius": radius };
  const indent = "    ";
  const fmt = (vars: Record<string, string>) =>
    Object.entries(vars).map(([k, v]) => `${indent}${k}: ${v};`).join("\n");
  return `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n${fmt(lightVars)}\n  }\n  .dark {\n${fmt(darkVars)}\n  }\n}`;
}

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

/* ── Live Preview Panel ─────────────────────────────────────── */

function LivePreview({ vars, radius }: { vars: Record<string, string>; radius: string }) {
  const s = (v: string) => h(vars[v]);
  const rad = radius;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ "--radius": rad } as React.CSSProperties}>
      {/* Card: Create Account */}
      <div className="col-span-full lg:col-span-2 rounded-xl border p-6" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <h3 className="text-lg font-semibold" style={{ color: s("--card-foreground") }}>Create Account</h3>
        <p className="text-sm mt-1 mb-4" style={{ color: s("--muted-foreground") }}>Enter your details to get started.</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: s("--foreground") }}>Name</label>
            <div className="h-10 rounded-md border px-3 flex items-center text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), color: s("--muted-foreground"), borderRadius: `calc(${rad} - 2px)` }}>Anish Lawrence</div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: s("--foreground") }}>Email</label>
            <div className="h-10 rounded-md border px-3 flex items-center text-sm" style={{ borderColor: s("--input"), backgroundColor: s("--background"), color: s("--muted-foreground"), borderRadius: `calc(${rad} - 2px)` }}>anish@example.com</div>
          </div>
          <div className="flex gap-2 pt-2">
            <button className="h-9 px-4 rounded-md text-sm font-medium flex-1" style={{ backgroundColor: s("--primary"), color: s("--primary-foreground"), borderRadius: `calc(${rad} - 2px)` }}>Sign Up</button>
            <button className="h-9 px-4 rounded-md text-sm font-medium border" style={{ backgroundColor: s("--background"), color: s("--foreground"), borderColor: s("--border"), borderRadius: `calc(${rad} - 2px)` }}>Cancel</button>
          </div>
        </div>
      </div>

      {/* Card: Notifications */}
      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <h3 className="text-sm font-semibold" style={{ color: s("--card-foreground") }}>Notifications</h3>
        {[
          { title: "New message", desc: "Alex sent you a photo", time: "2m" },
          { title: "Payment received", desc: "$250.00 from client", time: "1h" },
          { title: "Reminder", desc: "Meeting in 30 minutes", time: "3h" },
        ].map((n) => (
          <div key={n.title} className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: s("--primary") }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium" style={{ color: s("--foreground") }}>{n.title}</p>
              <p className="text-xs" style={{ color: s("--muted-foreground") }}>{n.desc}</p>
            </div>
            <span className="text-xs shrink-0" style={{ color: s("--muted-foreground") }}>{n.time}</span>
          </div>
        ))}
      </div>

      {/* Buttons row */}
      <div className="rounded-xl border p-6 space-y-3" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <h3 className="text-sm font-semibold" style={{ color: s("--card-foreground") }}>Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <button className="h-9 px-4 rounded-md text-xs font-medium" style={{ backgroundColor: s("--primary"), color: s("--primary-foreground"), borderRadius: `calc(${rad} - 2px)` }}>Primary</button>
          <button className="h-9 px-4 rounded-md text-xs font-medium" style={{ backgroundColor: s("--secondary"), color: s("--secondary-foreground"), borderRadius: `calc(${rad} - 2px)` }}>Secondary</button>
          <button className="h-9 px-4 rounded-md text-xs font-medium border" style={{ backgroundColor: "transparent", color: s("--foreground"), borderColor: s("--border"), borderRadius: `calc(${rad} - 2px)` }}>Outline</button>
          <button className="h-9 px-4 rounded-md text-xs font-medium" style={{ backgroundColor: s("--destructive"), color: s("--destructive-foreground"), borderRadius: `calc(${rad} - 2px)` }}>Delete</button>
        </div>
      </div>

      {/* Badges + Switch */}
      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <h3 className="text-sm font-semibold" style={{ color: s("--card-foreground") }}>Components</h3>
        <div className="flex flex-wrap gap-2">
          {["Badge", "Secondary", "Outline"].map((b, i) => (
            <span key={b} className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style={{
              backgroundColor: i === 0 ? s("--primary") : i === 1 ? s("--secondary") : "transparent",
              color: i === 0 ? s("--primary-foreground") : i === 1 ? s("--secondary-foreground") : s("--foreground"),
              border: i === 2 ? `1px solid ${s("--border")}` : undefined,
            }}>{b}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: s("--foreground") }}>Dark mode</span>
          <div className="h-6 w-11 rounded-full p-0.5" style={{ backgroundColor: s("--primary") }}>
            <div className="h-5 w-5 rounded-full shadow-sm" style={{ backgroundColor: s("--primary-foreground"), marginLeft: "auto" }} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: s("--foreground") }}>Notifications</span>
          <div className="h-6 w-11 rounded-full p-0.5" style={{ backgroundColor: s("--input") }}>
            <div className="h-5 w-5 rounded-full shadow-sm" style={{ backgroundColor: s("--background") }} />
          </div>
        </div>
      </div>

      {/* Progress + List */}
      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: s("--card"), borderColor: s("--border"), borderRadius: rad }}>
        <h3 className="text-sm font-semibold" style={{ color: s("--card-foreground") }}>Progress</h3>
        <div className="h-2 rounded-full" style={{ backgroundColor: s("--secondary") }}>
          <div className="h-2 rounded-full w-[65%]" style={{ backgroundColor: s("--primary") }} />
        </div>
        <p className="text-xs" style={{ color: s("--muted-foreground") }}>65% complete</p>
        <div className="border-t pt-3 space-y-2" style={{ borderColor: s("--border") }}>
          {["Account Settings", "Notifications", "Privacy"].map((item) => (
            <div key={item} className="flex items-center justify-between py-1.5">
              <span className="text-xs font-medium" style={{ color: s("--foreground") }}>{item}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={h(vars["--muted-foreground"])} strokeWidth="1.5"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────── */

export default function ThemesPage() {
  const [selectedColor, setSelectedColor] = useState("zinc");
  const [selectedRadius, setSelectedRadius] = useState("0.75rem");
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");
  const [selectedStyle, setSelectedStyle] = useState("default");
  const [copied, setCopied] = useState(false);

  const color = colors.find((c) => c.name === selectedColor) ?? colors[0];
  const vars = useMemo(() => {
    const base = previewMode === "light" ? baseLight : baseDark;
    const overrides = previewMode === "light" ? color.light : color.dark;
    return { ...base, ...overrides };
  }, [color, previewMode]);

  const cssCode = useMemo(() => generateCSS(color, selectedRadius, previewMode), [color, selectedRadius, previewMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShuffle = () => {
    const others = colors.filter((c) => c.name !== selectedColor);
    const random = others[Math.floor(Math.random() * others.length)];
    setSelectedColor(random.name);
    const radii = radiusOptions.map((r) => r.value);
    setSelectedRadius(radii[Math.floor(Math.random() * radii.length)]);
    setPreviewMode(Math.random() > 0.5 ? "light" : "dark");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Themes</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hand-picked themes for your app. Copy the CSS and paste into your global.css.
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
                  <span>Shuffle</span>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((c) => {
                  const active = selectedColor === c.name;
                  const preview = h(c.light["--primary"]);
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
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

            {/* Style */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">Style</p>
              <div className="space-y-1.5">
                {styles.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedStyle(s.name)}
                    className={`w-full text-left px-3 py-2 rounded-md border text-xs transition-colors cursor-pointer ${
                      selectedStyle === s.name
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:bg-accent"
                    }`}
                  >
                    <span className="font-medium">{s.label}</span>
                    <span className="block text-[10px] mt-0.5 opacity-70">{s.description}</span>
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
              Or run <code className="rounded bg-secondary px-1 py-0.5 text-xs font-mono">npx aniui theme</code> from your project.
            </p>
          </div>
        </div>

        {/* ── Right Preview Area ─── */}
        <div className="flex-1 min-w-0">
          {/* Mobile controls (visible on small screens) */}
          <div className="md:hidden mb-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Color</p>
                <button onClick={handleShuffle} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                  <ShuffleIcon /> Shuffle
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const active = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-8 w-8 rounded-full border-2 transition-all cursor-pointer ${active ? "border-foreground scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: h(c.light["--primary"]) }}
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

          {/* Live preview container */}
          <div className="rounded-xl border border-border p-6" style={{ backgroundColor: h(vars["--background"]) }}>
            <LivePreview vars={vars} radius={selectedRadius} />
          </div>

          {/* CSS Output */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                CSS for <span className="text-primary">{color.label}</span> theme
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

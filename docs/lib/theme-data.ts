/* ── Shared theme data — single source of truth ────────────── */

export type ColorDef = {
  name: string;
  label: string;
  hue: string;
  light: Record<string, string>;
  dark: Record<string, string>;
};

export type RadiusOption = { label: string; value: string };
export const baseLight: Record<string, string> = {
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

export const baseDark: Record<string, string> = {
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

export const themeColors: ColorDef[] = [
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

export const radiusOptions: RadiusOption[] = [
  { label: "0", value: "0" },
  { label: "0.3", value: "0.3rem" },
  { label: "0.5", value: "0.5rem" },
  { label: "0.75", value: "0.75rem" },
  { label: "1.0", value: "1rem" },
];

/* ── Helpers ────────────────────────────────────────────────── */

export function hsl(value: string) {
  return `hsl(${value})`;
}

export function resolveVars(color: ColorDef, mode: "light" | "dark"): Record<string, string> {
  const base = mode === "light" ? baseLight : baseDark;
  const overrides = mode === "light" ? color.light : color.dark;
  return { ...base, ...overrides };
}

export function generateCSS(color: ColorDef, radius: string): string {
  const lightVars = { ...baseLight, ...color.light, "--radius": radius };
  const darkVars = { ...baseDark, ...color.dark, "--radius": radius };
  const indent = "    ";
  const fmt = (vars: Record<string, string>) =>
    Object.entries(vars).map(([k, v]) => `${indent}${k}: ${v};`).join("\n");
  return `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n${fmt(lightVars)}\n  }\n  .dark {\n${fmt(darkVars)}\n  }\n}`;
}

/** Generate a fully random theme from any HSL hue — not limited to presets. */
export function shuffleTheme(currentRadius: string, currentMode: "light" | "dark") {
  const hue = Math.floor(Math.random() * 360);
  const sat = 50 + Math.floor(Math.random() * 45); // 50-94%

  const randomColor: ColorDef = {
    name: "__random",
    label: `Random (${hue})`,
    hue: `${hue} ${sat}%`,
    light: {
      "--primary": `${hue} ${sat}% 45%`,
      "--primary-foreground": `${hue} 20% 98%`,
      "--ring": `${hue} ${sat}% 45%`,
    },
    dark: {
      "--primary": `${hue} ${sat}% 60%`,
      "--primary-foreground": `${hue} ${sat}% 10%`,
      "--ring": `${hue} ${sat}% 60%`,
    },
  };

  const otherRadii = radiusOptions.filter((r) => r.value !== currentRadius);
  const radius = otherRadii[Math.floor(Math.random() * otherRadii.length)];
  const mode: "light" | "dark" = currentMode === "light" ? "dark" : "light";

  return { color: randomColor, radius: radius.value, mode };
}

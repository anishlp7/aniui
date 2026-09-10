/**
 * theme-presets.ts — single source of truth for the 5 built-in theme presets
 * (default/blue/green/orange/rose), replacing what used to be two separately
 * hand-maintained copies (cli/src/commands/theme.ts's `THEMES` and
 * cli/src/commands/init.ts's `THEME_PRESETS`) that had already drifted into
 * asymmetric shapes.
 *
 * Every non-default preset only ever varies `primary`/`primaryForeground` —
 * background/card/secondary/muted/accent/destructive/border/input/ring are
 * shared structural chrome, not brand identity, and have never differed
 * across presets. `getPreset()` always returns a FULL 17-token set per mode
 * (base + the preset's primary override layered on top), so every consumer
 * (global.css patching, theme-provider.tsx's THEME_COLORS block) gets a
 * complete, unambiguous set regardless of which preset is chosen.
 */

export type PresetName = "default" | "blue" | "green" | "orange" | "rose";

export interface TokenSet {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface TokenSetPair {
  light: TokenSet;
  dark: TokenSet;
}

/** CSS custom-property name for each TokenSet field, matching templates/global.css. */
export const TOKEN_CSS_VARS: Record<keyof TokenSet, string> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
};

const BASE: TokenSetPair = {
  light: {
    background: "0 0% 100%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    cardForeground: "240 10% 3.9%",
    primary: "240 5.9% 10%",
    primaryForeground: "0 0% 98%",
    secondary: "240 4.8% 95.9%",
    secondaryForeground: "240 5.9% 10%",
    muted: "240 4.8% 95.9%",
    mutedForeground: "240 3.8% 46.1%",
    accent: "240 4.8% 95.9%",
    accentForeground: "240 5.9% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    border: "240 5.9% 90%",
    input: "240 5.9% 90%",
    ring: "240 5.9% 10%",
  },
  dark: {
    background: "240 10% 3.9%",
    foreground: "0 0% 98%",
    card: "240 10% 3.9%",
    cardForeground: "0 0% 98%",
    primary: "0 0% 98%",
    primaryForeground: "240 5.9% 10%",
    secondary: "240 3.7% 15.9%",
    secondaryForeground: "0 0% 98%",
    muted: "240 3.7% 15.9%",
    mutedForeground: "240 5% 64.9%",
    accent: "240 3.7% 15.9%",
    accentForeground: "0 0% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "0 0% 98%",
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: "240 4.9% 83.9%",
  },
};

type PrimaryOverride = { light: Pick<TokenSet, "primary" | "primaryForeground">; dark: Pick<TokenSet, "primary" | "primaryForeground"> } | null;

const PRIMARY_OVERRIDES: Record<PresetName, PrimaryOverride> = {
  default: null,
  blue: {
    light: { primary: "221.2 83.2% 53.3%", primaryForeground: "210 40% 98%" },
    dark: { primary: "217.2 91.2% 59.8%", primaryForeground: "222.2 47.4% 11.2%" },
  },
  green: {
    light: { primary: "142.1 76.2% 36.3%", primaryForeground: "355.7 100% 97.3%" },
    dark: { primary: "142.1 70.6% 45.3%", primaryForeground: "144.9 80.4% 10%" },
  },
  orange: {
    light: { primary: "24.6 95% 53.1%", primaryForeground: "60 9.1% 97.8%" },
    dark: { primary: "20.5 90.2% 48.2%", primaryForeground: "60 9.1% 97.8%" },
  },
  rose: {
    light: { primary: "346.8 77.2% 49.8%", primaryForeground: "355.7 100% 97.3%" },
    dark: { primary: "346.8 77.2% 49.8%", primaryForeground: "355.7 100% 97.3%" },
  },
};

export const PRESET_NAMES: PresetName[] = ["default", "blue", "green", "orange", "rose"];

/** Full 17-token light+dark set for a preset — base chrome plus the preset's primary override. */
export function getPreset(name: PresetName): TokenSetPair {
  const override = PRIMARY_OVERRIDES[name];
  if (!override) return BASE;
  return {
    light: { ...BASE.light, ...override.light },
    dark: { ...BASE.dark, ...override.dark },
  };
}

/** A TokenSet as the `--css-var-name: value` map CSS-patching call sites expect. */
export function toCssVarMap(tokens: TokenSet): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(tokens) as (keyof TokenSet)[]) {
    result[TOKEN_CSS_VARS[key]] = tokens[key];
  }
  return result;
}

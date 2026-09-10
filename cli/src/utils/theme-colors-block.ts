import { getPreset, type PresetName, type TokenSet } from "../theme-presets";
import { hslToHex } from "./color";

const FIELD_ORDER: (keyof TokenSet)[] = [
  "background", "foreground", "card", "cardForeground",
  "primary", "primaryForeground", "secondary", "secondaryForeground",
  "muted", "mutedForeground", "accent", "accentForeground",
  "destructive", "destructiveForeground", "border", "input", "ring",
];

function toHexTokenSet(tokens: TokenSet): TokenSet {
  const result = {} as TokenSet;
  for (const key of FIELD_ORDER) {
    result[key] = hslToHex(tokens[key]);
  }
  return result;
}

function formatTokenSet(tokens: TokenSet): string {
  return FIELD_ORDER.map((key) => `${key}: "${tokens[key]}"`).join(", ");
}

export const THEME_COLORS_START_MARKER = "// ─── AUTO-GENERATED THEME COLORS (written by `aniui init` / `aniui theme`) ───";
export const THEME_COLORS_END_MARKER = "// ─── END AUTO-GENERATED THEME COLORS ───";

/** Builds the full marker-delimited THEME_COLORS + useThemeColors() block for a preset. */
export function buildThemeColorsBlock(preset: PresetName): string {
  const hsl = getPreset(preset);
  const light = toHexTokenSet(hsl.light);
  const dark = toHexTokenSet(hsl.dark);
  return [
    THEME_COLORS_START_MARKER,
    "// Do not hand-edit values below — regenerated whenever the theme preset changes.",
    "export const THEME_COLORS = {",
    `  light: { ${formatTokenSet(light)} },`,
    `  dark: { ${formatTokenSet(dark)} },`,
    "} as const;",
    "",
    "export function useThemeColors() {",
    "  const scheme = useNativeColorScheme();",
    '  return scheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;',
    "}",
    THEME_COLORS_END_MARKER,
  ].join("\n");
}

/**
 * Patches an already-installed theme-provider.tsx's THEME_COLORS block to
 * match `preset`, replacing everything between the marker comments (not the
 * rest of the file) so unrelated hand-edits elsewhere survive. Returns the
 * content unchanged if no marked block is found — e.g. the component isn't
 * installed in this project yet.
 */
export function patchThemeColorsBlock(content: string, preset: PresetName): string {
  const startIdx = content.indexOf(THEME_COLORS_START_MARKER);
  const endIdx = content.indexOf(THEME_COLORS_END_MARKER);
  if (startIdx === -1 || endIdx === -1) return content;

  const block = buildThemeColorsBlock(preset);
  return content.slice(0, startIdx) + block + content.slice(endIdx + THEME_COLORS_END_MARKER.length);
}

import { describe, it, expect } from "vitest";
import {
  buildThemeColorsBlock,
  patchThemeColorsBlock,
  THEME_COLORS_START_MARKER,
  THEME_COLORS_END_MARKER,
} from "../src/utils/theme-colors-block";

describe("buildThemeColorsBlock", () => {
  it("emits a block framed by the start and end markers", () => {
    const block = buildThemeColorsBlock("default");
    expect(block.startsWith(THEME_COLORS_START_MARKER)).toBe(true);
    expect(block.endsWith(THEME_COLORS_END_MARKER)).toBe(true);
  });

  it("includes a THEME_COLORS export with light + dark keys", () => {
    const block = buildThemeColorsBlock("default");
    expect(block).toMatch(/export const THEME_COLORS = \{/);
    expect(block).toMatch(/light: \{/);
    expect(block).toMatch(/dark: \{/);
  });

  it("includes a useThemeColors() hook definition", () => {
    const block = buildThemeColorsBlock("blue");
    expect(block).toMatch(/export function useThemeColors\(\)/);
    expect(block).toMatch(/useNativeColorScheme/);
  });

  it("emits only hex colors, not HSL triples", () => {
    const block = buildThemeColorsBlock("green");
    // The block body must contain hex values, not raw "H S% L%".
    expect(block).toMatch(/#[0-9a-f]{6}/i);
    // No stray HSL-style value should leak in (would be a conversion bug).
    expect(block).not.toMatch(/\d+%\s*\"/);
  });

  it("produces different hex sets for different presets", () => {
    expect(buildThemeColorsBlock("default")).not.toBe(buildThemeColorsBlock("blue"));
    expect(buildThemeColorsBlock("rose")).not.toBe(buildThemeColorsBlock("orange"));
  });
});

describe("patchThemeColorsBlock", () => {
  const SURROUND = (block: string) =>
    `// top of file\nimport React from "react";\n\n${block}\n\n// bottom of file\nexport function Foo() {}\n`;

  it("returns content unchanged when no marker block is present", () => {
    const content = `// no markers here\nexport function Foo() {}\n`;
    expect(patchThemeColorsBlock(content, "blue")).toBe(content);
  });

  it("replaces the inter-marker block without touching surrounding content", () => {
    const original = SURROUND(buildThemeColorsBlock("default"));
    const patched = patchThemeColorsBlock(original, "blue");
    expect(patched).toContain("// top of file");
    expect(patched).toContain("// bottom of file");
    expect(patched).toContain("export function Foo() {}");
    // Patched body differs from original body between the markers.
    expect(patched).not.toBe(original);
  });

  it("is idempotent for the same preset", () => {
    const original = SURROUND(buildThemeColorsBlock("default"));
    const once = patchThemeColorsBlock(original, "default");
    const twice = patchThemeColorsBlock(once, "default");
    expect(twice).toBe(once);
  });

  it("round-trips: patching to A then back to B produces the same as a direct patch to B", () => {
    const original = SURROUND(buildThemeColorsBlock("default"));
    const viaBlue = patchThemeColorsBlock(patchThemeColorsBlock(original, "blue"), "rose");
    const direct = patchThemeColorsBlock(original, "rose");
    expect(viaBlue).toBe(direct);
  });
});

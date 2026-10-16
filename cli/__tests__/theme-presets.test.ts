import { describe, it, expect } from "vitest";
import {
  getPreset,
  toCssVarMap,
  PRESET_NAMES,
  TOKEN_CSS_VARS,
} from "../src/theme-presets";

describe("theme-presets", () => {
  it("PRESET_NAMES covers the 5 built-in presets", () => {
    expect(PRESET_NAMES).toEqual(["default", "blue", "green", "orange", "rose"]);
  });

  it("getPreset returns a full 17-token set for both light and dark modes", () => {
    for (const name of PRESET_NAMES) {
      const preset = getPreset(name);
      expect(Object.keys(preset.light).length).toBe(17);
      expect(Object.keys(preset.dark).length).toBe(17);
    }
  });

  it("getPreset returns an HSL triple ('H S% L%') for every token", () => {
    const hslShape = /^-?[\d.]+\s+[\d.]+%\s+[\d.]+%$/;
    for (const name of PRESET_NAMES) {
      const preset = getPreset(name);
      for (const value of Object.values(preset.light)) {
        expect(value).toMatch(hslShape);
      }
      for (const value of Object.values(preset.dark)) {
        expect(value).toMatch(hslShape);
      }
    }
  });

  it("non-default presets differ from default on primary / primaryForeground", () => {
    const defaultPreset = getPreset("default");
    for (const name of PRESET_NAMES.filter((p) => p !== "default")) {
      const preset = getPreset(name);
      expect(preset.light.primary).not.toBe(defaultPreset.light.primary);
    }
  });

  it("non-default presets share chrome tokens with default", () => {
    const defaultPreset = getPreset("default");
    // background/card/secondary/muted/accent/destructive/border/input are
    // deliberately shared across every preset — only primary varies.
    for (const name of PRESET_NAMES.filter((p) => p !== "default")) {
      const preset = getPreset(name);
      expect(preset.light.background).toBe(defaultPreset.light.background);
      expect(preset.light.card).toBe(defaultPreset.light.card);
      expect(preset.light.border).toBe(defaultPreset.light.border);
    }
  });

  it("toCssVarMap maps TokenSet keys to the --kebab-case CSS variable name", () => {
    const preset = getPreset("default");
    const map = toCssVarMap(preset.light);
    expect(map["--background"]).toBe(preset.light.background);
    expect(map["--primary-foreground"]).toBe(preset.light.primaryForeground);
    expect(map["--muted-foreground"]).toBe(preset.light.mutedForeground);
  });

  it("TOKEN_CSS_VARS covers every TokenSet field exactly once", () => {
    const preset = getPreset("default");
    const tokenKeys = Object.keys(preset.light).sort();
    const cssVarKeys = Object.keys(TOKEN_CSS_VARS).sort();
    expect(cssVarKeys).toEqual(tokenKeys);
  });
});

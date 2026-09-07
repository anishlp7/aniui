import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs";
import { registry, getComponentNames } from "../src/registry";

const repoRoot = path.resolve(__dirname, "..", "..");

describe("component source files", () => {
  const names = getComponentNames();

  it.each(names)("%s uses named exports (no default export)", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).not.toMatch(/export\s+default\s/);
  });

  it.each(names)("%s does not use StyleSheet.create", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).not.toContain("StyleSheet.create");
  });

  it.each(names)("%s does not use 'any' type", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).not.toMatch(/:\s*any\b/);
    expect(content).not.toMatch(/as\s+any\b/);
  });

  // Complex components with many features (multi-select, groups, search-with-positioning, compound composers, etc.) justifiably exceed 120 lines
  const largeComponents = new Set([
    "combobox", "input-group", "command-menu", "data-table", "tabs", "select", "phone-input", "prompt-input", "autocomplete",
    // reacticx-fidelity rewrites/ports (Reanimated/Skia gesture+animation math genuinely needs the room; see CLAUDE.md's
    // relaxed line-count note for this effort) and brand-new reacticx-inspired components:
    "carousel-3d", "carousel-parallax", "carousel-circular", "carousel-tilt", "curved-bottom-tabs",
    "vertical-flow-carousel", "vertical-page-carousel",
    "area-chart", "bar-chart", "line-chart", "pie-chart", "radar-chart", "radial-chart",
    "action-rail", "animated-input-bar", "arc-list", "barcode-badge", "book-page", "coupon",
    "event-ticket", "expandable-view", "fan-menu", "gooey-popover", "gooey-search-tabs",
    "loader", "marquee", "matched-geometry", "mobile-dock", "morph-fab",
    "morphing-tabbar", "profile-card", "qr-code", "receipt-card", "rolling-counter",
    "save-button", "shimmer", "social-button", "split-view", "squircle-view", "verified-badge",
  ]);
  // Full compound multi-view systems (push/back navigation stacks, detent-driven bottom sheets) — a step
  // above the 320-line "large" tier, still single-file per CLAUDE.md, just genuinely bigger surface area.
  const extraLargeComponents = new Set(["tray", "unfold-menu"]);

  it.each(names)("%s is under the size limit for its tier", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n").length;
    const limit = extraLargeComponents.has(name) ? 900 : largeComponents.has(name) ? 650 : 120;
    expect(lines).toBeLessThanOrEqual(limit);
  });

  // Components that don't use cn() (thin wrappers or use inline styles)
  const noCnComponents = new Set(["select", "stepper", "refresh-control", "animate"]);

  it.each(names.filter((n) => !noCnComponents.has(n)))("%s imports cn from utils", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toMatch(/import.*\bcn\b.*from/);
  });
});

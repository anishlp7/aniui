import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs";
import { registry, getComponentNames } from "../src/registry";

const repoRoot = path.resolve(__dirname, "..", "..");

describe("component props interfaces", () => {
  const names = getComponentNames();

  it.each(names)("%s exports a Props type or interface", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    // Accept both `export interface FooProps` and `export type FooProps`
    expect(content).toMatch(/export\s+(?:interface|type)\s+\w+Props/);
  });

  // These components don't have a direct className prop
  const noClassNameComponents = new Set(["toast", "refresh-control"]);

  it.each(names.filter((n) => !noClassNameComponents.has(n)))(
    "%s has className in props",
    (name) => {
      const filePath = path.join(repoRoot, registry[name].file);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/className\??\s*:\s*string/);
    }
  );

  // These components destructure specific props without ...rest spread
  const noSpreadComponents = new Set(["select", "date-picker", "connection-banner", "theme-provider"]);

  it.each(names.filter((n) => !noSpreadComponents.has(n)))(
    "%s spreads remaining props",
    (name) => {
      const filePath = path.join(repoRoot, registry[name].file);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/\.\.\.\w+/);
    }
  );

  // Interactive components should have accessibilityRole or use rn-primitives (which handles it)
  const interactiveComponents = names.filter((name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    return content.includes("Pressable") || content.includes("Switch");
  });

  if (interactiveComponents.length > 0) {
    it.each(interactiveComponents)(
      "%s (interactive) has accessibilityRole or uses rn-primitives",
      (name) => {
        const filePath = path.join(repoRoot, registry[name].file);
        const content = fs.readFileSync(filePath, "utf-8");
        const hasA11yRole = /accessibilityRole/.test(content);
        const usesPrimitives = /@rn-primitives\//.test(content);
        expect(hasA11yRole || usesPrimitives).toBe(true);
      }
    );
  }
});

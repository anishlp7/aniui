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

  // Toast is a provider-based component without a direct className prop
  const noClassNameComponents = new Set(["toast"]);

  it.each(names.filter((n) => !noClassNameComponents.has(n)))(
    "%s has className in props",
    (name) => {
      const filePath = path.join(repoRoot, registry[name].file);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/className\??\s*:\s*string/);
    }
  );

  // Some compound components (select, date-picker) use inline styles and don't spread props
  const noSpreadComponents = new Set(["select", "date-picker"]);

  it.each(names.filter((n) => !noSpreadComponents.has(n)))(
    "%s spreads remaining props",
    (name) => {
      const filePath = path.join(repoRoot, registry[name].file);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/\.\.\.\w+/);
    }
  );

  // Interactive components should have accessibilityRole
  const interactiveComponents = names.filter((name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    return content.includes("Pressable") || content.includes("Switch");
  });

  if (interactiveComponents.length > 0) {
    it.each(interactiveComponents)(
      "%s (interactive) has accessibilityRole",
      (name) => {
        const filePath = path.join(repoRoot, registry[name].file);
        const content = fs.readFileSync(filePath, "utf-8");
        expect(content).toMatch(/accessibilityRole/);
      }
    );
  }
});

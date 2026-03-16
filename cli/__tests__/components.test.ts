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

  it.each(names)("%s is under 120 lines", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n").length;
    expect(lines).toBeLessThanOrEqual(120);
  });

  it.each(names)("%s imports cn from utils", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toMatch(/import.*\bcn\b.*from/);
  });
});

import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs";
import { registry, getComponentNames, resolveRegistryDeps } from "../src/registry";

const repoRoot = path.resolve(__dirname, "..", "..");

describe("registry", () => {
  const names = getComponentNames();

  it("has at least 25 components registered", () => {
    expect(names.length).toBeGreaterThanOrEqual(25);
  });

  it.each(names)("%s has a valid entry", (name) => {
    const entry = registry[name];
    expect(entry).toBeDefined();
    expect(entry.name).toBeTruthy();
    expect(entry.file).toMatch(/^components\/ui\/.+\.tsx$/);
    expect(entry.description).toBeTruthy();
    expect([1, 2, 3]).toContain(entry.tier);
    expect(Array.isArray(entry.dependencies)).toBe(true);
    expect(Array.isArray(entry.registryDependencies)).toBe(true);
  });

  it.each(names)("%s source file exists on disk", (name) => {
    const entry = registry[name];
    const filePath = path.join(repoRoot, entry.file);
    expect(fs.existsSync(filePath)).toBe(true);
  });

  // Components using inline styles have no clsx/tailwind-merge deps
  const inlineStyleComponents = new Set(["segmented-control", "stepper"]);

  it.each(names.filter((n) => !inlineStyleComponents.has(n)))("%s has clsx and tailwind-merge in dependencies", (name) => {
    const entry = registry[name];
    expect(entry.dependencies).toContain("clsx");
    expect(entry.dependencies).toContain("tailwind-merge");
  });

  it("tier 2 components include react-native-reanimated", () => {
    const tier2 = names.filter((n) => registry[n].tier === 2);
    for (const name of tier2) {
      expect(registry[name].dependencies).toContain("react-native-reanimated");
    }
  });

  it("tier 3 components have extra native dependencies", () => {
    const tier3 = names.filter((n) => registry[n].tier === 3);
    for (const name of tier3) {
      const hasExtraDep = registry[name].dependencies.some(
        (d) => d !== "clsx" && d !== "tailwind-merge" && d !== "class-variance-authority"
      );
      expect(hasExtraDep).toBe(true);
    }
  });

  it("registryDependencies reference valid components", () => {
    for (const name of names) {
      for (const dep of registry[name].registryDependencies) {
        expect(registry[dep]).toBeDefined();
      }
    }
  });
});

describe("resolveRegistryDeps", () => {
  it("resolves transitive dependencies", () => {
    const resolved = resolveRegistryDeps(["action-sheet"]);
    expect(resolved).toContain("action-sheet");
    expect(resolved).toContain("bottom-sheet");
  });

  it("deduplicates", () => {
    const resolved = resolveRegistryDeps(["select", "action-sheet"]);
    const unique = new Set(resolved);
    expect(resolved.length).toBe(unique.size);
  });

  it("returns input even if no registry deps", () => {
    const resolved = resolveRegistryDeps(["button"]);
    expect(resolved).toEqual(["button"]);
  });
});

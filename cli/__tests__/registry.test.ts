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
    expect([1, 2, 3, 4]).toContain(entry.tier);
    expect(Array.isArray(entry.dependencies)).toBe(true);
    expect(Array.isArray(entry.registryDependencies)).toBe(true);
  });

  it.each(names)("%s source file exists on disk", (name) => {
    const entry = registry[name];
    const filePath = path.join(repoRoot, entry.file);
    expect(fs.existsSync(filePath)).toBe(true);
  });

  // Components that don't use clsx/tailwind-merge (thin wrappers or inline styles)
  const inlineStyleComponents = new Set(["segmented-control", "stepper", "refresh-control", "animate"]);

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

  it("tier 4 components include @shopify/react-native-skia when present", () => {
    const tier4 = names.filter((n) => registry[n].tier === 4);
    for (const name of tier4) {
      expect(registry[name].dependencies).toContain("@shopify/react-native-skia");
    }
  });

  it("registryDependencies reference valid components", () => {
    for (const name of names) {
      for (const dep of registry[name].registryDependencies) {
        expect(registry[dep]).toBeDefined();
      }
    }
  });

  // Catches the class of bug where a component imports another AniUI component
  // but the registry doesn't list it as a registryDependency — which causes
  // `aniui add <name>` to ship a broken install (missing module at runtime).
  it.each(names)("%s registryDependencies cover every @/components/ui/* import", (name) => {
    const entry = registry[name];
    const filePath = path.join(repoRoot, entry.file);
    const content = fs.readFileSync(filePath, "utf-8");
    const importRegex = /from\s+["']@\/components\/ui\/([a-z0-9-]+)["']/g;
    const imported = new Set<string>();
    let match: RegExpExecArray | null;
    while ((match = importRegex.exec(content)) !== null) {
      if (match[1] !== name) imported.add(match[1]);
    }
    for (const dep of imported) {
      expect(
        entry.registryDependencies,
        `${name}.tsx imports @/components/ui/${dep} but ${dep} is not in its registryDependencies — aniui add ${name} would ship a broken install.`,
      ).toContain(dep);
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

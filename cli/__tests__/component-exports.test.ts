import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs";
import { registry, getComponentNames } from "../src/registry";

const repoRoot = path.resolve(__dirname, "..", "..");

describe("component exports", () => {
  const names = getComponentNames();

  // Some components export a Provider instead of the base name (e.g., Toast → ToastProvider)
  const providerComponents = new Set(["toast"]);
  // Utility modules that export constants/hooks, not a component matching the registry name
  const utilityModules = new Set(["animate"]);

  it.each(names.filter((n) => !providerComponents.has(n) && !utilityModules.has(n)))(
    "%s exports a function matching registry name",
    (name) => {
      const filePath = path.join(repoRoot, registry[name].file);
      const content = fs.readFileSync(filePath, "utf-8");
      const exportName = registry[name].name;
      const pattern = new RegExp(
        `export\\s+(?:function|const)\\s+${exportName}\\b`
      );
      expect(content).toMatch(pattern);
    }
  );

  it.each(Array.from(providerComponents))(
    "%s exports a Provider function",
    (name) => {
      const filePath = path.join(repoRoot, registry[name].file);
      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/export\s+function\s+\w+Provider\b/);
    }
  );

  it.each(names)("%s has no top-level console.log", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    // Check for console.log outside of function bodies is complex,
    // so just flag any bare console.log that isn't commented out
    const lines = content.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
      expect(trimmed).not.toMatch(/^console\.log\(/);
    }
  });

  it.each(names)("%s has no top-level alert calls", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
      expect(trimmed).not.toMatch(/^alert\(/);
    }
  });
});

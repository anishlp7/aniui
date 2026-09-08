import { describe, it, expect } from "vitest";
import path from "path";
import fs from "fs";
import { registry } from "../src/registry";

const repoRoot = path.resolve(__dirname, "..", "..");

const chartNames = [
  "area-chart",
  "bar-chart",
  "line-chart",
  "pie-chart",
  "radar-chart",
  "radial-chart",
];

const allChartNames = [...chartNames, "chart-tooltip"];

describe("chart components", () => {
  // Charts were rewritten onto @shopify/react-native-skia for real entrance/morph/scrub
  // animation — they no longer render react-native-svg.
  it.each(chartNames)("%s imports from @shopify/react-native-skia", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toMatch(/from\s+["']@shopify\/react-native-skia["']/);
  });

  it.each(chartNames)("%s has accessibilityRole image", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toMatch(/accessibilityRole=["']image["']/);
  });

  it.each(chartNames)("%s accepts height prop", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toMatch(/height\s*[?:=]/);
  });

  it.each(chartNames)("%s is Tier 3", (name) => {
    expect(registry[name].tier).toBe(3);
  });

  it.each(chartNames)(
    "%s has @shopify/react-native-skia in dependencies",
    (name) => {
      expect(registry[name].dependencies).toContain("@shopify/react-native-skia");
    }
  );

  it("chart-tooltip is Tier 1 (no Skia dependency)", () => {
    const entry = registry["chart-tooltip"];
    expect(entry.tier).toBe(1);
    expect(entry.dependencies).not.toContain("@shopify/react-native-skia");
  });

  it("chart-tooltip does not import Skia or react-native-svg", () => {
    const filePath = path.join(repoRoot, registry["chart-tooltip"].file);
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).not.toMatch(/react-native-svg|@shopify\/react-native-skia/);
  });

  it.each(allChartNames)("%s source file exists", (name) => {
    const filePath = path.join(repoRoot, registry[name].file);
    expect(fs.existsSync(filePath)).toBe(true);
  });
});

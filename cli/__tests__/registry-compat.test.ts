import { describe, it, expect } from "vitest";
import {
  checkCompat,
  resolveCompat,
  registry,
  SUPPORTED_SDKS,
  SUPPORTED_ENGINES,
  SUPPORTED_ARCH,
  ENGINE_REQUIRES_ARCH,
} from "../src/registry";

describe("library-level compatibility constants", () => {
  it("SUPPORTED_SDKS covers 54 through 58 and nothing below 54", () => {
    expect(SUPPORTED_SDKS).toContain(54);
    expect(SUPPORTED_SDKS).toContain(58);
    expect(SUPPORTED_SDKS.filter((s) => s < 54)).toEqual([]);
  });

  it("SUPPORTED_ENGINES lists uniwind and both NativeWind tracks", () => {
    expect(SUPPORTED_ENGINES).toEqual(["uniwind", "nativewind-v4", "nativewind-v5"]);
  });

  it("SUPPORTED_ARCH lists both old and new", () => {
    expect(SUPPORTED_ARCH).toEqual(["old", "new"]);
  });

  it("ENGINE_REQUIRES_ARCH: uniwind requires New Arch; NativeWind works on both", () => {
    expect(ENGINE_REQUIRES_ARCH.uniwind).toEqual(["new"]);
    expect(ENGINE_REQUIRES_ARCH["nativewind-v4"]).toEqual(["old", "new"]);
    expect(ENGINE_REQUIRES_ARCH["nativewind-v5"]).toEqual(["old", "new"]);
  });
});

describe("resolveCompat", () => {
  it("defaults an unqualified entry to the full supported matrix", () => {
    const button = registry["button"];
    const compat = resolveCompat(button);
    expect(compat.sdks).toEqual(SUPPORTED_SDKS);
    expect(compat.engines).toEqual(SUPPORTED_ENGINES);
    expect(compat.arch).toEqual(SUPPORTED_ARCH);
  });
});

describe("checkCompat", () => {
  it("returns fail for an unknown component", () => {
    const r = checkCompat("does-not-exist", { expoSdk: 56 });
    expect(r.verdict).toBe("fail");
    expect(r.reasons[0]).toMatch(/Unknown component/);
  });

  it("returns pass when every project field is covered by the component's supported matrix", () => {
    const r = checkCompat("button", { expoSdk: 56, engine: "nativewind-v4", arch: "new" });
    expect(r.verdict).toBe("pass");
  });

  it("returns warn when project engine+arch violate ENGINE_REQUIRES_ARCH but component itself is fine", () => {
    // uniwind on old arch is a project-level mismatch, not a component one.
    const r = checkCompat("button", { expoSdk: 56, engine: "uniwind", arch: "old" });
    expect(r.verdict).toBe("warn");
    expect(r.reasons.some((m) => m.includes("Uniwind") || m.includes("uniwind"))).toBe(true);
  });

  it("ignores unspecified project fields rather than failing", () => {
    const r = checkCompat("button", {});
    expect(r.verdict).toBe("pass");
  });
});

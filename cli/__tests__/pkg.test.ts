import { describe, it, expect } from "vitest";
import { getCliPackage } from "../src/utils/pkg";

describe("getCliPackage", () => {
  it("resolves the real @aniui/cli package.json", () => {
    const pkg = getCliPackage();
    expect(pkg.name).toBe("@aniui/cli");
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("returns an object (never undefined), even when the walk fails", () => {
    // Smoke check — the function has a 5-level fallback that returns a
    // sentinel { version: "0.0.0", name: "@aniui/cli" } instead of throwing.
    const pkg = getCliPackage();
    expect(pkg).toBeTruthy();
    expect(typeof pkg.name).toBe("string");
    expect(typeof pkg.version).toBe("string");
  });
});

import { describe, it, expect } from "vitest";
import { hslToHex } from "../src/utils/color";

describe("hslToHex", () => {
  it("converts pure white", () => {
    expect(hslToHex("0 0% 100%").toLowerCase()).toBe("#ffffff");
  });

  it("converts pure black", () => {
    expect(hslToHex("0 0% 0%").toLowerCase()).toBe("#000000");
  });

  it("converts primary red (hue 0, full saturation, mid lightness)", () => {
    expect(hslToHex("0 100% 50%").toLowerCase()).toBe("#ff0000");
  });

  it("converts primary green (hue 120)", () => {
    expect(hslToHex("120 100% 50%").toLowerCase()).toBe("#00ff00");
  });

  it("converts primary blue (hue 240)", () => {
    expect(hslToHex("240 100% 50%").toLowerCase()).toBe("#0000ff");
  });

  it("tolerates extra whitespace", () => {
    expect(hslToHex("  0 0% 100%  ").toLowerCase()).toBe("#ffffff");
  });

  it("wraps negative hues", () => {
    // -120 == 240 (blue); same hex.
    expect(hslToHex("-120 100% 50%").toLowerCase()).toBe("#0000ff");
  });

  it("tolerates hues over 360 via modulo", () => {
    expect(hslToHex("480 100% 50%").toLowerCase()).toBe(hslToHex("120 100% 50%").toLowerCase());
  });

  it("accepts fractional hue, saturation, and lightness", () => {
    expect(hslToHex("240 5.9% 10%")).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("throws on an unparseable HSL string", () => {
    expect(() => hslToHex("not valid")).toThrow(/could not parse/);
    expect(() => hslToHex("0 0 0")).toThrow(/could not parse/); // missing %
  });
});

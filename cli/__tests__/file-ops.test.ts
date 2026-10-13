import { describe, it, expect } from "vitest";
import { stripTypes, transformForUniwind, getPackageRoot } from "../src/utils/file-ops";
import { existsSync } from "fs";
import path from "path";

describe("getPackageRoot", () => {
  it("returns a directory that contains cli/package.json", () => {
    const root = getPackageRoot();
    expect(existsSync(path.join(root, "cli", "package.json"))).toBe(true);
  });
});

describe("stripTypes", () => {
  it("removes exported interfaces", () => {
    const src = `import { View } from "react-native";

export interface FooProps {
  name: string;
}

export function Foo() { return null; }
`;
    const out = stripTypes(src);
    expect(out).not.toMatch(/interface/);
    expect(out).toMatch(/export function Foo/);
  });

  it("removes exported type aliases", () => {
    const out = stripTypes(`export type Bar = "a" | "b";\nexport function x() {}\n`);
    expect(out).not.toMatch(/type/);
    expect(out).toMatch(/export function x/);
  });

  it("drops 'import type' lines entirely", () => {
    const out = stripTypes(`import type { Foo } from "bar";\nimport { X } from "y";\n`);
    expect(out).not.toMatch(/import type/);
    expect(out).toMatch(/import { X } from "y";/);
  });

  it("strips ', type Foo' from mixed imports", () => {
    const out = stripTypes(`import { View, type ViewProps } from "react-native";\n`);
    expect(out).not.toMatch(/type/);
    expect(out).toMatch(/import { View } from "react-native";/);
  });

  it("removes 'as Type' casts (preserves 'as const' similarly)", () => {
    const out = stripTypes(`const x = foo as MyType;\n`);
    expect(out).not.toMatch(/as MyType/);
    expect(out).toMatch(/const x = foo;/);
  });

  it("drops generic parameters on function definitions", () => {
    const out = stripTypes(`export function Grid<T extends object>() { return null; }\n`);
    expect(out).not.toMatch(/<T/);
  });

  it("ends with exactly one trailing newline", () => {
    const out = stripTypes(`const x = 1;`);
    expect(out).toMatch(/\n$/);
    expect(out).not.toMatch(/\n\n$/);
  });
});

describe("transformForUniwind", () => {
  it("expands bg-background → explicit light + dark: variants", () => {
    const out = transformForUniwind(`<View className="bg-background" />`);
    expect(out).toMatch(/bg-white/);
    expect(out).toMatch(/dark:bg-zinc-950/);
  });

  it("expands text-foreground with correct zinc shades", () => {
    const out = transformForUniwind(`className="text-foreground"`);
    expect(out).toMatch(/text-zinc-950/);
    expect(out).toMatch(/dark:text-zinc-50/);
  });

  it("preserves hover: variants and prepends dark: correctly", () => {
    const out = transformForUniwind(`className="hover:bg-primary"`);
    // Should produce "hover:bg-zinc-900 dark:hover:bg-zinc-50"
    expect(out).toMatch(/hover:bg-zinc-900/);
    expect(out).toMatch(/dark:hover:bg-zinc-50/);
  });

  it("preserves opacity suffixes like /50 across both variants", () => {
    const out = transformForUniwind(`className="bg-primary/20"`);
    expect(out).toMatch(/bg-zinc-900\/20/);
    expect(out).toMatch(/dark:bg-zinc-50\/20/);
  });

  it("leaves non-token classes alone", () => {
    const out = transformForUniwind(`className="flex-1 rounded-md"`);
    expect(out).toContain("flex-1");
    expect(out).toContain("rounded-md");
    expect(out).not.toMatch(/dark:/);
  });

  it("does not touch classes that merely contain a token substring", () => {
    // "border-input" is a real token; "border-input-foo" is a made-up variant
    // that must not be captured by the regex.
    const out = transformForUniwind(`className="border-input-foo"`);
    expect(out).toBe(`className="border-input-foo"`);
  });
});

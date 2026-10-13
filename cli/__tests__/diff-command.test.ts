import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";
import { registry } from "../src/registry";
import { diffCommand } from "../src/commands/diff";
import { getPackageRoot } from "../src/utils/file-ops";

/**
 * Exercises diffCommand end-to-end by chdir'ing into a scratchpad project
 * that has a copy of a real component (button) and reporting the diff
 * against the upstream source.
 */

let tmpRoot: string;
let originalCwd: string;
let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let output: string[];

beforeEach(async () => {
  originalCwd = process.cwd();
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-diff-"));
  process.chdir(tmpRoot);
  output = [];
  exitSpy = vi.spyOn(process, "exit").mockImplementation((() => {
    throw new Error("process.exit called");
  }) as (code?: number) => never);
  logSpy = vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
    output.push(args.map((a) => String(a)).join(" "));
  });
  errorSpy = vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    output.push(args.map((a) => String(a)).join(" "));
  });
});

afterEach(async () => {
  process.chdir(originalCwd);
  exitSpy.mockRestore();
  logSpy.mockRestore();
  errorSpy.mockRestore();
  await fs.remove(tmpRoot);
});

describe("diffCommand", () => {
  it("reports 'identical' when local matches upstream byte-for-byte", async () => {
    const buttonEntry = registry.button;
    const componentsDir = path.join(tmpRoot, "components", "ui");
    await fs.ensureDir(componentsDir);
    const upstream = path.join(getPackageRoot(), buttonEntry.file);
    await fs.copyFile(upstream, path.join(componentsDir, path.basename(buttonEntry.file)));

    await diffCommand("button");
    const joined = output.join("\n");
    expect(joined).toMatch(/identical to upstream/);
  });

  it("prints a +/- diff when the local file was edited", async () => {
    const buttonEntry = registry.button;
    const componentsDir = path.join(tmpRoot, "components", "ui");
    await fs.ensureDir(componentsDir);
    const upstream = path.join(getPackageRoot(), buttonEntry.file);
    const local = path.join(componentsDir, path.basename(buttonEntry.file));
    const upstreamContent = await fs.readFile(upstream, "utf-8");
    // Edit the first non-import line so the diff isn't trivially shifted.
    await fs.writeFile(local, upstreamContent.replace("Button", "ButtonEdited"), "utf-8");

    await diffCommand("button");
    const joined = output.join("\n");
    // Local (edited) renders on - lines with the "ButtonEdited" rename,
    // upstream (original) renders on + lines with the plain "Button".
    expect(joined).toMatch(/- .*ButtonEdited/);
    expect(joined).toMatch(/\+ .*Button[^E]/);
  });

  it("exits non-zero on an unknown component name", async () => {
    await expect(diffCommand("not-a-real-component")).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/Unknown component/);
  });

  it("exits non-zero when the component isn't installed locally", async () => {
    await expect(diffCommand("button")).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/not installed locally/);
  });
});

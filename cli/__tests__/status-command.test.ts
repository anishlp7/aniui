import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";
import { registry } from "../src/registry";
import { getPackageRoot } from "../src/utils/file-ops";
import { statusCommand } from "../src/commands/status";

let tmpRoot: string;
let originalCwd: string;
let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let output: string[];

beforeEach(async () => {
  originalCwd = process.cwd();
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-status-"));
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

describe("statusCommand", () => {
  it("exits non-zero when the project isn't initialized (no .aniui.json)", async () => {
    await expect(statusCommand()).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/not initialized/);
  });

  it("marks an unmodified installed component as 'current'", async () => {
    const buttonEntry = registry.button;
    const componentsDir = path.join(tmpRoot, "components", "ui");
    await fs.ensureDir(componentsDir);
    const upstream = path.join(getPackageRoot(), buttonEntry.file);
    const local = path.join(componentsDir, path.basename(buttonEntry.file));
    await fs.copyFile(upstream, local);
    const { createHash } = require("crypto");
    const content = await fs.readFile(local, "utf-8");
    const hash = createHash("sha256").update(content).digest("hex").slice(0, 8);
    const pkg = require(path.join(getPackageRoot(), "cli", "package.json"));
    await fs.writeJson(path.join(tmpRoot, ".aniui.json"), {
      componentsDir: "components/ui",
      utilPath: "lib/utils.ts",
      theme: "default",
      installed: {
        button: { version: pkg.version, hash, addedAt: "2026-01-01T00:00:00.000Z" },
      },
    });

    await statusCommand();
    const joined = output.join("\n");
    expect(joined).toMatch(/button/);
    expect(joined).toMatch(/current/);
  });

  it("flags locally-modified components as 'modified'", async () => {
    const buttonEntry = registry.button;
    const componentsDir = path.join(tmpRoot, "components", "ui");
    await fs.ensureDir(componentsDir);
    const upstream = path.join(getPackageRoot(), buttonEntry.file);
    const local = path.join(componentsDir, path.basename(buttonEntry.file));
    await fs.copyFile(upstream, local);
    // Write a manifest that lists a hash NOT matching the file content —
    // status will see a hash mismatch and label the row as modified.
    const pkg = require(path.join(getPackageRoot(), "cli", "package.json"));
    await fs.writeJson(path.join(tmpRoot, ".aniui.json"), {
      componentsDir: "components/ui",
      utilPath: "lib/utils.ts",
      theme: "default",
      installed: {
        button: { version: pkg.version, hash: "deadbeef", addedAt: "2026-01-01T00:00:00.000Z" },
      },
    });

    await statusCommand();
    const joined = output.join("\n");
    expect(joined).toMatch(/button/);
    expect(joined).toMatch(/modified/);
  });

  it("marks never-installed components as 'not installed'", async () => {
    await fs.writeJson(path.join(tmpRoot, ".aniui.json"), {
      componentsDir: "components/ui",
      utilPath: "lib/utils.ts",
      theme: "default",
      installed: {},
    });
    await statusCommand();
    const joined = output.join("\n");
    expect(joined).toMatch(/not installed/);
  });
});

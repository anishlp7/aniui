import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";
import { addCommand } from "../src/commands/add";

/**
 * End-to-end for addCommand: initialize a minimal project in a scratchpad
 * (lib/utils.ts present, package.json present) and verify that copying a
 * leaf component writes the expected files and manifest.
 */

let tmpRoot: string;
let originalCwd: string;
let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let output: string[];

async function initProject(root: string): Promise<void> {
  await fs.ensureDir(path.join(root, "lib"));
  await fs.writeFile(path.join(root, "lib", "utils.ts"), "export const cn = () => '';\n");
  await fs.writeJson(path.join(root, "package.json"), {
    name: "scratch",
    version: "0.0.0",
    dependencies: { nativewind: "^4.0.0" },
  });
  await fs.writeJson(path.join(root, "tsconfig.json"), {
    compilerOptions: { baseUrl: ".", paths: { "@/*": ["./*"] } },
  });
}

beforeEach(async () => {
  originalCwd = process.cwd();
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-add-"));
  process.chdir(tmpRoot);
  await initProject(tmpRoot);
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

describe("addCommand", () => {
  it("copies a leaf component to components/ui/ and writes a manifest entry", async () => {
    await addCommand(["text"]);
    const dest = path.join(tmpRoot, "components", "ui", "text.tsx");
    expect(await fs.pathExists(dest)).toBe(true);

    const manifest = await fs.readJson(path.join(tmpRoot, ".aniui.json"));
    expect(manifest.installed.text).toBeTruthy();
    expect(manifest.installed.text.hash).toMatch(/^[0-9a-f]{8}$/);
    expect(manifest.installed.text.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("resolves registryDependencies — adding card also copies text", async () => {
    await addCommand(["card"]);
    expect(await fs.pathExists(path.join(tmpRoot, "components", "ui", "card.tsx"))).toBe(true);
    expect(await fs.pathExists(path.join(tmpRoot, "components", "ui", "text.tsx"))).toBe(true);

    const manifest = await fs.readJson(path.join(tmpRoot, ".aniui.json"));
    expect(manifest.installed.card).toBeTruthy();
    expect(manifest.installed.text).toBeTruthy();
  });

  it("skips already-installed components without duplicating or erroring", async () => {
    await addCommand(["text"]);
    const hash1 = (await fs.readJson(path.join(tmpRoot, ".aniui.json"))).installed.text.hash;

    await addCommand(["text"]);
    // Second add is a no-op for the file — but existing manifest entries persist unchanged.
    const manifest = await fs.readJson(path.join(tmpRoot, ".aniui.json"));
    expect(manifest.installed.text.hash).toBe(hash1);
    const joined = output.join("\n");
    expect(joined).toMatch(/text/);
  });

  it("exits non-zero when the project hasn't been initialized (no lib/utils)", async () => {
    await fs.remove(path.join(tmpRoot, "lib", "utils.ts"));
    await expect(addCommand(["text"])).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/not initialized/);
  });

  it("exits non-zero on an unknown component name", async () => {
    await expect(addCommand(["not-real"])).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/Unknown component/);
  });

  it("exits non-zero with usage help when no names are provided", async () => {
    await expect(addCommand([])).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/No component names provided/);
    expect(joined).toMatch(/Available components:/);
  });
});

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";
import { registry } from "../src/registry";
import { getPackageRoot } from "../src/utils/file-ops";
import { getCliPackage } from "../src/utils/pkg";
import { hashContent } from "../src/utils/hash";
import { updateCommand } from "../src/commands/update";

const CURRENT_VERSION = getCliPackage().version;

let tmpRoot: string;
let originalCwd: string;
let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let output: string[];

async function seedProject(
  installedEntries: Record<string, { version: string; hash: string }>
): Promise<void> {
  await fs.ensureDir(path.join(tmpRoot, "lib"));
  await fs.writeFile(path.join(tmpRoot, "lib", "utils.ts"), "export const cn = () => '';\n");
  await fs.writeJson(path.join(tmpRoot, ".aniui.json"), {
    componentsDir: "components/ui",
    utilPath: "lib/utils.ts",
    theme: "default",
    installed: Object.fromEntries(
      Object.entries(installedEntries).map(([k, v]) => [
        k,
        { ...v, addedAt: "2026-01-01T00:00:00.000Z" },
      ])
    ),
  });
}

async function copyUpstream(name: string, patch?: (c: string) => string): Promise<string> {
  const entry = registry[name];
  const upstream = path.join(getPackageRoot(), entry.file);
  const dest = path.join(tmpRoot, "components", "ui", path.basename(entry.file));
  await fs.ensureDir(path.dirname(dest));
  const content = await fs.readFile(upstream, "utf-8");
  const final = patch ? patch(content) : content;
  await fs.writeFile(dest, final, "utf-8");
  return final;
}

beforeEach(async () => {
  originalCwd = process.cwd();
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-update-"));
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

describe("updateCommand", () => {
  it("exits non-zero when the project isn't initialized", async () => {
    await expect(updateCommand(["text"])).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/not initialized/);
  });

  it("skips components already at the current CLI version", async () => {
    const content = await copyUpstream("text");
    await seedProject({
      text: { version: CURRENT_VERSION, hash: hashContent(content) },
    });

    await updateCommand(["text"]);
    const joined = output.join("\n");
    expect(joined).toMatch(/text is already at v/);
    expect(joined).toMatch(/0 component\(s\) updated|Update summary/);
  });

  it("re-copies a stale-version component and refreshes its manifest hash", async () => {
    const content = await copyUpstream("text");
    await seedProject({
      // Pretend it was installed at an old version — hash still matches local.
      text: { version: "0.0.1", hash: hashContent(content) },
    });

    await updateCommand(["text"]);
    const config = await fs.readJson(path.join(tmpRoot, ".aniui.json"));
    expect(config.installed.text.version).toBe(CURRENT_VERSION);
    expect(config.installed.text.hash).toMatch(/^[0-9a-f]{8}$/);
    // addedAt is preserved from the original seed.
    expect(config.installed.text.addedAt).toBe("2026-01-01T00:00:00.000Z");
  });

  it("warns and skips a component with no manifest entry (untracked file)", async () => {
    await copyUpstream("text");
    await seedProject({}); // installed is empty — text is untracked
    await updateCommand(["text"]);
    const joined = output.join("\n");
    expect(joined).toMatch(/text has no manifest entry/);
  });

  it("warns and skips a manifested component whose file was deleted locally", async () => {
    await seedProject({
      text: { version: "0.0.1", hash: "deadbeef" },
    });
    // Intentionally no copyUpstream — the file doesn't exist.
    await updateCommand(["text"]);
    const joined = output.join("\n");
    expect(joined).toMatch(/text is not installed locally/);
  });

  it("exits non-zero on an unknown component name", async () => {
    await seedProject({ text: { version: "0.0.1", hash: "deadbeef" } });
    await expect(updateCommand(["not-a-real-component"])).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/Unknown component/);
  });
});

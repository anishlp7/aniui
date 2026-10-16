import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";
import { blockRegistry } from "../src/block-registry";
import { addBlockCommand } from "../src/commands/add-block";

let tmpRoot: string;
let originalCwd: string;
let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let output: string[];

async function initializedProject(): Promise<void> {
  await fs.ensureDir(path.join(tmpRoot, "lib"));
  await fs.writeFile(path.join(tmpRoot, "lib", "utils.ts"), "export const cn = () => '';\n");
  await fs.writeJson(path.join(tmpRoot, "package.json"), {
    name: "scratch",
    version: "0.0.0",
    dependencies: { nativewind: "^4.0.0" },
  });
  await fs.writeJson(path.join(tmpRoot, "tsconfig.json"), {
    compilerOptions: { baseUrl: ".", paths: { "@/*": ["./*"] } },
  });
}

beforeEach(async () => {
  originalCwd = process.cwd();
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-add-block-"));
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

describe("addBlockCommand", () => {
  it("exits non-zero with usage help when no names are provided", async () => {
    await initializedProject();
    await expect(addBlockCommand([])).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/No block names provided/);
    expect(joined).toMatch(/Available blocks:/);
  });

  it("exits non-zero on an unknown block name", async () => {
    await initializedProject();
    await expect(addBlockCommand(["not-a-real-block"])).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/Unknown block/);
  });

  it("exits non-zero when the project isn't initialized (no lib/utils)", async () => {
    await fs.writeJson(path.join(tmpRoot, "package.json"), {
      name: "scratch",
      dependencies: { nativewind: "^4.0.0" },
    });
    await expect(addBlockCommand(["login"])).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/not initialized/);
  });

  it("copies a block to app/screens/ and auto-installs its component deps", async () => {
    await initializedProject();
    await addBlockCommand(["login"]);

    const entry = blockRegistry.login;
    const dest = path.join(tmpRoot, "app", "screens", path.basename(entry.file));
    expect(await fs.pathExists(dest)).toBe(true);

    // Component deps resolved and copied into components/ui/.
    for (const comp of entry.components) {
      expect(await fs.pathExists(path.join(tmpRoot, "components", "ui", `${comp}.tsx`))).toBe(true);
    }
  });

  it("skips a block that's already present without erroring", async () => {
    await initializedProject();
    await addBlockCommand(["login"]);
    await addBlockCommand(["login"]);
    const joined = output.join("\n");
    expect(joined).toMatch(/already exists/);
  });

  it("rewrites @/components/ui/* imports in the copied block to its sibling path", async () => {
    await initializedProject();
    await addBlockCommand(["login"]);
    const entry = blockRegistry.login;
    const copied = await fs.readFile(
      path.join(tmpRoot, "app", "screens", path.basename(entry.file)),
      "utf-8",
    );
    // After copy, @/components/ui/button should resolve relative to app/screens/,
    // i.e. "../../components/ui/button".
    expect(copied).not.toContain("@/components/ui/");
    expect(copied).toMatch(/\.\.\/\.\.\/components\/ui\//);
  });
});

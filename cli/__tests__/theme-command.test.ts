import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";

// prompts has to be mocked BEFORE themeCommand's module is loaded so the
// import inside themeCommand picks up our stub. Default export is the
// function themeCommand actually calls as `prompts({...})`.
vi.mock("prompts", () => {
  const prompts = vi.fn(() => Promise.resolve({ theme: "blue" }));
  return { default: prompts };
});

import { themeCommand } from "../src/commands/theme";
import { buildThemeColorsBlock } from "../src/utils/theme-colors-block";

let tmpRoot: string;
let originalCwd: string;
let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let output: string[];

beforeEach(async () => {
  originalCwd = process.cwd();
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-theme-"));
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

const INITIAL_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --primary: 240 5.9% 10%;
  }
  .dark {
    --background: 240 10% 3.9%;
    --primary: 0 0% 98%;
  }
}
`;

describe("themeCommand", () => {
  it("exits non-zero when global.css is missing", async () => {
    await expect(themeCommand()).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/global\.css not found/);
  });

  it("rewrites global.css light + dark --primary values to the chosen preset", async () => {
    await fs.writeFile(path.join(tmpRoot, "global.css"), INITIAL_CSS, "utf-8");
    await themeCommand();

    const css = await fs.readFile(path.join(tmpRoot, "global.css"), "utf-8");
    // Blue preset primaries aren't the default greyscale ones.
    expect(css).toMatch(/:root\s*\{[\s\S]+--primary:\s*[\d.]+ [\d.]+% [\d.]+%/);
    expect(css).toMatch(/\.dark\s*\{[\s\S]+--primary:/);
    expect(css).not.toContain("--primary: 240 5.9% 10%"); // default greyscale replaced
  });

  it("updates .aniui.json 'theme' field when the config exists", async () => {
    await fs.writeFile(path.join(tmpRoot, "global.css"), INITIAL_CSS, "utf-8");
    await fs.writeJson(path.join(tmpRoot, ".aniui.json"), {
      componentsDir: "components/ui",
      utilPath: "lib/utils.ts",
      theme: "default",
    });
    await themeCommand();

    const config = await fs.readJson(path.join(tmpRoot, ".aniui.json"));
    expect(config.theme).toBe("blue");
  });

  it("re-patches an already-installed theme-provider.tsx THEME_COLORS block", async () => {
    await fs.writeFile(path.join(tmpRoot, "global.css"), INITIAL_CSS, "utf-8");
    await fs.writeJson(path.join(tmpRoot, ".aniui.json"), {
      componentsDir: "components/ui",
      utilPath: "lib/utils.ts",
      theme: "default",
    });
    const compDir = path.join(tmpRoot, "components", "ui");
    await fs.ensureDir(compDir);
    const defaultBlock = buildThemeColorsBlock("default");
    await fs.writeFile(
      path.join(compDir, "theme-provider.tsx"),
      `// header\n${defaultBlock}\n// footer\n`,
      "utf-8",
    );

    await themeCommand();

    const content = await fs.readFile(path.join(compDir, "theme-provider.tsx"), "utf-8");
    const blueBlock = buildThemeColorsBlock("blue");
    expect(content).toContain(blueBlock);
    // Surrounding context preserved.
    expect(content).toContain("// header");
    expect(content).toContain("// footer");
  });
});

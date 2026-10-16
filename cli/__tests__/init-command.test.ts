import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";
import { initCommand } from "../src/commands/init";

/**
 * End-to-end for initCommand: scaffold a scratchpad project in a temp dir
 * that already has every dep init looks for (so the execSync-driven install
 * branch never fires), then invoke the command in scripted mode (--yes) and
 * assert the generated/patched file set.
 */

let tmpRoot: string;
let originalCwd: string;
let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let output: string[];

// Baseline Expo project with every dep init requires already present —
// detectProject reads straight from package.json, so no actual install needed.
async function scaffoldExpoProject(
  root: string,
  depOverrides: Record<string, string | undefined> = {}
): Promise<void> {
  const base: Record<string, string> = {
    expo: "~57.0.0",
    react: "19.2.3",
    "react-native": "0.86.0",
    "expo-router": "~6.0.0",
    // Everything init would otherwise mark missing + offer to install:
    "react-native-reanimated": "~4.5.0",
    "react-native-worklets": "~0.10.0",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-svg": "15.15.3",
    "lucide-react-native": "^1.24.0",
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    "tailwind-merge": "^3.5.0",
    uniwind: "^0.4.0",
    tailwindcss: "^4.1.0",
  };
  const merged: Record<string, string> = { ...base };
  for (const [k, v] of Object.entries(depOverrides)) {
    if (v === undefined) delete merged[k];
    else merged[k] = v;
  }
  await fs.writeJson(path.join(root, "package.json"), {
    name: "scratch",
    version: "0.0.0",
    main: "expo-router/entry",
    dependencies: merged,
  });
  await fs.writeJson(path.join(root, "tsconfig.json"), {
    extends: "expo/tsconfig.base",
    compilerOptions: { strict: true },
  });
  // Expo Router default layout — init auto-injects global.css import into this file.
  await fs.ensureDir(path.join(root, "app"));
  await fs.writeFile(
    path.join(root, "app", "_layout.tsx"),
    `import { Stack } from "expo-router";\n\nexport default function RootLayout() {\n  return <Stack />;\n}\n`
  );
}

beforeEach(async () => {
  originalCwd = process.cwd();
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-init-"));
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

describe("initCommand", () => {
  it("Uniwind happy path on Expo SDK 57 writes the expected file set", async () => {
    await scaffoldExpoProject(tmpRoot);
    await initCommand({ yes: true });

    // Core generated files
    expect(await fs.pathExists(path.join(tmpRoot, "lib", "utils.ts"))).toBe(true);
    expect(await fs.pathExists(path.join(tmpRoot, "global.css"))).toBe(true);
    expect(await fs.pathExists(path.join(tmpRoot, "metro.config.js"))).toBe(true);
    expect(await fs.pathExists(path.join(tmpRoot, "babel.config.js"))).toBe(true);
    expect(await fs.pathExists(path.join(tmpRoot, ".aniui.json"))).toBe(true);
    // Components directory stub
    expect(await fs.pathExists(path.join(tmpRoot, "components", "ui"))).toBe(true);

    // Uniwind-specific: no nativewind-env.d.ts, no tailwind.config.js (CSS-first),
    // metro.config.js uses withUniwindConfig.
    expect(await fs.pathExists(path.join(tmpRoot, "nativewind-env.d.ts"))).toBe(false);
    expect(await fs.pathExists(path.join(tmpRoot, "tailwind.config.js"))).toBe(false);
    const metro = await fs.readFile(path.join(tmpRoot, "metro.config.js"), "utf-8");
    expect(metro).toMatch(/withUniwindConfig/);
    expect(metro).toMatch(/cssEntryFile: "\.\/global\.css"/);
  });

  it("writes a .aniui.json whose fields reflect the chosen style/theme/paths", async () => {
    await scaffoldExpoProject(tmpRoot);
    await initCommand({ yes: true });

    const config = await fs.readJson(path.join(tmpRoot, ".aniui.json"));
    expect(config.style).toBe("uniwind");
    expect(config.theme).toBe("default");
    expect(config.componentsDir).toBe("components/ui");
    expect(config.utilPath).toBe("lib/utils.ts");
    expect(config.tsx).toBe(true);
    // SDK 55+/Expo 57 → v5 track by default.
    expect(config.sdkGeneration).toBe("v5");
  });

  it("auto-injects global.css import into app/_layout.tsx", async () => {
    await scaffoldExpoProject(tmpRoot);
    await initCommand({ yes: true });

    const layout = await fs.readFile(path.join(tmpRoot, "app", "_layout.tsx"), "utf-8");
    expect(layout).toMatch(/^import "\.\/global\.css";$/m);
  });

  it("adds the @/ path alias to tsconfig.json when missing", async () => {
    await scaffoldExpoProject(tmpRoot);
    await initCommand({ yes: true });

    const tsconfig = await fs.readJson(path.join(tmpRoot, "tsconfig.json"));
    expect(tsconfig.compilerOptions.paths?.["@/*"]).toEqual(["./*"]);
  });

  it("NativeWind v5 path: --style nativewind + --nw v5 generates postcss.config.js, not tailwind.config.js", async () => {
    await scaffoldExpoProject(tmpRoot, { nativewind: "5.0.0-preview.4", uniwind: undefined });
    await initCommand({ style: "nativewind", nw: "v5", yes: true });

    expect(await fs.pathExists(path.join(tmpRoot, "postcss.config.js"))).toBe(true);
    expect(await fs.pathExists(path.join(tmpRoot, "tailwind.config.js"))).toBe(false);
    expect(await fs.pathExists(path.join(tmpRoot, "nativewind-env.d.ts"))).toBe(true);

    const config = await fs.readJson(path.join(tmpRoot, ".aniui.json"));
    expect(config.style).toBe("nativewind");
    expect(config.sdkGeneration).toBe("v5");
  });

  it("NativeWind v4 path: --style nativewind + --nw v4 generates tailwind.config.js", async () => {
    await scaffoldExpoProject(tmpRoot, { nativewind: "^4.0.0", tailwindcss: "^3.4.0", uniwind: undefined });
    await initCommand({ style: "nativewind", nw: "v4", yes: true });

    expect(await fs.pathExists(path.join(tmpRoot, "tailwind.config.js"))).toBe(true);
    expect(await fs.pathExists(path.join(tmpRoot, "nativewind-env.d.ts"))).toBe(true);
    expect(await fs.pathExists(path.join(tmpRoot, "postcss.config.js"))).toBe(false);

    const config = await fs.readJson(path.join(tmpRoot, ".aniui.json"));
    expect(config.sdkGeneration).toBe("v4");
  });

  it("global.css has light + dark theme sections after preset is applied", async () => {
    await scaffoldExpoProject(tmpRoot, { nativewind: "^4.0.0", tailwindcss: "^3.4.0", uniwind: undefined });
    await initCommand({ style: "nativewind", nw: "v4", yes: true });

    const css = await fs.readFile(path.join(tmpRoot, "global.css"), "utf-8");
    expect(css).toMatch(/:root\s*\{/);
    expect(css).toMatch(/\.dark\s*\{/);
    expect(css).toMatch(/--primary:\s*\d/);
  });

  it("exits non-zero when run outside a React Native / Expo project", async () => {
    // Scratchpad has no package.json → detectProject returns 'unknown'.
    await expect(initCommand({ yes: true })).rejects.toThrow("process.exit called");
    const joined = output.join("\n");
    expect(joined).toMatch(/Could not detect a React Native or Expo project/);
  });
});

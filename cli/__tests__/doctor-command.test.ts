import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";
import { doctorCommand } from "../src/commands/doctor";

let tmpRoot: string;
let originalCwd: string;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let output: string[];

const EXPO_PKG = {
  name: "scratch",
  version: "0.0.0",
  dependencies: {
    expo: "~57.0.0",
    react: "19.2.3",
    "react-native": "0.86.0",
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
  },
};

async function seedHealthyProject(): Promise<void> {
  await fs.writeJson(path.join(tmpRoot, "package.json"), EXPO_PKG);
  await fs.writeJson(path.join(tmpRoot, "app.json"), {
    expo: { name: "scratch", slug: "scratch" },
  });
  await fs.writeJson(path.join(tmpRoot, ".aniui.json"), {
    componentsDir: "components/ui",
    utilPath: "lib/utils.ts",
    theme: "default",
    style: "uniwind",
    sdkGeneration: "v5",
    tsx: true,
  });
  await fs.ensureDir(path.join(tmpRoot, "lib"));
  await fs.writeFile(path.join(tmpRoot, "lib", "utils.ts"), "export const cn = () => '';\n");
  await fs.ensureDir(path.join(tmpRoot, "components", "ui"));
  // Minimal global.css with the shape doctor expects: @import "uniwind",
  // theme tokens, and a @variant dark block.
  await fs.writeFile(
    path.join(tmpRoot, "global.css"),
    `@import "tailwindcss";\n@import "uniwind";\n\n@layer theme {\n  :root {\n    @variant light {\n      --color-background: hsl(0 0% 100%);\n      --color-primary: hsl(240 5.9% 10%);\n    }\n    @variant dark {\n      --color-background: hsl(240 10% 3.9%);\n      --color-primary: hsl(0 0% 98%);\n    }\n  }\n}\n`,
    "utf-8",
  );
  await fs.writeFile(
    path.join(tmpRoot, "metro.config.js"),
    `const { withUniwindConfig } = require("uniwind/metro");\nmodule.exports = withUniwindConfig({}, { cssEntryFile: "./global.css" });\n`,
    "utf-8",
  );
  await fs.writeFile(
    path.join(tmpRoot, "babel.config.js"),
    `module.exports = { presets: ["babel-preset-expo"] };\n`,
    "utf-8",
  );
  await fs.writeFile(
    path.join(tmpRoot, "postcss.config.js"),
    `module.exports = { plugins: { "@tailwindcss/postcss": {} } };\n`,
    "utf-8",
  );
}

beforeEach(async () => {
  originalCwd = process.cwd();
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-doctor-"));
  process.chdir(tmpRoot);
  output = [];
  logSpy = vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
    output.push(args.map((a) => String(a)).join(" "));
  });
  errorSpy = vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    output.push(args.map((a) => String(a)).join(" "));
  });
});

afterEach(async () => {
  process.chdir(originalCwd);
  logSpy.mockRestore();
  errorSpy.mockRestore();
  await fs.remove(tmpRoot);
});

describe("doctorCommand", () => {
  it("reports an all-pass summary on a fully-configured project", async () => {
    await seedHealthyProject();
    await doctorCommand();
    const joined = output.join("\n");
    expect(joined).toMatch(/All checks passed!/);
    // Confirm it also surfaced per-check lines (not just the summary).
    expect(joined).toMatch(/Project type: Expo/);
    expect(joined).toMatch(/Style engine: Uniwind/);
  });

  it("flags missing core deps with a 'Found N issue(s)' summary", async () => {
    const incomplete = {
      ...EXPO_PKG,
      dependencies: {
        expo: "~57.0.0",
        react: "19.2.3",
        "react-native": "0.86.0",
        uniwind: "^0.4.0",
        // Deliberately missing: tailwindcss, reanimated, worklets, svg, lucide, cva, clsx, tailwind-merge, safe-area-context.
      },
    };
    await fs.writeJson(path.join(tmpRoot, "package.json"), incomplete);
    await doctorCommand();
    const joined = output.join("\n");
    expect(joined).toMatch(/Found \d+ issue/);
    expect(joined).toMatch(/tailwindcss/);
    expect(joined).toMatch(/react-native-reanimated/);
  });

  it("flags a missing metro.config.js even when package.json is otherwise complete", async () => {
    await seedHealthyProject();
    await fs.remove(path.join(tmpRoot, "metro.config.js"));
    await doctorCommand();
    const joined = output.join("\n");
    expect(joined).toMatch(/metro\.config\.js exists/);
    expect(joined).toMatch(/Found 1 issue/);
  });
});

import path from "path";
import fs from "fs-extra";
import { detectProject, getDlxCommand, type StyleEngine } from "../utils/detect-project";
import { logger } from "../utils/logger";

interface Check {
  label: string;
  pass: boolean;
  detail?: string;
  fix?: string;
}

export async function doctorCommand(): Promise<void> {
  const cwd = process.cwd();
  logger.title("AniUI Doctor — Checking your setup...");
  logger.break();

  const project = await detectProject(cwd);
  const pm = project.packageManager;
  const gen = project.sdkGeneration;
  const checks: Check[] = [];

  // 1. Project type
  checks.push({
    label: `Project type: ${project.type === "expo" ? "Expo" : project.type === "react-native-cli" ? "Bare React Native" : "Unknown"}`,
    pass: project.type !== "unknown",
    fix: "Run this from your project root (where package.json is)",
  });

  // 2. Package manager
  checks.push({ label: `Package manager: ${pm}`, pass: true });

  // 3. SDK generation
  checks.push({
    label: `SDK generation: ${gen === "v5" ? "Tailwind v4" : "Tailwind v3"} (${gen})`,
    pass: true,
  });

  // 4. Read package.json deps
  const pkgPath = path.join(cwd, "package.json");
  const pkg = await fs.pathExists(pkgPath) ? await fs.readJson(pkgPath) : { dependencies: {}, devDependencies: {} };
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  const getVersion = (name: string) => allDeps[name] || null;

  // 5. Style engine
  const configPath = path.join(cwd, ".aniui.json");
  const config = await fs.pathExists(configPath) ? await fs.readJson(configPath) : null;
  const styleEngine: StyleEngine = config?.style || (project.hasUniwind ? "uniwind" : "nativewind");
  const isUniwind = styleEngine === "uniwind";

  checks.push({
    label: `Style engine: ${isUniwind ? "Uniwind" : "NativeWind"} ${isUniwind ? (getVersion("uniwind") || "(not found)") : (getVersion("nativewind") || "(not found)")}`,
    pass: isUniwind ? project.hasUniwind : project.hasNativewind,
    fix: isUniwind
      ? `Install: ${getDlxCommand(pm, "expo install uniwind")}`
      : `Install: ${getDlxCommand(pm, "expo install nativewind")}`,
  });

  // 6. Core deps
  const coreDeps = [
    { name: "tailwindcss", required: true },
    { name: "react-native-reanimated", required: true },
    { name: "react-native-safe-area-context", required: true },
    { name: "class-variance-authority", required: true },
    { name: "clsx", required: true },
    { name: "tailwind-merge", required: true },
  ];

  for (const dep of coreDeps) {
    const ver = getVersion(dep.name);
    checks.push({
      label: `${dep.name} ${ver ? `(${ver})` : ""}`,
      pass: !!ver,
      fix: `Install: npm install ${dep.name}`,
    });
  }

  // 7. rn-primitives/portal (if any rn-primitives component is used)
  const componentsDir = config?.componentsDir ? path.resolve(cwd, config.componentsDir) : path.resolve(cwd, "components/ui");
  let needsPortal = false;
  if (await fs.pathExists(componentsDir)) {
    const files = await fs.readdir(componentsDir);
    for (const file of files) {
      const content = await fs.readFile(path.join(componentsDir, file), "utf-8");
      if (content.includes("@rn-primitives/")) {
        needsPortal = true;
        break;
      }
    }
  }
  if (needsPortal) {
    const hasPortal = !!getVersion("@rn-primitives/portal");
    checks.push({
      label: "@rn-primitives/portal",
      pass: hasPortal,
      detail: "Required for Dialog, Popover, Select, DropdownMenu, etc.",
      fix: "Install: npm install @rn-primitives/portal",
    });
  }

  // 8. Config files
  const metroPath = path.join(cwd, "metro.config.js");
  if (await fs.pathExists(metroPath)) {
    const metroContent = await fs.readFile(metroPath, "utf-8");
    const wrapperName = isUniwind ? "withUniwindConfig" : "withNativeWind";
    const configParam = isUniwind ? "cssEntryFile" : "input";
    checks.push({
      label: `metro.config.js has ${wrapperName}`,
      pass: metroContent.includes(wrapperName),
      fix: `Add ${wrapperName}(config, { ${configParam}: "./global.css" }) to metro.config.js`,
    });
  } else {
    checks.push({ label: "metro.config.js exists", pass: false, fix: "Run: npx @aniui/cli init" });
  }

  // babel.config.js — jsxImportSource check
  const babelPath = path.join(cwd, "babel.config.js");
  if (await fs.pathExists(babelPath)) {
    const babelContent = await fs.readFile(babelPath, "utf-8");
    if (gen === "v4" && !isUniwind) {
      checks.push({
        label: "babel.config.js has jsxImportSource: \"nativewind\"",
        pass: babelContent.includes("jsxImportSource"),
        fix: "Run: npx @aniui/cli init",
      });
    }
    if ((gen === "v5" || isUniwind) && babelContent.includes("jsxImportSource")) {
      checks.push({
        label: "babel.config.js does NOT have jsxImportSource (not needed)",
        pass: false,
        fix: "Remove jsxImportSource from babel.config.js",
      });
    }
  }

  // global.css
  const globalCssPath = path.join(cwd, "global.css");
  if (await fs.pathExists(globalCssPath)) {
    const css = await fs.readFile(globalCssPath, "utf-8");
    checks.push({
      label: "global.css has theme tokens",
      pass: css.includes("--primary") || css.includes("--color-primary"),
      fix: "Run: npx @aniui/cli init",
    });
    if (isUniwind) {
      checks.push({
        label: 'global.css has @import "uniwind"',
        pass: css.includes('@import "uniwind"') || css.includes("@import 'uniwind'"),
        fix: 'Add @import "uniwind"; after @import "tailwindcss"; in global.css',
      });
      checks.push({
        label: "global.css has dark mode via @variant dark",
        pass: css.includes("@variant dark"),
        fix: "Define dark colors in @layer theme { :root { @variant dark { --color-background: ...; } } }",
      });
    }
  } else {
    checks.push({ label: "global.css exists", pass: false, fix: "Run: npx @aniui/cli init" });
  }

  // tailwind.config.js (v4) or postcss.config.js (v5)
  if (gen === "v4") {
    const twPath = path.join(cwd, "tailwind.config.js");
    checks.push({
      label: "tailwind.config.js exists",
      pass: await fs.pathExists(twPath),
      fix: "Run: npx @aniui/cli init",
    });
  } else {
    const pcPath = path.join(cwd, "postcss.config.js");
    checks.push({
      label: "postcss.config.js exists (v5)",
      pass: await fs.pathExists(pcPath),
      fix: "Run: npx @aniui/cli init",
    });
  }

  // nativewind-env.d.ts (NativeWind only)
  if (!isUniwind) {
    checks.push({
      label: "nativewind-env.d.ts exists",
      pass: await fs.pathExists(path.join(cwd, "nativewind-env.d.ts")),
      fix: "Run: npx @aniui/cli init",
    });
  }

  // 9. No known conflicts
  if (project.type === "expo") {
    const appJsonPath = path.join(cwd, "app.json");
    if (await fs.pathExists(appJsonPath)) {
      const appJson = await fs.readJson(appJsonPath);
      const compilerEnabled = appJson?.expo?.experiments?.reactCompiler === true;
      checks.push({
        label: "React Compiler is disabled",
        pass: !compilerEnabled,
        fix: "Set reactCompiler: false in app.json → expo.experiments",
      });
    }
  }

  // 10. AniUI config
  checks.push({
    label: ".aniui.json config exists",
    pass: !!config,
    fix: "Run: npx @aniui/cli init",
  });

  const utilPath = config?.utilPath ? path.resolve(cwd, config.utilPath) : path.resolve(cwd, "lib/utils.ts");
  checks.push({
    label: `${config?.utilPath || "lib/utils.ts"} exists`,
    pass: await fs.pathExists(utilPath),
    fix: "Run: npx @aniui/cli init",
  });

  checks.push({
    label: `${config?.componentsDir || "components/ui"}/ directory exists`,
    pass: await fs.pathExists(componentsDir),
    fix: "Run: npx @aniui/cli init",
  });

  // Print results
  let issues = 0;
  for (const check of checks) {
    if (check.pass) {
      logger.success(check.label);
    } else {
      logger.error(check.label);
      if (check.fix) logger.info(`  → ${check.fix}`);
      issues++;
    }
    if (check.detail) logger.info(`  ${check.detail}`);
  }

  logger.break();
  if (issues === 0) {
    logger.success("All checks passed! Your setup is ready.");
  } else {
    logger.warn(`Found ${issues} issue${issues > 1 ? "s" : ""}. Fix them and run doctor again.`);
  }
}

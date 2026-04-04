import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { detectProject, getInstallCommand, getDlxCommand, type StyleEngine } from "../utils/detect-project";
import { copyTemplate, copyUtilFile, getPackageRoot } from "../utils/file-ops";
import { logger } from "../utils/logger";

interface ThemePreset {
  light: Record<string, string>;
  dark: Record<string, string>;
}

const THEME_PRESETS: Record<string, ThemePreset> = {
  default: {
    light: { "--primary": "240 5.9% 10%", "--primary-foreground": "0 0% 98%" },
    dark:  { "--primary": "0 0% 98%", "--primary-foreground": "240 5.9% 10%" },
  },
  blue: {
    light: { "--primary": "221.2 83.2% 53.3%", "--primary-foreground": "210 40% 98%" },
    dark:  { "--primary": "217.2 91.2% 59.8%", "--primary-foreground": "222.2 47.4% 11.2%" },
  },
  green: {
    light: { "--primary": "142.1 76.2% 36.3%", "--primary-foreground": "355.7 100% 97.3%" },
    dark:  { "--primary": "142.1 70.6% 45.3%", "--primary-foreground": "144.9 80.4% 10%" },
  },
  orange: {
    light: { "--primary": "24.6 95% 53.1%", "--primary-foreground": "60 9.1% 97.8%" },
    dark:  { "--primary": "20.5 90.2% 48.2%", "--primary-foreground": "60 9.1% 97.8%" },
  },
  rose: {
    light: { "--primary": "346.8 77.2% 49.8%", "--primary-foreground": "355.7 100% 97.3%" },
    dark:  { "--primary": "346.8 77.2% 49.8%", "--primary-foreground": "355.7 100% 97.3%" },
  },
};

export async function initCommand(opts?: { style?: string }): Promise<void> {
  const cwd = process.cwd();
  logger.title("AniUI — Initialize");

  const project = await detectProject(cwd);

  if (project.type === "unknown") {
    logger.error("Could not detect a React Native or Expo project.");
    logger.info("Make sure you're running this from your project root (where package.json is).");
    process.exit(1);
  }

  const pm = project.packageManager;
  const gen = project.sdkGeneration;
  logger.success(`Detected ${project.type === "expo" ? "Expo" : "React Native CLI"} project`);
  logger.success(`Using ${pm} as package manager`);
  logger.success(`SDK generation: ${gen === "v5" ? "Tailwind v4" : "Tailwind v3"}`);

  // Auto-detect style engine (CLI flag overrides detection)
  const detectedStyle: StyleEngine = (opts?.style === "uniwind" || opts?.style === "nativewind")
    ? opts.style
    : project.hasUniwind ? "uniwind" : "nativewind";

  // Step 1: Ask style engine + theme + paths upfront
  const response = await prompts([
    {
      type: "select",
      name: "style",
      message: "Which styling engine?",
      choices: [
        { title: "NativeWind" + (project.hasNativewind ? " (installed)" : ""), value: "nativewind" },
        { title: "Uniwind" + (project.hasUniwind ? " (installed)" : ""), value: "uniwind" },
      ],
      initial: detectedStyle === "uniwind" ? 1 : 0,
    },
    {
      type: "select",
      name: "theme",
      message: "Choose a theme preset:",
      choices: [
        { title: "Default (neutral)", value: "default" },
        { title: "Blue", value: "blue" },
        { title: "Green", value: "green" },
        { title: "Orange", value: "orange" },
        { title: "Rose", value: "rose" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "componentsDir",
      message: "Where should components be installed?",
      initial: "components/ui",
    },
    {
      type: "text",
      name: "utilPath",
      message: "Where should the utility file go?",
      initial: "lib/utils.ts",
    },
    {
      type: "select",
      name: "tsx",
      message: "Would you like to use TypeScript?",
      choices: [
        { title: "Yes (recommended)", value: true },
        { title: "No", value: false },
      ],
      initial: 0,
    },
  ]);

  if (!response.style || !response.componentsDir || !response.utilPath) {
    logger.warn("Setup cancelled.");
    process.exit(0);
  }

  // Step 2: Auto-install missing dependencies
  const chosenStyle: StyleEngine = response.style;
  const isChosenUniwind = chosenStyle === "uniwind";
  const hasStyleEngine = isChosenUniwind ? project.hasUniwind : project.hasNativewind;

  if (!hasStyleEngine || !project.hasReanimated || !project.hasTailwind) {
    const missing: string[] = [];

    if (!hasStyleEngine) {
      if (isChosenUniwind) {
        missing.push("uniwind");
      } else if (gen === "v5") {
        missing.push("nativewind@preview", "react-native-css");
      } else {
        missing.push("nativewind");
      }
    }
    if (!project.hasTailwind) {
      missing.push(gen === "v5" ? "tailwindcss@4" : "tailwindcss@3");
    }
    if (!project.hasReanimated) {
      missing.push("react-native-reanimated");
    }

    // Always ensure these are present
    missing.push("react-native-safe-area-context", "class-variance-authority", "clsx", "tailwind-merge");

    logger.break();
    logger.info("Missing dependencies detected. Installing...");
    logger.info(`  ${getInstallCommand(pm, missing)}`);
    logger.break();

    const { confirm } = await prompts({
      type: "confirm",
      name: "confirm",
      message: `Install ${missing.length} packages with ${pm}?`,
      initial: true,
    });

    if (confirm) {
      const { execSync } = require("child_process");
      try {
        if (project.type === "expo") {
          // Use npx expo install for Expo projects — handles version pinning
          const rnPkgs = missing.filter(p => ["react-native-reanimated", "react-native-safe-area-context", "react-native-css"].includes(p.replace(/@.*$/, "")));
          const npmPkgs = missing.filter(p => !rnPkgs.includes(p));
          if (rnPkgs.length > 0) {
            logger.info(`Installing RN packages with expo install (auto-pins versions)...`);
            execSync(`npx expo install ${rnPkgs.join(" ")}`, { cwd, stdio: "inherit" });
          }
          if (npmPkgs.length > 0) {
            execSync(getInstallCommand(pm, npmPkgs), { cwd, stdio: "inherit" });
          }
        } else {
          execSync(getInstallCommand(pm, missing), { cwd, stdio: "inherit" });
        }
        logger.success("Dependencies installed!");
      } catch {
        logger.error("Failed to install dependencies. Install them manually:");
        logger.info(`  ${getInstallCommand(pm, missing)}`);
        process.exit(1);
      }
    } else {
      logger.warn("Skipping dependency install. You'll need to install them manually before using AniUI components.");
    }
  } else {
    logger.success("All required dependencies already installed!");
  }

  if (response.tsx === false) {
    logger.info("Components will be generated as .jsx files with types stripped automatically.");
    if (response.utilPath && response.utilPath.endsWith(".ts")) {
      response.utilPath = response.utilPath.replace(/\.ts$/, ".js");
    }
  }

  const componentsDir = path.resolve(cwd, response.componentsDir);
  const utilPath = path.resolve(cwd, response.utilPath);
  const globalCssPath = path.resolve(cwd, "global.css");
  const tailwindConfigPath = path.resolve(cwd, "tailwind.config.js");
  const nativewindEnvPath = path.resolve(cwd, "nativewind-env.d.ts");

  // 1. Copy lib/utils.ts (or utils.js for JavaScript projects)
  const useTsx = response.tsx !== false;
  await copyUtilFile(utilPath, useTsx);
  logger.success(`Created ${path.relative(cwd, utilPath)}`);

  // 2. Copy global.css with theme applied
  const templateDir = path.join(getPackageRoot(), "templates", gen);
  const templateFallback = path.join(getPackageRoot(), "templates");
  const globalCssSource = await fs.pathExists(path.join(templateDir, "global.css"))
    ? path.join(templateDir, "global.css")
    : path.join(templateFallback, "global.css");
  let globalCss = await fs.readFile(globalCssSource, "utf-8");

  // For Uniwind: remove nativewind-specific import, add @import "uniwind", use @media for dark mode
  if (isChosenUniwind) {
    globalCss = globalCss.replace(/@import\s+["']nativewind\/theme["'];\s*\n?/g, "");
    // Add @import "uniwind" after @import "tailwindcss"
    globalCss = globalCss.replace(
      /(@import\s+["']tailwindcss["'];)/,
      '$1\n@import "uniwind";'
    );
    globalCss = globalCss.replace(/\.dark\s*\{/g, "@media (prefers-color-scheme: dark) {\n:root {");
    // Add closing brace for the media query
    const lastBrace = globalCss.lastIndexOf("}");
    if (lastBrace !== -1) {
      globalCss = globalCss.slice(0, lastBrace + 1) + "\n}" + globalCss.slice(lastBrace + 1);
    }
  }

  const preset = THEME_PRESETS[response.theme] || THEME_PRESETS.default;
  const isV5 = gen === "v5" || isChosenUniwind;

  // Apply theme preset to both light and dark sections
  const applyPreset = (css: string, vars: Record<string, string>) => {
    for (const [varName, hslValue] of Object.entries(vars)) {
      if (isV5) {
        // v5/Uniwind: --color-primary: hsl(240 5.9% 10%)
        const colorVar = varName.replace("--", "--color-");
        const regex = new RegExp(`(${colorVar.replace(/--/g, "\\-\\-")}:\\s*)hsl\\([^)]+\\)`, "g");
        css = css.replace(regex, `$1hsl(${hslValue})`);
      } else {
        // v4: --primary: 240 5.9% 10%
        const regex = new RegExp(`(${varName.replace(/--/g, "\\-\\-")}:\\s*)[^;]+`, "g");
        css = css.replace(regex, `$1${hslValue}`);
      }
    }
    return css;
  };

  // Split CSS into light section (before dark block) and dark section
  const darkBlockMatch = isV5
    ? globalCss.match(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{/)
    : globalCss.match(/\.dark\s*\{/);

  if (darkBlockMatch && darkBlockMatch.index !== undefined) {
    const lightPart = globalCss.slice(0, darkBlockMatch.index);
    const darkPart = globalCss.slice(darkBlockMatch.index);
    globalCss = applyPreset(lightPart, preset.light) + applyPreset(darkPart, preset.dark);
  } else {
    globalCss = applyPreset(globalCss, preset.light);
  }
  await fs.writeFile(globalCssPath, globalCss, "utf-8");
  logger.success(`Created global.css (${response.theme} theme)`);

  // 3. Copy or merge tailwind.config.js (v4 only — v5 uses CSS-first config)
  if (gen === "v4") {
    if (await fs.pathExists(tailwindConfigPath)) {
      logger.warn("tailwind.config.js already exists — skipping (merge manually if needed)");
    } else {
      await copyTemplate("tailwind.config.js", tailwindConfigPath, gen);
      logger.success("Created tailwind.config.js");
    }
  } else {
    // v5: Create postcss.config.js (required for @tailwindcss/postcss to process @theme directives)
    const postcssConfigPath = path.resolve(cwd, "postcss.config.js");
    if (await fs.pathExists(postcssConfigPath)) {
      logger.warn("postcss.config.js already exists — skipping");
    } else {
      const postcssContent = `module.exports = {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n};\n`;
      await fs.writeFile(postcssConfigPath, postcssContent, "utf-8");
      logger.success("Created postcss.config.js");
    }
    logger.info("Tailwind v4 uses CSS-first configuration — theme tokens are in global.css");
  }

  // 4. Copy nativewind-env.d.ts (NativeWind only — Uniwind provides its own types)
  if (!isChosenUniwind) {
    await copyTemplate("nativewind-env.d.ts", nativewindEnvPath, gen);
    logger.success("Created nativewind-env.d.ts");
  } else {
    logger.info("Uniwind provides className types via its metro plugin — no nativewind-env.d.ts needed.");
  }

  // 5. Ensure components directory exists
  await fs.ensureDir(componentsDir);
  logger.success(`Created ${path.relative(cwd, componentsDir)}/`);

  const styleEngine: StyleEngine = chosenStyle;
  const isUniwind = isChosenUniwind;
  const wrapperName = isUniwind ? "withUniwindConfig" : "withNativeWind";
  const wrapperPkg = isUniwind ? "uniwind/metro" : "nativewind/metro";

  // 6. Set up metro.config.js and babel.config.js for Expo
  if (project.type === "expo") {
    const metroConfigPath = path.resolve(cwd, "metro.config.js");
    if (await fs.pathExists(metroConfigPath)) {
      logger.warn(`metro.config.js already exists — wrap it with ${wrapperName}:`);
      logger.info(`  const { ${wrapperName} } = require("${wrapperPkg}");`);
      logger.info(`  module.exports = ${wrapperName}(config, { ${isUniwind ? 'cssEntryFile' : 'input'}: "./global.css" });`);
    } else {
      if (isUniwind) {
        const metroContent = `const { getDefaultConfig } = require("expo/metro-config");\nconst { withUniwindConfig } = require("uniwind/metro");\n\nconst config = getDefaultConfig(__dirname);\n\nmodule.exports = withUniwindConfig(config, { cssEntryFile: "./global.css" });\n`;
        await fs.writeFile(metroConfigPath, metroContent, "utf-8");
        logger.success("Created metro.config.js (Uniwind configured)");
      } else {
        await copyTemplate("metro.config.expo.js", metroConfigPath, gen);
        logger.success("Created metro.config.js (NativeWind configured)");
      }
    }

    const babelConfigPath = path.resolve(cwd, "babel.config.js");
    if (await fs.pathExists(babelConfigPath)) {
      // Will be patched in step 8 below if needed
    } else {
      await copyTemplate("babel.config.expo.js", babelConfigPath, gen);
      logger.success("Created babel.config.js (NativeWind configured)");
    }

    // Disable reactCompiler in app.json — it breaks NativeWind className transform
    const appJsonPath = path.resolve(cwd, "app.json");
    if (await fs.pathExists(appJsonPath)) {
      try {
        const appJson = await fs.readJson(appJsonPath);
        if (appJson?.expo?.experiments?.reactCompiler) {
          appJson.expo.experiments.reactCompiler = false;
          await fs.writeJson(appJsonPath, appJson, { spaces: 2 });
          logger.success("Disabled reactCompiler in app.json (incompatible with NativeWind)");
        }
      } catch {
        // Ignore if app.json can't be parsed
      }
    }
  }

  // 7. Bare RN: set up metro.config.js and babel.config.js
  if (project.type === "react-native-cli") {
    const metroConfigPath = path.resolve(cwd, "metro.config.js");
    if (await fs.pathExists(metroConfigPath)) {
      logger.warn(`metro.config.js already exists — wrap it with ${wrapperName}:`);
      logger.info(`  const { ${wrapperName} } = require("${wrapperPkg}");`);
      logger.info(`  module.exports = ${wrapperName}(config, { ${isUniwind ? 'cssEntryFile' : 'input'}: "./global.css" });`);
    } else {
      if (isUniwind) {
        const metroContent = `const { mergeConfig, getDefaultConfig } = require("@react-native/metro-config");\nconst { withUniwindConfig } = require("uniwind/metro");\n\nconst config = mergeConfig(getDefaultConfig(__dirname), {});\n\nmodule.exports = withUniwindConfig(config, { cssEntryFile: "./global.css" });\n`;
        await fs.writeFile(metroConfigPath, metroContent, "utf-8");
        logger.success("Created metro.config.js (Uniwind configured)");
      } else {
        await copyTemplate("metro.config.bare.js", metroConfigPath, gen);
        logger.success("Created metro.config.js (NativeWind configured)");
      }
    }

    const babelConfigPath = path.resolve(cwd, "babel.config.js");
    if (await fs.pathExists(babelConfigPath)) {
      logger.warn('babel.config.js already exists — add "nativewind/babel" to presets:');
      logger.info('  presets: [...existing, "nativewind/babel"]');
    } else {
      await copyTemplate("babel.config.bare.js", babelConfigPath, gen);
      logger.success("Created babel.config.js (NativeWind configured)");
    }
  }

  // 8. Configure jsxImportSource / babel plugin based on generation (NativeWind only — Uniwind handles this via metro)
  if (isUniwind) {
    logger.info("Uniwind handles className types via its metro plugin — no jsxImportSource needed.");
  }

  const tsconfigPath = path.resolve(cwd, "tsconfig.json");
  if (await fs.pathExists(tsconfigPath)) {
    try {
      const tsconfig = await fs.readJson(tsconfigPath);
      if (!tsconfig.compilerOptions) {
        tsconfig.compilerOptions = {};
      }
      let changed = false;

      // Add @/ path alias if not present
      if (!tsconfig.compilerOptions.paths?.["@/*"]) {
        if (!tsconfig.compilerOptions.paths) {
          tsconfig.compilerOptions.paths = {};
        }
        tsconfig.compilerOptions.paths["@/*"] = ["./*"];
        changed = true;
        logger.success('Added @/* path alias to tsconfig.json');
      }

      // NativeWind-specific jsxImportSource config
      if (!isUniwind) {
        if (gen === "v5") {
          if (tsconfig.compilerOptions.jsxImportSource) {
            delete tsconfig.compilerOptions.jsxImportSource;
            changed = true;
            logger.success('Removed jsxImportSource from tsconfig.json (not needed for NativeWind v5)');
          }
        } else {
          if (tsconfig.compilerOptions.jsxImportSource !== "nativewind") {
            tsconfig.compilerOptions.jsxImportSource = "nativewind";
            changed = true;
            logger.success('Added jsxImportSource: "nativewind" to tsconfig.json');
          }
        }
      }

      if (changed) {
        await fs.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
      }
    } catch {
      logger.warn("Could not update tsconfig.json — add path alias manually");
    }
  }

  const babelConfigPath = path.resolve(cwd, "babel.config.js");
  if (!isUniwind && await fs.pathExists(babelConfigPath)) {
    let babelContent = await fs.readFile(babelConfigPath, "utf-8");
    if (gen === "v5") {
      // NativeWind v5 — no babel config needed for NativeWind
      // withNativeWind in metro.config.js handles everything
      // Just ensure jsxImportSource is NOT set (it breaks v5)
      if (babelContent.includes("jsxImportSource")) {
        const replaced = babelContent.replace(
          /\["babel-preset-expo",\s*\{[^}]*jsxImportSource[^}]*\}\]/,
          '"babel-preset-expo"'
        );
        if (replaced !== babelContent) {
          await fs.writeFile(babelConfigPath, replaced, "utf-8");
          logger.success('Removed jsxImportSource from babel.config.js (not needed for NativeWind v5)');
        }
      }
    } else {
      // NativeWind v4 uses jsxImportSource: "nativewind" in babel-preset-expo options
      if (!babelContent.includes("jsxImportSource")) {
        const replaced = babelContent.replace(
          /(['"])babel-preset-expo\1/,
          '["babel-preset-expo", { jsxImportSource: "nativewind" }]'
        );
        if (replaced !== babelContent) {
          await fs.writeFile(babelConfigPath, replaced, "utf-8");
          logger.success('Added jsxImportSource: "nativewind" to babel.config.js');
        } else {
          logger.warn('Could not patch babel.config.js — add { jsxImportSource: "nativewind" } to babel-preset-expo options manually');
        }
      }
    }
  }

  // 9. Write .aniui.json config
  const config = {
    componentsDir: response.componentsDir,
    utilPath: response.utilPath,
    theme: response.theme,
    style: styleEngine,
    tsx: useTsx,
  };
  await fs.writeJson(path.join(cwd, ".aniui.json"), config, { spaces: 2 });
  logger.success("Created .aniui.json");

  logger.break();
  logger.title("Done! Next steps:");
  logger.info("1. Import global.css in your app entry:");
  logger.info('   import "./global.css";');
  logger.break();

  if (project.type === "react-native-cli") {
    logger.info(`2. Verify metro.config.js uses ${wrapperName} (created above)`);
    if (!isUniwind) logger.info("3. Verify babel.config.js includes nativewind/babel preset");
    logger.break();
    logger.info(`${isUniwind ? "3" : "4"}. Add components:`);
  } else {
    logger.info(`2. Verify metro.config.js uses ${wrapperName} (created above)`);
    if (!isUniwind) logger.info("3. Verify babel.config.js has jsxImportSource: \"nativewind\" (created above)");
    logger.info(`${isUniwind ? "3" : "4"}. Make sure React Compiler is NOT enabled in app.json`);
    logger.break();
    logger.info(`${isUniwind ? "4" : "5"}. Add components:`);
  }
  logger.info(`   ${getDlxCommand(pm, "aniui add button card text")}`);
  logger.break();
  logger.info("If something isn't working, run the diagnostic:");
  logger.info(`   ${getDlxCommand(pm, "@aniui/cli doctor")}`);
  logger.break();
}

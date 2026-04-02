import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { detectProject, getInstallCommand, getDlxCommand, type StyleEngine } from "../utils/detect-project";
import { copyTemplate, copyUtilFile, getPackageRoot } from "../utils/file-ops";
import { logger } from "../utils/logger";

const THEME_PRESETS: Record<string, Record<string, string>> = {
  default: {
    "--primary": "240 5.9% 10%",
    "--primary-foreground": "0 0% 98%",
  },
  blue: {
    "--primary": "221.2 83.2% 53.3%",
    "--primary-foreground": "210 40% 98%",
  },
  green: {
    "--primary": "142.1 76.2% 36.3%",
    "--primary-foreground": "355.7 100% 97.3%",
  },
  orange: {
    "--primary": "24.6 95% 53.1%",
    "--primary-foreground": "60 9.1% 97.8%",
  },
  rose: {
    "--primary": "346.8 77.2% 49.8%",
    "--primary-foreground": "355.7 100% 97.3%",
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
  logger.success(`SDK generation: ${gen === "v5" ? "NativeWind v5 + Tailwind v4" : "NativeWind v4 + Tailwind v3"}`);

  // Auto-detect style engine (CLI flag overrides detection)
  const detectedStyle: StyleEngine = (opts?.style === "uniwind" || opts?.style === "nativewind")
    ? opts.style
    : project.hasUniwind ? "uniwind" : "nativewind";
  const hasStyleEngine = project.hasNativewind || project.hasUniwind;

  if (!hasStyleEngine) {
    logger.error("No styling engine found (NativeWind or Uniwind).");
    logger.info("Install one first:");
    logger.break();
    logger.info("  NativeWind:");
    if (gen === "v5") {
      logger.info(`    ${getDlxCommand(pm, "expo install nativewind@preview react-native-css react-native-reanimated react-native-safe-area-context")}`);
      logger.info(`    ${getDlxCommand(pm, "expo install --dev tailwindcss@4")}`);
    } else {
      logger.info(`    ${getInstallCommand(pm, ["nativewind", "tailwindcss@3", "react-native-reanimated", "react-native-safe-area-context"])}`);
    }
    logger.break();
    logger.info("  Uniwind:");
    logger.info(`    ${getInstallCommand(pm, ["uniwind", "tailwindcss", "react-native-reanimated", "react-native-safe-area-context"])}`);
    logger.break();
    logger.info(`  Then: ${getInstallCommand(pm, ["class-variance-authority", "clsx", "tailwind-merge"])}`);
    logger.info(`  ${getDlxCommand(pm, "pod-install")} (iOS only)`);
    process.exit(1);
  }

  const response = await prompts([
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
      type: "select",
      name: "style",
      message: "Which styling engine?",
      choices: [
        { title: "NativeWind" + (detectedStyle === "nativewind" ? " (detected)" : ""), value: "nativewind" },
        { title: "Uniwind" + (detectedStyle === "uniwind" ? " (detected)" : ""), value: "uniwind" },
      ],
      initial: detectedStyle === "uniwind" ? 1 : 0,
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

  if (response.tsx === false) {
    logger.info("Components will be generated as .jsx files with types stripped automatically.");
    // Adjust util path extension for JavaScript
    if (response.utilPath && response.utilPath.endsWith(".ts")) {
      response.utilPath = response.utilPath.replace(/\.ts$/, ".js");
    }
  }

  if (!response.componentsDir || !response.utilPath) {
    logger.warn("Setup cancelled.");
    process.exit(0);
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
  const preset = THEME_PRESETS[response.theme] || THEME_PRESETS.default;
  for (const [varName, value] of Object.entries(preset)) {
    const regex = new RegExp(`(${varName.replace("--", "\\-\\-")}:\\s*)[^;]+`, "g");
    globalCss = globalCss.replace(regex, `$1${value}`);
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

  // 4. Copy nativewind-env.d.ts
  await copyTemplate("nativewind-env.d.ts", nativewindEnvPath, gen);
  logger.success("Created nativewind-env.d.ts");

  // 5. Ensure components directory exists
  await fs.ensureDir(componentsDir);
  logger.success(`Created ${path.relative(cwd, componentsDir)}/`);

  const styleEngine: StyleEngine = response.style || "nativewind";
  const isUniwind = styleEngine === "uniwind";
  const wrapperName = isUniwind ? "withUniwind" : "withNativeWind";
  const wrapperPkg = isUniwind ? "uniwind/metro" : "nativewind/metro";

  // 6. Set up metro.config.js and babel.config.js for Expo
  if (project.type === "expo") {
    const metroConfigPath = path.resolve(cwd, "metro.config.js");
    if (await fs.pathExists(metroConfigPath)) {
      logger.warn(`metro.config.js already exists — wrap it with ${wrapperName}:`);
      logger.info(`  const { ${wrapperName} } = require("${wrapperPkg}");`);
      logger.info(`  module.exports = ${wrapperName}(config, { input: "./global.css" });`);
    } else {
      if (isUniwind) {
        const metroContent = `const { getDefaultConfig } = require("expo/metro-config");\nconst { withUniwind } = require("uniwind/metro");\n\nconst config = getDefaultConfig(__dirname);\n\nmodule.exports = withUniwind(config, { input: "./global.css" });\n`;
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
      logger.info(`  module.exports = ${wrapperName}(config, { input: "./global.css" });`);
    } else {
      if (isUniwind) {
        const metroContent = `const { mergeConfig, getDefaultConfig } = require("@react-native/metro-config");\nconst { withUniwind } = require("uniwind/metro");\n\nconst config = mergeConfig(getDefaultConfig(__dirname), {});\n\nmodule.exports = withUniwind(config, { input: "./global.css" });\n`;
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
  if (!isUniwind && await fs.pathExists(tsconfigPath)) {
    try {
      const tsconfig = await fs.readJson(tsconfigPath);
      if (!tsconfig.compilerOptions) {
        tsconfig.compilerOptions = {};
      }
      if (gen === "v5") {
        // NativeWind v5 does NOT use jsxImportSource — remove it if present
        // className types come from nativewind-env.d.ts → nativewind/types → react-native-css/types
        if (tsconfig.compilerOptions.jsxImportSource) {
          delete tsconfig.compilerOptions.jsxImportSource;
          await fs.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
          logger.success('Removed jsxImportSource from tsconfig.json (not needed for NativeWind v5)');
        }
      } else {
        // NativeWind v4 uses nativewind for JSX types
        if (tsconfig.compilerOptions.jsxImportSource !== "nativewind") {
          tsconfig.compilerOptions.jsxImportSource = "nativewind";
          await fs.writeJson(tsconfigPath, tsconfig, { spaces: 2 });
          logger.success('Added jsxImportSource: "nativewind" to tsconfig.json');
        }
      }
    } catch {
      logger.warn("Could not update tsconfig.json — add jsxImportSource manually");
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
}

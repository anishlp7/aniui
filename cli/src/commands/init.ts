import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { detectProject, getInstallCommand, getDlxCommand } from "../utils/detect-project";
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

export async function initCommand(): Promise<void> {
  const cwd = process.cwd();
  logger.title("AniUI — Initialize");

  const project = await detectProject(cwd);

  if (project.type === "unknown") {
    logger.error("Could not detect a React Native or Expo project.");
    logger.info("Make sure you're running this from your project root (where package.json is).");
    process.exit(1);
  }

  const pm = project.packageManager;
  logger.success(`Detected ${project.type === "expo" ? "Expo" : "React Native CLI"} project`);
  logger.success(`Using ${pm} as package manager`);

  if (!project.hasNativewind) {
    logger.error("NativeWind is not installed.");
    logger.info("Install it first:");
    logger.info(`  ${getInstallCommand(pm, ["nativewind", "tailwindcss@3", "class-variance-authority", "clsx", "tailwind-merge"])}`);
    logger.info(`  ${getDlxCommand(pm, "pod-install")} (iOS only)`);
    logger.break();
    logger.info("See: https://www.nativewind.dev/getting-started/installation");
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
  ]);

  if (!response.componentsDir || !response.utilPath) {
    logger.warn("Setup cancelled.");
    process.exit(0);
  }

  const componentsDir = path.resolve(cwd, response.componentsDir);
  const utilPath = path.resolve(cwd, response.utilPath);
  const globalCssPath = path.resolve(cwd, "global.css");
  const tailwindConfigPath = path.resolve(cwd, "tailwind.config.js");
  const nativewindEnvPath = path.resolve(cwd, "nativewind-env.d.ts");

  // 1. Copy lib/utils.ts
  await copyUtilFile(utilPath);
  logger.success(`Created ${path.relative(cwd, utilPath)}`);

  // 2. Copy global.css with theme applied
  let globalCss = await fs.readFile(
    path.join(getPackageRoot(), "templates", "global.css"),
    "utf-8"
  );
  const preset = THEME_PRESETS[response.theme] || THEME_PRESETS.default;
  for (const [varName, value] of Object.entries(preset)) {
    const regex = new RegExp(`(${varName.replace("--", "\\-\\-")}:\\s*)[^;]+`, "g");
    globalCss = globalCss.replace(regex, `$1${value}`);
  }
  await fs.writeFile(globalCssPath, globalCss, "utf-8");
  logger.success(`Created global.css (${response.theme} theme)`);

  // 3. Copy or merge tailwind.config.js
  if (await fs.pathExists(tailwindConfigPath)) {
    logger.warn("tailwind.config.js already exists — skipping (merge manually if needed)");
  } else {
    await copyTemplate("tailwind.config.js", tailwindConfigPath);
    logger.success("Created tailwind.config.js");
  }

  // 4. Copy nativewind-env.d.ts
  await copyTemplate("nativewind-env.d.ts", nativewindEnvPath);
  logger.success("Created nativewind-env.d.ts");

  // 5. Ensure components directory exists
  await fs.ensureDir(componentsDir);
  logger.success(`Created ${path.relative(cwd, componentsDir)}/`);

  // 6. Set up metro.config.js for NativeWind
  if (project.type === "expo") {
    const metroConfigPath = path.resolve(cwd, "metro.config.js");
    if (await fs.pathExists(metroConfigPath)) {
      logger.warn("metro.config.js already exists — wrap it with withNativeWind:");
      logger.info('  const { withNativeWind } = require("nativewind/metro");');
      logger.info('  module.exports = withNativeWind(config, { input: "./global.css" });');
    } else {
      await copyTemplate("metro.config.expo.js", metroConfigPath);
      logger.success("Created metro.config.js (NativeWind configured)");
    }
  }

  // 7. Bare RN: set up metro.config.js and babel.config.js for NativeWind
  if (project.type === "react-native-cli") {
    const metroConfigPath = path.resolve(cwd, "metro.config.js");
    if (await fs.pathExists(metroConfigPath)) {
      logger.warn("metro.config.js already exists — wrap it with withNativeWind:");
      logger.info('  const { withNativeWind } = require("nativewind/metro");');
      logger.info('  module.exports = withNativeWind(config, { input: "./global.css" });');
    } else {
      await copyTemplate("metro.config.bare.js", metroConfigPath);
      logger.success("Created metro.config.js (NativeWind configured)");
    }

    const babelConfigPath = path.resolve(cwd, "babel.config.js");
    if (await fs.pathExists(babelConfigPath)) {
      logger.warn('babel.config.js already exists — add "nativewind/babel" to presets:');
      logger.info('  presets: [...existing, "nativewind/babel"]');
    } else {
      await copyTemplate("babel.config.bare.js", babelConfigPath);
      logger.success("Created babel.config.js (NativeWind configured)");
    }
  }

  // 8. Write .aniui.json config
  const config = {
    componentsDir: response.componentsDir,
    utilPath: response.utilPath,
    theme: response.theme,
  };
  await fs.writeJson(path.join(cwd, ".aniui.json"), config, { spaces: 2 });
  logger.success("Created .aniui.json");

  logger.break();
  logger.title("Done! Next steps:");
  logger.info("1. Import global.css in your app entry:");
  logger.info('   import "./global.css";');
  logger.break();

  if (project.type === "react-native-cli") {
    logger.info("2. Verify metro.config.js uses withNativeWind (created above)");
    logger.info("3. Verify babel.config.js includes nativewind/babel preset");
    logger.break();
    logger.info("4. Add components:");
  } else {
    logger.info("2. Verify metro.config.js uses withNativeWind (created above)");
    logger.break();
    logger.info("3. Add components:");
  }
  logger.info(`   ${getDlxCommand(pm, "aniui add button card text")}`);
  logger.break();
}

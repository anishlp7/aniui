import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { logger } from "../utils/logger";
import { detectPackageManager, getDlxCommand } from "../utils/detect-project";
import { getPreset, toCssVarMap, type PresetName } from "../theme-presets";
import { patchThemeColorsBlock } from "../utils/theme-colors-block";

export async function themeCommand(): Promise<void> {
  const cwd = process.cwd();
  const globalCssPath = path.join(cwd, "global.css");

  if (!await fs.pathExists(globalCssPath)) {
    const pm = await detectPackageManager(cwd);
    logger.error(`global.css not found. Run \`${getDlxCommand(pm, "@aniui/cli init")}\` first.`);
    process.exit(1);
  }

  const response = await prompts({
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
  });

  if (!response.theme) {
    logger.warn("Cancelled.");
    process.exit(0);
  }

  let css = await fs.readFile(globalCssPath, "utf-8");
  const presetName = response.theme as PresetName;
  const preset = getPreset(presetName);
  const theme = { light: toCssVarMap(preset.light), dark: toCssVarMap(preset.dark) };

  // Split CSS into :root and .dark sections to apply overrides independently
  const darkBlockMatch = css.match(/(\.dark\s*\{)([\s\S]*?)(\})/);
  const rootBlockMatch = css.match(/(:root\s*\{)([\s\S]*?)(\})/);

  if (rootBlockMatch) {
    let rootContent = rootBlockMatch[2];
    for (const [varName, value] of Object.entries(theme.light)) {
      const escaped = varName.replace("--", "\\-\\-");
      const regex = new RegExp(`(${escaped}:\\s*)[^;]+`, "g");
      rootContent = rootContent.replace(regex, `$1${value}`);
    }
    css = css.replace(rootBlockMatch[2], rootContent);
  }

  if (darkBlockMatch) {
    let darkContent = darkBlockMatch[2];
    for (const [varName, value] of Object.entries(theme.dark)) {
      const escaped = varName.replace("--", "\\-\\-");
      const regex = new RegExp(`(${escaped}:\\s*)[^;]+`, "g");
      darkContent = darkContent.replace(regex, `$1${value}`);
    }
    css = css.replace(darkBlockMatch[2], darkContent);
  }

  await fs.writeFile(globalCssPath, css, "utf-8");

  // Update .aniui.json
  const configPath = path.join(cwd, ".aniui.json");
  let componentsDir = "components/ui";
  if (await fs.pathExists(configPath)) {
    const config = await fs.readJson(configPath);
    config.theme = response.theme;
    componentsDir = config.componentsDir || componentsDir;
    await fs.writeJson(configPath, config, { spaces: 2 });
  }

  // If theme-provider.tsx is already installed, keep its THEME_COLORS (the
  // hex values native props/Skia canvases read, since they can't use
  // className tokens) in sync with the newly chosen preset.
  const themeProviderPath = path.join(cwd, componentsDir, "theme-provider.tsx");
  if (await fs.pathExists(themeProviderPath)) {
    const content = await fs.readFile(themeProviderPath, "utf-8");
    const patched = patchThemeColorsBlock(content, presetName);
    if (patched !== content) {
      await fs.writeFile(themeProviderPath, patched, "utf-8");
      logger.success("Synced theme-provider.tsx's THEME_COLORS to the new preset");
    }
  }

  logger.success(`Theme updated to "${response.theme}"`);
  logger.info("Restart your dev server to see changes.");
}

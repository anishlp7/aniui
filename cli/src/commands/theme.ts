import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { logger } from "../utils/logger";

const THEMES: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {
  default: {
    light: {
      "--background": "0 0% 100%",
      "--foreground": "240 10% 3.9%",
      "--primary": "240 5.9% 10%",
      "--primary-foreground": "0 0% 98%",
      "--secondary": "240 4.8% 95.9%",
      "--secondary-foreground": "240 5.9% 10%",
      "--muted": "240 4.8% 95.9%",
      "--muted-foreground": "240 3.8% 46.1%",
      "--accent": "240 4.8% 95.9%",
      "--accent-foreground": "240 5.9% 10%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "0 0% 98%",
    },
    dark: {
      "--background": "240 10% 3.9%",
      "--foreground": "0 0% 98%",
      "--primary": "0 0% 98%",
      "--primary-foreground": "240 5.9% 10%",
      "--secondary": "240 3.7% 15.9%",
      "--secondary-foreground": "0 0% 98%",
      "--muted": "240 3.7% 15.9%",
      "--muted-foreground": "240 5% 64.9%",
      "--accent": "240 3.7% 15.9%",
      "--accent-foreground": "0 0% 98%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "0 0% 98%",
    },
  },
  blue: {
    light: {
      "--primary": "221.2 83.2% 53.3%",
      "--primary-foreground": "210 40% 98%",
    },
    dark: {
      "--primary": "217.2 91.2% 59.8%",
      "--primary-foreground": "222.2 47.4% 11.2%",
    },
  },
  green: {
    light: {
      "--primary": "142.1 76.2% 36.3%",
      "--primary-foreground": "355.7 100% 97.3%",
    },
    dark: {
      "--primary": "142.1 70.6% 45.3%",
      "--primary-foreground": "144.9 80.4% 10%",
    },
  },
  orange: {
    light: {
      "--primary": "24.6 95% 53.1%",
      "--primary-foreground": "60 9.1% 97.8%",
    },
    dark: {
      "--primary": "20.5 90.2% 48.2%",
      "--primary-foreground": "60 9.1% 97.8%",
    },
  },
  rose: {
    light: {
      "--primary": "346.8 77.2% 49.8%",
      "--primary-foreground": "355.7 100% 97.3%",
    },
    dark: {
      "--primary": "346.8 77.2% 49.8%",
      "--primary-foreground": "355.7 100% 97.3%",
    },
  },
};

export async function themeCommand(): Promise<void> {
  const cwd = process.cwd();
  const globalCssPath = path.join(cwd, "global.css");

  if (!await fs.pathExists(globalCssPath)) {
    logger.error("global.css not found. Run `npx aniui init` first.");
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
  const theme = THEMES[response.theme];

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
  if (await fs.pathExists(configPath)) {
    const config = await fs.readJson(configPath);
    config.theme = response.theme;
    await fs.writeJson(configPath, config, { spaces: 2 });
  }

  logger.success(`Theme updated to "${response.theme}"`);
  logger.info("Restart your dev server to see changes.");
}

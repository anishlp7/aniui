import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { registry, getComponentNames } from "../registry";
import { detectPackageManager, getDlxCommand } from "../utils/detect-project";
import { hashFile } from "../utils/hash";
import { logger } from "../utils/logger";
import { getCliPackage } from "../utils/pkg";

const pkg = getCliPackage();

interface InstalledEntry {
  version: string;
  hash: string;
  addedAt: string;
}

interface AniUIConfig {
  componentsDir: string;
  utilPath: string;
  theme: string;
  style?: string;
  tsx?: boolean;
  installed?: Record<string, InstalledEntry>;
}

export async function statusCommand(): Promise<void> {
  const cwd = process.cwd();
  const configPath = path.join(cwd, ".aniui.json");

  if (!await fs.pathExists(configPath)) {
    const pm = await detectPackageManager(cwd);
    logger.error(`AniUI is not initialized. Run \`${getDlxCommand(pm, "@aniui/cli init")}\` first.`);
    process.exit(1);
  }

  const config: AniUIConfig = await fs.readJson(configPath);
  const componentsDir = path.resolve(cwd, config.componentsDir || "components/ui");
  const installed = config.installed || {};
  const currentVersion = pkg.version;

  logger.title("AniUI Component Status");

  const header = `${chalk.bold("Component".padEnd(22))}${chalk.bold("Installed".padEnd(12))}${chalk.bold("Latest".padEnd(12))}${chalk.bold("Local".padEnd(12))}${chalk.bold("Status")}`;
  console.log(header);
  console.log(chalk.gray("\u2500".repeat(70)));

  const allNames = getComponentNames();

  for (const name of allNames) {
    const entry = registry[name];
    const localFile = path.join(componentsDir, path.basename(entry.file));
    const localExists = await fs.pathExists(localFile);
    const manifest = installed[name];

    if (!localExists && !manifest) {
      // Not installed
      console.log(
        `${chalk.gray(name.padEnd(22))}${chalk.gray("-".padEnd(12))}${chalk.gray(currentVersion.padEnd(12))}${chalk.gray("-".padEnd(12))}${chalk.gray("\u25CB not installed")}`
      );
      continue;
    }

    // File exists locally (may or may not have manifest)
    const installedVersion = manifest?.version || "unknown";
    let localStatus = "clean";
    let statusLabel: string;

    if (manifest) {
      // Check if local file was modified
      const currentHash = await hashFile(localFile);
      if (currentHash !== manifest.hash) {
        localStatus = "modified";
      }

      if (installedVersion !== currentVersion) {
        // Upstream has a newer version
        if (localStatus === "modified") {
          statusLabel = chalk.yellow("\u25B2 update + modified");
        } else {
          statusLabel = chalk.yellow("\u2191 update available");
        }
      } else {
        if (localStatus === "modified") {
          statusLabel = chalk.cyan("\u25CF modified");
        } else {
          statusLabel = chalk.green("\u2713 current");
        }
      }
    } else {
      // File exists but no manifest entry (backward compat)
      localStatus = "untracked";
      statusLabel = chalk.gray("\u25CB untracked");
    }

    const localLabel = localStatus === "modified" ? chalk.cyan("modified") : localStatus;

    console.log(
      `${name.padEnd(22)}${installedVersion.padEnd(12)}${currentVersion.padEnd(12)}${localLabel.padEnd(12)}${statusLabel}`
    );
  }

  logger.break();
}

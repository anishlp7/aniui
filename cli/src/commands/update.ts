import path from "path";
import fs from "fs-extra";
import prompts from "prompts";
import { registry } from "../registry";
import { detectPackageManager, getDlxCommand } from "../utils/detect-project";
import { copyComponent } from "../utils/file-ops";
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

export async function updateCommand(names: string[]): Promise<void> {
  const cwd = process.cwd();
  const configPath = path.join(cwd, ".aniui.json");

  if (!await fs.pathExists(configPath)) {
    const pm = await detectPackageManager(cwd);
    logger.error(`AniUI is not initialized. Run \`${getDlxCommand(pm, "@aniui/cli init")}\` first.`);
    process.exit(1);
  }

  const config: AniUIConfig = await fs.readJson(configPath);
  const useTsx = config.tsx !== false;
  const componentsDir = path.resolve(cwd, config.componentsDir || "components/ui");
  const utilPath = path.resolve(cwd, config.utilPath || (useTsx ? "lib/utils.ts" : "lib/utils.js"));
  const installed = config.installed || {};
  const currentVersion = pkg.version;
  const isUniwind = config.style === "uniwind";

  // If no names provided, update all installed components
  const targetNames = names.length > 0
    ? names
    : Object.keys(installed).filter((n) => registry[n]);

  if (targetNames.length === 0) {
    const pm = await detectPackageManager(cwd);
    logger.warn("No installed components found to update.");
    logger.info(`Install components first with: ${getDlxCommand(pm, "@aniui/cli add <name>")}`);
    return;
  }

  // Validate names
  const invalid = targetNames.filter((n) => !registry[n]);
  if (invalid.length > 0) {
    logger.error(`Unknown component(s): ${invalid.join(", ")}`);
    process.exit(1);
  }

  let updated = 0;
  let skipped = 0;
  let backed = 0;

  for (const name of targetNames) {
    const entry = registry[name];
    const manifest = installed[name];
    const localFile = path.join(componentsDir, path.basename(entry.file));
    const localExists = await fs.pathExists(localFile);

    if (!localExists) {
      logger.warn(`${name} is not installed locally — skipping. Use \`add\` instead.`);
      skipped++;
      continue;
    }

    if (!manifest) {
      logger.warn(`${name} has no manifest entry — skipping (untracked file).`);
      skipped++;
      continue;
    }

    // Check if already up to date
    if (manifest.version === currentVersion) {
      logger.info(`${name} is already at v${currentVersion} — skipping.`);
      skipped++;
      continue;
    }

    // Check if local file was modified
    const localHash = await hashFile(localFile);
    const isModified = localHash !== manifest.hash;

    if (isModified) {
      // Modified + upstream change — ask user
      logger.break();
      logger.warn(`${name} has local modifications and an upstream update.`);

      const response = await prompts({
        type: "select",
        name: "action",
        message: `How to update ${name}?`,
        choices: [
          { title: "Overwrite — replace with upstream", value: "overwrite" },
          { title: "Skip — keep local version", value: "skip" },
          { title: "Backup — save .backup, apply upstream", value: "backup" },
        ],
      });

      if (!response.action || response.action === "skip") {
        logger.info(`Skipped ${name}.`);
        skipped++;
        continue;
      }

      if (response.action === "backup") {
        const backupPath = localFile + ".backup";
        await fs.copy(localFile, backupPath);
        logger.success(`Backed up ${name} to ${path.basename(backupPath)}`);
        backed++;
      }
    }

    // Apply the update: re-copy from upstream
    try {
      // Remove existing file first so copyComponent doesn't skip
      await fs.remove(localFile);
      await copyComponent(entry.file, componentsDir, utilPath, useTsx, isUniwind ? { uniwind: true } : undefined);
    } catch (err) {
      logger.error(`Failed to update ${name}: ${err instanceof Error ? err.message : String(err)}`);
      continue;
    }

    // Read the new file to compute its hash
    const newHash = await hashFile(localFile);

    // Update manifest
    installed[name] = {
      version: currentVersion,
      hash: newHash,
      addedAt: manifest.addedAt,
    };

    logger.success(`Updated ${name} to v${currentVersion}`);
    updated++;
  }

  // Write back config
  config.installed = installed;
  await fs.writeJson(configPath, config, { spaces: 2 });

  logger.break();
  logger.title("Update summary:");
  if (updated > 0) logger.success(`${updated} component(s) updated`);
  if (skipped > 0) logger.info(`${skipped} component(s) skipped`);
  if (backed > 0) logger.info(`${backed} backup(s) created`);
  logger.break();
}

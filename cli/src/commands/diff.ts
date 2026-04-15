import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { registry } from "../registry";
import { getPackageRoot } from "../utils/file-ops";
import { logger } from "../utils/logger";

interface AniUIConfig {
  componentsDir: string;
  tsx?: boolean;
}

export async function diffCommand(name: string): Promise<void> {
  const cwd = process.cwd();

  if (!registry[name]) {
    logger.error(`Unknown component: ${name}`);
    process.exit(1);
  }

  const configPath = path.join(cwd, ".aniui.json");
  const config: AniUIConfig | null = await fs.pathExists(configPath)
    ? await fs.readJson(configPath)
    : null;

  const componentsDir = path.resolve(cwd, config?.componentsDir || "components/ui");
  const entry = registry[name];
  const localFile = path.join(componentsDir, path.basename(entry.file));

  if (!await fs.pathExists(localFile)) {
    logger.error(`${name} is not installed locally.`);
    process.exit(1);
  }

  const packageRoot = getPackageRoot();
  const upstreamFile = path.join(packageRoot, entry.file);

  if (!await fs.pathExists(upstreamFile)) {
    logger.error(`Upstream source not found for ${name}.`);
    process.exit(1);
  }

  const localLines = (await fs.readFile(localFile, "utf-8")).split("\n");
  const upstreamLines = (await fs.readFile(upstreamFile, "utf-8")).split("\n");

  const maxLen = Math.max(localLines.length, upstreamLines.length);
  let hasDiff = false;

  logger.title(`Diff: ${name} (local vs upstream)`);

  for (let i = 0; i < maxLen; i++) {
    const local = localLines[i];
    const upstream = upstreamLines[i];

    if (local === upstream) continue;

    hasDiff = true;
    const lineNum = String(i + 1).padStart(4);

    if (local !== undefined && upstream !== undefined) {
      console.log(chalk.red(`${lineNum} - ${local}`));
      console.log(chalk.green(`${lineNum} + ${upstream}`));
    } else if (local !== undefined) {
      console.log(chalk.red(`${lineNum} - ${local}`));
    } else {
      console.log(chalk.green(`${lineNum} + ${upstream}`));
    }
  }

  if (!hasDiff) {
    logger.success(`${name} is identical to upstream.`);
  }

  logger.break();
}

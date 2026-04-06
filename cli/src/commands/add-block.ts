import path from "path";
import fs from "fs-extra";
import { blockRegistry, getBlockNames } from "../block-registry";
import { registry, resolveRegistryDeps } from "../registry";
import { copyComponent, getPackageRoot } from "../utils/file-ops";
import { detectPackageManager, getInstallCommand, getDlxCommand } from "../utils/detect-project";
import { logger } from "../utils/logger";

interface AniUIConfig {
  componentsDir: string;
  utilPath: string;
  theme: string;
}

async function loadConfig(cwd: string): Promise<AniUIConfig | null> {
  const configPath = path.join(cwd, ".aniui.json");
  if (await fs.pathExists(configPath)) {
    return fs.readJson(configPath);
  }
  return null;
}

export async function addBlockCommand(names: string[]): Promise<void> {
  const cwd = process.cwd();

  if (names.length === 0) {
    const pmHint = await detectPackageManager(cwd);
    logger.error("No block names provided.");
    logger.info(`Usage: ${getDlxCommand(pmHint, "aniui add-block login")}`);
    logger.break();
    logger.info("Available blocks:");
    const allNames = getBlockNames();
    for (const name of allNames) {
      const entry = blockRegistry[name];
      logger.info(`  ${name.padEnd(20)} ${entry.description}`);
    }
    process.exit(1);
  }

  const pm = await detectPackageManager(cwd);

  // Validate block names
  const invalid = names.filter((n) => !blockRegistry[n]);
  if (invalid.length > 0) {
    logger.error(`Unknown block(s): ${invalid.join(", ")}`);
    logger.info(`Run "${getDlxCommand(pm, "@aniui/cli add-block")}" to see available blocks.`);
    process.exit(1);
  }

  // Load config or use defaults
  const config = await loadConfig(cwd);
  const componentsDir = path.resolve(cwd, config?.componentsDir || "components/ui");
  const utilPath = path.resolve(cwd, config?.utilPath || "lib/utils.ts");

  // Check if init has been run
  if (!await fs.pathExists(utilPath)) {
    logger.error(`AniUI is not initialized. Run \`${getDlxCommand(pm, "@aniui/cli init")}\` first.`);
    process.exit(1);
  }

  // Default blocks destination
  const blocksDir = path.resolve(cwd, "app/screens");

  const createdBlocks: string[] = [];
  const skippedBlocks: string[] = [];
  const allComponentDeps = new Set<string>();

  for (const name of names) {
    const entry = blockRegistry[name];
    const destFile = path.join(blocksDir, path.basename(entry.file));

    if (await fs.pathExists(destFile)) {
      skippedBlocks.push(name);
      continue;
    }

    try {
      const packageRoot = getPackageRoot();
      const srcPath = path.join(packageRoot, entry.file);

      if (!await fs.pathExists(srcPath)) {
        logger.error(`Block source not found: ${srcPath}`);
        continue;
      }

      await fs.ensureDir(blocksDir);

      let content = await fs.readFile(srcPath, "utf-8");

      // Adjust @/lib/utils import path
      const relativeUtil = getRelativeImportPath(blocksDir, utilPath);
      content = content.replace(/@\/lib\/utils/g, relativeUtil);

      // Adjust @/components/ui/* import paths
      const relativeComponents = getRelativeImportPath(blocksDir, componentsDir);
      content = content.replace(/@\/components\/ui\//g, relativeComponents + "/");

      await fs.writeFile(destFile, content, "utf-8");
      createdBlocks.push(name);

      // Collect component dependencies
      for (const comp of entry.components) {
        allComponentDeps.add(comp);
      }
    } catch (err) {
      logger.error(`Failed to copy block ${name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  logger.break();

  if (createdBlocks.length > 0) {
    logger.title("Blocks added:");
    for (const name of createdBlocks) {
      const entry = blockRegistry[name];
      const relPath = path.relative(cwd, path.join(blocksDir, path.basename(entry.file)));
      logger.success(`${entry.name} → ${relPath}`);
    }
  }

  if (skippedBlocks.length > 0) {
    logger.break();
    for (const name of skippedBlocks) {
      logger.warn(`${blockRegistry[name].name} already exists — skipped`);
    }
  }

  // Auto-install missing AniUI component dependencies
  const missingComponents: string[] = [];
  for (const comp of allComponentDeps) {
    if (!registry[comp]) continue;
    const compFile = path.join(componentsDir, path.basename(registry[comp].file));
    if (!await fs.pathExists(compFile)) {
      missingComponents.push(comp);
    }
  }

  if (missingComponents.length > 0) {
    logger.break();
    logger.title("Installing missing component dependencies...");

    const allDeps = resolveRegistryDeps(missingComponents);
    const installedComponents: string[] = [];
    const npmDeps = new Set<string>();

    for (const name of allDeps) {
      const entry = registry[name];
      if (!entry) continue;

      const destFile = path.join(componentsDir, path.basename(entry.file));
      if (await fs.pathExists(destFile)) continue;

      try {
        await copyComponent(entry.file, componentsDir, utilPath);
        installedComponents.push(name);
        for (const dep of entry.dependencies) {
          npmDeps.add(dep);
        }
      } catch (err) {
        logger.error(`Failed to install ${name}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    if (installedComponents.length > 0) {
      logger.title("Components auto-installed:");
      for (const name of installedComponents) {
        const entry = registry[name];
        const relPath = path.relative(cwd, path.join(componentsDir, path.basename(entry.file)));
        logger.success(`${entry.name} → ${relPath}`);
      }
    }

    // Check which npm deps are missing
    const pm = await detectPackageManager(cwd);
    const pkgPath = path.join(cwd, "package.json");
    const pkg = await fs.pathExists(pkgPath)
      ? await fs.readJson(pkgPath)
      : { dependencies: {}, devDependencies: {} };
    const allInstalledDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    const missingNpmDeps = Array.from(npmDeps).filter((dep) => !allInstalledDeps[dep]);

    if (missingNpmDeps.length > 0) {
      logger.break();
      logger.title("Install required dependencies:");
      logger.info(`  ${getInstallCommand(pm, missingNpmDeps)}`);
    }
  }

  // Show import example
  if (createdBlocks.length > 0) {
    logger.break();
    logger.title("Import example:");
    const first = blockRegistry[createdBlocks[0]];
    const importPath = `@/screens/${path.basename(first.file, ".tsx")}`;
    logger.info(`  import { ${first.name} } from "${importPath}";`);
  }

  logger.break();
}

function getRelativeImportPath(fromDir: string, toFileOrDir: string): string {
  let rel = path.relative(fromDir, toFileOrDir);
  // Remove .ts extension for import
  rel = rel.replace(/\.ts$/, "");
  // Ensure it starts with ./ or ../
  if (!rel.startsWith(".")) {
    rel = "./" + rel;
  }
  return rel;
}

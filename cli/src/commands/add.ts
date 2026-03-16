import path from "path";
import fs from "fs-extra";
import { registry, resolveRegistryDeps, getComponentNames } from "../registry";
import { copyComponent } from "../utils/file-ops";
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

export async function addCommand(names: string[]): Promise<void> {
  const cwd = process.cwd();

  if (names.length === 0) {
    const pmHint = await detectPackageManager(cwd);
    logger.error("No component names provided.");
    logger.info(`Usage: ${getDlxCommand(pmHint, "aniui add button card text")}`);
    logger.break();
    logger.info("Available components:");
    const allNames = getComponentNames();
    for (const name of allNames) {
      const entry = registry[name];
      logger.info(`  ${name.padEnd(16)} ${entry.description} (Tier ${entry.tier})`);
    }
    process.exit(1);
  }

  // Validate component names
  const invalid = names.filter((n) => !registry[n]);
  if (invalid.length > 0) {
    logger.error(`Unknown component(s): ${invalid.join(", ")}`);
    logger.info(`Run "npx aniui add" to see available components.`);
    process.exit(1);
  }

  // Load config or use defaults
  const config = await loadConfig(cwd);
  const componentsDir = path.resolve(cwd, config?.componentsDir || "components/ui");
  const utilPath = path.resolve(cwd, config?.utilPath || "lib/utils.ts");

  // Check if init has been run
  if (!await fs.pathExists(utilPath)) {
    logger.error("AniUI is not initialized. Run `npx aniui init` first.");
    process.exit(1);
  }

  // Resolve all dependencies (including registry deps)
  const allNames = resolveRegistryDeps(names);

  const created: string[] = [];
  const skipped: string[] = [];
  const npmDeps = new Set<string>();

  for (const name of allNames) {
    const entry = registry[name];
    const destFile = path.join(componentsDir, path.basename(entry.file));

    if (await fs.pathExists(destFile)) {
      skipped.push(name);
      continue;
    }

    try {
      await copyComponent(entry.file, componentsDir, utilPath);
    } catch (err) {
      logger.error(`Failed to copy ${name}: ${err instanceof Error ? err.message : String(err)}`);
      continue;
    }
    created.push(name);

    for (const dep of entry.dependencies) {
      npmDeps.add(dep);
    }
  }

  logger.break();

  if (created.length > 0) {
    logger.title("Components added:");
    for (const name of created) {
      const entry = registry[name];
      const relPath = path.relative(cwd, path.join(componentsDir, path.basename(entry.file)));
      logger.success(`${entry.name} → ${relPath}`);
    }
  }

  if (skipped.length > 0) {
    logger.break();
    for (const name of skipped) {
      logger.warn(`${registry[name].name} already exists — skipped`);
    }
  }

  // Detect package manager for install commands
  const pm = await detectPackageManager(cwd);

  // Check which npm deps are missing
  const pkgPath = path.join(cwd, "package.json");
  const pkg = await fs.pathExists(pkgPath) ? await fs.readJson(pkgPath) : { dependencies: {}, devDependencies: {} };
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  const missingDeps = Array.from(npmDeps).filter((dep) => !allDeps[dep]);

  if (missingDeps.length > 0) {
    logger.break();
    logger.title("Install required dependencies:");
    logger.info(`  ${getInstallCommand(pm, missingDeps)}`);
  }

  // Show tier warnings
  const tier2Components = allNames.filter((n) => registry[n].tier === 2);
  const tier3Components = allNames.filter((n) => registry[n].tier === 3);

  if (tier2Components.length > 0 && !allDeps["react-native-reanimated"]) {
    logger.break();
    logger.warn("Tier 2 components require react-native-reanimated:");
    logger.info(`  ${getInstallCommand(pm, ["react-native-reanimated"])}`);
  }

  if (tier3Components.length > 0) {
    const needsGorhom = tier3Components.some((n) =>
      registry[n].dependencies.includes("@gorhom/bottom-sheet")
    );
    const needsDatePicker = tier3Components.some((n) =>
      registry[n].dependencies.includes("@react-native-community/datetimepicker")
    );

    if (needsGorhom && !allDeps["@gorhom/bottom-sheet"]) {
      logger.info(`  ${getInstallCommand(pm, ["@gorhom/bottom-sheet", "react-native-gesture-handler"])}`);
    }
    if (needsDatePicker && !allDeps["@react-native-community/datetimepicker"]) {
      logger.info(`  ${getInstallCommand(pm, ["@react-native-community/datetimepicker"])}`);
    }
  }

  // Show import example
  if (created.length > 0) {
    logger.break();
    logger.title("Import example:");
    const first = registry[created[0]];
    const importPath = config?.componentsDir
      ? `@/${config.componentsDir}/${path.basename(first.file, ".tsx")}`
      : `@/components/ui/${path.basename(first.file, ".tsx")}`;
    logger.info(`  import { ${first.name} } from "${importPath}";`);
  }

  logger.break();
}

import path from "path";
import fs from "fs-extra";

export type ProjectType = "expo" | "react-native-cli" | "unknown";
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export interface ProjectInfo {
  type: ProjectType;
  root: string;
  packageManager: PackageManager;
  hasNativewind: boolean;
  hasReanimated: boolean;
  hasTailwind: boolean;
}

export async function detectPackageManager(cwd: string): Promise<PackageManager> {
  // Check lockfiles first (most reliable)
  if (await fs.pathExists(path.join(cwd, "bun.lockb")) || await fs.pathExists(path.join(cwd, "bun.lock"))) {
    return "bun";
  }
  if (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (await fs.pathExists(path.join(cwd, "yarn.lock"))) {
    return "yarn";
  }
  if (await fs.pathExists(path.join(cwd, "package-lock.json"))) {
    return "npm";
  }

  // Check packageManager field in package.json
  const pkgPath = path.join(cwd, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    if (typeof pkg.packageManager === "string") {
      if (pkg.packageManager.startsWith("pnpm")) return "pnpm";
      if (pkg.packageManager.startsWith("yarn")) return "yarn";
      if (pkg.packageManager.startsWith("bun")) return "bun";
      if (pkg.packageManager.startsWith("npm")) return "npm";
    }
  }

  return "npm";
}

export function getInstallCommand(pm: PackageManager, packages: string[]): string {
  const pkgs = packages.join(" ");
  switch (pm) {
    case "pnpm":
      return `pnpm add ${pkgs}`;
    case "yarn":
      return `yarn add ${pkgs}`;
    case "bun":
      return `bun add ${pkgs}`;
    case "npm":
    default:
      return `npm install ${pkgs}`;
  }
}

export function getRunCommand(pm: PackageManager, script: string): string {
  switch (pm) {
    case "pnpm":
      return `pnpm ${script}`;
    case "yarn":
      return `yarn ${script}`;
    case "bun":
      return `bun run ${script}`;
    case "npm":
    default:
      return `npm run ${script}`;
  }
}

export function getDlxCommand(pm: PackageManager, pkg: string): string {
  switch (pm) {
    case "pnpm":
      return `pnpm dlx ${pkg}`;
    case "yarn":
      return `yarn dlx ${pkg}`;
    case "bun":
      return `bunx ${pkg}`;
    case "npm":
    default:
      return `npx ${pkg}`;
  }
}

export async function detectProject(cwd: string): Promise<ProjectInfo> {
  const pkgPath = path.join(cwd, "package.json");
  const packageManager = await detectPackageManager(cwd);

  if (!await fs.pathExists(pkgPath)) {
    return { type: "unknown", root: cwd, packageManager, hasNativewind: false, hasReanimated: false, hasTailwind: false };
  }

  const pkg = await fs.readJson(pkgPath);
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  const appJsonPath = path.join(cwd, "app.json");
  const hasExpo = await fs.pathExists(appJsonPath) && (await fs.readJson(appJsonPath)).expo !== undefined;
  const hasRN = !!allDeps["react-native"];

  let type: ProjectType = "unknown";
  if (hasExpo) type = "expo";
  else if (hasRN) type = "react-native-cli";

  return {
    type,
    root: cwd,
    packageManager,
    hasNativewind: !!allDeps["nativewind"],
    hasReanimated: !!allDeps["react-native-reanimated"],
    hasTailwind: !!allDeps["tailwindcss"],
  };
}

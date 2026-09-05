import path from "path";
import fs from "fs-extra";

export type ProjectType = "expo" | "react-native-cli" | "unknown";
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export type SDKGeneration = "v4" | "v5";

export type StyleEngine = "nativewind" | "uniwind";

export interface ProjectInfo {
  type: ProjectType;
  root: string;
  packageManager: PackageManager;
  hasNativewind: boolean;
  hasUniwind: boolean;
  hasReanimated: boolean;
  hasTailwind: boolean;
  sdkGeneration: SDKGeneration;
  expoMajor: number;
  nativewindMajor: number;
  /** Expo SDK 56 introduced react-native-worklets as a separate Reanimated peer. */
  sdk56Plus: boolean;
  /**
   * Expo SDK 57 support today is an inclusive side effect of the sdk56Plus
   * threshold (nothing in init.ts/doctor.ts branches on 57 specifically yet).
   * This field is a named seam for the day SDK 58 needs its own carve-out the
   * way 56 diverged from 55 by adding worklets — add an `sdk58Plus` alongside
   * it then, rather than introducing the first >= check from scratch.
   */
  sdk57Plus: boolean;
}

function parseUserAgent(ua: string | undefined): PackageManager | null {
  if (!ua) return null;
  if (ua.startsWith("yarn/")) return "yarn";
  if (ua.startsWith("pnpm/")) return "pnpm";
  if (ua.startsWith("bun/")) return "bun";
  if (ua.startsWith("npm/")) return "npm";
  return null;
}

export async function detectPackageManager(cwd: string): Promise<PackageManager> {
  // Check lockfiles first (most reliable — represents the project's committed PM)
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

  // npm_config_user_agent is set by npm/yarn/pnpm/bun when invoking a script
  // (yarn dlx, pnpm dlx, bunx, npx). Catches the fresh-project case where no
  // lockfile exists yet but the user explicitly typed `yarn dlx` / `pnpm dlx`.
  const fromUA = parseUserAgent(process.env.npm_config_user_agent);
  if (fromUA) return fromUA;

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
    return { type: "unknown", root: cwd, packageManager, hasNativewind: false, hasUniwind: false, hasReanimated: false, hasTailwind: false, sdkGeneration: "v4", expoMajor: 0, nativewindMajor: 0, sdk56Plus: false, sdk57Plus: false };
  }

  const pkg = await fs.readJson(pkgPath);
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  const appJsonPath = path.join(cwd, "app.json");
  const hasExpo = await fs.pathExists(appJsonPath) && (await fs.readJson(appJsonPath)).expo !== undefined;
  const hasRN = !!allDeps["react-native"];

  let type: ProjectType = "unknown";
  if (hasExpo) type = "expo";
  else if (hasRN) type = "react-native-cli";

  const sdkGeneration = detectSDKGeneration(allDeps);
  const expoMajor = parseMajor(allDeps["expo"] || "");
  const nativewindMajor = parseMajor(allDeps["nativewind"] || "");

  return {
    type,
    root: cwd,
    packageManager,
    hasNativewind: !!allDeps["nativewind"],
    hasUniwind: !!allDeps["uniwind"],
    hasReanimated: !!allDeps["react-native-reanimated"],
    hasTailwind: !!allDeps["tailwindcss"],
    sdkGeneration,
    expoMajor,
    nativewindMajor,
    sdk56Plus: expoMajor >= 56,
    sdk57Plus: expoMajor >= 57,
  };
}

function detectSDKGeneration(deps: Record<string, string>): SDKGeneration {
  // 1. Explicit NativeWind version wins — user's installed dep is the source of truth
  const nwMajor = parseMajor(deps["nativewind"] || "");
  if (nwMajor >= 5) return "v5";
  if (nwMajor === 4) return "v4";

  // 2. Explicit Tailwind version
  const twMajor = parseMajor(deps["tailwindcss"] || "");
  if (twMajor >= 4) return "v5";
  if (twMajor === 3) return "v4";

  // 3. Fall back to Expo SDK bucket (fresh inits where neither dep is installed yet)
  const expoMajor = parseMajor(deps["expo"] || "");
  if (expoMajor >= 55) return "v5";

  return "v4";
}

function parseMajor(version: string): number {
  const match = version.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

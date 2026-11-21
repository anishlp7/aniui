/**
 * `aniui mcp install` — writes the AniUI MCP entry into each detected AI
 * client's config file, so users don't have to find and hand-edit JSON across
 * four different OS-specific paths.
 *
 * Idempotent: an existing aniui entry is upserted (not duplicated); any other
 * mcpServers entries are preserved. If the existing aniui entry points
 * somewhere else (e.g. a local dev build), the user is asked before overwrite
 * unless --yes.
 */
import fs from "fs-extra";
import path from "path";
import os from "os";
import prompts from "prompts";
import { logger } from "../utils/logger";
import { detectPackageManager, getDlxCommand } from "../utils/detect-project";

export type ClientId = "cursor" | "claude-desktop" | "claude-code" | "windsurf";

export interface ClientTarget {
  id: ClientId;
  label: string;
  /** Resolved config path on this machine; `null` if the platform is unsupported. */
  configPath: string | null;
  /** True when the config file (or its directory) already exists on disk. */
  present: boolean;
}

export interface McpInstallOptions {
  cursor?: boolean;
  claudeDesktop?: boolean;
  claudeCode?: boolean;
  windsurf?: boolean;
  all?: boolean;
  dryRun?: boolean;
  yes?: boolean;
  /** Override cwd for tests. */
  cwd?: string;
  /** Override home dir for tests. */
  home?: string;
}

function platformClaudeDesktopPath(home: string): string | null {
  switch (process.platform) {
    case "darwin":
      return path.join(home, "Library", "Application Support", "Claude", "claude_desktop_config.json");
    case "win32":
      return process.env.APPDATA ? path.join(process.env.APPDATA, "Claude", "claude_desktop_config.json") : null;
    case "linux":
      return path.join(home, ".config", "Claude", "claude_desktop_config.json");
    default:
      return null;
  }
}

export function resolveClients(opts: Pick<McpInstallOptions, "cwd" | "home"> = {}): ClientTarget[] {
  const cwd = opts.cwd ?? process.cwd();
  const home = opts.home ?? os.homedir();

  const targets: ClientTarget[] = [
    { id: "cursor", label: "Cursor (project .cursor/mcp.json)", configPath: path.join(cwd, ".cursor", "mcp.json"), present: false },
    { id: "claude-desktop", label: "Claude Desktop", configPath: platformClaudeDesktopPath(home), present: false },
    { id: "claude-code", label: "Claude Code (project .mcp.json)", configPath: path.join(cwd, ".mcp.json"), present: false },
    { id: "windsurf", label: "Windsurf", configPath: path.join(home, ".codeium", "windsurf", "mcp_config.json"), present: false },
  ];

  for (const t of targets) {
    if (!t.configPath) continue;
    t.present = fs.existsSync(t.configPath) || fs.existsSync(path.dirname(t.configPath));
  }
  return targets;
}

interface McpServerEntry {
  command: string;
  args: string[];
}

interface McpConfig {
  mcpServers?: Record<string, McpServerEntry>;
  [k: string]: unknown;
}

function readJsonSafe(file: string): McpConfig {
  if (!fs.existsSync(file)) return {};
  try {
    return fs.readJSONSync(file);
  } catch {
    return {};
  }
}

function sameEntry(a: McpServerEntry | undefined, b: McpServerEntry): boolean {
  if (!a) return false;
  return a.command === b.command && JSON.stringify(a.args) === JSON.stringify(b.args);
}

export type InstallOutcome = "written" | "already-current" | "skipped" | "no-path" | "dry-run";

export interface InstallResult {
  client: ClientTarget;
  outcome: InstallOutcome;
  configPath: string | null;
}

/** Programmatic entry used by the CLI command and by tests. */
export async function installForClients(
  selected: ClientTarget[],
  entry: McpServerEntry,
  opts: Pick<McpInstallOptions, "dryRun" | "yes"> & { ask?: (label: string) => Promise<boolean> } = {}
): Promise<InstallResult[]> {
  const ask = opts.ask ?? (async () => true);
  const results: InstallResult[] = [];

  for (const client of selected) {
    if (!client.configPath) {
      results.push({ client, outcome: "no-path", configPath: null });
      continue;
    }

    const existing = readJsonSafe(client.configPath);
    const existingAniui = existing.mcpServers?.aniui;

    if (sameEntry(existingAniui, entry)) {
      results.push({ client, outcome: "already-current", configPath: client.configPath });
      continue;
    }

    if (existingAniui && !opts.yes) {
      const proceed = await ask(client.label);
      if (!proceed) {
        results.push({ client, outcome: "skipped", configPath: client.configPath });
        continue;
      }
    }

    if (opts.dryRun) {
      results.push({ client, outcome: "dry-run", configPath: client.configPath });
      continue;
    }

    const next: McpConfig = { ...existing, mcpServers: { ...(existing.mcpServers ?? {}), aniui: entry } };
    fs.ensureDirSync(path.dirname(client.configPath));
    fs.writeJSONSync(client.configPath, next, { spaces: 2 });
    results.push({ client, outcome: "written", configPath: client.configPath });
  }

  return results;
}

export async function mcpInstallCommand(opts: McpInstallOptions = {}): Promise<void> {
  const cwd = opts.cwd ?? process.cwd();
  const pm = await detectPackageManager(cwd);
  const dlxFull = getDlxCommand(pm, "@aniui/mcp");
  const parts = dlxFull.split(" ");
  const entry: McpServerEntry = { command: parts[0], args: parts.slice(1) };

  const targets = resolveClients({ cwd, home: opts.home });

  const flagSelected: ClientId[] = [];
  if (opts.cursor) flagSelected.push("cursor");
  if (opts.claudeDesktop) flagSelected.push("claude-desktop");
  if (opts.claudeCode) flagSelected.push("claude-code");
  if (opts.windsurf) flagSelected.push("windsurf");
  if (opts.all) flagSelected.push("cursor", "claude-desktop", "claude-code", "windsurf");

  let selected: ClientTarget[];
  if (flagSelected.length) {
    selected = targets.filter((t) => flagSelected.includes(t.id));
  } else {
    const detected = targets.filter((t) => t.present && t.configPath);
    const choices = targets.map((t) => ({
      title: `${t.label}${t.present ? "" : "  (not detected)"}`,
      value: t.id,
      selected: detected.includes(t),
      disabled: !t.configPath,
    }));
    const response = await prompts({
      type: "multiselect",
      name: "ids",
      message: "Install AniUI MCP for which clients?",
      choices,
      min: 1,
      instructions: false,
      hint: "space to toggle, enter to confirm",
    });
    if (!response.ids || !response.ids.length) {
      logger.warn("No clients selected — nothing to install.");
      return;
    }
    selected = targets.filter((t) => response.ids.includes(t.id));
  }

  logger.title("AniUI MCP install");
  logger.info(`Entry: ${entry.command} ${entry.args.join(" ")}`);
  logger.break();

  const results = await installForClients(selected, entry, {
    dryRun: opts.dryRun,
    yes: opts.yes,
    ask: async (label) => {
      const r = await prompts({
        type: "confirm",
        name: "ok",
        message: `An "aniui" MCP entry already exists in ${label}. Overwrite?`,
        initial: true,
      });
      return !!r.ok;
    },
  });

  for (const r of results) {
    const label = r.client.label;
    switch (r.outcome) {
      case "written":
        logger.success(`${label} → ${r.configPath}`);
        break;
      case "already-current":
        logger.info(`${label}: already current, no changes`);
        break;
      case "skipped":
        logger.warn(`${label}: skipped by user`);
        break;
      case "no-path":
        logger.warn(`${label}: no config path for this platform`);
        break;
      case "dry-run":
        logger.info(`${label}: (dry-run) would write to ${r.configPath}`);
        break;
    }
  }

  logger.break();
  const written = results.filter((r) => r.outcome === "written").length;
  if (written > 0) {
    logger.success(`Installed into ${written} client${written === 1 ? "" : "s"}. Restart the client(s) to load the MCP.`);
  }
}

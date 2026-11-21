import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";
import { addBlockCommand } from "./commands/add-block";
import { themeCommand } from "./commands/theme";
import { mcpCommand } from "./commands/mcp";
import { mcpInstallCommand } from "./commands/mcp-install";
import { generateCommand } from "./commands/generate";
import { doctorCommand } from "./commands/doctor";
import { statusCommand } from "./commands/status";
import { diffCommand } from "./commands/diff";
import { updateCommand } from "./commands/update";
import { getCliPackage } from "./utils/pkg";

const pkg = getCliPackage();

const program = new Command()
  .name("aniui")
  .description("Beautiful React Native components. Copy. Paste. Ship.")
  .version(pkg.version);

program
  .command("init")
  .description("Initialize AniUI in your React Native project")
  .option("--style <engine>", "styling engine: nativewind or uniwind")
  .option("--nw <track>", "NativeWind track on Expo 55+: v4 (stable) or v5 (preview)")
  .option("-y, --yes", "skip all prompts and use defaults")
  .action(async (opts: { style?: string; nw?: string; yes?: boolean }) => {
    await initCommand(opts);
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[names...]", "component names to add")
  .action(async (names: string[]) => {
    await addCommand(names);
  });

program
  .command("add-block")
  .description("Add pre-built screen templates to your project")
  .argument("[names...]", "block names to add")
  .action(async (names: string[]) => {
    await addBlockCommand(names);
  });

program
  .command("theme")
  .description("Change the theme preset")
  .action(async () => {
    await themeCommand();
  });

const mcp = program
  .command("mcp")
  .description("MCP server tools (default: print config; 'install' auto-writes it)");

mcp
  .command("print", { isDefault: true })
  .description("Print MCP server configuration for AI tools")
  .action(async () => {
    await mcpCommand();
  });

mcp
  .command("install")
  .description("Auto-install the AniUI MCP into Cursor / Claude Desktop / Claude Code / Windsurf")
  .option("--cursor", "install for Cursor")
  .option("--claude-desktop", "install for Claude Desktop")
  .option("--claude-code", "install for Claude Code")
  .option("--windsurf", "install for Windsurf")
  .option("--all", "install for every supported client")
  .option("--dry-run", "show what would be written without writing")
  .option("-y, --yes", "skip confirmation prompts")
  .action(async (opts: { cursor?: boolean; claudeDesktop?: boolean; claudeCode?: boolean; windsurf?: boolean; all?: boolean; dryRun?: boolean; yes?: boolean }) => {
    await mcpInstallCommand(opts);
  });

program
  .command("generate")
  .description("Generate a screen using AI (requires ANTHROPIC_API_KEY)")
  .argument("<description>", "describe the screen to generate")
  .option("-o, --output <path>", "output file path")
  .action(async (description: string, opts: { output?: string }) => {
    await generateCommand(description, opts);
  });

program
  .command("doctor")
  .description("Check your project setup for issues")
  .action(async () => {
    await doctorCommand();
  });

program
  .command("status")
  .description("Show installed components and available updates")
  .action(async () => {
    await statusCommand();
  });

program
  .command("diff")
  .description("Show differences between local and upstream component")
  .argument("<name>", "component name to diff")
  .action(async (name: string) => {
    await diffCommand(name);
  });

program
  .command("update")
  .description("Update installed components to latest version")
  .argument("[names...]", "component names to update (all if omitted)")
  .action(async (names: string[]) => {
    await updateCommand(names);
  });

program.parse();

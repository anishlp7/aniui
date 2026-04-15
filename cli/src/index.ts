import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";
import { addBlockCommand } from "./commands/add-block";
import { themeCommand } from "./commands/theme";
import { mcpCommand } from "./commands/mcp";
import { generateCommand } from "./commands/generate";
import { doctorCommand } from "./commands/doctor";
import { statusCommand } from "./commands/status";
import { diffCommand } from "./commands/diff";
import { updateCommand } from "./commands/update";

const pkg = require("../../package.json");

const program = new Command()
  .name("aniui")
  .description("Beautiful React Native components. Copy. Paste. Ship.")
  .version(pkg.version);

program
  .command("init")
  .description("Initialize AniUI in your React Native project")
  .option("--style <engine>", "styling engine: nativewind or uniwind")
  .option("-y, --yes", "skip all prompts and use defaults")
  .action(async (opts: { style?: string; yes?: boolean }) => {
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

program
  .command("mcp")
  .description("Print MCP server configuration for AI tools")
  .action(async () => {
    await mcpCommand();
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

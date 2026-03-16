import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";
import { themeCommand } from "./commands/theme";
import { mcpCommand } from "./commands/mcp";
import { generateCommand } from "./commands/generate";

const pkg = require("../../package.json");

const program = new Command()
  .name("aniui")
  .description("Beautiful React Native components. Copy. Paste. Ship.")
  .version(pkg.version);

program
  .command("init")
  .description("Initialize AniUI in your React Native project")
  .action(async () => {
    await initCommand();
  });

program
  .command("add")
  .description("Add components to your project")
  .argument("[names...]", "component names to add")
  .action(async (names: string[]) => {
    await addCommand(names);
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

program.parse();

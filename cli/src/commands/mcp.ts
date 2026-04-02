import { logger } from "../utils/logger";
import { detectPackageManager, getDlxCommand } from "../utils/detect-project";

export async function mcpCommand(): Promise<void> {
  const cwd = process.cwd();
  const pm = await detectPackageManager(cwd);

  logger.title("AniUI MCP Server Configuration");
  logger.break();
  logger.info("Add this to your MCP client config (Claude Desktop, Cursor, etc.):");
  logger.break();

  const dlxFull = getDlxCommand(pm, "@aniui/mcp");
  const parts = dlxFull.split(" ");
  const config = {
    mcpServers: {
      aniui: {
        command: parts[0],
        args: [...parts.slice(1)],
      },
    },
  };

  console.log(JSON.stringify(config, null, 2));

  logger.break();
  logger.info("Tools available: list_components, get_component, get_component_usage, get_theme_tokens");
  logger.info("Resources available: aniui://registry, aniui://theme, aniui://pattern");
}

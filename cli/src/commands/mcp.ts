import { logger } from "../utils/logger";

export async function mcpCommand(): Promise<void> {
  logger.title("AniUI MCP Server Configuration");
  logger.break();
  logger.info("First, install the MCP server:");
  logger.info("  npm install -g @aniui/mcp");
  logger.break();
  logger.info("Then add this to your MCP client config (Claude Desktop, Cursor, etc.):");
  logger.break();

  const config = {
    mcpServers: {
      aniui: {
        command: "npx",
        args: ["-y", "@aniui/mcp"],
      },
    },
  };

  console.log(JSON.stringify(config, null, 2));

  logger.break();
  logger.info("Tools available: list_components, get_component, get_component_usage, get_theme_tokens");
  logger.info("Resources available: aniui://registry, aniui://theme, aniui://pattern");
}

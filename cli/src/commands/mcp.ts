import path from "path";
import { logger } from "../utils/logger";

export async function mcpCommand(): Promise<void> {
  const mcpServerPath = path.resolve(__dirname, "..", "..", "..", "mcp", "dist", "index.js");

  logger.title("AniUI MCP Server Configuration");
  logger.break();
  logger.info("Add this to your MCP client config (Claude Desktop, Cursor, etc.):");
  logger.break();

  const config = {
    mcpServers: {
      aniui: {
        command: "node",
        args: [mcpServerPath],
      },
    },
  };

  console.log(JSON.stringify(config, null, 2));

  logger.break();
  logger.info("Make sure to build the MCP server first:");
  logger.info("  cd mcp && npm install && npm run build");
  logger.break();
  logger.info("Tools available: list_components, get_component, get_component_usage, get_theme_tokens");
  logger.info("Resources available: aniui://registry, aniui://theme, aniui://pattern");
}

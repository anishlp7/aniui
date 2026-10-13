import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mcpCommand } from "../src/commands/mcp";

describe("mcpCommand", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;
  let output: string[];

  beforeEach(() => {
    output = [];
    logSpy = vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
      output.push(args.map((a) => String(a)).join(" "));
    });
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("prints a JSON block with an mcpServers.aniui entry", async () => {
    await mcpCommand();
    const joined = output.join("\n");
    const jsonMatch = joined.match(/\{[\s\S]+\}/);
    expect(jsonMatch).toBeTruthy();
    const config = JSON.parse(jsonMatch![0]);
    expect(config.mcpServers.aniui).toBeTruthy();
    expect(typeof config.mcpServers.aniui.command).toBe("string");
    expect(Array.isArray(config.mcpServers.aniui.args)).toBe(true);
  });

  it("prints the tools and resources inventory for discoverability", async () => {
    await mcpCommand();
    const joined = output.join("\n");
    expect(joined).toMatch(/list_components/);
    expect(joined).toMatch(/get_component/);
    expect(joined).toMatch(/aniui:\/\/registry/);
  });

  it("command string references @aniui/mcp as the package", async () => {
    await mcpCommand();
    const joined = output.join("\n");
    expect(joined).toMatch(/@aniui\/mcp/);
  });
});

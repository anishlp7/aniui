import { describe, it, expect } from "vitest";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { resolveClients, installForClients, type ClientTarget } from "../src/commands/mcp-install";

function tmp(): { cwd: string; home: string } {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aniui-mcp-install-"));
  const cwd = path.join(root, "proj");
  const home = path.join(root, "home");
  fs.mkdirSync(cwd, { recursive: true });
  fs.mkdirSync(home, { recursive: true });
  return { cwd, home };
}

const ENTRY = { command: "npx", args: ["-y", "@aniui/mcp"] };

describe("resolveClients", () => {
  it("returns all four client targets regardless of presence on disk", () => {
    const { cwd, home } = tmp();
    const clients = resolveClients({ cwd, home });
    expect(clients.map((c) => c.id).sort()).toEqual(["claude-code", "claude-desktop", "cursor", "windsurf"].sort());
  });

  it("flags Cursor as present when .cursor/mcp.json already exists in cwd", () => {
    const { cwd, home } = tmp();
    fs.mkdirSync(path.join(cwd, ".cursor"));
    fs.writeFileSync(path.join(cwd, ".cursor", "mcp.json"), "{}");
    const cursor = resolveClients({ cwd, home }).find((c) => c.id === "cursor")!;
    expect(cursor.present).toBe(true);
  });
});

describe("installForClients", () => {
  it("writes a new config when the file does not exist", async () => {
    const { cwd, home } = tmp();
    const clients: ClientTarget[] = [
      { id: "cursor", label: "Cursor", configPath: path.join(cwd, ".cursor", "mcp.json"), present: false },
    ];
    const results = await installForClients(clients, ENTRY, { yes: true });
    expect(results[0].outcome).toBe("written");
    const written = fs.readJSONSync(path.join(cwd, ".cursor", "mcp.json"));
    expect(written.mcpServers.aniui).toEqual(ENTRY);
  });

  it("preserves existing non-aniui entries when merging", async () => {
    const { cwd, home } = tmp();
    const file = path.join(cwd, ".cursor", "mcp.json");
    fs.ensureDirSync(path.dirname(file));
    fs.writeJSONSync(file, { mcpServers: { github: { command: "x", args: [] } } });
    const clients: ClientTarget[] = [{ id: "cursor", label: "Cursor", configPath: file, present: true }];
    await installForClients(clients, ENTRY, { yes: true });
    const written = fs.readJSONSync(file);
    expect(written.mcpServers.github).toEqual({ command: "x", args: [] });
    expect(written.mcpServers.aniui).toEqual(ENTRY);
  });

  it("reports already-current without writing when the aniui entry matches", async () => {
    const { cwd } = tmp();
    const file = path.join(cwd, ".cursor", "mcp.json");
    fs.ensureDirSync(path.dirname(file));
    fs.writeJSONSync(file, { mcpServers: { aniui: ENTRY } });
    const before = fs.statSync(file).mtimeMs;
    const clients: ClientTarget[] = [{ id: "cursor", label: "Cursor", configPath: file, present: true }];
    const results = await installForClients(clients, ENTRY, { yes: true });
    expect(results[0].outcome).toBe("already-current");
    // File not touched.
    expect(fs.statSync(file).mtimeMs).toBe(before);
  });

  it("asks before overwriting a differing aniui entry and skips when the user declines", async () => {
    const { cwd } = tmp();
    const file = path.join(cwd, ".cursor", "mcp.json");
    fs.ensureDirSync(path.dirname(file));
    fs.writeJSONSync(file, { mcpServers: { aniui: { command: "node", args: ["./local/mcp.js"] } } });
    const clients: ClientTarget[] = [{ id: "cursor", label: "Cursor", configPath: file, present: true }];
    const results = await installForClients(clients, ENTRY, { ask: async () => false });
    expect(results[0].outcome).toBe("skipped");
    // Original entry preserved.
    const kept = fs.readJSONSync(file);
    expect(kept.mcpServers.aniui).toEqual({ command: "node", args: ["./local/mcp.js"] });
  });

  it("dry-run does not write, reports dry-run outcome", async () => {
    const { cwd } = tmp();
    const file = path.join(cwd, ".cursor", "mcp.json");
    const clients: ClientTarget[] = [{ id: "cursor", label: "Cursor", configPath: file, present: false }];
    const results = await installForClients(clients, ENTRY, { yes: true, dryRun: true });
    expect(results[0].outcome).toBe("dry-run");
    expect(fs.existsSync(file)).toBe(false);
  });

  it("reports no-path for a client with no resolvable config path", async () => {
    const clients: ClientTarget[] = [{ id: "claude-desktop", label: "Claude Desktop", configPath: null, present: false }];
    const results = await installForClients(clients, ENTRY, { yes: true });
    expect(results[0].outcome).toBe("no-path");
  });
});

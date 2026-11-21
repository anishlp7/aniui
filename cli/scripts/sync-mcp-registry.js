/**
 * sync-mcp-registry.js — regenerate mcp/src/registry-data.ts from the
 * canonical cli/src/registry.ts so the MCP server's inline copy can never
 * drift in tiers, deps, entries, or SDK/engine/arch compatibility fields.
 *
 * We copy cli/src/registry.ts verbatim (plus an auto-gen header) because
 * registry.ts has no external imports and is pure data + pure helpers — a
 * byte-for-byte copy means a single edit to the source propagates
 * automatically to the MCP package next build.
 *
 * Runs as part of `npm run registry:build`.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..", "src", "registry.ts");
const OUT = path.resolve(__dirname, "..", "..", "mcp", "src", "registry-data.ts");

const header =
  "// AUTO-GENERATED from cli/src/registry.ts by cli/scripts/sync-mcp-registry.js — do not edit by hand.\n" +
  "// Regenerate with `npm run registry:build` in cli/.\n\n";

const body = fs.readFileSync(SRC, "utf8");
fs.writeFileSync(OUT, header + body);

const count = (body.match(/^\s{2}(?:"[^"]+"|[a-zA-Z_][\w-]*)\s*:\s*\{/gm) || []).length;
console.log(`Synced ${count} components (verbatim copy) → mcp/src/registry-data.ts`);

/**
 * sync-mcp-registry.js — regenerate mcp/src/registry-data.ts from the
 * canonical cli/src/registry.ts (via the compiled dist/) so the MCP server's
 * inline copy can never drift in tiers, deps, or entries.
 * Runs as part of `npm run registry:build`.
 */
const fs = require("fs");
const path = require("path");

const { registry } = require("../dist/src/registry.js");

const OUT = path.resolve(__dirname, "..", "..", "mcp", "src", "registry-data.ts");

const key = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));
const arr = (a) => `[${a.map((d) => JSON.stringify(d)).join(", ")}]`;

const lines = Object.entries(registry).map(
  ([slug, e]) =>
    `  ${key(slug)}: { name: ${JSON.stringify(e.name)}, file: ${JSON.stringify(e.file)}, description: ${JSON.stringify(e.description)}, dependencies: ${arr(e.dependencies)}, registryDependencies: ${arr(e.registryDependencies)}, tier: ${e.tier} },`
);

fs.writeFileSync(
  OUT,
  `// AUTO-GENERATED from cli/src/registry.ts by cli/scripts/sync-mcp-registry.js — do not edit by hand.
// Regenerate with \`npm run registry:build\` in cli/.

export type ComponentEntry = {
  name: string;
  file: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  tier: 1 | 2 | 3;
};

export const registry: Record<string, ComponentEntry> = {
${lines.join("\n")}
};

export function getComponentNames(): string[] {
  return Object.keys(registry).sort();
}
`
);

console.log(`Synced ${Object.keys(registry).length} components → mcp/src/registry-data.ts`);

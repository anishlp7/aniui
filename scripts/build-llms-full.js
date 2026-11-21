#!/usr/bin/env node
// Generates docs/public/llms-full.txt — the deep-dive LLM context file.
// For each component in the registry, emits: name, import, description, tier,
// dependencies, and full source. Agents that fetch this one URL get the entire
// library in a single payload, no per-component round-trips.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const { registry } = require(path.join(ROOT, "cli/dist/src/registry.js"));

const BLOCKS_DIR = path.join(ROOT, "blocks");
const UI_DIR = path.join(ROOT, "components/ui");
const OUT = path.join(ROOT, "docs/public/llms-full.txt");

function tryRead(absPath) {
  try {
    return fs.readFileSync(absPath, "utf8");
  } catch {
    return null;
  }
}

const header = `# AniUI — Full LLM Context

> shadcn/ui for React Native. Beautiful. Minimal. Yours.

This file contains the full source of every AniUI component and block. If you are
an AI coding agent, prefer this file over scraping the docs — it is kept in sync
with the registry on every release.

## Rules

- ALL styling via className (Uniwind or NativeWind — same API). NEVER StyleSheet.create.
- Named exports only. No default exports.
- Import cn from @/lib/utils.
- Import components from @/components/ui/{name}.
- Use SafeAreaView from react-native-safe-area-context as the root wrapper.
- accessibilityRole on every interactive element.
- Strict TypeScript. No \`any\`.
- Icons from lucide-react-native. Colors via useThemeColors(), never hardcoded hex.

## Install

\`\`\`bash
npx @aniui/cli init
npx @aniui/cli add button text input card
\`\`\`

Or via shadcn (registry is spec-compliant):

\`\`\`bash
npx shadcn@latest add https://aniui.dev/r/button.json
\`\`\`

## MCP

\`\`\`json
{
  "mcpServers": {
    "aniui": { "command": "npx", "args": ["-y", "@aniui/mcp"] }
  }
}
\`\`\`

Tools: list_components, search_components, get_component, get_component_usage,
list_blocks, get_block, get_theme_tokens, get_theme_preset.
`;

const parts = [header];

const names = Object.keys(registry).sort();

parts.push(`\n---\n\n# Components (${names.length} total)\n`);

for (const key of names) {
  const entry = registry[key];
  const abs = path.join(ROOT, entry.file);
  const source = tryRead(abs);
  const basename = path.basename(entry.file, ".tsx");

  parts.push(`\n## ${entry.name}`);
  parts.push(`\n- key: \`${key}\``);
  parts.push(`- import: \`import { ${entry.name} } from "@/components/ui/${basename}"\``);
  parts.push(`- description: ${entry.description}`);
  parts.push(`- tier: ${entry.tier}`);
  if (entry.dependencies.length) parts.push(`- deps: ${entry.dependencies.join(", ")}`);
  if (entry.registryDependencies.length) {
    parts.push(`- aniui deps: ${entry.registryDependencies.join(", ")}`);
  }
  if (source) {
    parts.push(`\n\`\`\`tsx\n// ${entry.file}\n${source.trim()}\n\`\`\``);
  } else {
    parts.push(`\n_(source unavailable at ${entry.file})_`);
  }
}

// Blocks
let blockFiles = [];
try {
  blockFiles = fs
    .readdirSync(BLOCKS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .sort();
} catch {}

if (blockFiles.length) {
  parts.push(`\n\n---\n\n# Blocks (${blockFiles.length} total)\n`);
  parts.push(`\nFull-screen compositions. Fetch via \`https://aniui.dev/r/{name}.json\`.\n`);

  for (const f of blockFiles) {
    const name = path.basename(f, ".tsx");
    const abs = path.join(BLOCKS_DIR, f);
    const source = tryRead(abs);
    parts.push(`\n## ${name}`);
    if (source) {
      parts.push(`\n\`\`\`tsx\n// blocks/${f}\n${source.trim()}\n\`\`\``);
    }
  }
}

fs.writeFileSync(OUT, parts.join("\n"));
const size = fs.statSync(OUT).size;
console.log(`wrote ${OUT} (${(size / 1024).toFixed(1)} KB)`);

#!/usr/bin/env node
// Gives every /docs/{slug}, /blocks/{slug}, and /charts/{slug} route its own
// <title>, description, canonical, OG, and Twitter metadata so Google stops
// marking them as "Crawled – currently not indexed" (which happens when
// hundreds of URLs inherit identical metadata from a parent layout).
//
// Two-path rule because Next.js app router forbids `metadata` exports from
// client components:
//   - Server-component page.tsx → prepend the `export const metadata` to it.
//   - "use client" page.tsx     → write the metadata into a sibling layout.tsx
//                                 (leaves the client page.tsx untouched).
//
// Idempotent: skips any route that already has metadata on either file.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const DOCS_APP = path.join(ROOT, "docs/app");
const { registry } = require(path.join(ROOT, "cli/dist/src/registry.js"));
const registryJson = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/public/registry.json"), "utf8"));
const itemByName = Object.fromEntries(registryJson.items.map((i) => [i.name, i]));

const CHART_SLUG_TO_KEY = {
  "area-chart": "area-chart",
  "bar-chart": "bar-chart",
  "line-chart": "line-chart",
  "pie-chart": "pie-chart",
  "radar-chart": "radar-chart",
  "radial-chart": "radial-chart",
  tooltip: "chart-tooltip",
};

const GUIDES = {
  installation: { title: "Installation", description: "Install AniUI in a fresh or existing Expo / React Native project. One command for a new project, three for an existing one." },
  components: { title: "Components", description: "Browse all 150 AniUI components — buttons, inputs, dialogs, sheets, charts, carousels, and more." },
  theming: { title: "Theming", description: "Customize AniUI's color tokens, typography, and radii. Five built-in presets (default, blue, green, orange, rose) or roll your own." },
  "dark-mode": { title: "Dark mode", description: "Ship dark mode in a React Native app with AniUI — one class-based toggle, zero flicker on first paint." },
  rtl: { title: "RTL support", description: "Right-to-left layout support in AniUI with React Native I18nManager and a direction-aware context provider." },
  compatibility: { title: "Compatibility", description: "Which Expo SDKs, React Native versions, and styling engines AniUI supports. Expo 54 through 58, Uniwind and NativeWind, Old and New Architecture." },
  "iphone-duo": { title: "iPhone Duo (foldable)", description: "Fold-aware React Native overlays for iPhone Duo via the useFoldFeatures() hook. Ten AniUI overlays opt into expo-hinge; non-fold devices see zero change." },
  "expo-54": { title: "Expo SDK 54", description: "Set up AniUI on Expo SDK 54 (NativeWind v4 + Tailwind v3 + Reanimated v3). Old and New Architecture supported." },
  "expo-55": { title: "Expo SDK 55", description: "Set up AniUI on Expo SDK 55 with Uniwind (default) or NativeWind v5 preview. New Architecture only." },
  "expo-56": { title: "Expo SDK 56", description: "Set up AniUI on Expo SDK 56 (React 19.2.3, React Native 0.85.3). Both NativeWind tracks supported: v5 preview (Tailwind v4) and v4 stable (Tailwind v3)." },
  "expo-57": { title: "Expo SDK 57", description: "Set up AniUI on Expo SDK 57 (React Native 0.86, Reanimated ~4.5, worklets ~0.10). Uniwind default or NativeWind v4/v5." },
  "expo-58": { title: "Expo SDK 58", description: "Set up AniUI on Expo SDK 58 (RN 0.88, Reanimated ~4.7, Node 22.13+, iPhone Duo ready via expo-hinge)." },
  cli: { title: "CLI", description: "Use @aniui/cli to initialize projects, add components, add blocks, set themes, and sync existing installs." },
  mcp: { title: "MCP Server", description: "Give Cursor, Claude Code, and Windsurf direct access to AniUI's 150 components, 15 blocks, and theme tokens via the Model Context Protocol." },
  javascript: { title: "JavaScript (non-TypeScript) setup", description: "Use AniUI in a plain JavaScript React Native project without TypeScript — the CLI strips types on install." },
  android: { title: "Android setup notes", description: "Android-specific setup for AniUI components — gesture handler, elevation, and ripple feedback." },
  changelog: { title: "Changelog", description: "What changed in each AniUI release — new components, breaking changes, and fixes." },
  uniwind: { title: "Uniwind", description: "Use AniUI with Uniwind — the Tailwind v4, CSS-first styling engine from the Unistyles team. Primary styling engine, ~2–3× faster than NativeWind." },
  "shadcn-registry": { title: "Shadcn-compatible registry", description: "Install any AniUI component with the shadcn CLI: npx shadcn@latest add https://aniui.dev/r/button.json. No AniUI CLI required." },
  "date-and-time-picker": { title: "DateAndTimePicker", description: "Calendar + scroll-wheel time picker for React Native. Combines AniUI's DatePicker and TimePicker into a single screen. Installed via aniui add time-picker." },
  roadmap: { title: "Roadmap", description: "What's next for AniUI — upcoming components, blocks, SDK support, and agent-native features." },
};

const BASE_URL = "https://aniui.dev";

function listDirs(dir) {
  try {
    return fs
      .readdirSync(dir)
      .filter((name) => {
        if (name.startsWith("(") || name.startsWith("[") || name.startsWith(".")) return false;
        try {
          return fs.statSync(path.join(dir, name)).isDirectory();
        } catch {
          return false;
        }
      })
      .sort();
  } catch {
    return [];
  }
}

function hasMetadata(file) {
  if (!fs.existsSync(file)) return false;
  return /\bexport\s+(const|async\s+function)\s+(metadata|generateMetadata)\b/.test(
    fs.readFileSync(file, "utf8")
  );
}

function isClientComponent(src) {
  // Leading "use client" / 'use client' with optional semicolon, as the first
  // non-trivia line.
  const trimmed = src.replace(/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|\s)*/, "");
  return /^(["'])use client\1\s*;?/.test(trimmed);
}

function metadataBlock({ title, description, canonical }) {
  const t = JSON.stringify(title);
  const d = JSON.stringify(description);
  const c = JSON.stringify(canonical);
  const absUrl = JSON.stringify(`${BASE_URL}${canonical}`);
  return (
    `import type { Metadata } from "next";\n\n` +
    `export const metadata: Metadata = {\n` +
    `  title: ${t},\n` +
    `  description: ${d},\n` +
    `  alternates: { canonical: ${c} },\n` +
    `  openGraph: { title: ${t}, description: ${d}, url: ${absUrl} },\n` +
    `  twitter: { title: ${t}, description: ${d} },\n` +
    `};\n\n`
  );
}

const CLIENT_LAYOUT_TEMPLATE = (meta) =>
  metadataBlock(meta) +
  `export default function Layout({ children }: { children: React.ReactNode }) {\n  return children;\n}\n`;

// Idempotent: if a prior (buggy) run prepended a metadata block above
// "use client", strip exactly that block before deciding what to do.
function stripLeadingMetadataBlockIfClient(file) {
  const src = fs.readFileSync(file, "utf8");
  // Pattern: starts with the exact import+metadata block we emit, followed by a
  // "use client" line.
  const rx = /^import type \{ Metadata \} from "next";\s*\n\s*export const metadata: Metadata = \{[\s\S]*?\};\s*\n+(?=["']use client["'])/;
  const next = src.replace(rx, "");
  if (next !== src) {
    fs.writeFileSync(file, next);
    return true;
  }
  return false;
}

function prependToServerPage(file, meta) {
  const src = fs.readFileSync(file, "utf8");
  if (hasMetadata(file)) return "skip-has-metadata";
  const block = metadataBlock(meta);
  const already = src.startsWith('import type { Metadata } from "next"');
  const next = already ? src.replace(/^import type \{ Metadata \} from "next";\n+/, block) : block + src;
  fs.writeFileSync(file, next);
  return "added-page";
}

function writeLayoutForClientPage(pageFile, meta) {
  const dir = path.dirname(pageFile);
  const layoutFile = path.join(dir, "layout.tsx");
  if (hasMetadata(layoutFile)) return "skip-layout-has-metadata";
  fs.writeFileSync(layoutFile, CLIENT_LAYOUT_TEMPLATE(meta));
  return "added-layout";
}

function processPage(pageFile, meta) {
  // First: undo any earlier bad prepend (metadata before "use client").
  stripLeadingMetadataBlockIfClient(pageFile);
  const src = fs.readFileSync(pageFile, "utf8");
  if (isClientComponent(src)) {
    return writeLayoutForClientPage(pageFile, meta);
  }
  return prependToServerPage(pageFile, meta);
}

let counts = { "added-page": 0, "added-layout": 0, "skip-has-metadata": 0, "skip-layout-has-metadata": 0, missing: 0 };

for (const slug of listDirs(path.join(DOCS_APP, "docs"))) {
  const file = path.join(DOCS_APP, "docs", slug, "page.tsx");
  if (!fs.existsSync(file)) continue;
  let meta;
  if (registry[slug]) {
    const entry = registry[slug];
    const item = itemByName[slug];
    meta = { title: (item && item.title) || entry.name, description: entry.description, canonical: `/docs/${slug}` };
  } else if (GUIDES[slug]) {
    meta = { ...GUIDES[slug], canonical: `/docs/${slug}` };
  } else {
    counts.missing++;
    console.log(`?  ${slug} (no registry entry, no guide)`);
    continue;
  }
  counts[processPage(file, meta)]++;
}

for (const slug of listDirs(path.join(DOCS_APP, "blocks"))) {
  const file = path.join(DOCS_APP, "blocks", slug, "page.tsx");
  if (!fs.existsSync(file)) continue;
  const item = itemByName[slug];
  if (!item) { counts.missing++; console.log(`?  blocks/${slug}`); continue; }
  counts[processPage(file, { title: item.title, description: item.description, canonical: `/blocks/${slug}` })]++;
}

for (const slug of listDirs(path.join(DOCS_APP, "charts", "(pages)"))) {
  const file = path.join(DOCS_APP, "charts", "(pages)", slug, "page.tsx");
  if (!fs.existsSync(file)) continue;
  const key = CHART_SLUG_TO_KEY[slug] || slug;
  const entry = registry[key];
  const item = itemByName[key];
  if (!entry) { counts.missing++; console.log(`?  charts/${slug}`); continue; }
  counts[processPage(file, { title: (item && item.title) || entry.name, description: entry.description, canonical: `/charts/${slug}` })]++;
}

console.log("\n" + JSON.stringify(counts, null, 2));

/**
 * build-registry.js — emit a shadcn-spec registry from AniUI's own source of truth.
 *
 * Reads cli/src/registry.ts + block-registry.ts (via the compiled dist/) and the
 * real component/block/util/theme files, and writes:
 *   docs/public/registry.json          (index)
 *   docs/public/r/<name>.json          (one shadcn registry-item per component/block/lib/theme)
 *
 * We emit the JSON ourselves — we never call `shadcn build` (see CLAUDE.md).
 * Run via `npm run registry:build` (which compiles dist first).
 */
const fs = require("fs");
const path = require("path");

const { registry, resolveRegistryDeps } = require("../dist/src/registry.js");
const { blockRegistry } = require("../dist/src/block-registry.js");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const OUT_DIR = path.join(REPO_ROOT, "docs", "public");
const R_DIR = path.join(OUT_DIR, "r");
const BASE = "https://aniui.dev";
const SCHEMA_ITEM = "https://ui.shadcn.com/schema/registry-item.json";
const SCHEMA_REG = "https://ui.shadcn.com/schema/registry.json";

const DOCS_MSG =
  "AniUI is React Native. On an existing RNR/NativeWind project, add and use directly — the tokens and aliases already match, no setup needed. On a fresh project, run `npx @aniui/cli init` first to configure NativeWind/Uniwind, theme tokens, and Metro/Babel.";

function read(rel) {
  const p = path.join(REPO_ROOT, rel);
  if (!fs.existsSync(p)) throw new Error(`Missing source file: ${rel}`);
  return fs.readFileSync(p, "utf8");
}
function url(name) {
  return `${BASE}/r/${name}.json`;
}

const items = []; // lightweight index entries
function writeItem(name, obj) {
  fs.writeFileSync(path.join(R_DIR, `${name}.json`), JSON.stringify(obj, null, 2) + "\n");
  items.push({ name: obj.name, type: obj.type, title: obj.title, description: obj.description });
}

// Parse a `:root { --x: v; }` style block from global.css into { x: v }.
function parseCssVars(css, selector) {
  const re = new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\{([^}]*)\\}");
  const m = css.match(re);
  const vars = {};
  if (m) {
    for (const line of m[1].split(";")) {
      const mm = line.match(/--([\w-]+):\s*(.+)/);
      if (mm) vars[mm[1]] = mm[2].trim();
    }
  }
  return vars;
}

// Fresh output dir (avoids stale items).
fs.rmSync(R_DIR, { recursive: true, force: true });
fs.mkdirSync(R_DIR, { recursive: true });

// 1. utils (registry:lib)
writeItem("utils", {
  $schema: SCHEMA_ITEM,
  name: "utils",
  type: "registry:lib",
  title: "cn utility",
  description: "Tailwind class-merge helper (clsx + tailwind-merge).",
  dependencies: ["clsx", "tailwind-merge"],
  files: [{ path: "lib/utils.ts", type: "registry:lib", content: read("lib/utils.ts") }],
});

// 2. theme (registry:theme) — convenience only; aniui init is authoritative.
{
  const css = read("templates/global.css");
  const light = parseCssVars(css, ":root");
  const dark = parseCssVars(css, ".dark");
  const radius = light.radius;
  delete light.radius;
  delete dark.radius;
  writeItem("theme", {
    $schema: SCHEMA_ITEM,
    name: "theme",
    type: "registry:theme",
    title: "AniUI Theme",
    description:
      "AniUI light/dark color tokens and radius. Convenience only — `aniui init` is authoritative for full RN theme setup.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority", "nativewind"],
    cssVars: { theme: radius ? { radius } : {}, light, dark },
    docs: DOCS_MSG,
  });
}

// 3. components (registry:ui) — no target (→ consumer aliases.ui), no cssVars.
for (const [slug, entry] of Object.entries(registry)) {
  writeItem(slug, {
    $schema: SCHEMA_ITEM,
    name: slug,
    type: "registry:ui",
    title: entry.name,
    description: entry.description,
    dependencies: entry.dependencies,
    registryDependencies: [url("utils"), ...entry.registryDependencies.map(url)],
    files: [{ path: entry.file, type: "registry:ui", content: read(entry.file) }],
    docs: DOCS_MSG,
  });
}

// 4. blocks (registry:block) — explicit target; union npm deps of transitive components.
for (const [slug, block] of Object.entries(blockRegistry)) {
  const npm = new Set(["react-native-safe-area-context"]);
  for (const c of resolveRegistryDeps(block.components)) {
    const e = registry[c];
    if (e) e.dependencies.forEach((d) => npm.add(d));
  }
  writeItem(slug, {
    $schema: SCHEMA_ITEM,
    name: slug,
    type: "registry:block",
    title: block.name,
    description: block.description,
    dependencies: [...npm],
    registryDependencies: [url("utils"), ...block.components.map(url)],
    files: [{ path: block.file, type: "registry:block", target: `components/blocks/${slug}.tsx`, content: read(block.file) }],
    docs: `${DOCS_MSG} Blocks are full screens — move into your app/ route as needed.`,
  });
}

// 5. index (registry.json)
items.sort((a, b) => a.name.localeCompare(b.name));
fs.writeFileSync(
  path.join(OUT_DIR, "registry.json"),
  JSON.stringify({ $schema: SCHEMA_REG, name: "aniui", homepage: BASE, items }, null, 2) + "\n"
);

// 6. dependency-closure guard: every registryDependencies slug must be an emitted item.
const emitted = new Set(items.map((i) => i.name));
let broken = 0;
const checkDeps = (label, deps) => {
  for (const d of deps) if (!emitted.has(d)) { console.error(`  ! ${label} → unresolved registry dep: ${d}`); broken++; }
};
for (const [slug, entry] of Object.entries(registry)) checkDeps(slug, entry.registryDependencies);
for (const [slug, block] of Object.entries(blockRegistry)) checkDeps(slug, block.components);

console.log(
  `Emitted ${items.length} items (${Object.keys(registry).length} components + ${Object.keys(blockRegistry).length} blocks + utils + theme) → docs/public/r/`
);
if (broken) {
  console.error(`FAILED: ${broken} unresolved registry dependency reference(s).`);
  process.exit(1);
}

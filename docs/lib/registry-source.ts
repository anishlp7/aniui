import fs from "fs";
import path from "path";

/**
 * Reads a component's real source straight from the shadcn-registry JSON
 * that `cli/scripts/build-registry.js` already generates from the actual
 * components/ui/*.tsx files (via `npm run registry:build`, wired into the
 * docs build as a `prebuild` step — see docs/package.json).
 *
 * Every doc page's "Source" section used to hand-copy this into its own
 * `const sourceCode = \`...\`` string, which nobody re-synced when the real
 * component changed — this is what let the Prompt Input docs describe a
 * touch-target value the component no longer used. Reading it here instead
 * means the Source section can never drift from the real file again.
 */
export function getComponentSource(slug: string): string {
  const jsonPath = path.join(process.cwd(), "public", "r", `${slug}.json`);
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const item = JSON.parse(raw) as { files: { path: string; content: string }[] };
  const file = item.files[0];
  if (!file) throw new Error(`registry item "${slug}" has no files`);
  return file.content;
}

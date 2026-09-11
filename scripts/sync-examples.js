#!/usr/bin/env node

/**
 * Sync examples — copy components/ui (the source of truth) and lib/utils.ts
 * into every example app's own components/ui and lib directories.
 *
 * There was previously no automated mechanism keeping the 8 example apps'
 * component mirrors in sync — someone had to remember to copy manually.
 * Run this after any change to a component under components/ui, or to
 * lib/utils.ts, and before publishing an Expo Snack from an example app.
 */
const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.join(__dirname, "..");
const SRC_COMPONENTS_DIR = path.join(REPO_ROOT, "components", "ui");
const SRC_UTILS_FILE = path.join(REPO_ROOT, "lib", "utils.ts");
const EXAMPLES_DIR = path.join(REPO_ROOT, "examples");

function main() {
  const examples = fs
    .readdirSync(EXAMPLES_DIR)
    .filter((f) => fs.statSync(path.join(EXAMPLES_DIR, f)).isDirectory());

  const componentFiles = fs.readdirSync(SRC_COMPONENTS_DIR).filter((f) => f.endsWith(".tsx"));
  const utilsContent = fs.readFileSync(SRC_UTILS_FILE, "utf-8");

  let filesWritten = 0;

  for (const example of examples) {
    const destComponentsDir = path.join(EXAMPLES_DIR, example, "components", "ui");
    const destLibDir = path.join(EXAMPLES_DIR, example, "lib");

    if (!fs.existsSync(destComponentsDir)) continue;

    for (const file of componentFiles) {
      fs.copyFileSync(path.join(SRC_COMPONENTS_DIR, file), path.join(destComponentsDir, file));
      filesWritten++;
    }

    if (fs.existsSync(destLibDir)) {
      fs.writeFileSync(path.join(destLibDir, "utils.ts"), utilsContent, "utf-8");
      filesWritten++;
    }

    console.log(`Synced ${componentFiles.length} components → examples/${example}/components/ui/`);
  }

  console.log(`\nDone — ${filesWritten} files written across ${examples.length} example apps.`);
}

main();

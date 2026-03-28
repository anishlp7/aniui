#!/usr/bin/env node

/**
 * Bundle Size Tracker
 * Reports file size and line count for each component.
 * Flags components over the 80-line limit (CLAUDE.md rule).
 */

const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.join(__dirname, "..", "components", "ui");
const LINE_LIMIT = 80;

function getStats(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").length;
  const bytes = Buffer.byteLength(content, "utf-8");
  return { lines, bytes };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function main() {
  const files = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .sort();

  let totalBytes = 0;
  let totalLines = 0;
  let overLimit = 0;

  console.log("");
  console.log("  Component Bundle Size Report");
  console.log("  " + "=".repeat(56));
  console.log(
    "  " +
      "Component".padEnd(28) +
      "Lines".padStart(8) +
      "Size".padStart(10) +
      "Status".padStart(10)
  );
  console.log("  " + "-".repeat(56));

  for (const file of files) {
    const filePath = path.join(COMPONENTS_DIR, file);
    const { lines, bytes } = getStats(filePath);
    const name = file.replace(".tsx", "");
    const status = lines > LINE_LIMIT ? "OVER" : "OK";

    if (lines > LINE_LIMIT) overLimit++;
    totalBytes += bytes;
    totalLines += lines;

    const statusStr = lines > LINE_LIMIT ? "\x1b[31mOVER\x1b[0m" : "\x1b[32mOK\x1b[0m";

    console.log(
      "  " +
        name.padEnd(28) +
        String(lines).padStart(8) +
        formatBytes(bytes).padStart(10) +
        statusStr.padStart(lines > LINE_LIMIT ? 16 : 14)
    );
  }

  console.log("  " + "-".repeat(56));
  console.log(
    "  " +
      `Total (${files.length} components)`.padEnd(28) +
      String(totalLines).padStart(8) +
      formatBytes(totalBytes).padStart(10)
  );
  console.log("");

  if (overLimit > 0) {
    console.log(
      `  \x1b[31m⚠ ${overLimit} component(s) exceed the ${LINE_LIMIT}-line limit\x1b[0m`
    );
    console.log("");
    process.exit(1);
  } else {
    console.log(
      `  \x1b[32m✓ All components within ${LINE_LIMIT}-line limit\x1b[0m`
    );
    console.log("");
  }
}

main();

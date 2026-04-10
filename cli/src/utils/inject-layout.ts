import path from "path";
import fs from "fs-extra";

const LAYOUT_CANDIDATES = [
  "app/_layout.tsx",
  "app/_layout.jsx",
  "App.tsx",
  "App.jsx",
];

/**
 * Finds the root layout file in the project.
 * Checks Expo Router layout first, then bare RN App entry.
 */
export function findLayoutFile(cwd: string): string | null {
  for (const candidate of LAYOUT_CANDIDATES) {
    const full = path.join(cwd, candidate);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

/**
 * Injects an import statement after the last existing import in the file.
 * Returns true if injected, false if already present or can't find insertion point.
 */
export function injectImport(filePath: string, importLine: string): boolean {
  const content = fs.readFileSync(filePath, "utf-8");

  // Check if import (or its key identifier) already exists
  // Extract the "from" part or the whole line for matching
  const fromMatch = importLine.match(/from\s+["']([^"']+)["']/);
  const cssMatch = importLine.match(/import\s+["']([^"']+)["']/);
  const needle = fromMatch?.[1] ?? cssMatch?.[1] ?? importLine;

  if (content.includes(needle)) {
    return false; // Already imported
  }

  const lines = content.split("\n");

  // Find the last import line index
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("import ")) {
      lastImportIdx = i;
    }
  }

  if (lastImportIdx === -1) {
    // No imports found — insert at line 0
    lastImportIdx = -1;
  }

  lines.splice(lastImportIdx + 1, 0, importLine);
  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
  return true;
}

/**
 * Injects a JSX element as a sibling before the outermost closing tag
 * in the file's default export return statement.
 * Returns true if injected, false if already present or can't find insertion point.
 */
export function injectJsxBeforeClose(filePath: string, jsx: string): boolean {
  const content = fs.readFileSync(filePath, "utf-8");

  // Check if JSX already exists
  const tag = jsx.replace(/\s*\/?>$/, "").replace(/^</, "");
  if (content.includes(`<${tag}`)) {
    return false; // Already present
  }

  const lines = content.split("\n");

  // Walk backwards to find the last closing JSX tag
  // We look for lines containing `</SomeTag>` or `</>`
  let insertIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    const trimmed = lines[i].trim();
    if (trimmed.match(/^<\/\w*>/) || trimmed === "</>") {
      insertIdx = i;
      break;
    }
  }

  if (insertIdx === -1) {
    return false; // Can't find safe insertion point
  }

  // Detect indentation of the closing tag and match it for the new JSX
  const closingLine = lines[insertIdx];
  const indent = closingLine.match(/^(\s*)/)?.[1] ?? "      ";
  lines.splice(insertIdx, 0, `${indent}${jsx}`);

  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
  return true;
}

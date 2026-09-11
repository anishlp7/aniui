/**
 * check-component-rules.js — grep-based static checks over components/ui/*.tsx
 * for the forbidden patterns and touch-target rule documented in CLAUDE.md.
 *
 * Run via `npm run lint:components`. Exits non-zero on any violation so these
 * classes of bug (e.g. the 44dp-vs-48dp touch target regression) can't quietly
 * reappear in a new or edited component.
 */
const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const UI_DIR = path.join(REPO_ROOT, "components", "ui");

const SUB_48DP = /\b(h|w|min-h|min-w)-([1-9]|1[01])\b/;
const HAS_48DP_MIN = /\bmin-(h|w)-12\b/;
// A small visual Pressable can satisfy the 48dp rule via `hitSlop` instead of
// className size — expanding the tap target without changing layout/visual size.
const HAS_HITSLOP = /\bhitSlop=/;
const UNICODE_GLYPHS = ["✓", "✗", "×", "☰", "★", "✕", "✔"];

let violations = [];

function checkFile(file, rel) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");

  lines.forEach((line, i) => {
    const lineNo = i + 1;

    if (/\bStyleSheet\.create\s*\(/.test(line)) {
      violations.push({ rel, lineNo, rule: "no-stylesheet-create", detail: line.trim() });
    }

    if (/^\s*export default\b/.test(line)) {
      violations.push({ rel, lineNo, rule: "no-default-export", detail: line.trim() });
    }

    // Touch-target: only applies to actual <Pressable> elements (CLAUDE.md's
    // rule is scoped to Pressable, not every View — e.g. progress bars and
    // pagination dots are legitimately smaller than 48dp).
    if (/<Pressable\b/.test(line) && SUB_48DP.test(line) && !HAS_48DP_MIN.test(line) && !HAS_HITSLOP.test(line)) {
      violations.push({ rel, lineNo, rule: "sub-48dp-touch-target", detail: line.trim() });
    }

    // className passed to a lucide icon usage, e.g. <Plus className=...
    if (/<[A-Z][A-Za-z]*\s+[^>]*\bclassName=/.test(line) && /lucide/i.test(src)) {
      const iconLikely = /<(Plus|Minus|Check|X|ChevronDown|ChevronUp|ChevronLeft|ChevronRight|ArrowUp|ArrowDown|Search|Mic|Square)\b[^>]*className=/.test(
        line
      );
      if (iconLikely) {
        violations.push({ rel, lineNo, rule: "icon-classname", detail: line.trim() });
      }
    }

    for (const glyph of UNICODE_GLYPHS) {
      if (line.includes(`>${glyph}<`) || line.includes(`"${glyph}"`) || line.includes(`'${glyph}'`)) {
        violations.push({ rel, lineNo, rule: "unicode-glyph", detail: line.trim() });
      }
    }
  });
}

function main() {
  const files = fs.readdirSync(UI_DIR).filter((f) => f.endsWith(".tsx"));
  for (const f of files) {
    checkFile(path.join(UI_DIR, f), path.join("components", "ui", f));
  }

  if (violations.length === 0) {
    console.log(`check-component-rules: ${files.length} files checked, no violations.`);
    process.exit(0);
  }

  console.error(`check-component-rules: ${violations.length} violation(s) found:\n`);
  for (const v of violations) {
    console.error(`  ${v.rel}:${v.lineNo} [${v.rule}]\n    ${v.detail}`);
  }
  process.exit(1);
}

main();

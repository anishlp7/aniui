import path from "path";
import fs from "fs-extra";
import { registry, getComponentNames } from "../registry";
import { getPackageRoot } from "../utils/file-ops";

function buildComponentCatalog(): string {
  const lines: string[] = ["## Available AniUI Components\n"];

  const tiers: Record<number, string[]> = { 1: [], 2: [], 3: [] };

  for (const key of getComponentNames()) {
    const entry = registry[key];
    const basename = path.basename(entry.file, ".tsx");
    tiers[entry.tier].push(
      `- **${entry.name}** — \`import { ${entry.name} } from "@/components/ui/${basename}"\` — ${entry.description}`
    );
  }

  lines.push("### Tier 1 (no extra deps)");
  lines.push(...tiers[1], "");
  lines.push("### Tier 2 (needs react-native-reanimated)");
  lines.push(...tiers[2], "");
  lines.push("### Tier 3 (needs extra native packages)");
  lines.push(...tiers[3], "");

  return lines.join("\n");
}

async function readExampleComponent(filename: string): Promise<string> {
  const packageRoot = getPackageRoot();
  const filePath = path.join(packageRoot, "components", "ui", filename);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return `\`\`\`tsx\n// components/ui/${filename}\n${content}\`\`\``;
  } catch {
    return "";
  }
}

export async function buildSystemPrompt(): Promise<string> {
  const catalog = buildComponentCatalog();

  const examples = await Promise.all([
    readExampleComponent("button.tsx"),
    readExampleComponent("card.tsx"),
    readExampleComponent("input.tsx"),
  ]);

  let themeTokens = "";
  try {
    const packageRoot = getPackageRoot();
    const css = await fs.readFile(
      path.join(packageRoot, "templates", "global.css"),
      "utf-8"
    );
    themeTokens = `## Theme Tokens\n\nThe following CSS variables are available as Tailwind classes:\n- bg-background / text-foreground\n- bg-primary / text-primary-foreground\n- bg-secondary / text-secondary-foreground\n- bg-muted / text-muted-foreground\n- bg-accent / text-accent-foreground\n- bg-destructive / text-destructive-foreground\n- bg-card / text-card-foreground\n- border-border, bg-input, ring\n\nDark mode is automatic via .dark class.\n`;
  } catch {
    // Theme tokens unavailable
  }

  return `You are an expert React Native developer using AniUI — a shadcn/ui-style component library for React Native.

You generate complete, production-ready screen files using ONLY existing AniUI components.

## Rules
1. Output a single .tsx file with all imports at the top.
2. Import components from \`@/components/ui/{name}\`.
3. Import cn from \`@/lib/utils\` if needed.
4. Use SafeAreaView from react-native-safe-area-context as root wrapper.
5. Use ScrollView for scrollable content.
6. ALL styling via NativeWind className — NEVER use StyleSheet.create().
7. Named export for the screen function.
8. Always wrap text inside Pressable in <Text>.
9. Set accessibilityRole on interactive elements.
10. Use min-h-12 min-w-12 on all Pressable components for touch targets.
11. Strict TypeScript — no \`any\` types.
12. Only import components that exist in the catalog below.

${catalog}

${themeTokens}

## Example Components (for reference)

${examples.filter(Boolean).join("\n\n")}

## Output Format
Return ONLY the .tsx file content inside a single code block. No explanations before or after.`;
}

#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  registry,
  getComponentNames,
  checkCompat,
  resolveCompat,
  SUPPORTED_SDKS,
  SUPPORTED_ENGINES,
  SUPPORTED_ARCH,
  ENGINE_REQUIRES_ARCH,
} from "./registry-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// When compiled, __dirname is dist/ — go up 1 level to package root
const REPO_ROOT = path.resolve(__dirname, "..");

const server = new McpServer({
  name: "aniui",
  version: "0.1.0",
});

// --- Tools ---

server.tool("list_components", "List all AniUI components with names, descriptions, and tiers", {}, async () => {
  const components = Object.entries(registry).map(([key, entry]) => ({
    key,
    name: entry.name,
    description: entry.description,
    tier: entry.tier,
    dependencies: entry.dependencies,
  }));
  return { content: [{ type: "text", text: JSON.stringify(components, null, 2) }] };
});

server.tool(
  "get_component",
  "Get the full source code of an AniUI component",
  { name: z.string().describe("Component key (e.g. 'button', 'card', 'alert-dialog')") },
  async ({ name: componentName }) => {
    const entry = registry[componentName];
    if (!entry) {
      return { content: [{ type: "text", text: `Unknown component: ${componentName}. Available: ${getComponentNames().join(", ")}` }], isError: true };
    }
    try {
      const source = await fs.readFile(path.join(REPO_ROOT, entry.file), "utf-8");
      return { content: [{ type: "text", text: `// ${entry.file}\n${source}` }] };
    } catch {
      return { content: [{ type: "text", text: `Could not read ${entry.file}` }], isError: true };
    }
  }
);

server.tool(
  "get_component_usage",
  "Get import statement, props, and usage example for a component",
  { name: z.string().describe("Component key (e.g. 'button', 'tabs')") },
  async ({ name: componentName }) => {
    const entry = registry[componentName];
    if (!entry) {
      return { content: [{ type: "text", text: `Unknown component: ${componentName}` }], isError: true };
    }

    const basename = path.basename(entry.file, ".tsx");
    let source: string;
    try {
      source = await fs.readFile(path.join(REPO_ROOT, entry.file), "utf-8");
    } catch {
      return { content: [{ type: "text", text: `Could not read ${entry.file}` }], isError: true };
    }

    // Extract exported names
    const exportMatches = [...source.matchAll(/export\s+(?:function|interface)\s+(\w+)/g)];
    const exports = exportMatches.map((m) => m[1]);
    const functionExports = exportMatches
      .filter((m) => m[0].includes("function"))
      .map((m) => m[1]);

    // Extract cva variants
    const variantMatch = source.match(/variants:\s*\{([\s\S]*?)\},\s*defaultVariants/);
    let variants = "No cva variants (uses props for configuration)";
    if (variantMatch) {
      const variantKeys = [...variantMatch[1].matchAll(/(\w+):\s*\{/g)].map((m) => m[1]);
      const variantDetails: string[] = [];
      for (const key of variantKeys) {
        const keyRegex = new RegExp(`${key}:\\s*\\{([\\s\\S]*?)\\}`, "g");
        const keyMatch = keyRegex.exec(variantMatch[1]);
        if (keyMatch) {
          const options = [...keyMatch[1].matchAll(/(\w+):/g)].map((m) => m[1]);
          variantDetails.push(`${key}: ${options.join(", ")}`);
        }
      }
      variants = variantDetails.join("\n");
    }

    const importStatement = `import { ${functionExports.join(", ")} } from "@/components/ui/${basename}"`;

    const usage = [
      `## ${entry.name}`,
      `${entry.description}`,
      `Tier: ${entry.tier}`,
      ``,
      `### Import`,
      `\`\`\`tsx`,
      importStatement,
      `\`\`\``,
      ``,
      `### Variants`,
      variants,
      ``,
      `### Dependencies`,
      entry.dependencies.join(", "),
      ``,
      `### Exports`,
      exports.join(", "),
    ].join("\n");

    return { content: [{ type: "text", text: usage }] };
  }
);

server.tool(
  "search_components",
  "Search AniUI components by name, description, or keyword — returns matches ranked by relevance",
  { query: z.string().describe("Search term (e.g. 'modal', 'picker', 'chart', 'chat')") },
  async ({ query }) => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return { content: [{ type: "text", text: "Empty query — call list_components for everything." }], isError: true };
    }
    const scored = Object.entries(registry)
      .map(([key, entry]) => {
        const hay = `${key} ${entry.name} ${entry.description}`.toLowerCase();
        let score = 0;
        if (key === q || entry.name.toLowerCase() === q) score += 100;
        else if (key.includes(q) || entry.name.toLowerCase().includes(q)) score += 50;
        if (entry.description.toLowerCase().includes(q)) score += 10;
        for (const token of q.split(/\s+/)) {
          if (token && hay.includes(token)) score += 1;
        }
        return { key, entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((r) => ({ key: r.key, name: r.entry.name, description: r.entry.description, tier: r.entry.tier }));

    if (!scored.length) {
      return { content: [{ type: "text", text: `No components match "${query}". Try list_components.` }] };
    }
    return { content: [{ type: "text", text: JSON.stringify(scored, null, 2) }] };
  }
);

server.tool("list_blocks", "List all AniUI blocks (pre-built full-screen compositions)", {}, async () => {
  try {
    const files = (await fs.readdir(path.join(REPO_ROOT, "blocks")))
      .filter((f) => f.endsWith(".tsx"))
      .sort();
    const blocks = files.map((f) => ({
      key: path.basename(f, ".tsx"),
      file: `blocks/${f}`,
      registry: `https://aniui.dev/r/${path.basename(f, ".tsx")}.json`,
    }));
    return { content: [{ type: "text", text: JSON.stringify(blocks, null, 2) }] };
  } catch {
    return { content: [{ type: "text", text: "Could not read blocks directory" }], isError: true };
  }
});

server.tool(
  "get_block",
  "Get the full source code of an AniUI block (a pre-built screen)",
  { name: z.string().describe("Block key (e.g. 'login', 'chat', 'home', 'pricing')") },
  async ({ name }) => {
    const file = path.join(REPO_ROOT, "blocks", `${name}.tsx`);
    try {
      const source = await fs.readFile(file, "utf-8");
      return { content: [{ type: "text", text: `// blocks/${name}.tsx\n${source}` }] };
    } catch {
      return { content: [{ type: "text", text: `Unknown block: ${name}. Try list_blocks.` }], isError: true };
    }
  }
);

const THEME_PRESETS = {
  default: {
    light: { primary: "240 5.9% 10%", primaryForeground: "0 0% 98%" },
    dark: { primary: "0 0% 98%", primaryForeground: "240 5.9% 10%" },
  },
  blue: {
    light: { primary: "221.2 83.2% 53.3%", primaryForeground: "210 40% 98%" },
    dark: { primary: "217.2 91.2% 59.8%", primaryForeground: "222.2 47.4% 11.2%" },
  },
  green: {
    light: { primary: "142.1 76.2% 36.3%", primaryForeground: "355.7 100% 97.3%" },
    dark: { primary: "142.1 70.6% 45.3%", primaryForeground: "144.9 80.4% 10%" },
  },
  orange: {
    light: { primary: "24.6 95% 53.1%", primaryForeground: "60 9.1% 97.8%" },
    dark: { primary: "20.5 90.2% 48.2%", primaryForeground: "60 9.1% 97.8%" },
  },
  rose: {
    light: { primary: "346.8 77.2% 49.8%", primaryForeground: "355.7 100% 97.3%" },
    dark: { primary: "346.8 77.2% 49.8%", primaryForeground: "355.7 100% 97.3%" },
  },
} as const;

server.tool(
  "get_theme_preset",
  "Get the primary color HSL values (light + dark) for a built-in AniUI theme preset. Non-primary tokens are shared across presets — use get_theme_tokens for those.",
  { name: z.enum(["default", "blue", "green", "orange", "rose"]).describe("Preset name") },
  async ({ name }) => {
    const preset = THEME_PRESETS[name];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              preset: name,
              overrides: preset,
              applyWith: "Replace --primary and --primary-foreground in global.css :root (light) and .dark blocks with these HSL values. All other tokens stay as the base theme.",
              configureVia: "npx @aniui/cli theme " + name,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

server.tool("get_theme_tokens", "Get all AniUI theme CSS variables and their Tailwind class mappings", {}, async () => {
  let css: string;
  try {
    css = await fs.readFile(path.join(REPO_ROOT, "templates", "global.css"), "utf-8");
  } catch {
    return { content: [{ type: "text", text: "Could not read templates/global.css" }], isError: true };
  }

  const tokenMap = [
    { var: "--background", classes: "bg-background" },
    { var: "--foreground", classes: "text-foreground" },
    { var: "--card", classes: "bg-card" },
    { var: "--card-foreground", classes: "text-card-foreground" },
    { var: "--primary", classes: "bg-primary, text-primary-foreground" },
    { var: "--secondary", classes: "bg-secondary, text-secondary-foreground" },
    { var: "--muted", classes: "bg-muted, text-muted-foreground" },
    { var: "--accent", classes: "bg-accent, text-accent-foreground" },
    { var: "--destructive", classes: "bg-destructive, text-destructive-foreground" },
    { var: "--border", classes: "border-border" },
    { var: "--input", classes: "bg-input" },
    { var: "--ring", classes: "ring" },
  ];

  const result = [
    "# AniUI Theme Tokens",
    "",
    "Colors are HSL values defined in global.css. Use Tailwind classes:",
    "",
    ...tokenMap.map((t) => `- ${t.var} → ${t.classes}`),
    "",
    "## global.css",
    css,
  ].join("\n");

  return { content: [{ type: "text", text: result }] };
});

server.tool(
  "list_sdk_support",
  "Return AniUI's library-level compatibility matrix: supported Expo SDKs, styling engines, RN architectures, and engine-to-arch requirements.",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            supportedSdks: SUPPORTED_SDKS,
            supportedEngines: SUPPORTED_ENGINES,
            supportedArch: SUPPORTED_ARCH,
            engineRequiresArch: ENGINE_REQUIRES_ARCH,
            notes: [
              "Uniwind requires the New Architecture.",
              "NativeWind v4 (stable) and v5 (preview) both work on Old and New Arch.",
              "The AniUI CLI auto-detects the project's SDK and engine on `aniui init`.",
            ],
          },
          null,
          2
        ),
      },
    ],
  })
);

server.tool(
  "check_arch_compatibility",
  "Check whether an AniUI component fits a project's SDK / engine / architecture. Returns pass/warn/fail with reasons. Fields in the project context are optional — supply what you know.",
  {
    name: z.string().describe("Component key, e.g. 'bottom-sheet', 'skeleton'"),
    expoSdk: z.number().int().optional().describe("Project's Expo SDK major, e.g. 56"),
    engine: z.enum(["uniwind", "nativewind-v4", "nativewind-v5"]).optional(),
    arch: z.enum(["old", "new"]).optional(),
  },
  async ({ name, expoSdk, engine, arch }) => {
    const result = checkCompat(name, { expoSdk, engine, arch });
    const entry = registry[name];
    const compat = entry ? resolveCompat(entry) : null;
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              component: name,
              project: { expoSdk, engine, arch },
              componentSupports: compat,
              verdict: result.verdict,
              reasons: result.reasons,
            },
            null,
            2
          ),
        },
      ],
      isError: result.verdict === "fail",
    };
  }
);

// --- Resources ---

server.resource("registry", "aniui://registry", async (uri) => ({
  contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(registry, null, 2) }],
}));

server.resource("theme", "aniui://theme", async (uri) => {
  const css = await fs.readFile(path.join(REPO_ROOT, "templates", "global.css"), "utf-8");
  return { contents: [{ uri: uri.href, mimeType: "text/css", text: css }] };
});

server.resource("pattern", "aniui://pattern", async (uri) => {
  const pattern = `# AniUI Component Pattern

\`\`\`tsx
import React from "react";
import { View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const myVariants = cva("base-styles", {
  variants: { variant: { default: "..." }, size: { md: "..." } },
  defaultVariants: { variant: "default", size: "md" },
});

export interface MyComponentProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof myVariants> {
  className?: string;
}

export function MyComponent({ variant, size, className, ...props }: MyComponentProps) {
  return <View className={cn(myVariants({ variant, size }), className)} {...props} />;
}
\`\`\`

Rules:
- Named exports only (no default exports)
- className prop always supported
- ...props spread last
- accessibilityRole on interactive elements
- accessible={true} + min-h-12 min-w-12 on Pressable
- No StyleSheet.create — NativeWind className only
- Under 80 lines per component
- Strict TypeScript (no any)
`;
  return { contents: [{ uri: uri.href, mimeType: "text/markdown", text: pattern }] };
});

// --- Start ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);

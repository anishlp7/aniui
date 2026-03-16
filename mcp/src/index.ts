#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { registry, getComponentNames } from "./registry-data.js";

const REPO_ROOT = path.resolve(
  new URL(".", import.meta.url).pathname,
  "..",
  ".."
);

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

import path from "path";
import fs from "fs-extra";

export function getPackageRoot(): string {
  // Compiled path: dist/src/utils/file-ops.js → need 3 levels up to reach package root
  return path.resolve(__dirname, "..", "..", "..");
}

export async function copyComponent(
  componentFile: string,
  destDir: string,
  utilPath: string,
  tsx: boolean = true,
  options?: { uniwind?: boolean }
): Promise<string> {
  const packageRoot = getPackageRoot();
  const srcPath = path.join(packageRoot, componentFile);
  const fileName = path.basename(componentFile);

  if (!await fs.pathExists(srcPath)) {
    throw new Error(`Component source not found: ${srcPath}`);
  }

  await fs.ensureDir(destDir);

  let content = await fs.readFile(srcPath, "utf-8");

  // Adjust the import path for cn() utility
  const relativeUtil = getRelativeImportPath(destDir, utilPath);
  content = content.replace(/@\/lib\/utils/g, relativeUtil);

  // Rewrite cross-component imports: @/components/ui/foo → ./foo
  content = content.replace(/@\/components\/ui\//g, "./");

  // For Uniwind: transform semantic tokens to dark: variants
  if (options?.uniwind) {
    content = transformForUniwind(content);
  }

  // Strip TypeScript types if generating JavaScript
  if (!tsx) {
    content = stripTypes(content);
  }

  const destFileName = tsx ? fileName : fileName.replace(/\.tsx$/, ".jsx");
  const destPath = path.join(destDir, destFileName);

  await fs.writeFile(destPath, content, "utf-8");
  return destPath;
}

export async function copyTemplate(
  templateName: string,
  destPath: string,
  sdkGeneration?: "v4" | "v5"
): Promise<void> {
  const packageRoot = getPackageRoot();

  // Try versioned path first, fall back to root templates/
  let srcPath: string;
  if (sdkGeneration) {
    const versionedPath = path.join(packageRoot, "templates", sdkGeneration, templateName);
    if (await fs.pathExists(versionedPath)) {
      srcPath = versionedPath;
    } else {
      srcPath = path.join(packageRoot, "templates", templateName);
    }
  } else {
    srcPath = path.join(packageRoot, "templates", templateName);
  }

  if (!await fs.pathExists(srcPath)) {
    throw new Error(`Template not found: ${srcPath}`);
  }

  await fs.ensureDir(path.dirname(destPath));
  await fs.copy(srcPath, destPath);
}

export async function copyUtilFile(destPath: string, tsx: boolean = true): Promise<void> {
  const packageRoot = getPackageRoot();
  const srcPath = path.join(packageRoot, "lib", "utils.ts");

  if (!await fs.pathExists(srcPath)) {
    throw new Error(`Utility file not found: ${srcPath}`);
  }

  await fs.ensureDir(path.dirname(destPath));

  if (tsx) {
    await fs.copy(srcPath, destPath);
  } else {
    let content = await fs.readFile(srcPath, "utf-8");
    content = stripTypes(content);
    await fs.writeFile(destPath, content, "utf-8");
  }
}

/**
 * Strip TypeScript type annotations, interfaces, and generics from source code.
 * Produces valid JavaScript/JSX from AniUI's consistent .tsx component patterns.
 */
export function stripTypes(content: string): string {
  let result = content;

  // Remove "import type ..." statements entirely
  result = result.replace(/^import\s+type\s+[^;]+;\s*\n?/gm, "");

  // Remove ", type Foo" from mixed imports: import { X, type Y } from "z"
  result = result.replace(/,\s*type\s+[A-Z]\w+/g, "");
  // Remove "type Foo, " from mixed imports: import { type Y, X } from "z"
  result = result.replace(/\btype\s+[A-Z]\w+\s*,\s*/g, "");

  // Remove exported interface blocks (multi-line)
  result = result.replace(/^export\s+interface\s+\w+[\s\S]*?^\}\s*\n?/gm, "");

  // Remove exported type aliases (single line)
  result = result.replace(/^export\s+type\s+\w+\s*=\s*[^;]+;\s*\n?/gm, "");

  // Remove generic type parameters from functions: function Foo<T extends Bar>
  result = result.replace(/<(?:[A-Z]\w*(?:\s+extends\s+[^>]+)?(?:\s*,\s*[A-Z]\w*(?:\s+extends\s+[^>]+)?)*)>/g, "");

  // Remove type annotations from destructured params and variables
  // Handles: { foo, bar }: FooProps  →  { foo, bar }
  result = result.replace(/\}:\s*[A-Z]\w+(?:<[^>]*>)?/g, "}");
  // Handles: (param: Type)  →  (param)
  result = result.replace(/(\w)\s*:\s*(?:React\.(?:ReactNode|ComponentPropsWithoutRef|FC)|[A-Z]\w*(?:<[^>]*>)?(?:\s*\|\s*\w+(?:<[^>]*>)?)*(?:\[\])?)\s*(?=[,)\s=])/g, "$1");
  // Handles primitive type annotations: (x: string, y: number, z: boolean)
  result = result.replace(/(\w)\s*:\s*(?:string|number|boolean|undefined|null)(?:\[\])?\s*(?=[,)\s=])/g, "$1");
  // Handles: ?: optional type annotations
  result = result.replace(/(\w)\?:\s*[A-Za-z]\w*(?:<[^>]*>)?(?:\s*\|\s*\w+(?:<[^>]*>)?)*(?:\[\])?\s*(?=[,)\s=])/g, "$1");

  // Remove "as Type" casts
  result = result.replace(/\s+as\s+(?:const|[A-Z]\w*(?:<[^>]*>)?)/g, "");

  // Remove return type annotations: ): ReturnType {  →  ) {
  result = result.replace(/\):\s*[A-Z]\w*(?:<[^>]*>)?\s*\{/g, ") {");
  // Remove return type annotations for arrow functions: ): Type =>  →  ) =>
  result = result.replace(/\):\s*[A-Z]\w*(?:<[^>]*>)?\s*=>/g, ") =>");

  // Clean up empty imports: import { } from "foo"
  result = result.replace(/^import\s*\{\s*\}\s*from\s*[^;]+;\s*\n?/gm, "");

  // Clean up excessive blank lines
  result = result.replace(/\n{3,}/g, "\n\n");

  return result.trim() + "\n";
}

/**
 * Transform semantic color tokens to explicit dark: variants for Uniwind.
 * Uniwind resolves @theme values statically — CSS variable cascade doesn't work on native.
 * This maps e.g. "bg-background" → "bg-white dark:bg-zinc-950" so dark mode works.
 */
export function transformForUniwind(content: string): string {
  const tokenMap: Record<string, [string, string]> = {
    "background": ["white", "zinc-950"],
    "foreground": ["zinc-950", "zinc-50"],
    "card": ["white", "zinc-950"],
    "card-foreground": ["zinc-950", "zinc-50"],
    "primary": ["zinc-900", "zinc-50"],
    "primary-foreground": ["zinc-50", "zinc-900"],
    "secondary": ["zinc-100", "zinc-800"],
    "secondary-foreground": ["zinc-900", "zinc-50"],
    "muted": ["zinc-100", "zinc-800"],
    "muted-foreground": ["zinc-500", "zinc-400"],
    "accent": ["zinc-100", "zinc-800"],
    "accent-foreground": ["zinc-900", "zinc-50"],
    "destructive": ["red-500", "red-900"],
    "destructive-foreground": ["zinc-50", "zinc-50"],
    "border": ["zinc-200", "zinc-800"],
    "input": ["zinc-200", "zinc-800"],
    "ring": ["zinc-950", "zinc-300"],
  };
  const prefixes = ["bg", "text", "border", "ring", "divide", "outline", "shadow", "ring-offset", "from", "to", "via", "fill", "stroke", "caret", "accent", "placeholder"];

  let result = content;
  for (const [token, [light, dark]] of Object.entries(tokenMap)) {
    for (const prefix of prefixes) {
      const escaped = (s: string) => s.replace(/[.*+?${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(
        `((?:(?:hover|focus|active|disabled|focus-visible|focus-within|placeholder|group-hover|peer-focus|pressed|checked)[:])*)(${escaped(prefix)}-${escaped(token)})(\\/\\d+)?(?![-\\w])`,
        "g"
      );
      result = result.replace(regex, (_match, variants, _cls, opacity) => {
        const op = opacity || "";
        const v = variants || "";
        const darkV = v ? `dark:${v}` : "dark:";
        return `${v}${prefix}-${light}${op} ${darkV}${prefix}-${dark}${op}`;
      });
    }
  }
  return result;
}

function getRelativeImportPath(fromDir: string, toFile: string): string {
  let rel = path.relative(fromDir, toFile);
  // Remove .ts extension for import
  rel = rel.replace(/\.ts$/, "");
  // Ensure it starts with ./ or ../
  if (!rel.startsWith(".")) {
    rel = "./" + rel;
  }
  return rel;
}

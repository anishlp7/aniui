import path from "path";
import fs from "fs-extra";

export function getPackageRoot(): string {
  // Compiled path: dist/src/utils/file-ops.js → need 3 levels up to reach package root
  return path.resolve(__dirname, "..", "..", "..");
}

export async function copyComponent(
  componentFile: string,
  destDir: string,
  utilPath: string
): Promise<string> {
  const packageRoot = getPackageRoot();
  const srcPath = path.join(packageRoot, componentFile);
  const fileName = path.basename(componentFile);
  const destPath = path.join(destDir, fileName);

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

export async function copyUtilFile(destPath: string): Promise<void> {
  const packageRoot = getPackageRoot();
  const srcPath = path.join(packageRoot, "lib", "utils.ts");

  if (!await fs.pathExists(srcPath)) {
    throw new Error(`Utility file not found: ${srcPath}`);
  }

  await fs.ensureDir(path.dirname(destPath));
  await fs.copy(srcPath, destPath);
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

import path from "path";
import fs from "fs-extra";

export function getPackageRoot(): string {
  return path.resolve(__dirname, "..", "..");
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

  await fs.ensureDir(destDir);

  let content = await fs.readFile(srcPath, "utf-8");

  // Adjust the import path for cn() utility
  const relativeUtil = getRelativeImportPath(destDir, utilPath);
  content = content.replace(/@\/lib\/utils/g, relativeUtil);

  await fs.writeFile(destPath, content, "utf-8");
  return destPath;
}

export async function copyTemplate(
  templateName: string,
  destPath: string
): Promise<void> {
  const packageRoot = getPackageRoot();
  const srcPath = path.join(packageRoot, "templates", templateName);
  await fs.ensureDir(path.dirname(destPath));
  await fs.copy(srcPath, destPath);
}

export async function copyUtilFile(destPath: string): Promise<void> {
  const packageRoot = getPackageRoot();
  const srcPath = path.join(packageRoot, "lib", "utils.ts");
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

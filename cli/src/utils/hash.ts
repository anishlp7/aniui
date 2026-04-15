import { createHash } from "crypto";
import fs from "fs-extra";

export async function hashFile(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, "utf-8");
  return hashContent(content);
}

export function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex").slice(0, 8);
}

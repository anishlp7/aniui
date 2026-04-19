import path from "path";
import fs from "fs";

/**
 * Resolve the CLI's own package.json by walking up from __dirname.
 *
 * Why: TypeScript compiles src/commands/add.ts → dist/src/commands/add.js,
 * shifting __dirname one level deeper. A static require("../../package.json")
 * breaks in the compiled output. This walks up until it finds the real
 * @aniui/cli package.json, regardless of source or compiled context.
 */
export function getCliPackage(): { version: string; name: string } {
  let dir = __dirname;
  for (let i = 0; i < 5; i++) {
    const filePath = path.join(dir, "package.json");
    if (fs.existsSync(filePath)) {
      const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (json.name === "@aniui/cli") return json;
    }
    dir = path.dirname(dir);
  }
  return { version: "0.0.0", name: "@aniui/cli" };
}

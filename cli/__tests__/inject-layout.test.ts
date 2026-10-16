import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  findLayoutFile,
  injectImport,
  injectJsxBeforeClose,
} from "../src/utils/inject-layout";
import fs from "fs-extra";
import { tmpdir } from "os";
import path from "path";

let tmpRoot: string;

beforeEach(async () => {
  tmpRoot = await fs.mkdtemp(path.join(tmpdir(), "aniui-inject-"));
});

afterEach(async () => {
  await fs.remove(tmpRoot);
});

describe("findLayoutFile", () => {
  it("finds app/_layout.tsx (Expo Router default) first", async () => {
    await fs.ensureDir(path.join(tmpRoot, "app"));
    await fs.writeFile(path.join(tmpRoot, "app", "_layout.tsx"), "");
    await fs.writeFile(path.join(tmpRoot, "App.tsx"), "");
    const found = findLayoutFile(tmpRoot);
    expect(found).toBe(path.join(tmpRoot, "app", "_layout.tsx"));
  });

  it("falls back to App.tsx when no Expo Router layout is present", async () => {
    await fs.writeFile(path.join(tmpRoot, "App.tsx"), "");
    const found = findLayoutFile(tmpRoot);
    expect(found).toBe(path.join(tmpRoot, "App.tsx"));
  });

  it("returns null when no layout file exists", () => {
    expect(findLayoutFile(tmpRoot)).toBe(null);
  });
});

describe("injectImport", () => {
  it("adds a new import after the last existing one", async () => {
    const file = path.join(tmpRoot, "x.tsx");
    await fs.writeFile(file, `import { View } from "react-native";\nimport X from "y";\n\nexport default function App() {}\n`);
    const injected = injectImport(file, `import "./global.css";`);
    expect(injected).toBe(true);
    const content = await fs.readFile(file, "utf-8");
    expect(content).toContain(`import "./global.css"`);
    expect(content.indexOf(`global.css`)).toBeGreaterThan(content.indexOf(`import X from`));
  });

  it("is idempotent when the specifier already appears", async () => {
    const file = path.join(tmpRoot, "x.tsx");
    await fs.writeFile(file, `import "./global.css";\nexport default function App() {}\n`);
    expect(injectImport(file, `import "./global.css";`)).toBe(false);
  });

  it("recognizes an existing 'from X' import via its specifier", async () => {
    const file = path.join(tmpRoot, "x.tsx");
    await fs.writeFile(file, `import { Foo } from "foo";\nexport default function App() {}\n`);
    expect(injectImport(file, `import { Bar } from "foo";`)).toBe(false);
  });
});

describe("injectJsxBeforeClose", () => {
  it("adds a sibling before the outermost closing JSX tag", async () => {
    const file = path.join(tmpRoot, "x.tsx");
    await fs.writeFile(
      file,
      `export default function App() {\n  return (\n    <View>\n      <Child />\n    </View>\n  );\n}\n`
    );
    const injected = injectJsxBeforeClose(file, "<PortalHost />");
    expect(injected).toBe(true);
    const content = await fs.readFile(file, "utf-8");
    expect(content).toContain("<PortalHost />");
    expect(content.indexOf("<PortalHost />")).toBeLessThan(content.indexOf("</View>"));
  });

  it("is idempotent when the tag is already present", async () => {
    const file = path.join(tmpRoot, "x.tsx");
    await fs.writeFile(
      file,
      `export default function App() {\n  return (\n    <View>\n      <PortalHost />\n    </View>\n  );\n}\n`
    );
    expect(injectJsxBeforeClose(file, "<PortalHost />")).toBe(false);
  });

  it("handles React fragments (</>) as a closing tag", async () => {
    const file = path.join(tmpRoot, "x.tsx");
    await fs.writeFile(
      file,
      `export default function App() {\n  return (\n    <>\n      <Child />\n    </>\n  );\n}\n`
    );
    expect(injectJsxBeforeClose(file, "<PortalHost />")).toBe(true);
  });
});

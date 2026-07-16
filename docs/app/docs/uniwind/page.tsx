import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block-server";
import { PackageManagerTabs } from "@/components/package-manager-tabs";

const metroCode = `const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, { cssEntryFile: "./global.css" });`;
const globalCssCode = `@import "tailwindcss";
@import "uniwind";

@theme {
  --radius: 0.5rem;
}

@layer theme {
  :root {
    @variant light {
      --color-background: hsl(0 0% 100%);
      --color-foreground: hsl(240 10% 3.9%);
      --color-primary: hsl(240 5.9% 10%);
      /* ...remaining tokens */
    }
    @variant dark {
      --color-background: hsl(240 10% 3.9%);
      --color-foreground: hsl(0 0% 98%);
      --color-primary: hsl(0 0% 98%);
      /* ...remaining tokens */
    }
  }
}`;

export default function UniwindPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Uniwind (Recommended)</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Uniwind is the recommended styling engine for AniUI — same components, same className API, but
          ~2–3× faster than NativeWind, Tailwind v4 CSS-first, and no Babel transform. NativeWind remains
          fully supported. Uniwind requires React 19, Tailwind v4, and the New Architecture (Expo SDK 55+).
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Quick Start</Heading>
        <p className="text-sm text-muted-foreground">
          Initialize AniUI with the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--style uniwind</code> flag:
        </p>
        <PackageManagerTabs commands={{
          npm: "npx @aniui/cli init --style uniwind",
          pnpm: "pnpm dlx @aniui/cli init --style uniwind",
          yarn: "yarn dlx @aniui/cli init --style uniwind",
          bun: "bunx @aniui/cli init --style uniwind",
        }} />
        <p className="text-sm text-muted-foreground">
          The CLI auto-detects Uniwind in your dependencies and generates the correct config files.
          You can also select it from the interactive prompt during <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">init</code>.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Key Differences</Heading>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium text-foreground">Aspect</th>
                <th className="text-left py-3 pr-4 font-medium text-foreground">NativeWind</th>
                <th className="text-left py-3 font-medium text-foreground">Uniwind</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium text-foreground">Metro wrapper</td>
                <td className="py-3 pr-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withNativeWind</code></td>
                <td className="py-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withUniwindConfig</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium text-foreground">Theme config</td>
                <td className="py-3 pr-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tailwind.config.js</code> (v4) or CSS <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> (v5)</td>
                <td className="py-3">CSS-first <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> / <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@variant</code> — no <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tailwind.config.js</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium text-foreground">Babel config</td>
                <td className="py-3 pr-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource: &quot;nativewind&quot;</code></td>
                <td className="py-3">Not needed</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium text-foreground">rem base</td>
                <td className="py-3 pr-4">14px</td>
                <td className="py-3">16px (web standard)</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium text-foreground">className API</td>
                <td className="py-3 pr-4">Identical</td>
                <td className="py-3">Identical</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">Component source</td>
                <td className="py-3 pr-4">Same files</td>
                <td className="py-3">Same files</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">rem Unit Difference</Heading>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            NativeWind uses <strong className="text-foreground">14px</strong> as its rem base (matching React Native&apos;s default font size),
            while Uniwind uses <strong className="text-foreground">16px</strong> (the web standard). This means components may appear
            ~14% larger with Uniwind. Both look great — it&apos;s a matter of preference.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Metro Config</Heading>
        <CodeBlock code={metroCode} title="metro.config.js" />
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Global CSS (CSS-first theme)</Heading>
        <CodeBlock code={globalCssCode} title="global.css" />
        <p className="text-sm text-muted-foreground">
          Uniwind is Tailwind v4 CSS-first — there is <strong className="text-foreground">no tailwind.config.js</strong>.
          Theme tokens live in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@layer theme</code> with{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@variant light</code>/<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">dark</code> blocks.
          Uniwind also generates <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">uniwind-types.d.ts</code> automatically when Metro runs.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Example App</Heading>
        <p className="text-sm text-muted-foreground">
          A full working Uniwind example on Expo SDK 57 is available at{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">examples/expo-57-starter/</code> in the repository
          (a second SDK 57 showcase lives at <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">examples/with-uniwind/</code>).
        </p>
        <CodeBlock code={`cd examples/expo-57-starter\nnpm install\nnpx expo start`} title="Run the example" />
      </div>
    </div>
  );
}

import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block-server";
import { PackageManagerTabs } from "@/components/package-manager-tabs";

const initCode = `npx @aniui/cli init --style uniwind`;
const metroCode = `const { getDefaultConfig } = require("expo/metro-config");
const { withUniwind } = require("uniwind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withUniwind(config, { input: "./global.css" });`;
const tailwindCode = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("uniwind/preset")],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        // ... same theme tokens as NativeWind
      },
    },
  },
};`;

export default function UniwindPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Uniwind Compatibility</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          AniUI works with both NativeWind and Uniwind. Same components, same className API — different styling engine.
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
                <td className="py-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withUniwind</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-4 font-medium text-foreground">Tailwind preset</td>
                <td className="py-3 pr-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind/preset</code></td>
                <td className="py-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">uniwind/preset</code></td>
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Tailwind Config</Heading>
        <CodeBlock code={tailwindCode} title="tailwind.config.js" />
        <p className="text-sm text-muted-foreground">
          Theme tokens are identical — only the preset changes from <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind/preset</code> to{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">uniwind/preset</code>.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Example App</Heading>
        <p className="text-sm text-muted-foreground">
          A full working Uniwind example is available at{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">examples/with-uniwind/</code> in the repository.
        </p>
        <CodeBlock code={`cd examples/with-uniwind\nnpm install\nnpx expo start`} title="Run the example" />
      </div>
    </div>
  );
}

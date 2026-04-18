import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block";

export default function JavaScriptPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">JavaScript</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          How to use AniUI components in JavaScript projects.
        </p>
      </div>
      <div className="space-y-6 text-foreground leading-7">
        <div className="rounded-lg border border-border bg-secondary/30 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">We recommend TypeScript.</strong>{" "}
            TypeScript gives you type-safe props, variant inference via{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">cva</code> +{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">VariantProps</code>,
            and better autocomplete in your editor. AniUI components are authored and maintained in TypeScript.
          </p>
        </div>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Using JavaScript</Heading>
        <p className="text-muted-foreground">
          For teams that prefer JavaScript, AniUI supports it via the CLI. During{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">npx @aniui/cli init</code>,
          select <strong>&quot;No&quot;</strong> when asked <em>&quot;Would you like to use TypeScript?&quot;</em>
        </p>
        <CodeBlock
          code={`$ npx @aniui/cli init

✔ Detected Expo project
✔ Where should components be installed? components/ui
✔ Where should the utility file go? lib/utils.js
✔ Choose a theme preset: Default (neutral)
✔ Would you like to use TypeScript? No

ℹ Components will be generated as .jsx files with types stripped automatically.`}
        />

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">How It Works</Heading>
        <p className="text-muted-foreground">
          AniUI maintains one source of truth — TypeScript (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">.tsx</code>) files.
          When <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tsx: false</code> is set
          in your config, running{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx @aniui/cli add button</code>{" "}
          automatically strips type annotations, interfaces, and generics — outputting clean{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">.jsx</code> files.
          The component logic and styling remain identical.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Configuration</Heading>
        <p className="text-muted-foreground">
          The init command creates a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">.aniui.json</code> file
          in your project root:
        </p>
        <CodeBlock
          title=".aniui.json"
          code={`{
  "componentsDir": "components/ui",
  "utilPath": "lib/utils.js",
  "theme": "default",
  "tsx": false
}`}
        />
        <p className="text-muted-foreground">
          You can also manually edit this file to switch between TypeScript and JavaScript at any time.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Path Aliases</Heading>
        <p className="text-muted-foreground">
          For path alias support in JavaScript projects, add a{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsconfig.json</code> to your project root:
        </p>
        <CodeBlock
          title="jsconfig.json"
          code={`{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}
        />

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Switching to TypeScript</Heading>
        <p className="text-muted-foreground">
          To switch from JavaScript to TypeScript later:
        </p>
        <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
          <li>Change <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;tsx&quot;: true</code> in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">.aniui.json</code></li>
          <li>Delete the existing <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">.jsx</code> component files</li>
          <li>Re-run <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx @aniui/cli add button card text</code> to get the TypeScript versions</li>
        </ol>
      </div>
    </div>
  );
}

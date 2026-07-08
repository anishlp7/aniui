import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block-server";

const registriesConfig = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
    "@aniui": "https://aniui.dev/r/{name}.json"
  }
}`;

const shadcnAdd = `# after adding @aniui to components.json
npx shadcn@latest add @aniui/button
npx shadcn@latest add @aniui/card      # auto-pulls @aniui/text + utils
npx shadcn@latest add @aniui/login     # a block — lands in components/blocks/`;

const rnrAdd = `# React Native Reusables CLI — install by full URL
npx @react-native-reusables/cli@latest add https://aniui.dev/r/button.json
npx @react-native-reusables/cli@latest add https://aniui.dev/r/card.json`;

const rawUrl = `# any shadcn-compatible CLI can install by raw URL
npx shadcn@latest add https://aniui.dev/r/button.json`;

const freshInit = `# fresh / bare project — set up native config + tokens once
npx @aniui/cli init
# then add from the registry as above (shadcn or RNR CLI)`;

const componentsJson = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "tsx": true,
  "rsc": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "global.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "components",
    "ui": "components/ui",
    "lib": "lib",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@aniui": "https://aniui.dev/r/{name}.json"
  }
}`;

export default function ShadcnRegistryPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">shadcn / RNR Registry</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          The full AniUI catalog is published as a shadcn-compatible registry at{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">https://aniui.dev/r</code>. Install any
          component with the <strong className="text-foreground">shadcn CLI</strong> or the{" "}
          <strong className="text-foreground">React Native Reusables (RNR) CLI</strong> — everything stays hosted under
          AniUI, so you always get the source straight from us.
        </p>
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
        <p className="text-sm text-foreground">
          <strong>Already on RNR or a configured NativeWind/Uniwind project? One step.</strong> AniUI uses the same theme
          tokens (<code className="rounded bg-secondary px-1 py-0.5 text-xs font-mono">background</code>,{" "}
          <code className="rounded bg-secondary px-1 py-0.5 text-xs font-mono">foreground</code>,{" "}
          <code className="rounded bg-secondary px-1 py-0.5 text-xs font-mono">primary</code>…) and the same{" "}
          <code className="rounded bg-secondary px-1 py-0.5 text-xs font-mono">ui</code>/
          <code className="rounded bg-secondary px-1 py-0.5 text-xs font-mono">lib</code> aliases you already have — so a
          component drops in and renders immediately. No extra setup.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Add the @aniui namespace (shadcn CLI)</Heading>
        <p className="text-sm text-muted-foreground">Register the namespace once in your <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">components.json</code>:</p>
        <CodeBlock code={registriesConfig} title="components.json" />
        <p className="text-sm text-muted-foreground">Then add components by name. Registry dependencies (like <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">utils</code> and sibling components) resolve automatically:</p>
        <CodeBlock code={shadcnAdd} title="terminal" />
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Install with the RNR CLI</Heading>
        <p className="text-sm text-muted-foreground">
          The React Native Reusables CLI installs any registry item by <strong className="text-foreground">full URL</strong>{" "}
          (it doesn&apos;t use namespaces). Point it straight at an AniUI item — transitive dependencies are fetched from
          their URLs:
        </p>
        <CodeBlock code={rnrAdd} title="terminal" />
        <p className="text-sm text-muted-foreground">The raw-URL form also works with the shadcn CLI, no <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">components.json</code> registry entry required:</p>
        <CodeBlock code={rawUrl} title="terminal" />
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Fresh project</Heading>
        <p className="text-sm text-muted-foreground">
          On a brand-new app that isn&apos;t set up for NativeWind/Uniwind yet, the CLIs copy source but can&apos;t wire
          Metro/Babel/Tailwind. Run AniUI&apos;s init once to configure everything, then add from the registry:
        </p>
        <CodeBlock code={freshInit} title="terminal" />
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">React Native components.json</Heading>
        <p className="text-sm text-muted-foreground">
          If you set up <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">components.json</code> by
          hand, this is the React-Native-appropriate shape (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">rsc: false</code>, RN aliases):
        </p>
        <CodeBlock code={componentsJson} title="components.json" />
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Which CLI should I use?</Heading>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li><strong className="text-foreground">aniui CLI</strong> — full experience: project init, theming, blocks, and the MCP server. Best for AniUI-first projects.</li>
          <li><strong className="text-foreground">shadcn CLI (@aniui)</strong> — drop-in for existing shadcn/RN projects that already use namespaced registries.</li>
          <li><strong className="text-foreground">RNR CLI (by URL)</strong> — already on React Native Reusables? Pull any AniUI component by URL alongside your existing components.</li>
        </ul>
      </div>
    </div>
  );
}

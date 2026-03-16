import { CodeBlock } from "@/components/code-block";

export default function CLIPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">CLI</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Use the AniUI CLI to initialize your project, add components, and more.
        </p>
      </div>

      <div className="space-y-6 text-foreground leading-7">
        <h2 className="text-2xl font-semibold tracking-tight">init</h2>
        <p className="text-muted-foreground">
          Initialize AniUI in your React Native project. Sets up the utility helper,
          global CSS theme, and Tailwind config.
        </p>
        <CodeBlock code="npx aniui init" />
        <p className="text-muted-foreground">
          The init command will:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Detect your project type (Expo or bare React Native)</li>
          <li>Check that NativeWind is installed</li>
          <li>Prompt for component directory path (default: <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">components/ui</code>)</li>
          <li>Prompt for utility path (default: <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">lib/utils.ts</code>)</li>
          <li>Prompt for a theme preset</li>
          <li>Copy <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">lib/utils.ts</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">global.css</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">tailwind.config.js</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">nativewind-env.d.ts</code></li>
        </ul>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">add</h2>
        <p className="text-muted-foreground">
          Add components to your project. Components are copied as source files — you own the code.
        </p>
        <CodeBlock code="npx aniui add [component...]" />
        <p className="text-muted-foreground">Examples:</p>
        <CodeBlock
          code={`# Add a single component
npx aniui add button

# Add multiple components
npx aniui add button text input card

# Add a component with dependencies (auto-resolved)
npx aniui add select
# → also adds bottom-sheet (registry dependency)`}
        />
        <p className="text-muted-foreground">
          If a component needs extra npm packages (e.g. <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">react-native-reanimated</code> for
          Tier 2 components), the CLI will print the install command for you.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">theme</h2>
        <p className="text-muted-foreground">
          Switch between theme presets. Updates the CSS variables in your <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">global.css</code>.
        </p>
        <CodeBlock code="npx aniui theme" />
        <p className="text-muted-foreground">
          Available presets: <strong>Default</strong> (neutral), <strong>Blue</strong>, <strong>Green</strong>, <strong>Orange</strong>, <strong>Rose</strong>.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">generate</h2>
        <p className="text-muted-foreground">
          Generate a complete screen using AI. Requires the <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">ANTHROPIC_API_KEY</code> environment variable.
        </p>
        <CodeBlock
          code={`# Generate a screen from a description
npx aniui generate "login page with email and password"

# Specify output path
npx aniui generate "settings page" -o app/settings.tsx`}
        />
        <p className="text-muted-foreground">
          The AI knows the full AniUI component catalog and generates screens using only
          existing components with proper imports and NativeWind styling.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">mcp</h2>
        <p className="text-muted-foreground">
          Print the MCP server configuration for AI tools like Claude Desktop or Cursor.
        </p>
        <CodeBlock code="npx aniui mcp" />
        <p className="text-muted-foreground">
          This outputs a JSON config block you can paste into your AI tool&apos;s MCP settings.
          The MCP server exposes component registry data, source code, usage patterns, and theme tokens.
        </p>
      </div>
    </div>
  );
}

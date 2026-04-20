import { Heading } from "@/components/heading";
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight">init</Heading>
        <p className="text-muted-foreground">
          Initialize AniUI in your React Native project. Sets up the utility helper,
          global CSS theme, and Tailwind config.
        </p>
        <CodeBlock code="npx @aniui/cli init" />
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

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">add</Heading>
        <p className="text-muted-foreground">
          Add components to your project. Components are copied as source files — you own the code.
        </p>
        <CodeBlock code="npx @aniui/cli add [component...]" />
        <p className="text-muted-foreground">Examples:</p>
        <CodeBlock
          code={`# Add a single component
npx @aniui/cli add button

# Add multiple components
npx @aniui/cli add button text input card

# Add a component with dependencies (auto-resolved)
npx @aniui/cli add select
# → also adds bottom-sheet (registry dependency)`}
        />
        <p className="text-muted-foreground">
          If a component needs extra npm packages (e.g. <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">react-native-reanimated</code> for
          Tier 2 components), the CLI will print the install command for you.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">add-block</Heading>
        <p className="text-muted-foreground">
          Add pre-built screen templates (blocks) to your project. Blocks are full screens composed of AniUI components — login, settings, profile, chat, onboarding, and more.
        </p>
        <CodeBlock code="npx @aniui/cli add-block [block...]" />
        <p className="text-muted-foreground">Examples:</p>
        <CodeBlock
          code={`# Add a single block
npx @aniui/cli add-block login

# Add multiple blocks
npx @aniui/cli add-block signup forgot-password

# All blocks auto-resolve their component dependencies`}
        />
        <p className="text-muted-foreground">
          Available blocks: login, signup, forgot-password, home, bottom-tabs, drawer-nav, profile, settings, onboarding, chat, product-list, product-detail, notifications, pricing, search.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">theme</Heading>
        <p className="text-muted-foreground">
          Switch between theme presets. Updates the CSS variables in your <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">global.css</code>.
        </p>
        <CodeBlock code="npx @aniui/cli theme" />
        <p className="text-muted-foreground">
          Available presets: <strong>Default</strong> (neutral), <strong>Blue</strong>, <strong>Green</strong>, <strong>Orange</strong>, <strong>Rose</strong>.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">generate</Heading>
        <p className="text-muted-foreground">
          Generate a complete screen using AI. Requires the <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">ANTHROPIC_API_KEY</code> environment variable.
        </p>
        <CodeBlock
          code={`# Generate a screen from a description
npx @aniui/cli generate "login page with email and password"

# Specify output path
npx @aniui/cli generate "settings page" -o app/settings.tsx`}
        />
        <p className="text-muted-foreground">
          The AI knows the full AniUI component catalog and generates screens using only
          existing components with proper imports and NativeWind styling.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">mcp</Heading>
        <p className="text-muted-foreground">
          Print the MCP server configuration for AI tools like Claude Desktop or Cursor.
        </p>
        <CodeBlock code="npx @aniui/cli mcp" />
        <p className="text-muted-foreground">
          This outputs a JSON config block you can paste into your AI tool&apos;s MCP settings.
          The MCP server exposes component registry data, source code, usage patterns, and theme tokens.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">doctor</Heading>
        <p className="text-muted-foreground">
          Check your project setup for common issues. Verifies AniUI config, NativeWind installation, theme tokens, Tailwind config, and more.
        </p>
        <CodeBlock code="npx @aniui/cli doctor" />
        <p className="text-muted-foreground">
          Useful for debugging when components don&apos;t render correctly or styles aren&apos;t applied. The doctor reports what&apos;s missing and suggests fixes.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">status</Heading>
        <p className="text-muted-foreground">
          Show installed components and available updates. Reports a table with component name, installed version, latest version, local modification state, and update status.
        </p>
        <CodeBlock code="npx @aniui/cli status" />
        <p className="text-muted-foreground">
          Status indicators: <strong>current</strong> (up to date), <strong>update available</strong>, <strong>modified</strong> (local changes detected), <strong>not installed</strong>. Local modifications are detected via SHA-256 hash comparison against the version you installed.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">diff</Heading>
        <p className="text-muted-foreground">
          Show differences between your local component file and the current upstream version. Useful before running <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">update</code> to preview what will change.
        </p>
        <CodeBlock code="npx @aniui/cli diff button" />
        <p className="text-muted-foreground">
          Outputs a colored unified diff (green for additions, red for removals). Only shows lines that differ.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">update</Heading>
        <p className="text-muted-foreground">
          Update installed components to the latest version. Supports smart merging when you&apos;ve modified components locally.
        </p>
        <CodeBlock
          code={`# Update all installed components
npx @aniui/cli update

# Update specific components
npx @aniui/cli update button card`}
        />
        <p className="text-muted-foreground">
          Three strategies when local changes are detected:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li><strong>overwrite</strong> — replace your local version with upstream (loses your changes)</li>
          <li><strong>skip</strong> — keep your local version (no update applied)</li>
          <li><strong>backup</strong> — save local as <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">.backup</code>, apply upstream</li>
        </ul>
      </div>
    </div>
  );
}

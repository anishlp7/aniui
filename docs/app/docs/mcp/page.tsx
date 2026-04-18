import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block";

const cursorConfig = `{
  "mcpServers": {
    "aniui": {
      "command": "npx",
      "args": ["-y", "@aniui/mcp"]
    }
  }
}`;

const claudeConfig = `{
  "mcpServers": {
    "aniui": {
      "command": "npx",
      "args": ["-y", "@aniui/mcp"]
    }
  }
}`;

export default function MCPPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">MCP Server</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Give your AI assistant direct access to AniUI components, theme tokens, and usage patterns.
        </p>
      </div>

      <div className="space-y-6 text-foreground leading-7">
        <p className="text-muted-foreground">
          The AniUI MCP (Model Context Protocol) server lets AI tools like Cursor, Claude Desktop, and
          Windsurf read real component source code on demand. Instead of guessing APIs, the AI pulls
          actual implementations and generates accurate code.
        </p>

        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm font-medium text-foreground mb-2">What your AI gets access to:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>&bull; <strong className="text-foreground">89 component source files</strong> — real code, not summaries</li>
            <li>&bull; <strong className="text-foreground">Theme tokens</strong> — CSS variables and Tailwind mappings</li>
            <li>&bull; <strong className="text-foreground">Usage info</strong> — imports, variants, and props for each component</li>
            <li>&bull; <strong className="text-foreground">Component pattern</strong> — how to build new AniUI-style components</li>
          </ul>
        </div>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Setup for Cursor</Heading>
        <p className="text-muted-foreground">
          Create a <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">.cursor/mcp.json</code> file
          in your project root:
        </p>
        <CodeBlock title=".cursor/mcp.json" code={cursorConfig} />
        <p className="text-muted-foreground">
          Restart Cursor. The MCP tools will be available automatically in Cursor Chat.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Setup for Claude Desktop</Heading>
        <p className="text-muted-foreground">
          Open your Claude Desktop config file:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>&bull; <strong className="text-foreground">Mac:</strong> <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
          <li>&bull; <strong className="text-foreground">Windows:</strong> <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">%APPDATA%\Claude\claude_desktop_config.json</code></li>
        </ul>
        <p className="text-muted-foreground mt-3">Add the AniUI server:</p>
        <CodeBlock title="claude_desktop_config.json" code={claudeConfig} />
        <p className="text-muted-foreground">
          Restart Claude Desktop. You&apos;ll see a hammer icon — click it to verify the AniUI tools are listed.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Setup for Other Clients</Heading>
        <p className="text-muted-foreground">
          For Windsurf or any other MCP-compatible client, add the same config to their MCP settings:
        </p>
        <CodeBlock code={`"command": "npx",\n"args": ["-y", "@aniui/mcp"]`} />

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Available Tools</Heading>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Tool</th>
                <th className="text-left py-2 font-semibold text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-xs text-foreground">list_components</td>
                <td className="py-2">List all 89 components with names, descriptions, and tiers</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-xs text-foreground">get_component</td>
                <td className="py-2">Get the full source code of any component</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-xs text-foreground">get_component_usage</td>
                <td className="py-2">Get import path, variants, props, and dependencies</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-xs text-foreground">get_theme_tokens</td>
                <td className="py-2">Get all theme CSS variables and Tailwind class mappings</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Available Resources</Heading>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-semibold text-foreground">Resource</th>
                <th className="text-left py-2 pr-4 font-semibold text-foreground">URI</th>
                <th className="text-left py-2 font-semibold text-foreground">Returns</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-2 pr-4 text-foreground">Registry</td>
                <td className="py-2 pr-4 font-mono text-xs">aniui://registry</td>
                <td className="py-2">Full component registry as JSON</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 text-foreground">Theme</td>
                <td className="py-2 pr-4 font-mono text-xs">aniui://theme</td>
                <td className="py-2">global.css with all theme variables</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 text-foreground">Pattern</td>
                <td className="py-2 pr-4 font-mono text-xs">aniui://pattern</td>
                <td className="py-2">Component authoring template and rules</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Example</Heading>
        <p className="text-muted-foreground">
          When you ask your AI <em>&quot;Build me a settings page using AniUI&quot;</em>, here&apos;s what happens behind the scenes:
        </p>
        <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
          <li>AI calls <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">list_components</code> to find relevant components (switch, card, separator)</li>
          <li>AI calls <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">get_component</code> for each — gets real source code</li>
          <li>AI calls <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">get_theme_tokens</code> — gets theme variables</li>
          <li>AI generates a screen using the actual component APIs — correct imports, props, and variants</li>
        </ol>
        <p className="text-muted-foreground mt-3">
          No hallucinated props. No wrong imports. Just working code.
        </p>
      </div>
    </div>
  );
}

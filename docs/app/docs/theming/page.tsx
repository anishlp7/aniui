import { CodeBlock } from "@/components/code-block";

export default function ThemingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Theming</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Customize colors using CSS variables and Tailwind classes.
        </p>
      </div>

      <div className="space-y-6 text-foreground leading-7">
        <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>
        <p className="text-muted-foreground">
          AniUI uses CSS custom properties (variables) defined in <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">global.css</code>.
          These map to Tailwind utility classes through your <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">tailwind.config.js</code>.
          Colors use HSL format without the <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">hsl()</code> wrapper so Tailwind can
          apply opacity modifiers.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Convention</h2>
        <p className="text-muted-foreground">
          Each color has a <strong>background</strong> and <strong>foreground</strong> pair.
          Use the background color for surfaces and the foreground for text on that surface:
        </p>
        <CodeBlock
          code={`<View className="bg-primary">
  <Text className="text-primary-foreground">Button text</Text>
</View>

<View className="bg-card">
  <Text className="text-card-foreground">Card content</Text>
</View>`}
        />

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Available Tokens</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 text-left font-semibold">Token</th>
                <th className="py-2 pr-4 text-left font-semibold">Tailwind Class</th>
                <th className="py-2 text-left font-semibold">Usage</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--background</td><td className="py-2 pr-4">bg-background / text-foreground</td><td className="py-2">Page background</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--primary</td><td className="py-2 pr-4">bg-primary / text-primary-foreground</td><td className="py-2">Buttons, links</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--secondary</td><td className="py-2 pr-4">bg-secondary / text-secondary-foreground</td><td className="py-2">Secondary actions</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--muted</td><td className="py-2 pr-4">bg-muted / text-muted-foreground</td><td className="py-2">Subtle backgrounds, helper text</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--accent</td><td className="py-2 pr-4">bg-accent / text-accent-foreground</td><td className="py-2">Highlights, hover states</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--destructive</td><td className="py-2 pr-4">bg-destructive / text-destructive-foreground</td><td className="py-2">Errors, delete actions</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--card</td><td className="py-2 pr-4">bg-card / text-card-foreground</td><td className="py-2">Card surfaces</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--border</td><td className="py-2 pr-4">border-border</td><td className="py-2">Borders, dividers</td></tr>
              <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono text-xs">--input</td><td className="py-2 pr-4">bg-input</td><td className="py-2">Input backgrounds</td></tr>
              <tr><td className="py-2 pr-4 font-mono text-xs">--ring</td><td className="py-2 pr-4">ring-ring</td><td className="py-2">Focus rings</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Theme Presets</h2>
        <p className="text-muted-foreground">
          Switch presets with the CLI. Each preset changes the primary color while keeping
          the neutral palette consistent:
        </p>
        <CodeBlock code="npx aniui theme" />
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li><strong className="text-foreground">Default</strong> — Neutral dark/light</li>
          <li><strong className="text-foreground">Blue</strong> — Primary: <span className="inline-block w-3 h-3 rounded-full bg-blue-500 align-middle" /> #3B82F6</li>
          <li><strong className="text-foreground">Green</strong> — Primary: <span className="inline-block w-3 h-3 rounded-full bg-green-500 align-middle" /> #22C55E</li>
          <li><strong className="text-foreground">Orange</strong> — Primary: <span className="inline-block w-3 h-3 rounded-full bg-orange-500 align-middle" /> #F97316</li>
          <li><strong className="text-foreground">Rose</strong> — Primary: <span className="inline-block w-3 h-3 rounded-full bg-rose-500 align-middle" /> #F43F5E</li>
        </ul>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Custom Colors</h2>
        <p className="text-muted-foreground">
          To create your own theme, edit the CSS variables in <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">global.css</code>.
          Values use HSL format (hue saturation% lightness%) without the <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">hsl()</code> wrapper:
        </p>
        <CodeBlock
          title="global.css"
          code={`:root {
  --primary: 262 83% 58%;          /* purple */
  --primary-foreground: 0 0% 100%; /* white text on purple */
}

.dark {
  --primary: 262 83% 68%;          /* lighter purple for dark mode */
  --primary-foreground: 0 0% 100%;
}`}
        />
        <p className="text-muted-foreground">
          No other config changes needed — Tailwind picks up the new values automatically
          since <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">tailwind.config.js</code> references <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">hsl(var(--primary))</code>.
        </p>
      </div>
    </div>
  );
}

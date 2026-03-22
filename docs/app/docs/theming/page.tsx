import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

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
        <PropsTable props={[
          { name: "--background", type: "bg-background / text-foreground", default: "Page background" },
          { name: "--primary", type: "bg-primary / text-primary-foreground", default: "Buttons, links" },
          { name: "--secondary", type: "bg-secondary / text-secondary-foreground", default: "Secondary actions" },
          { name: "--muted", type: "bg-muted / text-muted-foreground", default: "Subtle backgrounds, helper text" },
          { name: "--accent", type: "bg-accent / text-accent-foreground", default: "Highlights, hover states" },
          { name: "--destructive", type: "bg-destructive / text-destructive-foreground", default: "Errors, delete actions" },
          { name: "--card", type: "bg-card / text-card-foreground", default: "Card surfaces" },
          { name: "--border", type: "border-border", default: "Borders, dividers" },
          { name: "--input", type: "bg-input", default: "Input backgrounds" },
        ]} />
        <h2 className="text-2xl font-semibold tracking-tight pt-4">Theme Presets</h2>
        <p className="text-muted-foreground">
          Switch presets with the CLI. Each preset changes the primary color while keeping
          the neutral palette consistent:
        </p>
        <CodeBlock code="npx @aniui/cli theme" />
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
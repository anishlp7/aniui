import { Heading } from "@/components/heading";
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight">How It Works</Heading>
        <p className="text-muted-foreground">
          AniUI uses CSS custom properties (variables) defined in <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">global.css</code>.
          These map to Tailwind utility classes through your <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">tailwind.config.js</code>.
          Colors use HSL format without the <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">hsl()</code> wrapper so Tailwind can
          apply opacity modifiers.
        </p>
        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Convention</Heading>
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Available Tokens</Heading>
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Theme Presets</Heading>
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Custom Colors</Heading>
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

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">How Tokens Flow</Heading>
        <p className="text-muted-foreground">
          Understanding the full pipeline helps when debugging or extending themes:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">global.css</strong> defines raw HSL values:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--primary: 240 5.9% 10%</code>
          </li>
          <li>
            <strong className="text-foreground">tailwind.config.js</strong> maps them to Tailwind colors:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">primary: &quot;hsl(var(--primary))&quot;</code>
          </li>
          <li>
            <strong className="text-foreground">Components</strong> use Tailwind classes:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">bg-primary text-primary-foreground</code>
          </li>
          <li>
            <strong className="text-foreground">NativeWind</strong> compiles these to native styles at build time via Metro
          </li>
        </ol>
        <p className="text-muted-foreground">
          Unlike web CSS where variables resolve at runtime, NativeWind processes CSS variables
          through the Metro bundler at build time. This means changes to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">global.css</code>{" "}
          require a rebuild to take effect.
        </p>

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Adding Custom Tokens</Heading>
        <p className="text-muted-foreground">
          Need more semantic colors like <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">success</code> or{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">info</code>? Add them in three steps:
        </p>
        <p className="text-sm font-medium text-foreground mt-4">1. Define the CSS variable in both light and dark modes:</p>
        <CodeBlock
          title="global.css"
          code={`:root {
  --success: 142 76% 36%;
  --success-foreground: 0 0% 100%;
  --info: 217 91% 60%;
  --info-foreground: 0 0% 100%;
}
.dark {
  --success: 142 76% 46%;
  --success-foreground: 0 0% 100%;
  --info: 217 91% 70%;
  --info-foreground: 0 0% 100%;
}`}
        />
        <p className="text-sm font-medium text-foreground mt-4">2. Map them in tailwind.config.js:</p>
        <CodeBlock
          title="tailwind.config.js"
          code={`// Inside theme.extend.colors:
success: {
  DEFAULT: "hsl(var(--success))",
  foreground: "hsl(var(--success-foreground))",
},
info: {
  DEFAULT: "hsl(var(--info))",
  foreground: "hsl(var(--info-foreground))",
},`}
        />
        <p className="text-sm font-medium text-foreground mt-4">3. Use in your components:</p>
        <CodeBlock
          code={`<View className="bg-success rounded-md p-4">
  <Text className="text-success-foreground">Payment successful!</Text>
</View>`}
        />

        <Heading as="h2" className="text-2xl font-semibold tracking-tight pt-4">Global Component Overrides</Heading>
        <p className="text-muted-foreground">
          Since AniUI components are source files you own, you have two approaches for global styling changes:
        </p>
        <p className="text-sm font-medium text-foreground mt-4">Edit the component source directly:</p>
        <p className="text-muted-foreground">
          Change the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">cva</code> base string
          to affect all instances. For example, making all buttons fully rounded:
        </p>
        <CodeBlock
          title="components/ui/button.tsx"
          code={`// Change the base styles in buttonVariants:
const buttonVariants = cva(
  "flex-row items-center justify-center rounded-full min-h-12 min-w-12",
  //                                     ^^^^^^^^^^^^
  //                                     was: rounded-md
  { ... }
);`}
        />
        <p className="text-sm font-medium text-foreground mt-4">Create a wrapper component:</p>
        <p className="text-muted-foreground">
          For project-wide defaults without modifying the source:
        </p>
        <CodeBlock
          code={`import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppButton({ className, ...props }: ButtonProps) {
  return <Button className={cn("rounded-full", className)} {...props} />;
}`}
        />
      </div>
    </div>
  );
}
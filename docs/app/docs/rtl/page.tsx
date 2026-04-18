import { Heading } from "@/components/heading";
import { PreviewDirectionProviderDemo } from "@/components/preview/direction-provider";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PreviewToggle } from "@/components/preview-toggle";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const setupCode = `import { DirectionProvider } from "@/components/ui/direction-provider";

export default function RootLayout({ children }) {
  return (
    <DirectionProvider defaultDirection="rtl">
      {children}
    </DirectionProvider>
  );
}`;
const hookCode = `import { useDirection } from "@/components/ui/direction-provider";

function MyComponent() {
  const { isRTL, direction } = useDirection();

  return (
    <View className={cn("flex-row", isRTL && "flex-row-reverse")}>
      <Text>Content adapts to {direction}</Text>
    </View>
  );
}`;
const iconFlipCode = `import { useDirection } from "@/components/ui/direction-provider";

function BackButton() {
  const { isRTL } = useDirection();

  return (
    <Pressable onPress={goBack}>
      <Svg
        width={24} height={24}
        viewBox="0 0 24 24"
        style={isRTL ? { transform: [{ scaleX: -1 }] } : undefined}
      >
        <Path d="M15 18l-6-6 6-6" />
      </Svg>
    </Pressable>
  );
}`;
const inputGroupRtlCode = `// In LTR: [$][___input___]
// In RTL: [___input___][$]  (automatic via logical properties)

<InputGroup>
  <InputGroupAddon align="start">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="Amount" />
</InputGroup>`;
const comboboxRtlCode = `// In LTR: [Tag1 ✕] [Tag2 ✕]
// In RTL: [✕ Tag1] [✕ Tag2]  (automatic via logical properties)

<Combobox
  multiple
  selectedValues={["tag1", "tag2"]}
  options={options}
  onSelectedValuesChange={setSelected}
/>`;
const fieldRtlCode = `// Label and description alignment flips automatically
<Field orientation="horizontal">
  <FieldLabel>البريد الإلكتروني</FieldLabel>
  <Input placeholder="أدخل بريدك الإلكتروني" />
  <FieldDescription>سنرسل لك رمز التحقق</FieldDescription>
</Field>`;
const settingsCode = `import { useDirection } from "@/components/ui/direction-provider";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

function LanguageSettings() {
  const { direction, setDirection } = useDirection();

  return (
    <Field>
      <FieldLabel>Layout Direction</FieldLabel>
      <SegmentedControl
        values={["LTR", "RTL"]}
        selectedIndex={direction === "ltr" ? 0 : 1}
        onChange={(index) => {
          setDirection(index === 0 ? "ltr" : "rtl");
        }}
      />
      <FieldDescription>
        Changing direction requires restarting the app.
      </FieldDescription>
    </Field>
  );
}`;
export default function RTLPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">RTL Support</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          First-class right-to-left layout support for Arabic, Hebrew, Persian, and other RTL languages.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={setupCode}>
          <PreviewDirectionProviderDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Overview */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Overview</Heading>
        <p className="text-sm text-muted-foreground">
          AniUI components support RTL layouts through two mechanisms:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><strong>Logical Tailwind properties</strong> — components use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ps-*</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">pe-*</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ms-*</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">me-*</code> instead of physical <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">pl-*</code>/<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">pr-*</code> properties, which NativeWind maps to React Native&apos;s <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">paddingStart</code>/<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">paddingEnd</code>.</li>
          <li><strong>DirectionProvider</strong> — a context provider that wraps <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">I18nManager</code> and provides a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">useDirection()</code> hook for reading and setting direction.</li>
        </ul>
      </div>
      {/* Setup */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Setup</Heading>
        <p className="text-sm text-muted-foreground">
          Install the DirectionProvider component and wrap your root layout:
        </p>
        <AddComponentTabs names="direction-provider" />
        <CodeBlock code={setupCode} title="app/_layout.tsx" />
      </div>
      {/* Reading direction */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Reading Direction</Heading>
        <p className="text-sm text-muted-foreground">
          Use the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">useDirection()</code> hook to access the current direction from any child component.
        </p>
        <CodeBlock code={hookCode} title="Reading direction" />
      </div>
      {/* Logical Properties */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Logical Properties</Heading>
        <p className="text-sm text-muted-foreground">
          AniUI components use logical CSS properties that automatically adapt to RTL layouts. When writing custom styles, prefer logical properties:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-4 text-left font-medium text-foreground">Physical (avoid)</th>
                <th className="py-2 px-4 text-left font-medium text-foreground">Logical (prefer)</th>
                <th className="py-2 px-4 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border"><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">pl-* / pr-*</code></td><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ps-* / pe-*</code></td><td className="py-2 px-4">Padding start/end</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ml-* / mr-*</code></td><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ms-* / me-*</code></td><td className="py-2 px-4">Margin start/end</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">text-left / text-right</code></td><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">text-start / text-end</code></td><td className="py-2 px-4">Text alignment</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">left-* / right-*</code></td><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">start-* / end-*</code></td><td className="py-2 px-4">Position</td></tr>
              <tr><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">border-l / border-r</code></td><td className="py-2 px-4"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">border-s / border-e</code></td><td className="py-2 px-4">Border start/end</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Icon Flipping */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Flipping Icons</Heading>
        <p className="text-sm text-muted-foreground">
          Directional icons like back arrows need to be flipped in RTL mode. Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">scaleX: -1</code> to mirror them:
        </p>
        <CodeBlock code={iconFlipCode} title="Flipping icons" />
      </div>
      {/* Component Examples */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Component Examples</Heading>
        <p className="text-sm text-muted-foreground">
          Components that use logical properties adapt automatically. No code changes needed.
        </p>
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">InputGroup</Heading>
        <CodeBlock code={inputGroupRtlCode} title="InputGroup adapts automatically" />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">Combobox Multi-select</Heading>
        <CodeBlock code={comboboxRtlCode} title="Combobox chips flip automatically" />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">Field</Heading>
        <CodeBlock code={fieldRtlCode} title="Field with Arabic text" />
      </div>
      {/* Dynamic Direction Toggle */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Dynamic Direction Toggle</Heading>
        <p className="text-sm text-muted-foreground">
          Build a settings screen that lets users switch direction:
        </p>
        <CodeBlock code={settingsCode} title="Settings screen" />
      </div>
      {/* Important Note */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Important</Heading>
        <p className="text-sm text-muted-foreground">
          Calling <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">setDirection</code> updates the React context value immediately for re-renders, but the full layout direction flip via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">I18nManager.forceRTL()</code> requires an app restart. This is a React Native platform limitation.
        </p>
        <p className="text-sm text-muted-foreground">
          For the best user experience, persist the direction preference and apply it before the app renders on next launch.
        </p>
      </div>
      {/* RTL Support Table */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Component Support</Heading>
        <p className="text-sm text-muted-foreground">
          All AniUI components use logical Tailwind properties and support RTL layouts out of the box.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-4 text-left font-medium text-foreground">Category</th>
                <th className="py-2 px-4 text-left font-medium text-foreground">Components</th>
                <th className="py-2 px-4 text-left font-medium text-foreground">RTL</th>
                <th className="py-2 px-4 text-left font-medium text-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Layout</td><td className="py-2 px-4">Field, InputGroup, Card, Grid, SafeArea</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">Logical properties throughout</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Inputs</td><td className="py-2 px-4">Input, Textarea, SearchBar, PasswordInput, MaskedInput, PhoneInput, NumberInput, Combobox, Select</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">Icons, addons, and borders flip correctly</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Display</td><td className="py-2 px-4">Text, Badge, Chip, Label, Kbd, Price, Avatar, Image</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">Text alignment handled by NativeWind</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Feedback</td><td className="py-2 px-4">Alert, Banner, Toast, Spinner, Progress, Skeleton, ConnectionBanner</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">Dismiss buttons and icons flip</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Navigation</td><td className="py-2 px-4">Header, TabBar, Tabs, Stepper, ProgressSteps, Pagination</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">Back arrows need icon flipping (see above)</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Overlays</td><td className="py-2 px-4">Dialog, AlertDialog, Popover, Tooltip, HoverCard, BottomSheet, DropdownMenu, ContextMenu</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">Portal content follows direction context</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Actions</td><td className="py-2 px-4">Button, Toggle, ToggleGroup, FAB, Switch, Checkbox, RadioGroup</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">FAB positions use start/end</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Data</td><td className="py-2 px-4">List, Table, Timeline, ChatBubble, StatCard, Rating, Calendar</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">Timeline and chat bubbles flip sides</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Providers</td><td className="py-2 px-4">DirectionProvider, ThemeProvider</td><td className="py-2 px-4 text-green-600">Full</td><td className="py-2 px-4">Core RTL infrastructure</td></tr>
              <tr className="border-b border-border"><td className="py-2 px-4 font-medium text-foreground">Charts</td><td className="py-2 px-4">AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialChart</td><td className="py-2 px-4 text-yellow-600">Partial</td><td className="py-2 px-4">SVG coordinates are always physical; axis labels may need manual adjustment</td></tr>
              <tr><td className="py-2 px-4 font-medium text-foreground">Gesture</td><td className="py-2 px-4">Slider, Drawer, SwipeableListItem, Carousel</td><td className="py-2 px-4 text-yellow-600">Partial</td><td className="py-2 px-4">Gesture direction and inline styles use physical properties by design</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          <strong>Full</strong> = all styles use logical properties, automatic RTL support.<br />
          <strong>Partial</strong> = works in RTL but some visual aspects (SVG coordinates, gesture directions) use physical properties by necessity.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Screen readers automatically respect <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">I18nManager</code> direction settings.</li>
          <li>Logical properties ensure touch targets and content flow correctly for RTL users.</li>
          <li>Supports Arabic, Hebrew, Persian, Urdu, and other RTL languages.</li>
          <li>Works with both Expo SDK 54 (NativeWind v4) and SDK 55 (NativeWind v5).</li>
        </ul>
      </div>
    </div>
  );
}

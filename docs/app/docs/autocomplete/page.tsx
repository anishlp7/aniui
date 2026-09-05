import { getComponentSource } from "@/lib/registry-source";
import Link from "next/link";
import { Heading } from "@/components/heading";
import { AutoCompleteDemo, AsyncDemo } from "./_demos";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add autocomplete`;
const usageCode = `import { AutoComplete } from "@/components/ui/autocomplete";

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

export function MyScreen() {
  return (
    <AutoComplete
      options={FRUITS}
      placeholder="Search fruit..."
      onSelect={(option) => console.log(option.value)}
    />
  );
}`;
const filterCode = `<AutoComplete
  options={users}
  filterFn={(option, query) =>
    option.label.toLowerCase().startsWith(query.toLowerCase())
  }
  minCharsToTrigger={2}
/>`;
const asyncCode = `const [options, setOptions] = useState<AutoCompleteOption[]>([]);
const [loading, setLoading] = useState(false);

<AutoComplete
  options={options}
  loading={loading}
  onChangeText={async (text) => {
    setLoading(true);
    setOptions(await searchUsers(text));
    setLoading(false);
  }}
  filterFn={() => true} // results already come pre-filtered from the server
/>`;
const sourceCode = getComponentSource("autocomplete");

export default function AutoCompletePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">AutoComplete</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Free-text input with inline filtered suggestions — type-ahead search with a keyboard-safe dropdown, async loading state, and a disabled-option affordance.
        </p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <AutoCompleteDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div className="rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Not the same as Combobox.</span>{" "}
        <Link href="/docs/combobox" className="text-primary hover:underline">Combobox</Link> opens a modal
        to pick from a fixed list. AutoComplete is a real text field — the suggestion list renders inline,
        below the input, and pushes the rest of the layout down rather than floating over it (React Native
        has no reliable viewport-relative overlay without a portal). Keep it out of tight-height rows.
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="autocomplete" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/search.tsx" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Custom filtering</Heading>
        <p className="text-sm text-muted-foreground">
          Override <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">filterFn</code> for
          prefix matching, fuzzy search, or anything else — and raise{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">minCharsToTrigger</code> so
          the dropdown only opens once there&apos;s enough input to filter meaningfully.
        </p>
        <CodeBlock code={filterCode} title="Custom filter" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Async suggestions</Heading>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">loading</code> while a
          server request is in flight — the dropdown swaps its list for a loading row instead of showing
          stale or empty results.
        </p>
        <ComponentPlayground code={asyncCode}>
          <AsyncDemo />
        </ComponentPlayground>
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "options", type: "AutoCompleteOption[]", default: "-", description: "{ label, value, disabled? }[]" },
          { name: "value", type: "string", default: "-", description: "Controlled text — pair with onChangeText." },
          { name: "onChangeText", type: "(text: string) => void", default: "-" },
          { name: "onSelect", type: "(option: AutoCompleteOption) => void", default: "-" },
          { name: "filterFn", type: "(option, query) => boolean", default: "case-insensitive substring match" },
          { name: "minCharsToTrigger", type: "number", default: "1" },
          { name: "loading", type: "boolean", default: "false" },
          { name: "emptyText", type: "string", default: '"No results"' },
          { name: "maxVisibleOptions", type: "number", default: "5", description: "Caps the dropdown's scroll height." },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "variant", type: "\"default\" | \"ghost\"", default: "\"default\"" },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Each suggestion and the clear button set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> and meet the 48dp minimum touch target.</li>
          <li>Disabled options expose <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState={"{ disabled: true }"}</code> and ignore presses.</li>
          <li>Selecting a suggestion calls <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Keyboard.dismiss()</code> so the dropdown and keyboard close together.</li>
        </ul>
      </div>
      <p className="text-sm text-muted-foreground">
        See also: <Link href="/docs/input" className="text-primary hover:underline">Input</Link>{" "}
        &middot; <Link href="/docs/search-bar" className="text-primary hover:underline">Search Bar</Link>
      </p>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/autocomplete.tsx" />
      </div>
    </div>
  );
}

import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewCard, PreviewCardHeader, PreviewCardTitle, PreviewCardDescription, PreviewCardContent, PreviewCardFooter } from "@/components/preview/card";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add card`;
const usageCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export function MyScreen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Card content</Text>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}`;
const sourceCode = getComponentSource("card");
export default function CardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Card</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Card container with header, content, and footer sections.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <PreviewCard>
              <PreviewCardHeader>
                <PreviewCardTitle>Card Title</PreviewCardTitle>
                <PreviewCardDescription>Card description goes here.</PreviewCardDescription>
              </PreviewCardHeader>
              <PreviewCardContent>
                <p className="text-sm text-muted-foreground">Card content area.</p>
              </PreviewCardContent>
              <PreviewCardFooter>
                <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Action</button>
              </PreviewCardFooter>
            </PreviewCard>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="card" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Exports */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</Heading>
        <p className="text-sm text-muted-foreground">
          Card is a compound component with the following exports:
        </p>
        <ComponentTable components={[
          { name: "Card", description: "Root container with border and padding" },
          { name: "CardHeader", description: "Header section with bottom padding" },
          { name: "CardTitle", description: "Title text component" },
          { name: "CardDescription", description: "Description text in muted color" },
          { name: "CardContent", description: "Main content area" },
          { name: "CardFooter", description: "Footer with row layout for actions" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "React.ReactNode" },
        ]} />
        <p className="text-sm text-muted-foreground">
          All sub-components accept <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> and their respective React Native base props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Semantic container for grouped content.</li>
          <li>Supports <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> for custom styling and all React Native <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> accessibility props.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/card.tsx" />
      </div>
    </div>
  );
}
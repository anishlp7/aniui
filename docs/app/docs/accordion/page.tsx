import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewAccordion, PreviewAccordionItem } from "@/components/preview/accordion";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add accordion`;
const usageCode = `import { Accordion, AccordionItem } from "@/components/ui/accordion";

export function MyScreen() {
  return (
    <Accordion defaultValue="shipping-time">
      <AccordionItem value="shipping-time" trigger="How long does shipping take?">
        <Text>Standard orders arrive in 3-5 business days. Express orders arrive in 1-2 business days.</Text>
      </AccordionItem>
      <AccordionItem value="returns" trigger="Can I return an item?">
        <Text>Yes — unused items can be returned within 30 days of delivery for a full refund.</Text>
      </AccordionItem>
      <AccordionItem value="international" trigger="Do you ship internationally?">
        <Text>We ship to over 40 countries. International orders may be subject to customs fees.</Text>
      </AccordionItem>
      <AccordionItem value="tracking" trigger="How do I track my order?">
        <Text>You'll get a tracking link by email as soon as your order ships.</Text>
      </AccordionItem>
    </Accordion>
  );
}`;
const sourceCode = getComponentSource("accordion");
export default function AccordionPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Accordion</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Expandable content sections with animated height transitions.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <PreviewAccordion defaultValue="shipping-time">
              <PreviewAccordionItem value="shipping-time" trigger="How long does shipping take?">
                <p className="text-sm text-muted-foreground">Standard orders arrive in 3-5 business days. Express orders arrive in 1-2 business days.</p>
              </PreviewAccordionItem>
              <PreviewAccordionItem value="returns" trigger="Can I return an item?">
                <p className="text-sm text-muted-foreground">Yes — unused items can be returned within 30 days of delivery for a full refund.</p>
              </PreviewAccordionItem>
              <PreviewAccordionItem value="international" trigger="Do you ship internationally?">
                <p className="text-sm text-muted-foreground">We ship to over 40 countries. International orders may be subject to customs fees.</p>
              </PreviewAccordionItem>
              <PreviewAccordionItem value="tracking" trigger="How do I track my order?">
                <p className="text-sm text-muted-foreground">You'll get a tracking link by email as soon as your order ships.</p>
              </PreviewAccordionItem>
            </PreviewAccordion>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="accordion" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for animations.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</Heading>
        <ComponentTable components={[
          { name: "Accordion", description: "Root container that manages expanded state" },
          { name: "AccordionItem", description: "Individual collapsible section with trigger text" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Accordion</Heading>
        <PropsTable props={[
          { name: "defaultValue", type: "string" },
          { name: "type", type: "\"single\" | \"multiple\"", default: "\"single\"" },
          { name: "className", type: "string" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">AccordionItem</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "trigger", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/accordion</code> for keyboard navigation and ARIA compliance.</li>
          <li>Supports single and multiple open modes.</li>
          <li>Each trigger has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> for expanded/collapsed.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/accordion.tsx" />
      </div>
    </div>
  );
}
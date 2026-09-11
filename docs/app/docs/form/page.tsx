import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewFormDemo } from "@/components/preview/form";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add form`;
const usageCode = `import { Form, FormField, FormItem, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ValidatedInput({ rules }: { rules?: FieldRules }) {
  const { name, error, validateField } = useFormField();
  return (
    <Input
      variant={error ? "destructive" : "default"}
      onBlur={(e) => validateField(name, e.nativeEvent.text, rules)}
    />
  );
}

export function MyScreen() {
  return (
    <Form>
      <FormField name="email">
        <FormItem>
          <Label>Email</Label>
          <ValidatedInput rules={{ required: "Email is required", pattern: { value: /@/, message: "Invalid email" } }} />
          <FormMessage />
        </FormItem>
      </FormField>
      <Button onPress={() => console.log("submit")}>Submit</Button>
    </Form>
  );
}`;
const hookCode = `import { useFormField } from "@/components/ui/form";

// Inside a FormField context:
const { name, error, errors, setFieldError, validateField } = useFormField();

// Validate a field with rules
validateField("email", value, {
  required: "Email is required",
  pattern: { value: /^[^@]+@[^@]+$/, message: "Invalid email" },
  validate: (val) => val.includes("test") ? "No test emails" : undefined,
});`;
const sourceCode = getComponentSource("form");
export default function FormPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Form</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Form context with validation, error messages, and compound components.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="form" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewFormDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* useFormField Hook */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">useFormField Hook</Heading>
        <p className="text-sm text-muted-foreground">
          Access form context and field state from within a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormField</code>. Returns the field name, error, all errors, and validation helpers.
        </p>
        <CodeBlock code={hookCode} title="Using useFormField" />
      </div>
      {/* FieldRules Type */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">FieldRules Type</Heading>
        <PropsTable props={[
          { name: "required", type: "string | boolean", default: "-" },
          { name: "pattern", type: "{ value: RegExp; message: string }", default: "-" },
          { name: "validate", type: "(value: string) => string | undefined", default: "-" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Form</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">FormField</Heading>
        <PropsTable props={[
          { name: "name", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">FormItem</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">FormMessage</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Form</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormItem</code> also accept all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Form validation with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormField</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormItem</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FormMessage</code> for error announcements.</li>
          <li>Error messages are associated with their fields for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/form.tsx" />
      </div>
    </div>
  );
}

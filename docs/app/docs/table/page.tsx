import { Heading } from "@/components/heading";
import { PreviewTable } from "@/components/preview/table";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add table`;
const usageCode = `import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function MyScreen() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>Inactive</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`;
const previewCode = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bob</TableCell>
      <TableCell>Inactive</TableCell>
      <TableCell>User</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Charlie</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>Editor</TableCell>
    </TableRow>
  </TableBody>
</Table>`;
const sourceCode = `import React from "react";
import { View, Text, ScrollView } from "react-native";
import { cn } from "@/lib/utils";
type ViewProps = React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode };
type TextProps = React.ComponentPropsWithoutRef<typeof Text> & { className?: string };
export function Table({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof ScrollView> & { className?: string; children?: React.ReactNode }) {
  return (
    <ScrollView horizontal className={cn("rounded-md border border-border", className)} {...props}>
      <View className="min-w-full">{children}</View>
    </ScrollView>
  );
}
export function TableHeader({ className, ...props }: ViewProps) {
  return <View className={cn("bg-muted/50", className)} {...props} />;
}
export function TableBody({ className, ...props }: ViewProps) {
  return <View className={cn("", className)} {...props} />;
}
export function TableRow({ className, ...props }: ViewProps) {
  return <View className={cn("flex-row border-b border-border", className)} {...props} />;
}
export function TableHead({ className, ...props }: TextProps) {
  return (
    <Text className={cn("flex-1 px-4 py-3 text-sm font-medium text-muted-foreground", className)} {...props} />
  );
}
export function TableCell({ className, ...props }: TextProps) {
  return (
    <Text className={cn("flex-1 px-4 py-3 text-sm text-foreground", className)} {...props} />
  );
}`;
export default function TablePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Table</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A compound table component with header, body, rows, and cells for displaying structured data.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={previewCode} variant="inline">
          <PreviewTable />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="table" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Examples */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Examples</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Default</Heading>
        <ComponentPlayground code={previewCode} variant="inline">
          <PreviewTable />
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Table</Heading>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "ReactNode" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ScrollView</code> props from React Native.
        </p>
        <Heading as="h3" className="text-lg font-medium text-foreground">TableHeader / TableBody / TableRow</Heading>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "ReactNode" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
        <Heading as="h3" className="text-lg font-medium text-foreground">TableHead / TableCell</Heading>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "ReactNode" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Data table with semantic row/cell structure.</li>
          <li>Header cells are distinguished from body cells for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/table.tsx" />
      </div>
    </div>
  );
}
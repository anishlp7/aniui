import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { DialogDemo } from "./_demos";

const usageCode = `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

export function MyScreen() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onPress={() => setOpen(false)}>Cancel</Button>
            <Button onPress={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}`;
const sourceCode = `import React from "react";
import { View, Pressable, Text, Modal } from "react-native";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => onOpenChange(false)}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <Pressable className="absolute inset-0" onPress={() => onOpenChange(false)} />
        {children}
      </View>
    </Modal>
  );
}

export function DialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode }) {
  return (
    <View className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)} accessibilityRole="alert" accessible={true} {...props}>
      {children}
    </View>
  );
}

export function DialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DialogClose({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}`;
export default function DialogPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dialog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Modal dialog overlay with fade animation.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <DialogDemo />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="dialog" />
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
          { name: "Dialog", description: "Root modal with backdrop and fade animation" },
          { name: "DialogContent", description: "Card-style content container" },
          { name: "DialogHeader", description: "Header section" },
          { name: "DialogTitle", description: "Title text" },
          { name: "DialogDescription", description: "Description text in muted color" },
          { name: "DialogFooter", description: "Footer with row layout for action buttons" },
          { name: "DialogTrigger", description: "Passthrough wrapper for trigger element" },
          { name: "DialogClose", description: "Passthrough wrapper for close element" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Dialog</Heading>
        <PropsTable props={[
          { name: "open", type: "boolean", default: "required" },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "required" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Sub-components (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DialogContent</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DialogHeader</code>, etc.) accept <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> and their respective React Native base props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses Modal with backdrop dismiss and BackHandler support</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;dialog&quot;</code> on content</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/dialog.tsx" />
      </div>
    </div>
  );
}

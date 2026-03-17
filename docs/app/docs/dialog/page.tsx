"use client";

import React from "react";
import { PreviewDialogDemo } from "@/components/preview/dialog";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add dialog`;

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
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(100)}
        className="flex-1 items-center justify-center bg-black/50"
      >
        <Pressable className="absolute inset-0" onPress={() => onOpenChange(false)} />
        <Animated.View entering={ZoomIn.duration(200)} exiting={ZoomOut.duration(150)}>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function DialogContent({ className, ...props }: DialogContentProps) {
  return (
    <View
      className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)}
      accessibilityRole="alert"
      {...props}
    />
  );
}

export interface DialogHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export interface DialogFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}`;

export default function DialogPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dialog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Modal dialog overlay with fade and scale animations.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <PreviewDialogDemo />
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for fade and zoom animations.
        </p>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Component</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">Dialog</td>
                <td className="px-4 py-3 text-xs">Root modal with backdrop and animations</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">DialogContent</td>
                <td className="px-4 py-3 text-xs">Card-style content container</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">DialogHeader</td>
                <td className="px-4 py-3 text-xs">Header section</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">DialogTitle</td>
                <td className="px-4 py-3 text-xs">Title text</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">DialogDescription</td>
                <td className="px-4 py-3 text-xs">Description text in muted color</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">DialogFooter</td>
                <td className="px-4 py-3 text-xs">Footer with row layout for action buttons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Dialog</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">open</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onOpenChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(open: boolean) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Sub-components (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DialogContent</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DialogHeader</code>, etc.) accept <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> and their respective React Native base props.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/dialog.tsx" />
      </div>
    </div>
  );
}

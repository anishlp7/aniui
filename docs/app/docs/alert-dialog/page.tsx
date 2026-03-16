"use client";

import { useState } from "react";
import {
  PreviewAlertDialog,
  PreviewAlertDialogContent,
  PreviewAlertDialogHeader,
  PreviewAlertDialogTitle,
  PreviewAlertDialogDescription,
  PreviewAlertDialogFooter,
  PreviewAlertDialogAction,
  PreviewAlertDialogCancel,
} from "@/components/preview/alert-dialog";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add alert-dialog`;

const usageCode = `import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function MyScreen() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Delete Account</Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onPress={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onPress={() => setOpen(false)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}`;

const sourceCode = `import React from "react";
import { View, Pressable, Text, Modal } from "react-native";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(100)}
        className="flex-1 items-center justify-center bg-black/50"
      >
        <Animated.View entering={ZoomIn.duration(200)} exiting={ZoomOut.duration(150)}>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  return (
    <View
      className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)}
      accessibilityRole="alert"
      {...props}
    />
  );
}

export interface AlertDialogHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export interface AlertDialogFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children: React.ReactNode;
}

export function AlertDialogAction({ className, children, ...props }: AlertDialogActionProps) {
  return (
    <Pressable
      className={cn("items-center justify-center rounded-md bg-primary px-4 py-2.5 min-h-12", className)}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium text-primary-foreground">{children}</Text>
      ) : children}
    </Pressable>
  );
}

export interface AlertDialogCancelProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children: React.ReactNode;
}

export function AlertDialogCancel({ className, children, ...props }: AlertDialogCancelProps) {
  return (
    <Pressable
      className={cn("items-center justify-center rounded-md border border-input px-4 py-2.5 min-h-12", className)}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium text-foreground">{children}</Text>
      ) : children}
    </Pressable>
  );
}`;

function AlertDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Delete Account
      </button>
      {open && (
        <PreviewAlertDialog open={open} onOpenChange={setOpen}>
          <PreviewAlertDialogContent>
            <PreviewAlertDialogHeader>
              <PreviewAlertDialogTitle>Are you sure?</PreviewAlertDialogTitle>
              <PreviewAlertDialogDescription>
                This action cannot be undone. This will permanently delete your account.
              </PreviewAlertDialogDescription>
            </PreviewAlertDialogHeader>
            <PreviewAlertDialogFooter>
              <PreviewAlertDialogCancel onClick={() => setOpen(false)}>Cancel</PreviewAlertDialogCancel>
              <PreviewAlertDialogAction onClick={() => setOpen(false)}>Continue</PreviewAlertDialogAction>
            </PreviewAlertDialogFooter>
          </PreviewAlertDialogContent>
        </PreviewAlertDialog>
      )}
    </div>
  );
}

export default function AlertDialogPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Alert Dialog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects a response.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <AlertDialogDemo />
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> to be installed in your project.
        </p>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">
          AlertDialog is a compound component made up of several parts:
        </p>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">AlertDialog</td>
                <td className="px-4 py-3 text-xs">Root component that manages open state and renders the modal overlay.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">AlertDialogContent</td>
                <td className="px-4 py-3 text-xs">The card container for dialog content.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">AlertDialogHeader</td>
                <td className="px-4 py-3 text-xs">Wraps the title and description with spacing.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">AlertDialogTitle</td>
                <td className="px-4 py-3 text-xs">The heading text of the dialog.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">AlertDialogDescription</td>
                <td className="px-4 py-3 text-xs">Descriptive text explaining the action.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">AlertDialogFooter</td>
                <td className="px-4 py-3 text-xs">Wraps action buttons with proper layout.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">AlertDialogAction</td>
                <td className="px-4 py-3 text-xs">Primary action button (confirm).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">AlertDialogCancel</td>
                <td className="px-4 py-3 text-xs">Secondary cancel button (dismiss).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">AlertDialog</h3>
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
          Sub-components (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">AlertDialogContent</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">AlertDialogHeader</code>, etc.) accept <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> and their respective React Native base props.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/alert-dialog.tsx" />
      </div>
    </div>
  );
}

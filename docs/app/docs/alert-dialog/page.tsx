"use client";
import { PreviewAlertDialogDemo } from "@/components/preview/alert-dialog";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";

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
        <PreviewAlertDialogDemo />
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
        <ComponentTable components={[
          { name: "AlertDialog", description: "Root component that manages open state and renders the modal overlay." },
          { name: "AlertDialogContent", description: "The card container for dialog content." },
          { name: "AlertDialogHeader", description: "Wraps the title and description with spacing." },
          { name: "AlertDialogTitle", description: "The heading text of the dialog." },
          { name: "AlertDialogDescription", description: "Descriptive text explaining the action." },
          { name: "AlertDialogFooter", description: "Wraps action buttons with proper layout." },
          { name: "AlertDialogAction", description: "Primary action button (confirm)." },
          { name: "AlertDialogCancel", description: "Secondary cancel button (dismiss)." },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">AlertDialog</h3>
        <PropsTable props={[
          { name: "open", type: "boolean", default: "required" },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "required" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
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
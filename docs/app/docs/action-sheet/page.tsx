"use client";

import { PreviewActionSheet } from "@/components/preview/action-sheet";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add action-sheet`;

const depInstallCode = `npx expo install @gorhom/bottom-sheet react-native-gesture-handler react-native-reanimated`;

const usageCode = `import { ActionSheet } from "@/components/ui/action-sheet";
import { useRef } from "react";
import GorhomBottomSheet from "@gorhom/bottom-sheet";

export function MyScreen() {
  const sheetRef = useRef<GorhomBottomSheet>(null);

  return (
    <>
      <Button onPress={() => sheetRef.current?.expand()}>
        Show Actions
      </Button>
      <ActionSheet
        ref={sheetRef}
        title="Choose an action"
        actions={[
          { label: "Share", onPress: () => console.log("Share") },
          { label: "Edit", onPress: () => console.log("Edit") },
          { label: "Delete", onPress: () => console.log("Delete"), destructive: true },
        ]}
        onCancel={() => sheetRef.current?.close()}
      />
    </>
  );
}`;

const sourceCode = `import React, { forwardRef, useCallback } from "react";
import { View, Pressable, Text } from "react-native";
import GorhomBottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";

export interface ActionSheetAction {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

export interface ActionSheetProps {
  className?: string;
  title?: string;
  actions: ActionSheetAction[];
  onCancel?: () => void;
}

export const ActionSheet = forwardRef<GorhomBottomSheet, ActionSheetProps>(
  ({ className, title, actions, onCancel }, ref) => {
    const renderBackdrop = useCallback(
      (backdropProps: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    return (
      <GorhomBottomSheet
        ref={ref}
        index={-1}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "hsl(0 0% 100%)" }}
        handleIndicatorStyle={{ backgroundColor: "hsl(240 3.8% 46.1%)" }}
      >
        <BottomSheetView>
          <View className={cn("pb-8 px-4", className)}>
            {title && <Text className="text-sm text-muted-foreground text-center py-3">{title}</Text>}
            {actions.map((action, i) => (
              <Pressable
                key={i}
                className="py-4 items-center border-b border-border min-h-12"
                onPress={action.onPress}
                accessible={true}
                accessibilityRole="button"
              >
                <Text className={cn("text-base font-medium", action.destructive ? "text-destructive" : "text-foreground")}>
                  {action.label}
                </Text>
              </Pressable>
            ))}
            {onCancel && (
              <Pressable className="py-4 items-center mt-2 min-h-12" onPress={onCancel} accessible={true} accessibilityRole="button">
                <Text className="text-base font-semibold text-muted-foreground">Cancel</Text>
              </Pressable>
            )}
          </View>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  }
);

ActionSheet.displayName = "ActionSheet";`;

export default function ActionSheetPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">ActionSheet</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Action sheet with a list of actions, powered by @gorhom/bottom-sheet.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex items-center gap-4">
          <PreviewActionSheet
            title="Choose an action"
            actions={[
              { label: "Edit", onPress: () => {} },
              { label: "Share", onPress: () => {} },
              { label: "Delete", onPress: () => {}, destructive: true },
            ]}
            onCancel={() => {}}
          />
        </div>
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires additional dependencies:
        </p>
        <CodeBlock code={depInstallCode} />
        <p className="text-sm text-muted-foreground">
          You also need to wrap your app with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">GestureHandlerRootView</code> from <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-gesture-handler</code>.
        </p>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">title</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">actions</td>
                <td className="px-4 py-3 font-mono text-xs">ActionSheetAction[]</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onCancel</td>
                <td className="px-4 py-3 font-mono text-xs">{`() => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-foreground mt-6">ActionSheetAction</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Property</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onPress</td>
                <td className="px-4 py-3 font-mono text-xs">{`() => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">destructive</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">false</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Use a ref to control the sheet imperatively. Call <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expand()</code> to open and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">close()</code> to dismiss.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/action-sheet.tsx" />
      </div>
    </div>
  );
}

"use client";

import { PreviewBottomSheet } from "@/components/preview/bottom-sheet";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add bottom-sheet`;

const depInstallCode = `npx expo install @gorhom/bottom-sheet react-native-gesture-handler react-native-reanimated`;

const usageCode = `import { BottomSheet } from "@/components/ui/bottom-sheet";
import { useRef } from "react";
import GorhomBottomSheet from "@gorhom/bottom-sheet";

export function MyScreen() {
  const sheetRef = useRef<GorhomBottomSheet>(null);

  return (
    <>
      <Button onPress={() => sheetRef.current?.expand()}>
        Open Sheet
      </Button>
      <BottomSheet ref={sheetRef} snapPoints={["25%", "50%"]}>
        <Text>Sheet content goes here</Text>
      </BottomSheet>
    </>
  );
}`;

const sourceCode = `import React, { forwardRef, useCallback } from "react";
import { View } from "react-native";
import GorhomBottomSheet, {
  type BottomSheetProps as GorhomProps,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";

export interface BottomSheetProps extends Partial<GorhomProps> {
  className?: string;
  children: React.ReactNode;
  snapPoints?: (string | number)[];
}

export const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>(
  ({ className, children, snapPoints = ["25%", "50%"], ...props }, ref) => {
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
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "hsl(0 0% 100%)" }}
        handleIndicatorStyle={{ backgroundColor: "hsl(240 3.8% 46.1%)" }}
        {...props}
      >
        <BottomSheetView>
          <View className={cn("p-4", className)}>{children}</View>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  }
);

BottomSheet.displayName = "BottomSheet";`;

export default function BottomSheetPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">BottomSheet</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bottom sheet overlay powered by @gorhom/bottom-sheet.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <PreviewBottomSheet />
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">snapPoints</td>
                <td className="px-4 py-3 font-mono text-xs">{`(string | number)[]`}</td>
                <td className="px-4 py-3 font-mono text-xs">{`["25%", "50%"]`}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
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
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@gorhom/bottom-sheet</code> props. Use a ref to control the sheet imperatively with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expand()</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">close()</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">snapToIndex()</code>.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/bottom-sheet.tsx" />
      </div>
    </div>
  );
}

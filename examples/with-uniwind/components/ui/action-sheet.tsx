import React, { forwardRef, useCallback } from "react";
import { View, Pressable, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
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

export const ActionSheet = forwardRef<BottomSheetModal, ActionSheetProps>(
  ({ className, title, actions, onCancel }, ref) => {
    const renderBackdrop = useCallback(
      (backdropProps: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        handleIndicatorStyle={{ backgroundColor: "#71717a" }}
      >
        <BottomSheetView>
          <View className={cn("pb-8 px-4", className)}>
            {title && <Text className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-3">{title}</Text>}
            {actions.map((action, i) => (
              <Pressable
                key={i}
                className="py-4 items-center border-b border-zinc-200 dark:border-zinc-800 min-h-12"
                onPress={action.onPress}
                accessible={true}
                accessibilityRole="button"
              >
                <Text className={cn("text-base font-medium", action.destructive ? "text-red-500 dark:text-red-900" : "text-zinc-950 dark:text-zinc-50")}>
                  {action.label}
                </Text>
              </Pressable>
            ))}
            {onCancel && (
              <Pressable className="py-4 items-center mt-2 min-h-12" onPress={onCancel} accessible={true} accessibilityRole="button">
                <Text className="text-base font-semibold text-zinc-500 dark:text-zinc-400">Cancel</Text>
              </Pressable>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

ActionSheet.displayName = "ActionSheet";

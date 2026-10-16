import React, { forwardRef, useCallback } from "react";
import { View, Pressable, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { useFoldFeatures } from "@/components/ui/fold";

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
  /** See BottomSheet's foldPane prop — same semantics. */
  foldPane?: "left" | "right" | "full";
}

export const ActionSheet = forwardRef<BottomSheetModal, ActionSheetProps>(
  ({ className, title, actions, onCancel, foldPane = "left" }, ref) => {
    const colors = useThemeColors();
    const fold = useFoldFeatures();
    const renderBackdrop = useCallback(
      (backdropProps: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    const foldClamp =
      fold.foldX && foldPane !== "full"
        ? { width: fold.foldX, left: foldPane === "right" ? fold.foldX : 0 }
        : undefined;

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.mutedForeground }}
        containerStyle={foldClamp}
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
      </BottomSheetModal>
    );
  }
);

ActionSheet.displayName = "ActionSheet";

import React, { forwardRef, useCallback } from "react";
import { View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { useFoldFeatures } from "@/components/ui/fold";

export interface BottomSheetProps {
  className?: string;
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  /**
   * On an unfolded iPhone Duo / foldable, clamp the sheet to one pane instead
   * of spanning the full screen width. Defaults to "left" (the OS treats the
   * left pane as primary). Set to "full" to opt out and keep the pre-fold
   * screen-wide behavior. Ignored on non-fold devices.
   */
  foldPane?: "left" | "right" | "full";
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ className, children, snapPoints = ["25%", "50%"], foldPane = "left", ...props }, ref) => {
    const colors = useThemeColors();
    const fold = useFoldFeatures();
    const renderBackdrop = useCallback(
      (backdropProps: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    // Fold-aware width clamp: on an unfolded Duo, inherit one pane's width
    // (foldX, which is window.width / 2). Pre-fold / non-Duo renders behave
    // identically to today because fold.foldX is null.
    const foldClamp =
      fold.foldX && foldPane !== "full"
        ? { width: fold.foldX, left: foldPane === "right" ? fold.foldX : 0 }
        : undefined;

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.mutedForeground }}
        containerStyle={foldClamp}
        {...props}
      >
        <BottomSheetView>
          <View className={cn("p-4", className)}>{children}</View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

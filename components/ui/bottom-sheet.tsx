import React, { forwardRef, useCallback } from "react";
import { View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";

export interface BottomSheetProps {
  className?: string;
  children: React.ReactNode;
  snapPoints?: (string | number)[];
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ className, children, snapPoints = ["25%", "50%"], ...props }, ref) => {
    const renderBackdrop = useCallback(
      (backdropProps: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "hsl(var(--card))" }}
        handleIndicatorStyle={{ backgroundColor: "hsl(var(--muted-foreground))" }}
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

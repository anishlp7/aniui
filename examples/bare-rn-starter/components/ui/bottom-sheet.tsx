import React, { forwardRef, useCallback } from "react";
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

BottomSheet.displayName = "BottomSheet";

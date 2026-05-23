import React, { createContext, useContext, useState, useCallback } from "react";
import { I18nManager, View } from "react-native";
import { cn } from "@/lib/utils";

type Direction = "ltr" | "rtl";

interface DirectionContextValue {
  direction: Direction;
  isRTL: boolean;
  setDirection: (dir: Direction) => void;
}

const DirectionContext = createContext<DirectionContextValue>({
  direction: I18nManager.isRTL ? "rtl" : "ltr",
  isRTL: I18nManager.isRTL,
  setDirection: () => {},
});

export function useDirection() {
  return useContext(DirectionContext);
}

export interface DirectionProviderProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  defaultDirection?: Direction;
  className?: string;
}

/**
 * Provides RTL/LTR direction context for the app.
 * Note: Calling setDirection updates context immediately, but the full
 * layout flip via I18nManager requires an app restart on React Native.
 */
export function DirectionProvider({
  children,
  defaultDirection,
  className,
  ...props
}: DirectionProviderProps) {
  const initial = defaultDirection ?? (I18nManager.isRTL ? "rtl" : "ltr");
  const [direction, setDir] = useState<Direction>(initial);

  const setDirection = useCallback((dir: Direction) => {
    setDir(dir);
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(dir === "rtl");
  }, []);

  return (
    <DirectionContext.Provider
      value={{ direction, isRTL: direction === "rtl", setDirection }}
    >
      <View className={cn("flex-1", className)} {...props}>
        {children}
      </View>
    </DirectionContext.Provider>
  );
}

import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

const StepsContext = createContext<{ current: number }>({ current: 0 });

export interface ProgressStepsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  current: number;
  children?: React.ReactNode;
}

export function ProgressSteps({ current, className, children, ...props }: ProgressStepsProps) {
  return (
    <StepsContext.Provider value={{ current }}>
      <View className={cn("flex-row items-center", className)} accessibilityRole="list" {...props}>
        {React.Children.map(children, (child, index) => (
          <>
            {index > 0 && (
              <View className={cn("flex-1 h-0.5 mx-2", index <= current ? "bg-zinc-900 dark:bg-zinc-50" : "bg-zinc-100 dark:bg-zinc-800")} />
            )}
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<{ _index?: number }>, { _index: index })
              : child}
          </>
        ))}
      </View>
    </StepsContext.Provider>
  );
}

export interface ProgressStepProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  _index?: number;
}

export function ProgressStep({ label, icon, className, _index = 0, ...props }: ProgressStepProps) {
  const { current } = useContext(StepsContext);
  const isCompleted = _index < current;
  const isActive = _index === current;

  return (
    <View className={cn("items-center gap-1", className)} accessibilityRole="listitem" {...props}>
      <View
        className={cn(
          "h-8 w-8 rounded-full items-center justify-center",
          isCompleted ? "bg-zinc-900 dark:bg-zinc-50" : isActive ? "border-2 border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-950" : "bg-zinc-100 dark:bg-zinc-800"
        )}
      >
        {icon ?? (
          <Text
            className={cn(
              "text-sm font-semibold",
              isCompleted ? "text-zinc-50 dark:text-zinc-900" : isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400"
            )}
          >
            {isCompleted ? "✓" : _index + 1}
          </Text>
        )}
      </View>
      {label && (
        <Text
          className={cn(
            "text-xs",
            isActive ? "text-zinc-900 dark:text-zinc-50 font-medium" : "text-zinc-500 dark:text-zinc-400"
          )}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

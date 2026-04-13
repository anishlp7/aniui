import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

type Orientation = "vertical" | "horizontal";

const FieldContext = createContext<{ orientation: Orientation }>({
  orientation: "vertical",
});

export interface FieldProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  orientation?: Orientation;
  children?: React.ReactNode;
}

export function Field({ orientation = "vertical", className, children, ...props }: FieldProps) {
  return (
    <FieldContext.Provider value={{ orientation }}>
      <View
        className={cn(
          orientation === "vertical" ? "gap-1.5" : "flex-row items-start gap-3",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </FieldContext.Provider>
  );
}

export interface FieldLabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  const { orientation } = useContext(FieldContext);
  return (
    <Text
      className={cn(
        "text-sm font-medium text-foreground",
        orientation === "horizontal" && "min-w-[100px] pt-3",
        className
      )}
      accessibilityRole="text"
      {...props}
    />
  );
}

export interface FieldDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <Text className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}

export interface FieldErrorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  errors?: string[];
  children?: React.ReactNode;
}

export function FieldError({ className, errors, children, ...props }: FieldErrorProps) {
  if (!errors?.length && !children) return null;

  return (
    <View className={cn("gap-0.5", className)} accessibilityRole="alert" {...props}>
      {errors?.map((err, i) => (
        <Text key={i} className="text-sm text-destructive">{err}</Text>
      ))}
      {children}
    </View>
  );
}

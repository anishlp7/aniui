import React, { createContext, useContext, useState, useCallback } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Focus context — container shows ring when child input is focused
const FocusCtx = createContext<{ focused: boolean; setFocused: (v: boolean) => void }>({
  focused: false,
  setFocused: () => {},
});

export interface InputGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function InputGroup({ className, children, ...props }: InputGroupProps) {
  const [focused, setFocused] = useState(false);
  return (
    <FocusCtx.Provider value={{ focused, setFocused }}>
      <View
        className={cn(
          "flex-row items-center rounded-md border bg-background",
          focused ? "border-ring ring-1 ring-ring" : "border-input",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </FocusCtx.Provider>
  );
}

export interface InputGroupAddonProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  align?: "start" | "end";
  children?: React.ReactNode;
}

export function InputGroupAddon({ className, align = "start", children, ...props }: InputGroupAddonProps) {
  return (
    <View
      className={cn(
        "items-center justify-center px-3 self-stretch bg-muted/40",
        align === "start" ? "border-e border-input rounded-s-md" : "border-s border-input rounded-e-md",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export interface InputGroupInputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

export function InputGroupInput({ className, onFocus, onBlur, ...props }: InputGroupInputProps) {
  const { setFocused } = useContext(FocusCtx);
  const handleFocus = useCallback((e: Parameters<NonNullable<typeof onFocus>>[0]) => {
    setFocused(true);
    onFocus?.(e);
  }, [setFocused, onFocus]);
  const handleBlur = useCallback((e: Parameters<NonNullable<typeof onBlur>>[0]) => {
    setFocused(false);
    onBlur?.(e);
  }, [setFocused, onBlur]);

  return (
    <TextInput
      className={cn("flex-1 min-h-12 px-3 text-base text-foreground", className)}
      placeholderTextColor="#71717a"
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}

export interface InputGroupTextareaProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

export function InputGroupTextarea({ className, onFocus, onBlur, ...props }: InputGroupTextareaProps) {
  const { setFocused } = useContext(FocusCtx);
  const handleFocus = useCallback((e: Parameters<NonNullable<typeof onFocus>>[0]) => {
    setFocused(true);
    onFocus?.(e);
  }, [setFocused, onFocus]);
  const handleBlur = useCallback((e: Parameters<NonNullable<typeof onBlur>>[0]) => {
    setFocused(false);
    onBlur?.(e);
  }, [setFocused, onBlur]);

  return (
    <TextInput
      className={cn("flex-1 min-h-24 px-3 py-3 text-base text-foreground", className)}
      placeholderTextColor="#71717a"
      multiline
      textAlignVertical="top"
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}

const buttonVariants = cva("items-center justify-center active:opacity-70", {
  variants: {
    size: {
      xs: "px-2.5 min-h-8",
      sm: "px-3 min-h-10",
      "icon-xs": "h-8 w-8",
      "icon-sm": "h-10 w-10",
    },
    variant: {
      ghost: "bg-transparent",
      default: "bg-primary rounded-md",
      secondary: "bg-secondary rounded-md",
      outline: "border border-input rounded-md",
    },
  },
  defaultVariants: { size: "xs", variant: "ghost" },
});

const buttonTextVariants = cva("text-xs font-medium", {
  variants: {
    variant: {
      ghost: "text-muted-foreground",
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
    },
  },
  defaultVariants: { variant: "ghost" },
});

export interface InputGroupButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export function InputGroupButton({
  className,
  textClassName,
  size,
  variant,
  children,
  ...props
}: InputGroupButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ size, variant }), className)}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn(buttonTextVariants({ variant }), textClassName)}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export interface InputGroupTextProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface InputGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function InputGroup({ className, children, ...props }: InputGroupProps) {
  return (
    <View
      className={cn("flex-row items-center rounded-md border border-input bg-background", className)}
      {...props}
    >
      {children}
    </View>
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
        "items-center justify-center px-3 self-stretch",
        align === "start" ? "border-e border-input" : "border-s border-input",
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

export function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <TextInput
      className={cn("flex-1 min-h-12 px-3 text-base text-foreground", className)}
      placeholderTextColor="#71717a"
      {...props}
    />
  );
}

export interface InputGroupButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function InputGroupButton({ className, children, ...props }: InputGroupButtonProps) {
  return (
    <Pressable
      className={cn(
        "items-center justify-center px-3 min-h-12 active:opacity-70",
        className
      )}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {children}
    </Pressable>
  );
}

export interface InputGroupTextProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <Text className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import { BadgeCheck } from "lucide-react-native";
import { cn } from "@/lib/utils";

export type VerifiedBadgePalette = {
  surface: string;
  border: string;
  name: string;
  handle: string;
  check: string;
  checkMark: string;
};

const DEFAULT_PALETTE: VerifiedBadgePalette = {
  surface: "transparent",
  border: "transparent",
  name: "#18181b",
  handle: "#71717a",
  check: "#2563eb",
  checkMark: "#ffffff",
};

export const VERIFIED_BADGE_EMERALD_PALETTE: VerifiedBadgePalette = {
  ...DEFAULT_PALETTE,
  check: "#10b981",
};

export const VERIFIED_BADGE_INK_PALETTE: VerifiedBadgePalette = {
  surface: "#131315",
  border: "#27272a",
  name: "#fafafa",
  handle: "#a1a1aa",
  check: "#fafafa",
  checkMark: "#131315",
};

type VerifiedBadgeContextValue = {
  palette: VerifiedBadgePalette;
  size: "sm" | "md";
};

const VerifiedBadgeContext = createContext<VerifiedBadgeContextValue | null>(null);

function useVerifiedBadgeContext(part: string): VerifiedBadgeContextValue {
  const ctx = useContext(VerifiedBadgeContext);
  if (!ctx) {
    throw new Error(`VerifiedBadge${part} must be rendered inside a <VerifiedBadge>`);
  }
  return ctx;
}

export interface VerifiedBadgeProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  palette?: Partial<VerifiedBadgePalette>;
  size?: "sm" | "md";
  label?: string;
}

export function VerifiedBadge({ className, palette, size = "md", label, style, children, ...props }: VerifiedBadgeProps) {
  const resolved: VerifiedBadgePalette = { ...DEFAULT_PALETTE, ...palette };
  const surfaceOverride = resolved.surface !== "transparent" ? resolved.surface : undefined;
  const borderOverride = resolved.border !== "transparent" ? resolved.border : undefined;

  return (
    <VerifiedBadgeContext.Provider value={{ palette: resolved, size }}>
      <View
        className={cn(
          "flex-row items-center rounded-full border border-border bg-secondary/50",
          size === "sm" ? "gap-1 px-2 py-0.5" : "gap-1.5 px-2.5 py-1",
          className
        )}
        style={[
          surfaceOverride || borderOverride ? { backgroundColor: surfaceOverride, borderColor: borderOverride } : undefined,
          style,
        ]}
        accessibilityRole="text"
        accessibilityLabel={label ?? "Verified"}
        {...props}
      >
        {children}
      </View>
    </VerifiedBadgeContext.Provider>
  );
}

export interface VerifiedBadgeContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export function VerifiedBadgeContent({ className, ...props }: VerifiedBadgeContentProps) {
  return <View className={cn("flex-col shrink", className)} {...props} />;
}

export interface VerifiedBadgeNameProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function VerifiedBadgeName({ className, style, numberOfLines = 1, ...props }: VerifiedBadgeNameProps) {
  const { palette, size } = useVerifiedBadgeContext("Name");
  return (
    <Text
      className={cn("font-semibold text-foreground", size === "sm" ? "text-xs" : "text-sm", className)}
      style={[{ color: palette.name }, style]}
      numberOfLines={numberOfLines}
      {...props}
    />
  );
}

export interface VerifiedBadgeHandleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function VerifiedBadgeHandle({ className, style, numberOfLines = 1, ...props }: VerifiedBadgeHandleProps) {
  const { palette, size } = useVerifiedBadgeContext("Handle");
  return (
    <Text
      className={cn("text-muted-foreground", size === "sm" ? "text-[10px]" : "text-xs", className)}
      style={[{ color: palette.handle }, style]}
      numberOfLines={numberOfLines}
      {...props}
    />
  );
}

export interface VerifiedBadgeCheckProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label?: string;
}

export function VerifiedBadgeCheck({ className, label, ...props }: VerifiedBadgeCheckProps) {
  const { palette, size } = useVerifiedBadgeContext("Check");
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <View className={className} accessible accessibilityRole="image" accessibilityLabel={label ?? "Verified"} {...props}>
      <BadgeCheck
        size={iconSize}
        fill={palette.check}
        color={palette.checkMark}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </View>
  );
}

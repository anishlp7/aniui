import React, { createContext, useContext, useMemo } from "react";
import { View, Text } from "react-native";
import { Ticket } from "lucide-react-native";
import { cn } from "@/lib/utils";

export interface CouponPalette {
  surface: string;
  border: string;
  code: string;
  icon: string;
  accent: string;
  accentLabel: string;
}

export const COUPON_DEFAULT_PALETTE: CouponPalette = {
  surface: "#FFFFFF",
  border: "#E4E4E7",
  code: "#18181B",
  icon: "#71717A",
  accent: "#FFE4E6",
  accentLabel: "#BE123C",
};

export const COUPON_EMERALD_PALETTE: CouponPalette = {
  surface: "#FFFFFF",
  border: "#E4E4E7",
  code: "#18181B",
  icon: "#71717A",
  accent: "#D1FAE5",
  accentLabel: "#047857",
};

export const COUPON_INK_PALETTE: CouponPalette = {
  surface: "#18181B",
  border: "#3F3F46",
  code: "#FAFAFA",
  icon: "#A1A1AA",
  accent: "#FAFAFA",
  accentLabel: "#18181B",
};

type CouponOrientation = "horizontal" | "vertical";
type CouponBorderStyle = "dashed" | "solid";

interface CouponContextValue {
  palette: CouponPalette;
  orientation: CouponOrientation;
  border: CouponBorderStyle;
  borderWidth: number;
}

const CouponContext = createContext<CouponContextValue | null>(null);

function useCouponContext(component: string): CouponContextValue {
  const ctx = useContext(CouponContext);
  if (!ctx) throw new Error(`<${component} /> must be rendered inside a <Coupon> root.`);
  return ctx;
}

export interface CouponProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  palette?: Partial<CouponPalette>;
  orientation?: CouponOrientation;
  border?: CouponBorderStyle;
  borderWidth?: number;
  radius?: number;
  /** Shorthand fields — used only when no `children` are composed. */
  code?: string;
  discount?: string;
  description?: string;
  expires?: string;
}

export function Coupon({
  className,
  children,
  palette,
  orientation = "horizontal",
  border = "dashed",
  borderWidth = 2,
  radius = 10,
  code,
  discount,
  description,
  expires,
  ...props
}: CouponProps) {
  const mergedPalette = useMemo<CouponPalette>(() => ({ ...COUPON_DEFAULT_PALETTE, ...palette }), [palette]);
  const contextValue = useMemo<CouponContextValue>(
    () => ({ palette: mergedPalette, orientation, border, borderWidth }),
    [mergedPalette, orientation, border, borderWidth]
  );
  const hasShorthand = !children && (discount !== undefined || code !== undefined);

  return (
    <CouponContext.Provider value={contextValue}>
      <View
        className={cn("overflow-hidden", orientation === "vertical" ? "flex-col" : "flex-row", className)}
        style={{
          backgroundColor: mergedPalette.surface,
          borderColor: mergedPalette.border,
          borderStyle: border,
          borderWidth,
          borderRadius: radius,
        }}
        accessibilityRole="summary"
        {...props}
      >
        {hasShorthand ? (
          <>
            <CouponDiscount>
              {discount}
              {description ? (
                <Text className="text-xs font-normal normal-case tracking-normal">{`\n${description}`}</Text>
              ) : null}
            </CouponDiscount>
            <CouponCode>
              {code}
              {expires ? (
                <Text className="text-[10px] font-normal tracking-normal opacity-70">{`\n Expires ${expires}`}</Text>
              ) : null}
            </CouponCode>
          </>
        ) : (
          children
        )}
      </View>
    </CouponContext.Provider>
  );
}

export interface CouponSectionProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  accented?: boolean;
}

export function CouponSection({ className, accented, children, ...props }: CouponSectionProps) {
  const { palette } = useCouponContext("CouponSection");
  return (
    <View
      className={cn("flex-1 items-center justify-center px-3 py-3", className)}
      style={accented ? { backgroundColor: palette.accent } : undefined}
      {...props}
    >
      {children}
    </View>
  );
}

export interface CouponDividerProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

/** The tear-line perforation between two `CouponSection`s. Decorative — hidden from accessibility. */
export function CouponDivider({ className, ...props }: CouponDividerProps) {
  const { palette, orientation, border, borderWidth } = useCouponContext("CouponDivider");
  return (
    <View
      className={cn(
        orientation === "vertical" ? "w-full self-stretch border-t" : "h-full self-stretch border-l",
        border === "dashed" ? "border-dashed" : "border-solid",
        className
      )}
      style={{
        borderColor: palette.border,
        ...(orientation === "vertical" ? { borderTopWidth: borderWidth } : { borderLeftWidth: borderWidth }),
      }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      {...props}
    />
  );
}

export interface CouponDiscountProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  textClassName?: string;
  numberOfLines?: number;
  children?: React.ReactNode;
}

/** The accent-colored discount panel. Carries the tear-line on its own trailing edge. */
export function CouponDiscount({ className, textClassName, numberOfLines, children, ...props }: CouponDiscountProps) {
  const { palette, orientation, border, borderWidth } = useCouponContext("CouponDiscount");
  return (
    <View
      className={cn(
        "flex-1 items-center justify-center px-3 py-3",
        orientation === "vertical" ? "border-b" : "border-r",
        border === "dashed" ? "border-dashed" : "border-solid",
        className
      )}
      style={{
        backgroundColor: palette.accent,
        borderColor: palette.border,
        ...(orientation === "vertical" ? { borderBottomWidth: borderWidth } : { borderRightWidth: borderWidth }),
      }}
      {...props}
    >
      <Text
        numberOfLines={numberOfLines}
        className={cn("text-center text-lg font-bold uppercase tracking-wide", textClassName)}
        style={{ color: palette.accentLabel }}
      >
        {children}
      </Text>
    </View>
  );
}

export interface CouponCodeProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  textClassName?: string;
  numberOfLines?: number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/** The code panel. Renders a ticket glyph beside a monospaced promo code. */
export function CouponCode({ className, textClassName, numberOfLines, icon, children, ...props }: CouponCodeProps) {
  const { palette } = useCouponContext("CouponCode");
  return (
    <View className={cn("flex-1 flex-row items-center justify-center gap-2 px-3 py-3", className)} {...props}>
      {icon ?? <Ticket size={16} color={palette.icon} strokeWidth={2} />}
      <Text
        numberOfLines={numberOfLines}
        className={cn("font-mono text-sm font-semibold tracking-widest", textClassName)}
        style={{ color: palette.code }}
      >
        {children}
      </Text>
    </View>
  );
}

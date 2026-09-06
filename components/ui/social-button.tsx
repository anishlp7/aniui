import React from "react";
import { Pressable, Text, type GestureResponderEvent } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, type WithSpringConfig } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type SocialProvider = "google" | "apple" | "github" | "twitter";
export type SocialButtonVariant = "outline" | "filled" | "ghost";

const PRESS_SPRING: WithSpringConfig = { damping: 18, stiffness: 320, mass: 0.5 };
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --- Brand marks -----------------------------------------------------------
// `color` flattens every path in a mark to one tone (used for the "filled"
// variant's on-brand-surface silhouette); omit it to keep each mark's own
// brand-accurate colors (used for "outline"/"ghost").
export interface SocialMarkProps {
  size?: number;
  color?: string;
}

// Confidence: HIGH — this is Google's own widely-published 4-color "G"
// lockup (the same geometry used in Google's official Sign-in button
// assets), reproduced independently from public knowledge, not from reacticx's file.
function GoogleMark({ size = 20, color }: SocialMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Path fill={color ?? "#4285F4"} d="M17.64 9.2045c0-.6381-.0573-1.2527-.1636-1.8409H9v3.4818h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.8749 2.6836-6.6154z" />
      <Path fill={color ?? "#34A853"} d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.8591-3.0477.8591-2.3441 0-4.3282-1.5832-5.0359-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z" />
      <Path fill={color ?? "#FBBC05"} d="M3.9641 10.71c-.18-.54-.2827-1.1168-.2827-1.71s.1027-1.17.2827-1.71V4.9582H.9573C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9573 4.0418L3.9641 10.71z" />
      <Path fill={color ?? "#EA4335"} d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.9641 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z" />
    </Svg>
  );
}

// Confidence: HIGH — the classic single-path GitHub "octocat" mark, the
// same silhouette geometry GitHub itself ships (octicons `mark-github`).
function GitHubMark({ size = 20, color }: SocialMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        fill={color ?? "#181717"}
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </Svg>
  );
}

// Confidence: HIGH — the bold crossing-strokes "X" glyph (post-rebrand
// Twitter/X wordmark), a simple geometric mark reproduced from public
// knowledge of the shape, not transcribed from reacticx's file.
function XMark({ size = 20, color }: SocialMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color ?? "#000000"}
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </Svg>
  );
}

// Confidence: LOW / BEST-EFFORT PLACEHOLDER — this is a hand-constructed,
// deliberately simplified apple silhouette (rounded twin-lobe body tapering
// to a point, plus a separate stem + leaf), NOT a verified redraw of Apple's
// official press-kit bezier geometry (that path has many precise control
// points I can't reproduce from memory with confidence, and lucide's own
// "Apple" icon is the fruit emoji glyph, not the brand mark, so it isn't a
// usable fallback either). Recommend a follow-up pass swapping this for
// path data verified against Apple's official brand assets.
function AppleMark({ size = 20, color }: SocialMarkProps) {
  const fill = color ?? "#000000";
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={fill} d="M11.5 4.2c0-1.1.4-2.1 1.1-2.9.5.9.3 2.3-1.1 2.9z" />
      <Path fill={fill} d="M13 3c1.6-.3 3 .8 3.2 2.3-1.6.3-3-.8-3.2-2.3z" />
      <Path
        fill={fill}
        d="M12 8c-1.5-1.2-3.3-1.8-5-1.5-2.3.4-4.2 2.6-4.2 5.5 0 5 3.7 9 6 9 1 0 1.5-.6 2.1-.6.6 0 1.1.6 2.1.6 2.1 0 4.3-3.1 5.5-6-1.9-.9-3.1-2.9-3.1-5 0-1 .3-1.9.8-2.7-1-1.2-2.3-1.8-3.6-1.8-.3 0-.5.2-.6.5z"
      />
    </Svg>
  );
}

const BRAND_MARKS: Record<SocialProvider, (props: SocialMarkProps) => React.ReactElement> = {
  google: GoogleMark,
  apple: AppleMark,
  github: GitHubMark,
  twitter: XMark,
};

const BRAND_LABELS: Record<SocialProvider, string> = {
  google: "Continue with Google",
  apple: "Continue with Apple",
  github: "Continue with GitHub",
  twitter: "Continue with X",
};

// Provider brand color used only for the "filled" surface/border/icon — Google
// is deliberately excluded (its brand surface is already white, so "filled"
// falls back to the same look as "outline" instead of a solid brand block).
const BRAND_FILLED: Record<Exclude<SocialProvider, "google">, { surface: string; border: string }> = {
  apple: { surface: "bg-[#000000]", border: "border-[#000000]" },
  github: { surface: "bg-[#181717]", border: "border-[#181717]" },
  twitter: { surface: "bg-[#000000]", border: "border-[#000000]" },
};

interface SocialPalette {
  surface: string;
  border: string;
  label: string;
  icon?: string;
}

function paletteFor(provider: SocialProvider, variant: SocialButtonVariant): SocialPalette {
  if (variant === "filled") {
    if (provider === "google") {
      return { surface: "bg-background", border: "border-border", label: "text-foreground" };
    }
    const brand = BRAND_FILLED[provider];
    return { surface: brand.surface, border: brand.border, label: "text-white", icon: "#FFFFFF" };
  }
  if (variant === "ghost") {
    return { surface: "bg-transparent", border: "border-transparent", label: "text-foreground" };
  }
  return { surface: "bg-background", border: "border-border", label: "text-foreground" }; // outline (default)
}

const socialButtonVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-lg border min-h-12 px-4",
  {
    variants: { size: { sm: "h-10", md: "h-12", lg: "h-14" } },
    defaultVariants: { size: "md" },
  }
);

const labelVariants = cva("text-sm font-semibold");

export interface SocialButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof socialButtonVariants> {
  className?: string;
  provider?: SocialProvider;
  variant?: SocialButtonVariant;
  label?: string;
  icon?: React.ReactNode;
}

export function SocialButton({
  provider,
  variant,
  size,
  className,
  label,
  icon,
  disabled,
  onPressIn,
  onPressOut,
  ...props
}: SocialButtonProps) {
  const p = provider ?? "google";
  const v = variant ?? "outline";
  const palette = paletteFor(p, v);
  const Mark = BRAND_MARKS[p];
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePressIn = (e: GestureResponderEvent) => {
    scale.value = withSpring(0.97, PRESS_SPRING);
    onPressIn?.(e);
  };
  const handlePressOut = (e: GestureResponderEvent) => {
    scale.value = withSpring(1, PRESS_SPRING);
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={cn(
        socialButtonVariants({ size }),
        palette.surface,
        palette.border,
        disabled && "opacity-50",
        className
      )}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityLabel={label ?? BRAND_LABELS[p]}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      {icon ?? <Mark size={20} color={palette.icon} />}
      <Text className={cn(labelVariants(), palette.label)}>{label ?? BRAND_LABELS[p]}</Text>
    </AnimatedPressable>
  );
}

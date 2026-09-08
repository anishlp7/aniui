import React, { createContext, useContext } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  useColorScheme,
  type ImageSourcePropType,
  type GestureResponderEvent,
} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { MapPin } from "lucide-react-native";
import { cn } from "@/lib/utils";

// Signature-look defaults, close to the reference design this component is
// modeled after: a warm outline frame, a short cover band, and an avatar that
// straddles the cover/body seam near the top-right corner.
const CARD_RADIUS = 34;
const OUTLINE_WIDTH = 10;
const COVER_HEIGHT = 108;
const COVER_BOTTOM_RADIUS = 20;
const ACTION_RADIUS = 14;
const AVATAR_SIZE = 60;
const AVATAR_RADIUS = 18;
const AVATAR_RING = 3;
const AVATAR_INSET = 16;
const AVATAR_OVERLAP = 0.45;

export interface ProfileCardSpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
}

const PRESS_SPRING: ProfileCardSpringConfig = { damping: 18, stiffness: 320, mass: 0.5 };

export interface ProfileCardPalette {
  surface: string;
  cover: string;
  name: string;
  handle: string;
  bio: string;
  location: string;
  action: string;
  actionLabel: string;
  avatarRing: string;
  outline: string;
}

const LIGHT_PALETTE: ProfileCardPalette = {
  surface: "#FAF7F0",
  cover: "#F4F4F5",
  name: "#18181B",
  handle: "#A1A1AA",
  bio: "#3F3F46",
  location: "#52525B",
  action: "#EDE9DD",
  actionLabel: "#18181B",
  avatarRing: "#FAF7F0",
  outline: "#FFFFFF",
};

const DARK_PALETTE: ProfileCardPalette = {
  surface: "#131315",
  cover: "#1C1C1F",
  name: "#FAFAFA",
  handle: "#71717A",
  bio: "#D4D4D8",
  location: "#A1A1AA",
  action: "#26262A",
  actionLabel: "#FAFAFA",
  avatarRing: "#131315",
  outline: "#0B0B0C",
};

interface ProfileCardContextValue {
  palette: ProfileCardPalette;
  coverHeight: number;
  springConfig: ProfileCardSpringConfig;
}

const ProfileCardContext = createContext<ProfileCardContextValue | null>(null);

function useProfileCard() {
  const ctx = useContext(ProfileCardContext);
  if (!ctx) throw new Error("ProfileCard.* components must be rendered inside <ProfileCard>");
  return ctx;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Root — the outline-frame construction: an outer View padded by
// `outlineWidth` and filled with `palette.outline` sits behind an inner
// surface View whose radius is exactly `radius - outlineWidth`, so the two
// curves stay concentric no matter how the radius is customized.
export interface ProfileCardProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  palette?: Partial<ProfileCardPalette>;
  radius?: number;
  outlineWidth?: number;
  innerRadius?: number;
  coverHeight?: number;
  springConfig?: ProfileCardSpringConfig;
  children?: React.ReactNode;
}

export function ProfileCard({
  className,
  palette,
  radius = CARD_RADIUS,
  outlineWidth = OUTLINE_WIDTH,
  innerRadius,
  coverHeight = COVER_HEIGHT,
  springConfig = PRESS_SPRING,
  children,
  ...props
}: ProfileCardProps) {
  const isDark = useColorScheme() === "dark";
  const resolvedPalette = { ...(isDark ? DARK_PALETTE : LIGHT_PALETTE), ...palette };
  const resolvedInnerRadius = innerRadius ?? radius - outlineWidth;

  return (
    <ProfileCardContext.Provider value={{ palette: resolvedPalette, coverHeight, springConfig }}>
      <View
        className={cn("w-full", className)}
        style={{ padding: outlineWidth, borderRadius: radius, backgroundColor: resolvedPalette.outline }}
        accessibilityRole="summary"
        {...props}
      >
        <View
          className="relative"
          style={{ borderRadius: resolvedInnerRadius, backgroundColor: resolvedPalette.surface }}
        >
          {children}
        </View>
      </View>
    </ProfileCardContext.Provider>
  );
}

// Cover — only the bottom corners round (the top corners are already square
// against the surface's own rounded top edge from the outline frame above).
export interface ProfileCardCoverProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  source?: ImageSourcePropType;
  bottomRadius?: number;
  children?: React.ReactNode;
}

export function ProfileCardCover({
  className,
  source,
  bottomRadius = COVER_BOTTOM_RADIUS,
  children,
  ...props
}: ProfileCardCoverProps) {
  const { palette, coverHeight } = useProfileCard();

  return (
    <View
      className={cn("overflow-hidden", className)}
      style={{
        height: coverHeight,
        borderBottomLeftRadius: bottomRadius,
        borderBottomRightRadius: bottomRadius,
        backgroundColor: palette.cover,
      }}
      {...props}
    >
      {source ? <Image source={source} className="absolute inset-0 h-full w-full" resizeMode="cover" /> : null}
      {children}
    </View>
  );
}

// Avatar — the signature overlap math: with the default cover height (108),
// size (60) and overlap share (0.45), `top = 108 - 60*0.55 = 75`, which
// leaves 33px (55%) of the avatar sitting up inside the cover band and the
// remaining 45% hanging down into the body below.
export interface ProfileCardAvatarProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  source?: string;
  fallback?: string;
  size?: number;
  overlap?: number;
  inset?: number;
  radius?: number;
  ring?: number;
}

export function ProfileCardAvatar({
  className,
  source,
  fallback,
  size = AVATAR_SIZE,
  overlap = AVATAR_OVERLAP,
  inset = AVATAR_INSET,
  radius = AVATAR_RADIUS,
  ring = AVATAR_RING,
  ...props
}: ProfileCardAvatarProps) {
  const { palette, coverHeight } = useProfileCard();
  const top = coverHeight - size * (1 - overlap);

  return (
    <View
      className={cn("items-center justify-center overflow-hidden bg-muted", className)}
      style={{
        position: "absolute",
        top,
        right: inset,
        width: size,
        height: size,
        borderRadius: radius,
        borderWidth: ring,
        borderColor: palette.avatarRing,
        zIndex: 10,
      }}
      accessibilityRole="image"
      {...props}
    >
      {source ? (
        <Image source={{ uri: source }} className="h-full w-full" resizeMode="cover" />
      ) : (
        <Text className="text-sm font-medium text-muted-foreground">{fallback ?? "?"}</Text>
      )}
    </View>
  );
}

export interface ProfileCardBodyProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function ProfileCardBody({ className, children, ...props }: ProfileCardBodyProps) {
  return (
    <View className={cn("gap-2.5 p-4", className)} {...props}>
      {children}
    </View>
  );
}

// Header — name + handle on a baseline-aligned row, combined into one export
// rather than three separate Header/Name/Handle pieces.
export interface ProfileCardHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  name: string;
  handle?: string;
}

export function ProfileCardHeader({ className, name, handle, ...props }: ProfileCardHeaderProps) {
  const { palette } = useProfileCard();

  return (
    <View className={cn("flex-row items-baseline gap-2", className)} {...props}>
      <Text className="shrink text-[19px] font-bold" style={{ color: palette.name }}>
        {name}
      </Text>
      {handle ? (
        <Text className="shrink text-xs" style={{ color: palette.handle }}>
          {handle}
        </Text>
      ) : null}
    </View>
  );
}

export interface ProfileCardBioProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
  children: string;
}

export function ProfileCardBio({ className, children, ...props }: ProfileCardBioProps) {
  const { palette } = useProfileCard();

  return (
    <Text className={cn("text-sm leading-5", className)} style={{ color: palette.bio }} {...props}>
      {children}
    </Text>
  );
}

// Location — icon + text row; defaults to lucide's MapPin but accepts any
// override via `icon` for a caller that wants a different glyph.
export interface ProfileCardLocationProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label: string;
  icon?: React.ReactNode;
}

export function ProfileCardLocation({ className, label, icon, ...props }: ProfileCardLocationProps) {
  const { palette } = useProfileCard();

  return (
    <View className={cn("flex-row items-center gap-1.5", className)} {...props}>
      {icon ?? <MapPin size={14} color={palette.location} strokeWidth={2} />}
      <Text className="text-xs" style={{ color: palette.location }}>
        {label}
      </Text>
    </View>
  );
}

// Action — a Pressable that springs to 0.97 scale on press-in and back to 1
// on press-out/press-cancel, driven by react-native-reanimated.
export interface ProfileCardActionProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  label: string;
  radius?: number;
}

export function ProfileCardAction({
  className,
  label,
  radius = ACTION_RADIUS,
  disabled,
  onPressIn,
  onPressOut,
  ...props
}: ProfileCardActionProps) {
  const { palette, springConfig } = useProfileCard();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      className={cn("min-h-12 min-w-12 items-center justify-center py-3", disabled && "opacity-50", className)}
      style={[{ borderRadius: radius, backgroundColor: palette.action }, animatedStyle]}
      accessibilityRole="button"
      accessible
      disabled={disabled}
      onPressIn={(event: GestureResponderEvent) => {
        scale.value = withSpring(0.97, springConfig);
        onPressIn?.(event);
      }}
      onPressOut={(event: GestureResponderEvent) => {
        scale.value = withSpring(1, springConfig);
        onPressOut?.(event);
      }}
      {...props}
    >
      <Text className="text-[15px] font-semibold" style={{ color: palette.actionLabel }}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

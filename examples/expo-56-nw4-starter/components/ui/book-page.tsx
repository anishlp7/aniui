import React, { createContext, useContext, useId, useMemo } from "react";
import { View, Text, Image, Platform } from "react-native";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import Svg, { Defs, Pattern, Rect } from "react-native-svg";
import { cn } from "@/lib/utils";

// Layout constants (mirrors a real hardcover: a narrow spine, inset pages, a
// tighter radius on the spine-side corners than the outer corners).
const BOOK_PAGE_WIDTH = 240;
const BOOK_PAGE_ASPECT_RATIO = 3 / 4;
const BOOK_PAGE_PERSPECTIVE = 1000;
const PAGE_BLEED = 6;
const PAGE_INSET = 4;
const PAGE_SPINE_INSET = 12;
const PAGE_LINE = 3;
const PAGE_GAP = 1;
const COVER_SPINE_WIDTH = 10;
const COVER_RADIUS = 6;
const COVER_SPINE_RADIUS = 2;

const BOOK_PAGE_SERIF_FONT = Platform.select({ ios: "Georgia", android: "serif", default: "serif" });
const BOOK_PAGE_MONO_FONT = Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" });

export type BookPagePalette = {
  cover: string;
  coverText: string;
  spine: string;
  page: string;
  pageEdge: string;
  rule: string;
};

/** Dark cloth-bound cover — the default. */
export const BOOK_PAGE_DARK_PALETTE: BookPagePalette = {
  cover: "#18181B",
  coverText: "#FFFFFF",
  spine: "rgba(0,0,0,0.25)",
  page: "#FFFFFF",
  pageEdge: "#E4E4E7",
  rule: "rgba(255,255,255,0.2)",
};

/** Cream paperback cover. */
export const BOOK_PAGE_PAPER_PALETTE: BookPagePalette = {
  cover: "#FFFBEB",
  coverText: "#18181B",
  spine: "rgba(0,0,0,0.12)",
  page: "#FFFFFF",
  pageEdge: "#E4E4E7",
  rule: "rgba(0,0,0,0.2)",
};

interface BookPageContextValue {
  palette: BookPagePalette;
  width: number;
  openAngle: number;
}

const BookPageContext = createContext<BookPageContextValue | null>(null);

function useBookPageContext(componentName: string): BookPageContextValue {
  const context = useContext(BookPageContext);
  if (!context) {
    throw new Error(`<${componentName} /> must be rendered inside a <BookPage> root.`);
  }
  return context;
}

export interface BookPageProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  /** Overrides for the default (dark) palette — merge in BOOK_PAGE_PAPER_PALETTE for a paperback look. */
  palette?: Partial<BookPagePalette>;
  width?: number;
  aspectRatio?: number;
  /** Degrees the cover has swung open around its spine hinge. 0 = closed (default). */
  openAngle?: number;
  /** Depth of the 3D perspective applied while the cover is open. Ignored when openAngle is 0. */
  perspective?: number;
}

export function BookPage({
  className,
  children,
  palette,
  width = BOOK_PAGE_WIDTH,
  aspectRatio = BOOK_PAGE_ASPECT_RATIO,
  openAngle = 0,
  perspective = BOOK_PAGE_PERSPECTIVE,
  style,
  ...props
}: BookPageProps) {
  const resolvedPalette = useMemo<BookPagePalette>(
    () => ({ ...BOOK_PAGE_DARK_PALETTE, ...palette }),
    [palette]
  );
  const contextValue = useMemo<BookPageContextValue>(
    () => ({ palette: resolvedPalette, width, openAngle }),
    [resolvedPalette, width, openAngle]
  );

  return (
    <BookPageContext.Provider value={contextValue}>
      <View
        className={cn("relative", className)}
        style={[
          { width, aspectRatio },
          openAngle !== 0 ? { transform: [{ perspective }] } : null,
          style,
        ]}
        accessibilityRole="summary"
        {...props}
      >
        {children}
      </View>
    </BookPageContext.Provider>
  );
}

export interface BookPagePagesProps extends Omit<React.ComponentPropsWithoutRef<typeof View>, "children"> {
  className?: string;
  /** How far the page stack peeks out past the cover's right edge. */
  bleed?: number;
  /** Vertical inset from the top/bottom of the cover. */
  inset?: number;
  /** How far the page stack is tucked in from the spine, so it's revealed as the cover opens. */
  spineInset?: number;
}

/**
 * The page-edge texture that sits behind the cover. A tiled two-tone
 * horizontal-line pattern reads as a stack of paper edges once the cover
 * rotates open. Purely decorative — hidden from screen readers.
 */
export function BookPagePages({
  className,
  style,
  bleed = PAGE_BLEED,
  inset = PAGE_INSET,
  spineInset = PAGE_SPINE_INSET,
  ...props
}: BookPagePagesProps) {
  const { palette } = useBookPageContext("BookPagePages");
  const rawPatternId = useId();
  const patternId = `book-page-pages-${rawPatternId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const tileHeight = PAGE_LINE + PAGE_GAP;

  return (
    <View
      className={cn("absolute", className)}
      style={[{ top: inset, bottom: inset, left: spineInset, right: -bleed }, style as StyleProp<ViewStyle>]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      {...props}
    >
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id={patternId} patternUnits="userSpaceOnUse" width={4} height={tileHeight}>
            <Rect x={0} y={0} width={4} height={PAGE_LINE} fill={palette.page} />
            <Rect x={0} y={PAGE_LINE} width={4} height={PAGE_GAP} fill={palette.pageEdge} />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    </View>
  );
}

export interface BookPageCoverProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  source?: ImageSourcePropType;
  alt?: string;
  /** Darkening wash over the cover image so text stays legible. Approximated with layered translucent Views (no gradient dependency). Default true. */
  scrim?: boolean;
  spineWidth?: number;
  /** Corner radius for the outer (non-spine) edge of the cover. */
  radius?: number;
}

/**
 * The cover: an image (optional) + scrim + spine shadow + slotted text,
 * hinged around its left (spine) edge so `openAngle` reads as a book cover
 * swinging open rather than a card spinning in place.
 */
export function BookPageCover({
  className,
  children,
  source,
  alt,
  scrim = true,
  spineWidth = COVER_SPINE_WIDTH,
  radius = COVER_RADIUS,
  style,
  ...props
}: BookPageCoverProps) {
  const { palette, width, openAngle } = useBookPageContext("BookPageCover");

  // Rotating a View rotates around its own center by default. Translating by
  // half the width before and after the rotation shifts the pivot to the
  // left edge — the spine — instead.
  const hinge =
    openAngle === 0
      ? null
      : { transform: [{ translateX: -width / 2 }, { rotateY: `${-openAngle}deg` }, { translateX: width / 2 }] };

  return (
    <View
      className={cn("absolute inset-0 justify-between overflow-hidden p-4", className)}
      style={[
        {
          backgroundColor: palette.cover,
          borderTopLeftRadius: COVER_SPINE_RADIUS,
          borderBottomLeftRadius: COVER_SPINE_RADIUS,
          borderTopRightRadius: radius,
          borderBottomRightRadius: radius,
        },
        hinge,
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    >
      {source ? (
        <Image
          source={source}
          accessibilityLabel={alt}
          resizeMode="cover"
          className="absolute inset-0 h-full w-full"
        />
      ) : null}
      {scrim ? (
        <>
          {/* Fidelity note: reacticx uses a top-to-bottom expo-linear-gradient
              scrim (transparent -> 10% -> 70% black) so cover text stays
              legible over any image. AniUI avoids adding expo-linear-gradient
              for a single consumer, so this is approximated with two flat
              translucent layers instead of a true fade. */}
          <View className="absolute inset-0 bg-black/10" />
          <View className="absolute inset-x-0 bottom-0 h-1/2 bg-black/40" />
        </>
      ) : null}
      {/* Spine shadow: reacticx fades this left-to-right with a gradient; here
          it's a single flat translucent strip along the spine edge. */}
      <View
        className="absolute inset-y-0 left-0"
        style={{ width: spineWidth, backgroundColor: palette.spine }}
      />
      {children}
    </View>
  );
}

export interface BookPageAuthorProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
  children?: React.ReactNode;
}

/** Small-caps-style byline, rendered at the top of the cover. */
export function BookPageAuthor({ className, style, ...props }: BookPageAuthorProps) {
  const { palette } = useBookPageContext("BookPageAuthor");
  return (
    <Text
      className={cn("text-xs uppercase opacity-70", className)}
      style={[{ color: palette.coverText, fontFamily: BOOK_PAGE_MONO_FONT, letterSpacing: 2 }, style]}
      {...props}
    />
  );
}

export interface BookPageTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
  children?: React.ReactNode;
  numberOfLines?: number;
}

/** Large serif title, the cover's focal text. */
export function BookPageTitle({ className, style, ...props }: BookPageTitleProps) {
  const { palette } = useBookPageContext("BookPageTitle");
  return (
    <Text
      className={cn("text-2xl font-bold", className)}
      style={[
        { color: palette.coverText, fontFamily: BOOK_PAGE_SERIF_FONT, lineHeight: 28, letterSpacing: -0.4 },
        style,
      ]}
      {...props}
    />
  );
}

export interface BookPageNoteProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
  children?: React.ReactNode;
}

/** Small printed-edition/ISBN-style note, ruled off from the title above it. */
export function BookPageNote({ className, style, ...props }: BookPageNoteProps) {
  const { palette } = useBookPageContext("BookPageNote");
  return (
    <Text
      className={cn("border-t pt-2 text-xs", className)}
      style={[{ color: palette.coverText, fontFamily: BOOK_PAGE_MONO_FONT, borderTopColor: palette.rule }, style]}
      {...props}
    />
  );
}

export interface BookPageFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

/** Stacks Title/Note (or any children) at the bottom of the cover — Cover is justify-between, so Footer settles below Author. */
export function BookPageFooter({ className, ...props }: BookPageFooterProps) {
  return <View className={cn("gap-3", className)} {...props} />;
}

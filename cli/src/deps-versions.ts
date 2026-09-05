/**
 * deps-versions.ts — single source of truth for the native/animation dependency
 * versions AniUI pins per Expo SDK generation.
 *
 * This does NOT drive `aniui init`'s install commands for React Native packages
 * (reanimated, worklets, safe-area-context, svg) — those are deliberately
 * version-unpinned in cli/src/commands/init.ts and resolved via `expo install`,
 * which already knows the correct version for the user's installed Expo SDK.
 * Duplicating that here would just be a second, staler copy of what Expo itself
 * already maintains.
 *
 * What this manifest IS for: the concrete pins that live in committed,
 * non-regenerated files — the example apps' package.json files, the root
 * package.json (Jest test harness), and the docs compatibility page's version
 * matrix — so bumping a dependency means updating one file instead of hunting
 * across ~10 of them. See CLAUDE.md's "Locked Dependency Versions" section,
 * which points here as its source of truth.
 */

export type SdkBucket = "sdk54" | "sdk55" | "sdk56" | "sdk57" | "bare";

export interface VersionSet {
  reanimated: string;
  /** Absent pre-SDK56 — not yet a separate peer of Reanimated. */
  worklets?: string;
  gestureHandler: string;
  safeAreaContext: string;
  svg: string;
  nativewindV4?: string;
  nativewindV5Preview?: string;
  uniwind?: string;
  tailwindV3?: string;
  tailwindV4?: string;
  bottomSheet: string;
  tailwindMerge: string;
  lucideReactNative: string;
  classVarianceAuthority: string;
  clsx: string;
}

export const DEP_VERSIONS: Record<SdkBucket, VersionSet> = {
  sdk54: {
    reanimated: "~4.1.1",
    worklets: "0.5.1",
    gestureHandler: "~2.28.0",
    safeAreaContext: "~5.6.0",
    svg: "15.15.3",
    nativewindV4: "^4.2.3",
    tailwindV3: "^3.4.19",
    bottomSheet: "^5.2.14",
    tailwindMerge: "^3.6.0",
    lucideReactNative: "^1.24.0",
    classVarianceAuthority: "^0.7.1",
    clsx: "^2.1.1",
  },
  sdk55: {
    reanimated: "4.2.1",
    worklets: "0.7.2",
    gestureHandler: "~2.30.0",
    safeAreaContext: "~5.6.2",
    svg: "15.15.3",
    nativewindV5Preview: "^5.0.0-preview.4",
    tailwindV4: "4",
    bottomSheet: "^5.2.14",
    tailwindMerge: "^3.6.0",
    lucideReactNative: "^1.24.0",
    classVarianceAuthority: "^0.7.1",
    clsx: "^2.1.1",
  },
  sdk56: {
    reanimated: "~4.3.1",
    worklets: "~0.8.3",
    gestureHandler: "~2.31.1",
    safeAreaContext: "~5.7.0",
    svg: "15.15.5",
    nativewindV4: "^4.2.4",
    nativewindV5Preview: "^5.0.0-preview.4",
    tailwindV3: "^3.4.19",
    tailwindV4: "4",
    bottomSheet: "^5.2.14",
    tailwindMerge: "^3.6.0",
    lucideReactNative: "^1.24.0",
    classVarianceAuthority: "^0.7.1",
    clsx: "^2.1.1",
  },
  sdk57: {
    reanimated: "~4.5.0",
    worklets: "~0.10.0",
    gestureHandler: "~2.32.0",
    safeAreaContext: "~5.7.0",
    svg: "15.15.5",
    uniwind: "^1.6.1",
    nativewindV5Preview: "^5.0.0-preview.4",
    tailwindV4: "^4.2.2",
    bottomSheet: "^5.2.14",
    tailwindMerge: "^3.6.0",
    lucideReactNative: "^1.24.0",
    classVarianceAuthority: "^0.7.1",
    clsx: "^2.1.1",
  },
  bare: {
    reanimated: "^4.3.0",
    worklets: "^0.8.1",
    gestureHandler: "^2.30.1",
    safeAreaContext: "^5.7.0",
    svg: "15.15.3",
    nativewindV4: "^4.2.3",
    tailwindV3: "^3.4.19",
    bottomSheet: "^5.2.14",
    tailwindMerge: "^3.6.0",
    lucideReactNative: "^1.24.0",
    classVarianceAuthority: "^0.7.1",
    clsx: "^2.1.1",
  },
};

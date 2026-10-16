import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

/**
 * Fold-aware primitive for iPhone Duo and Android foldables.
 *
 * Returns null for every field on non-fold devices (and whenever `expo-hinge`
 * isn't installed), so the overlay components that consume this short-circuit
 * back to their pre-fold behavior with zero runtime cost.
 *
 * - `isFolded`: true when the device is closed / posture is near-closed.
 *               false when open. null when unknown (not a foldable or dep missing).
 * - `foldX`: approximate x-coordinate of the fold line in window-dimension pixels.
 *            Set only when the device is a foldable AND currently unfolded.
 *            Overlays align themselves to one side of this value.
 * - `hingeAngle`: raw hinge angle in degrees (0 = closed, 180 = flat). null on
 *                 non-foldables. Exposed for consumers that want posture-reactive
 *                 behavior; the 10 fold-aware overlays don't use it directly.
 * - `postureHint`: coarse categorization of hingeAngle. "closed" < 15°,
 *                  "half-open" 15-150°, "flat" > 150°, null when unknown.
 */
export interface FoldFeatures {
  isFolded: boolean | null;
  foldX: number | null;
  hingeAngle: number | null;
  postureHint: "flat" | "half-open" | "closed" | null;
}

const NULL_FEATURES: FoldFeatures = {
  isFolded: null,
  foldX: null,
  hingeAngle: null,
  postureHint: null,
};

// Static require with try/catch at module load — expo-hinge is a Tier 3 peer
// dep, not auto-installed. If absent, every hook call returns NULL_FEATURES
// without touching the module system again.
let hingeModule: {
  useHinge?: () => { angle: number | null; isOpen: boolean | null };
  getHinge?: () => { angle: number | null; isOpen: boolean | null };
  addHingeListener?: (
    cb: (e: { angle: number | null; isOpen: boolean | null }) => void
  ) => { remove: () => void };
} | null = null;

try {
  hingeModule = require("expo-hinge");
} catch {
  hingeModule = null;
}

function hintFromAngle(angle: number | null): FoldFeatures["postureHint"] {
  if (angle == null) return null;
  if (angle < 15) return "closed";
  if (angle > 150) return "flat";
  return "half-open";
}

export function useFoldFeatures(): FoldFeatures {
  const { width } = useWindowDimensions();
  const [state, setState] = useState<{ angle: number | null; isOpen: boolean | null }>(() => {
    if (!hingeModule?.getHinge) return { angle: null, isOpen: null };
    try {
      return hingeModule.getHinge();
    } catch {
      return { angle: null, isOpen: null };
    }
  });

  useEffect(() => {
    if (!hingeModule?.addHingeListener) return;
    const sub = hingeModule.addHingeListener((e) => setState(e));
    return () => sub.remove();
  }, []);

  if (!hingeModule) return NULL_FEATURES;

  const { angle, isOpen } = state;
  if (angle == null && isOpen == null) return NULL_FEATURES;

  const folded = isOpen == null ? null : !isOpen;
  // Only expose foldX when the device is a foldable AND currently unfolded.
  // Fold line sits at the midpoint of the window — Apple's reserved region is
  // a thin strip there; aligning to width/2 is accurate enough for overlays.
  const foldX = isOpen === true ? width / 2 : null;

  return { isFolded: folded, foldX, hingeAngle: angle, postureHint: hintFromAngle(angle) };
}

/* ── Shared Framer Motion constants ──────────────────────────────
 * The "active pill" indicator pattern (sidebar.tsx and preview-toggle.tsx)
 * used two independently hand-typed spring configs that had drifted apart
 * (380/32 vs 380/30) for no apparent reason. One shared constant here. */

export const activePillSpring = { type: "spring" as const, stiffness: 380, damping: 30 };

export const reducedMotionTransition = { duration: 0 };

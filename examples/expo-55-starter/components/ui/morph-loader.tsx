import React from "react";
import { View, useColorScheme } from "react-native";
import { Canvas, Group, Path, Skia, type SkPath } from "@shopify/react-native-skia";
import { useDerivedValue, useFrameCallback, useSharedValue } from "react-native-reanimated";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const morphLoaderVariants = cva("items-center justify-center", {
  variants: { size: { sm: "", md: "", lg: "" } },
  defaultVariants: { size: "md" },
});

const sizes = { sm: 28, md: 40, lg: 52 } as const;

// ---- shape engine --------------------------------------------------------
// A meaningful subset of Material's shape-morph idea, rebuilt from scratch:
// every shape is a set of vertices sampled on a unit circle at a fixed count
// so any shape can be linearly interpolated into any other without
// resampling, then rendered as a smooth (non-polygonal) closed Skia path.

const VERTEX_COUNT = 32;
const TAU = Math.PI * 2;

type ShapeName = "circle" | "square" | "soft-burst" | "pentagon" | "cookie" | "oval";

const SHAPE_SEQUENCE: readonly ShapeName[] = [
  "circle",
  "square",
  "soft-burst",
  "pentagon",
  "cookie",
  "oval",
];

// Radius profile of a regular n-gon as a function of angle, blended toward a
// perfect circle by `roundness` (0 = sharp corners, 1 = circle) so corners
// read as soft rather than pointy at loader scale.
function polygonRadius(sides: number, roundness: number, theta: number): number {
  const half = Math.PI / sides;
  const segment = TAU / sides;
  const phi = (((theta + half) % segment) + segment) % segment - half;
  const sharp = Math.cos(half) / Math.cos(phi);
  return sharp + (1 - sharp) * roundness;
}

// Radius profile of a cosine ripple, used for the scalloped "cookie" and
// spiky "soft-burst" silhouettes.
function rippleRadius(amplitude: number, lobes: number, theta: number): number {
  return 1 + amplitude * Math.cos(lobes * theta);
}

function normalizeToUnitRadius(points: number[]): number[] {
  let max = 0;
  for (let i = 0; i < points.length; i += 2) {
    const d = Math.hypot(points[i], points[i + 1]);
    if (d > max) max = d;
  }
  const scale = max > 0 ? 1 / max : 1;
  return points.map((v) => v * scale);
}

function buildShapePoints(name: ShapeName): number[] {
  const points: number[] = [];
  for (let i = 0; i < VERTEX_COUNT; i++) {
    const theta = (i / VERTEX_COUNT) * TAU - Math.PI / 2; // start at 12 o'clock
    let x: number;
    let y: number;
    if (name === "oval") {
      // Ellipse squashed on Y then rotated, rather than a radial profile.
      const ex = Math.cos(theta) * 1.08;
      const ey = Math.sin(theta) * 0.6;
      const rot = -0.5;
      x = ex * Math.cos(rot) - ey * Math.sin(rot);
      y = ex * Math.sin(rot) + ey * Math.cos(rot);
    } else {
      const r =
        name === "circle"
          ? 1
          : name === "square"
            ? polygonRadius(4, 0.28, theta)
            : name === "pentagon"
              ? polygonRadius(5, 0.22, theta)
              : name === "cookie"
                ? rippleRadius(0.22, 9, theta)
                : rippleRadius(0.16, 8, theta); // soft-burst
      x = Math.cos(theta) * r;
      y = Math.sin(theta) * r;
    }
    points.push(x, y);
  }
  return normalizeToUnitRadius(points);
}

const SHAPES: Record<ShapeName, number[]> = SHAPE_SEQUENCE.reduce(
  (acc, name) => {
    acc[name] = buildShapePoints(name);
    return acc;
  },
  {} as Record<ShapeName, number[]>,
);

// Cubic (Hermite smoothstep) easing standing in for reacticx's parametric
// cubic-bezier(x1,y1,x2,y2) easing curve — same "ease in/out" shape, far
// less machinery. Runs on the UI thread inside the path worklet below, so it
// needs its own "worklet" directive.
function easeInOutCubic(t: number): number {
  "worklet";
  return t * t * (3 - 2 * t);
}

// Builds a smooth closed curve through `points` using Catmull-Rom-derived
// cubic bezier segments (each segment's control points come from the
// neighboring vertices) so edges read as flowing curves instead of straight
// polygon sides — reimplementing the spirit of reacticx's cubic path
// construction without its corner/feature-matching machinery. Also runs on
// the UI thread every frame, hence "worklet".
function buildSmoothClosedPath(
  points: number[],
  cx: number,
  cy: number,
  radius: number,
): SkPath {
  "worklet";
  const n = points.length / 2;
  const at = (i: number) => {
    const idx = (((i % n) + n) % n) * 2;
    return { x: points[idx] * radius + cx, y: points[idx + 1] * radius + cy };
  };
  const path = Skia.Path.Make();
  const start = at(0);
  path.moveTo(start.x, start.y);
  for (let i = 0; i < n; i++) {
    const prev = at(i - 1);
    const curr = at(i);
    const next = at(i + 1);
    const next2 = at(i + 2);
    const c1x = curr.x + (next.x - prev.x) / 6;
    const c1y = curr.y + (next.y - prev.y) / 6;
    const c2x = next.x - (next2.x - curr.x) / 6;
    const c2y = next.y - (next2.y - curr.y) / 6;
    path.cubicTo(c1x, c1y, c2x, c2y, next.x, next.y);
  }
  path.close();
  return path;
}

export interface MorphLoaderProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof morphLoaderVariants> {
  className?: string;
  color?: string;
}

const MORPH_DURATION_MS = 900; // time to morph from one shape to the next
const ROTATION_DURATION_MS = 6000; // full spin — independent of morph timing

export function MorphLoader({ size = "md", className, color, ...props }: MorphLoaderProps) {
  const dark = useColorScheme() === "dark";
  const dim = sizes[size ?? "md"];
  const fill = color ?? (dark ? "#fafafa" : "#18181b");
  const cx = dim / 2;
  const cy = dim / 2;
  const radius = dim / 2 - 2;

  // Two independent UI-thread clocks: `phase` drives the shape morph
  // (units = "shapes", one full lap of SHAPE_SEQUENCE per MORPH_DURATION_MS
  // per segment), `rotation` drives the spin (degrees). Advancing both from
  // one useFrameCallback keeps them on the same clock source without
  // coupling their rates — matching reacticx's own rotation/phase split.
  const phase = useSharedValue(0);
  const rotation = useSharedValue(0);

  useFrameCallback((info) => {
    const dt = info.timeSincePreviousFrame ?? 16.6667;
    const count = SHAPE_SEQUENCE.length;
    phase.value = (phase.value + dt / MORPH_DURATION_MS) % count;
    rotation.value = (rotation.value + dt * (360 / ROTATION_DURATION_MS)) % 360;
  });

  const path = useDerivedValue<SkPath>(() => {
    const index = Math.floor(phase.value);
    const t = easeInOutCubic(phase.value - index);
    const from = SHAPES[SHAPE_SEQUENCE[index]];
    const to = SHAPES[SHAPE_SEQUENCE[(index + 1) % SHAPE_SEQUENCE.length]];
    const interpolated = new Array<number>(from.length);
    for (let i = 0; i < from.length; i++) {
      interpolated[i] = from[i] + (to[i] - from[i]) * t;
    }
    return buildSmoothClosedPath(interpolated, cx, cy, radius);
  });

  const transform = useDerivedValue(() => [{ rotate: (rotation.value * Math.PI) / 180 }]);

  return (
    <View
      className={cn(morphLoaderVariants({ size }), className)}
      style={{ width: dim, height: dim }}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      {...props}
    >
      <Canvas style={{ width: dim, height: dim }}>
        <Group origin={{ x: cx, y: cy }} transform={transform}>
          <Path path={path} color={fill} />
        </Group>
      </Canvas>
    </View>
  );
}

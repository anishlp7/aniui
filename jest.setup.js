/* ── Mock react-native-worklets ───────────────────────────── */
// Reanimated v4 delegates worklet init to this separate package, and its
// real index.ts runs a __DEV__-only self-test *at import time* — creating a
// worklet and checking it was transformed by the Babel plugin. Jest doesn't
// run that plugin over node_modules, so requiring the real package (even
// transitively, via reanimated's own mock) always throws. Stub it before
// reanimated/mock ever gets a chance to pull in the real one.
jest.mock("react-native-worklets", () => ({
  __esModule: true,
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  runOnUIAsync: (fn) => fn,
  runOnUISync: (fn) => fn,
  scheduleOnRN: (fn) => fn,
  scheduleOnUI: (fn) => fn,
  createWorkletRuntime: () => ({}),
  runOnRuntime: (_runtime, fn) => fn,
  isWorkletFunction: () => true,
  getRuntimeKind: () => 0,
  RuntimeKind: { ReactNative: 0, UI: 1, Worklet: 2 },
  isShareableRef: () => false,
  makeShareable: (v) => v,
  makeShareableCloneOnUIRecursive: (v) => v,
  makeShareableCloneRecursive: (v) => v,
  shareableMappingCache: new WeakMap(),
  createSerializable: (v) => v,
  isSerializableRef: () => false,
  serializableMappingCache: new WeakMap(),
  createSynchronizable: (v) => v,
  isSynchronizable: () => false,
  getStaticFeatureFlag: () => false,
  setDynamicFeatureFlag: () => {},
  callMicrotasks: () => {},
  executeOnUIRuntimeSync: (fn) => fn,
  unstable_eventLoopTask: () => {},
  WorkletsModule: {},
}));

/* ── Mock react-native-reanimated ─────────────────────────── */
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  // The library's own mock doesn't implement this yet (its source has a
  // literal "ADD ME IF NEEDED" placeholder) — components read it to skip
  // looping animations under reduced motion, so tests need a stable value.
  Reanimated.useReducedMotion = () => false;
  return Reanimated;
});

/* ── Mock react-native-svg ───────────────────────────────── */
jest.mock("react-native-svg", () => {
  const React = require("react");
  const { View } = require("react-native");
  const mockComponent = (name) => {
    const C = (props) => React.createElement(View, { ...props, testID: name });
    C.displayName = name;
    return C;
  };
  return {
    __esModule: true,
    default: mockComponent("Svg"),
    Svg: mockComponent("Svg"),
    Circle: mockComponent("Circle"),
    Rect: mockComponent("Rect"),
    Path: mockComponent("Path"),
    Line: mockComponent("Line"),
    Polygon: mockComponent("Polygon"),
    Text: mockComponent("SvgText"),
    G: mockComponent("G"),
    Defs: mockComponent("Defs"),
    LinearGradient: mockComponent("LinearGradient"),
    Stop: mockComponent("Stop"),
    ClipPath: mockComponent("ClipPath"),
  };
});

/* ── Mock @shopify/react-native-skia ─────────────────────── */
// Skia is a native C++ binding (via JSI) whose JS entry point (index.js)
// unconditionally `import`s "./skia/NativeSetup" at module load time to wire
// up the native module — there's no lazy/guarded path, so requiring the real
// package under Jest throws immediately (and its lib/module build is ESM,
// which Jest doesn't transform inside node_modules by default either). Stub
// it the same way react-native-svg is stubbed above: every drawing
// "component" it exports renders as a plain View, and the handful of
// imperative helpers (vec, useClock, Skia.Path.Make) return inert stand-ins
// good enough for components to run their effects without crashing.
jest.mock("@shopify/react-native-skia", () => {
  const React = require("react");
  const { View } = require("react-native");
  const mockComponent = (name) => {
    const C = (props) => React.createElement(View, { ...props, testID: name });
    C.displayName = name;
    return C;
  };
  const chainablePath = {
    moveTo: () => chainablePath,
    lineTo: () => chainablePath,
    cubicTo: () => chainablePath,
    quadTo: () => chainablePath,
    close: () => chainablePath,
    addCircle: () => chainablePath,
    addRect: () => chainablePath,
  };
  return {
    __esModule: true,
    Canvas: mockComponent("Canvas"),
    Circle: mockComponent("Circle"),
    Rect: mockComponent("Rect"),
    RoundedRect: mockComponent("RoundedRect"),
    Path: mockComponent("Path"),
    Group: mockComponent("Group"),
    Mask: mockComponent("Mask"),
    Paint: mockComponent("Paint"),
    Blur: mockComponent("Blur"),
    BlurMask: mockComponent("BlurMask"),
    ColorMatrix: mockComponent("ColorMatrix"),
    DashPathEffect: mockComponent("DashPathEffect"),
    LinearGradient: mockComponent("LinearGradient"),
    RadialGradient: mockComponent("RadialGradient"),
    SweepGradient: mockComponent("SweepGradient"),
    vec: (x = 0, y = 0) => ({ x, y }),
    useClock: () => ({ value: 0 }),
    Skia: {
      Path: {
        Make: () => ({ ...chainablePath }),
      },
    },
  };
});

/* ── Mock @gorhom/bottom-sheet ───────────────────────────── */
jest.mock("@gorhom/bottom-sheet", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: (props) => React.createElement(View, props),
    BottomSheetModal: (props) => React.createElement(View, props),
    BottomSheetModalProvider: ({ children }) => children,
    BottomSheetBackdrop: (props) => React.createElement(View, props),
    BottomSheetScrollView: (props) => React.createElement(View, props),
    BottomSheetFlatList: (props) => React.createElement(View, props),
    BottomSheetView: (props) => React.createElement(View, props),
    useBottomSheet: () => ({ close: jest.fn(), expand: jest.fn(), snapToIndex: jest.fn() }),
  };
});

/* ── Mock react-native-gesture-handler ──────────────────── */
jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    Gesture: {
      Pan: () => ({
        activeOffsetX: function () { return this; },
        enabled: function () { return this; },
        onBegin: function () { return this; },
        onStart: function () { return this; },
        onUpdate: function () { return this; },
        onEnd: function () { return this; },
        onFinalize: function () { return this; },
        minDistance: function () { return this; },
      }),
    },
    GestureDetector: ({ children }) => children,
    GestureHandlerRootView: (props) => React.createElement(View, props),
  };
});

/* ── Mock @react-native-community/datetimepicker ─────────── */
jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: (props) => React.createElement(View, { testID: "DateTimePicker", ...props }),
  };
});

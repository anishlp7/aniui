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
  // The library's mock doesn't ship useFrameCallback — Marquee uses it to
  // tick a shared value every frame. A stub that never fires is enough for
  // a jsdom-level render test (no animation to observe anyway under the
  // mocked worklet runtime).
  Reanimated.useFrameCallback = () => ({ setActive: () => {} });
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

/* ── Mock expo-haptics ────────────────────────────────────── */
// expo-haptics (and its expo-modules-core dependency) ships ESM and reaches
// for a native EventEmitter at import time, which throws under Jest even
// once transformIgnorePatterns lets the ESM through. Stub the exact API
// surface AniUI components call (impactAsync, selectionAsync,
// ImpactFeedbackStyle) as no-ops, same treatment as the other native-binding
// packages in this file.
jest.mock("expo-haptics", () => ({
  __esModule: true,
  impactAsync: jest.fn(),
  selectionAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: "light", Medium: "medium", Heavy: "heavy", Rigid: "rigid", Soft: "soft" },
  NotificationFeedbackType: { Success: "success", Warning: "warning", Error: "error" },
}));

/* ── Mock expo-hinge ──────────────────────────────────────── */
// SDK 58 Tier 3 peer dep that reads iOS 27.1 / Android 11+ hinge angle +
// open-state for iPhone Duo and foldables. The real module ships ESM and
// native bindings that Jest can't load; components/ui/fold.tsx handles the
// absence via try/catch, but tests that render fold-aware overlays benefit
// from an explicit mock that reports a stable "unfolded Duo" posture by
// default. Individual tests can override with jest.doMock if they need a
// different hinge state.
// virtual: true because expo-hinge isn't installed as a devDependency here —
// the real module ships only in SDK 58+ projects. The mock stubs out just the
// surface components/ui/fold.tsx reads.
jest.mock(
  "expo-hinge",
  () => {
    const listeners = new Set();
    return {
      __esModule: true,
      useHinge: () => ({ angle: 180, isOpen: true }),
      getHinge: () => ({ angle: 180, isOpen: true }),
      addHingeListener: (cb) => {
        listeners.add(cb);
        return { remove: () => listeners.delete(cb) };
      },
    };
  },
  { virtual: true }
);

/* ── Mock expo-blur ───────────────────────────────────────── */
// Same ESM/native-module issue as expo-haptics above. Renders as a plain
// View — components using it for a depth/glass effect just lose that visual
// under test, same tradeoff already made for Skia/SVG above.
jest.mock("expo-blur", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    BlurView: (props) => React.createElement(View, props),
  };
});

/* ── Mock react-native-qrcode-svg ────────────────────────── */
// Ships ESM at its entry point; transformIgnorePatterns doesn't include it,
// so Jest sees `export { default } from ...` and chokes on parse. The real
// QR renderer is unrunnable under a test anyway (needs react-native-svg's
// native host), so stub it as a plain View that preserves its testable
// props (value, size).
jest.mock("react-native-qrcode-svg", () => {
  const React = require("react");
  const { View } = require("react-native");
  const QRCode = (props) => React.createElement(View, { ...props, testID: "QRCode" });
  QRCode.displayName = "QRCode";
  return { __esModule: true, default: QRCode };
});

/* ── Mock react-native-safe-area-context ────────────────── */
// SafeAreaContext throws when a component calls useSafeAreaInsets without a
// <SafeAreaProvider> wrapping it; tests don't bother mounting the provider,
// so give the hook a zero-inset fallback and let SafeAreaView render as a
// plain <View>. Matches the pattern this file already uses for native-only
// bindings (gesture-handler, haptics, skia).
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  const zero = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    __esModule: true,
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: (props) => React.createElement(View, props),
    SafeAreaInsetsContext: { Consumer: ({ children }) => children(zero) },
    useSafeAreaInsets: () => zero,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 375, height: 667 }),
    initialWindowMetrics: { insets: zero, frame: { x: 0, y: 0, width: 375, height: 667 } },
  };
});

/* ── Mock react-native-gesture-handler ──────────────────── */
jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");
  // Chainable gesture builder stub — every method returns `this` so any
  // call chain (`.enabled().onStart().onEnd()...`) resolves. Covers every
  // Gesture.* factory the component library uses (Pan/Fling/Manual/
  // Simultaneous/Race/Tap/LongPress/Pinch/Rotation) without having to list
  // each method name.
  const chainable = () => {
    const proxy = new Proxy(function () {}, {
      get(_target, _prop) {
        return () => proxy;
      },
      apply() {
        return proxy;
      },
    });
    return proxy;
  };
  const Gesture = new Proxy({}, { get: () => chainable });
  return {
    __esModule: true,
    Gesture,
    GestureDetector: ({ children }) => children,
    GestureHandlerRootView: (props) => React.createElement(View, props),
    // Directions is a plain enum used alongside Gesture.Fling().direction(...)
    Directions: { RIGHT: 1, LEFT: 2, UP: 4, DOWN: 8 },
  };
});

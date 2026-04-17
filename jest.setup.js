/* ── Mock react-native-reanimated ─────────────────────────── */
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
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

const React = require("react");
const { View, Pressable, Text } = require("react-native");

const passthrough = (props) => React.createElement(View, props);
const passthroughPressable = (props) => React.createElement(Pressable, props);
const passthroughText = (props) => React.createElement(Text, props);

module.exports = {
  Root: passthrough,
  Trigger: passthrough,
  Portal: ({ children }) => children,
  Overlay: passthrough,
  Content: passthrough,
  Title: passthroughText,
  Description: passthroughText,
  Close: passthroughPressable,
  Cancel: passthroughPressable,
  Action: passthroughPressable,
  Item: passthrough,
  ItemText: passthroughText,
  ItemIndicator: passthrough,
  Value: passthroughText,
  Viewport: passthrough,
  Group: passthrough,
  Label: passthroughText,
  Separator: passthrough,
  Sub: passthrough,
  SubTrigger: passthrough,
  SubContent: passthrough,
  CheckboxItem: passthrough,
  RadioItem: passthrough,
  RadioGroup: passthrough,
  List: passthrough,
  Track: passthrough,
  Range: passthrough,
  Thumb: passthrough,
  Indicator: passthrough,
  Provider: ({ children }) => children,
  PortalHost: passthrough,
};

module.exports = {
  presets: [
    "module:@react-native/babel-preset",
    "nativewind/babel",
  ],
  plugins: [
    ["module-resolver", { alias: { "@": "." } }],
    "react-native-reanimated/plugin",
  ],
};

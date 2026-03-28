/** @type {import('jest').Config} */
module.exports = {
  preset: "react-native",
  setupFiles: [
    "./node_modules/react-native/jest/setup.js",
    "./jest.setup.js",
  ],
  testMatch: ["**/components/__tests__/**/*.test.{ts,tsx}"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native/.*|nativewind|react-native-reanimated|react-native-svg|class-variance-authority|clsx|tailwind-merge|@gorhom/bottom-sheet|react-native-gesture-handler|react-native-safe-area-context)/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

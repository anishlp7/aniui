/** @type {import('jest').Config} */
module.exports = {
  preset: "react-native",
  setupFiles: [
    "./node_modules/react-native/jest/setup.js",
    "./jest.setup.js",
  ],
  testMatch: ["**/components/__tests__/**/*.test.{ts,tsx}"],
  transformIgnorePatterns: [
    // expo-haptics/expo-blur (and expo-modules-core, which both depend on)
    // ship ESM — added when time-picker became the first tested component to
    // actually import expo-haptics, surfacing that this allowlist had never
    // needed them before.
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native/.*|nativewind|react-native-reanimated|react-native-worklets|react-native-svg|lucide-react-native|class-variance-authority|clsx|tailwind-merge|@gorhom/bottom-sheet|react-native-gesture-handler|react-native-safe-area-context|expo-haptics|expo-blur|expo-modules-core)/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    // Jest resolves lucide's "react-native" export condition to ESM (.mjs),
    // which the RN preset doesn't transform — point it at the CJS build.
    "^lucide-react-native$": "<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js",
    "^@rn-primitives/(.*)$": "<rootDir>/__mocks__/@rn-primitives/mock.js",
  },
};

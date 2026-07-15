import { defineConfig } from "vitest/config";

// components/ is a copy-assets build artifact (gitignored); its React Native
// test files belong to the root jest suite, not the CLI's vitest run.
export default defineConfig({
  test: {
    include: ["__tests__/**/*.test.ts", "src/**/*.test.ts"],
  },
});

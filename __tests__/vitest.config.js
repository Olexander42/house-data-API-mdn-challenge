import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    typecheck: {
      enabled: false,
      tsconfig: true // does it change anything?
    },
    cache: false // see if this option improves stability
  }
})
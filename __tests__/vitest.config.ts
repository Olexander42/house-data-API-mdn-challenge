import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    typecheck: {
      enabled: false,
    },
    cache: false // see if this option improves stability
  }
})
import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        exclude: [
          ...configDefaults.exclude,
          "**/postcss.config.js",
          "**/tailwind.config.js",
          "**/Main.vue",
          "**/main.ts",
          "**/Notification.ts",
          "**/apiClient.ts",
        ],
      },
    },
  })
);

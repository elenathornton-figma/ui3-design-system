import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? "/ui3-design-system/" : "/",
  resolve: {
    alias: {
      "@figma/ui3-design-system": path.resolve(__dirname, "../src"),
    },
  },
});

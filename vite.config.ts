import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: `dist/${mode === "public" ? "public" : "staff"}`,
    rollupOptions: { input: mode === "public" ? "public.html" : "index.html" },
    sourcemap: false,
  },
}));

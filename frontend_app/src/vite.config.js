import { defineConfig } from "vite";

export default defineConfig({
  base: '/fastapi-crud-app/',
  build: {
    outDir: '../docs',
    emptyOutDir: true
  }
});

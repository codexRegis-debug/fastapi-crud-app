import { defineConfig } from "vite";

export default defineConfig({
  base: '/fastapi-crud-app/',
  server: {
    proxy: {
      "/api": {
        target: "https://crud-note-app.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path
      },
    },
  } ,
});

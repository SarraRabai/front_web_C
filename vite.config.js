import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:9000", // updated to 9000
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // optional
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("Origin", "http://localhost:3000");
          });
        },
        headers: {
          Connection: "keep-alive",
        },
      },
    },
  },
});

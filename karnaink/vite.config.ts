import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/graphql": {
  //       target: "https://www.instagram.com",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  plugins: [react()],
});

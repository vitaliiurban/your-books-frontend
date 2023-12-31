import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      proxy: {
        "/api": "http://localhost:3000",
      },
    },
    define: {
      "process.env.VITE_BACKEND": JSON.stringify("/api"),
    },
    plugins: [react()],
  };
});

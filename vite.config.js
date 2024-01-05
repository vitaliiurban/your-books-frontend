import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      proxy: {
        "/api": process.env.VITE_BACKEND,
      },
    },
    define: {
      "process.env.VITE_BACKEND": JSON.stringify(env.VITE_BACKEND),
    },
    plugins: [react()],
  };
});

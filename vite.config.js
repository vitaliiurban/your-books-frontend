import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      proxy: {
        "/api": "http://138.197.191.73:3000",
      },
    },
    define: {
      "process.env.VITE_BACKEND": JSON.stringify(env.VITE_BACKEND),
    },
    plugins: [react()],
  };
});

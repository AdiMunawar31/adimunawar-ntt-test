import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const API_URL = `${env.VITE_APP_BASE_NAME}`;
  const PORT = 3000;

  return {
    server: {
      open: true,
      port: PORT,
      host: true,
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
    preview: {
      open: true,
      host: true,
    },
    define: {
      global: "window",
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
      },
    },
    base: API_URL,
    plugins: [react(), tsconfigPaths()],
  };
});

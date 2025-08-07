import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    keycloakify({
      accountThemeImplementation: "Single-Page",
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: true,
    },
    fs: {
      strict: false,
    },
  },
  // build: {
  //   sourcemap: true,
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vendor: ["react", "react-dom"],
  //         keycloakify: ["keycloakify"],
  //       },
  //       assetFileNames: (assetInfo) => {
  //         const info = assetInfo.name.split(".");
  //         const ext = info[info.length - 1];
  //         if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
  //           return `assets/images/[name]-[hash][extname]`;
  //         }
  //         if (/css/i.test(ext)) {
  //           return `assets/css/[name]-[hash][extname]`;
  //         }
  //         return `assets/[name]-[hash][extname]`;
  //       },
  //       chunkFileNames: "assets/js/[name]-[hash].js",
  //       entryFileNames: "assets/js/[name]-[hash].js",
  //     },
  //   },
  //   assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  // },
});

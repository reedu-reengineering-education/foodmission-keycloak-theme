import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { buildEmailTheme } from "keycloakify-emails";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    keycloakify({
      accountThemeImplementation: "Single-Page",
      postBuild: async (buildContext) => {
        const { config: loadConfig } = await import("./jsx-email.config.js");

        const config = await loadConfig;

        await buildEmailTheme({
          templatesSrcDirPath: path.join(
            buildContext.themeSrcDirPath,
            "email",
            "templates"
          ),
          i18nSourceFile: path.join(
            buildContext.themeSrcDirPath,
            "email",
            "i18n.ts"
          ),
          themeNames: buildContext.themeNames,
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ["de", "en", "fr", "no", "pl", "es", "nl", "sl", "it", "gr"],
          esbuild: config.esbuild,
          cwd: import.meta.dirname,
        });
      },
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

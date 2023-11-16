import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        popup: "src/popup/popup.html",
        options: "src/options/options.html",
      },
    },
  },
  //  WebSocket connection to 'ws://localhost/' failed:  というエラーの対策
  // https://github.com/crxjs/chrome-extension-tools/issues/746#issuecomment-1647484887
  server: {
    port: 5174,
    strictPort: true,
    hmr: {
      port: 5174,
    },
  },
});

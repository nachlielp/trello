import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../Backend/public",
    assetsDir: "assets",
  },
  server: {
    host: true,
    open: "/home",
  },
  // base: ".",
  publicPath: "/assets/", // Add this line to specify the public path for your assets
});

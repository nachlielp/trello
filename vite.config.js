import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: true,
    open: '/b/66756a34def1a6d3b8cd179d',
  },
  base: './',
  publicPath: '/assets/', // Add this line to specify the public path for your assets
})


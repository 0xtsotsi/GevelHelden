import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Output alongside the project root so the existing static HTML pages
    // can <script type="module" src="/web-assets/..."> the bundle without
    // a /public/ hop.
    outDir: '../web-assets',
    emptyOutDir: true,
  },
})

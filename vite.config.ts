import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//@ts-ignore
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    eslint({ exclude: ['/virtual:/', '**/node_modules/**'] }),
    nodePolyfills({
      exclude: ['fs'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  define: {
    global: 'window',
  },

  base: './',
});

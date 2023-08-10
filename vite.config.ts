import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//@ts-ignore
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), eslint({ exclude: ['/virtual:/, node_modules/**'] })],
});

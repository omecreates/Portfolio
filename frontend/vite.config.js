import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true, // Opens browser on start
    cors: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});

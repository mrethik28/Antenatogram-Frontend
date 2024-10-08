// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Listen on all network interfaces
    port: 3000,
    strictPort: true,
  },
});

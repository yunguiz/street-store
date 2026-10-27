import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- Importante para o Tailwind v4

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Ativa o processador oficial do Tailwind v4
  ],
  server: {
    port: 3000,
    proxy: {
      '/nuvem-api': {
        target: 'https://api.tiendanube.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nuvem-api/, ''),
      },
    },
  },
});
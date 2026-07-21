import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const mount = '/vibe-learn';
const port = 5188;

export default defineConfig({
  plugins: [vue()],
  base: `${mount}/`,
  server: {
    port,
    strictPort: true,
    host: '127.0.0.1',
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      port,
      clientPort: port,
    },
  },
  preview: {
    port,
    strictPort: true,
    host: '127.0.0.1',
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3131/api',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/socket.io': {
        target: 'http://localhost:3131/socket.io',
        rewrite: (path) => path.replace(/^\/socket.io/, ''),
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: true,
    cors: true,
  },
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
})

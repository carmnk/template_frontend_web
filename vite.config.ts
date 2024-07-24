import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [(react as any)()],
  target: 'esnext',
  build: {
    rollupOptions: {
      external: ['@cmk/fe_utils'],
    },
  },
} as any)

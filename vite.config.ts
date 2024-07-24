import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import pjson from './package.json'

const homepage = pjson.homepage

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [(react as any)()],
  target: 'esnext',
  build: {
    rollupOptions: {
      external: ['@cmk/fe_utils'],
    },
  },
  base: homepage,
} as any)

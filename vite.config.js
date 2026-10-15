import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu/index.html'),
        events: resolve(__dirname, 'events/index.html'),
        english: resolve(__dirname, 'en/index.html'),
        englishMenu: resolve(__dirname, 'en/menu/index.html'),
        englishEvents: resolve(__dirname, 'en/events/index.html'),
      },
    },
  },
})

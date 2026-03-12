import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // GitHub Pages: copy index.html to 404.html so SPA routes work on direct access
    process.env.GITHUB_PAGES
      ? {
          name: 'copy-404',
          closeBundle() {
            const dist = path.resolve(__dirname, 'dist')
            fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))
          },
        }
      : undefined,
  ].filter(Boolean),
  base: process.env.GITHUB_PAGES ? '/thuriyam-website/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Allow access from network
    port: 5173,
    allowedHosts: [
      'archaistic-kimbery-unvaguely.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io',
      '.ngrok.app',
      'localhost',
    ],
  },
})


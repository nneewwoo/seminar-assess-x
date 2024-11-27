import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    cors: {
      origin: 'http://192.168.254.102:1420',
      methods: ['OPTIONS', 'POST', 'GET', 'DELETE'],
      credentials: true,
      maxAge: 3600,
      allowedHeaders: [
        'authorization',
        'x-client-info',
        'apikey',
        'X-CSRF-Token',
        'X-Requested-With',
        'Accept',
        'Accept-Version',
        'Content-Length',
        'Content-MD5',
        'Content-Type',
        'Date',
        'X-Api-Version'
      ]
    },
    host: true,
    port: 5174,
    strictPort: true
  }
})

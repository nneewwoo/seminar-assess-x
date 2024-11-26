import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    cors: false,
    host: true,
    port: 5174,
    strictPort: true
  }
})

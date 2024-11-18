import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { internalIpV4 } from 'internal-ip'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [sveltekit()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: true,
    hmr: {
      protocol: 'ws',
      host: await internalIpV4(),
      port: 1421
    }
  }
}))

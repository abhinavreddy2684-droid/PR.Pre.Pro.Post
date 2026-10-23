import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Extra hostnames the dev server answers to (e.g. an ngrok tunnel), comma-separated.
  const allowedHosts = (env.VITE_ALLOWED_HOSTS ?? '')
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean)

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rolldownOptions: {
        output: {
          // Split large vendor libraries out of the app chunk (keeps every chunk under
          // Vite's 500 kB warning). All chunks still load up front; nothing is lazy.
          codeSplitting: {
            groups: [
              { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
              { name: 'motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
              { name: 'gsap', test: /node_modules[\\/]gsap[\\/]/ },
              { name: 'icons', test: /node_modules[\\/]lucide-react[\\/]/ },
            ],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: allowedHosts.length ? allowedHosts : undefined,
    },
  }
})

import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Transact',
      short_name: 'Transact',
      description: 'An Expense Recording app.',
      theme_color: '#ffffff',
      background_color: '#1f1f1f',
      shortcuts: [
        {
          name: 'Add New Transaction',
          short_name: 'Add Transaction',
          url: '/transaction/add',
        },
        {
          name: 'Dashboard',
          short_name: 'Dashboard',
          url: '/',
        },
        {
          name: 'Analytics',
          short_name: 'Analytics',
          url: '/analytics',
        }
      ],
      display_override: [ "minimal-ui"],
      screenshots: [
        {
          src: 'screenshots/desktop.png',
          sizes: '2560x1387',
          type: 'image/png',
          form_factor: 'wide',
        },
        {
          src: 'screenshots/mobile.png',
          sizes: '354x793',
          type: 'image/png',
        },
      ],
    },



    workbox: {
      // caching for offline
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://api.multiavatar.com/.*'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'avatar-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],

  server: {
    port: 3000,
    open: true,
  },

  resolve: {
    alias: {
      "@" : path.resolve(__dirname, "src"),
    }
  }
})
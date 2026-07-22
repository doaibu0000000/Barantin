import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon/icon.svg'],
      manifest: {
        name: 'Barantin',
        short_name: 'Barantin',
        description: 'Barantin Practical Tools Application',
        theme_color: '#202125',
        background_color: '#202125',
        display: 'standalone',
        icons: [
          {
            src: 'icon/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'icon/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
}));

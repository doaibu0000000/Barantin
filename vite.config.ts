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
        description: 'Practical Tools Application',
        theme_color: '#1a1b1e',
        background_color: '#1a1b1e',
        display: 'standalone',
        icons: [
          {
            src: 'icon/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
}));

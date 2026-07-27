import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import type { Plugin } from 'vite';

// Plugin khusus dev: Saat SW lama mencoba update, ia akan mengunduh SW "pembunuh"
// yang langsung menghapus diri sendiri + semua cache, lalu reload halaman.
// Ini memutus lingkaran "halaman blank karena SW lama" secara PERMANEN.
const swKillDevPlugin = (): Plugin => ({
  name: 'sw-kill-dev',
  apply: 'serve', // Hanya aktif saat `npm run dev`
  configureServer(server) {
    server.middlewares.use('/sw.js', (_req, res) => {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.end(`
        // SW Pembunuh - Mode Development
        // SW ini langsung unregister dirinya sendiri dan bersihkan semua cache.
        self.addEventListener('install', () => {
          self.skipWaiting();
        });
        self.addEventListener('activate', async () => {
          // Hapus semua cache
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
          // Unregister SW ini sendiri
          await self.registration.unregister();
          // Reload semua tab yang terbuka
          const clients = await self.clients.matchAll({ type: 'window' });
          clients.forEach(client => client.navigate(client.url));
        });
      `);
    });
  },
});

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [
    swKillDevPlugin(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon/icon.svg'],
      // Nonaktifkan service worker di mode development agar tidak mengganggu
      devOptions: {
        enabled: false,
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm,onnx}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50 MB
      },
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

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

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

// Plugin dev: baca file lokal dari filesystem via GET /api/local-file?path=...
// Ini dibutuhkan karena browser tidak bisa fetch() file:/// dari origin HTTP.
const localFilePlugin = (): Plugin => ({
  name: 'local-file',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/local-file', (req, res) => {
      try {
        const urlObj = new URL(req.url || '', 'http://localhost');
        let filePath = urlObj.searchParams.get('path') || '';

        // Normalisasi: hapus prefix file:/// jika ada
        if (filePath.startsWith('file:///')) {
          filePath = filePath.slice(8); // hapus 'file:///'
        }
        // Decode URL encoding (%20 → spasi, dll)
        filePath = decodeURIComponent(filePath);
        // Windows: ubah forward slash ke backslash
        filePath = filePath.replace(/\//g, path.sep);

        if (!filePath || !filePath.toLowerCase().endsWith('.pdf')) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Path tidak valid atau bukan file PDF.' }));
          return;
        }

        if (!fs.existsSync(filePath)) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: `File tidak ditemukan: ${filePath}` }));
          return;
        }

        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);

        // Kembalikan sebagai JSON+base64 agar IDM tidak mengintervensi
        const base64Data = fileBuffer.toString('base64');
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({
          ok: true,
          name: fileName,
          size: fileBuffer.length,
          data: base64Data
        }));
      } catch (err: any) {
        res.statusCode = 500;
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
  },
});

// Plugin dev: OCR gambar via PaddleOCR Python (POST /api/ocr-image)
// Body: JSON { data_url: "data:image/...;base64,..." }
// Respons: JSON { text, lines, sharpness_score, enhanced, ... }
const ocrImagePlugin = (): Plugin => ({
  name: 'ocr-image',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/ocr-image', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed, use POST' }));
        return;
      }

      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', () => {
        const body = Buffer.concat(chunks);

        // Cari Python (python3 dulu, fallback ke python)
        const scriptPath = path.resolve(
          path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')),
          'membaca_gambar',
          'ocr_cli.py'
        );

        const tryPython = (cmd: string) =>
          new Promise<{ code: number; stdout: Buffer; stderr: string }>((resolve) => {
            const proc = spawn(cmd, [scriptPath], { stdio: ['pipe', 'pipe', 'pipe'] });
            const outChunks: Buffer[] = [];
            let errStr = '';
            proc.stdin.write(body);
            proc.stdin.end();
            proc.stdout.on('data', (d: Buffer) => outChunks.push(d));
            proc.stderr.on('data', (d: Buffer) => (errStr += d.toString()));
            proc.on('close', (code) =>
              resolve({ code: code ?? 1, stdout: Buffer.concat(outChunks), stderr: errStr })
            );
            proc.on('error', () => resolve({ code: 1, stdout: Buffer.alloc(0), stderr: `${cmd} not found` }));
          });

        (async () => {
          let result = await tryPython('python3');
          if (result.code !== 0 && result.stderr.includes('not found')) {
            result = await tryPython('python');
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store');
          res.setHeader('Access-Control-Allow-Origin', '*');

          if (result.code !== 0) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: result.stderr || 'Python process failed' }));
            return;
          }

          res.end(result.stdout);
        })();
      });
    });
  },
});

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [
    swKillDevPlugin(),
    localFilePlugin(),
    ocrImagePlugin(),
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

# OCR Cerdas — Barantin Web Tool

Tool ekstrak teks dari gambar dokumen ekspor/impor.
Berjalan 100% di browser — tanpa server, tanpa Python.

## Fitur
- Paste gambar (Ctrl+V), Drag & Drop, atau pilih file
- Kamus 687.000+ kata (Bahasa Inggris + Indonesia)
- Auto-detect ketajaman gambar + enhancement jika buram
- Koreksi OCR: confusion table digit↔huruf (sama dengan Python)
- Skor kepercayaan per baris
- Salin & unduh hasil

## Cara Deploy ke GitHub Pages

1. Push seluruh folder `membaca_gambar_web/` ke repo GitHub
2. Di Settings → Pages → pilih folder/branch yang berisi folder ini
3. Akses di: `https://username.github.io/repo/membaca_gambar_web/`

## File
| File | Keterangan |
|------|-----------|
| `index.html` | Aplikasi lengkap (satu file) |
| `kamus_inggris.txt` | Kamus bahasa Inggris (492.000+ kata) |
| `kamus_indonesia.txt` | Kamus bahasa Indonesia (194.000+ kata) |

## Catatan
Kamus dimuat sekali saat pertama kali OCR dijalankan (~7.6 MB total).
Setelah itu tersimpan di memori untuk sesi tersebut.

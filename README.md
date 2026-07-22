# Barantin Tools

Aplikasi web modern berbasis Progressive Web App (PWA) yang dirancang khusus untuk mempermudah dan mempercepat proses pengelolaan data dokumen (Surtu 2, Draft, dan Revisi). Dibangun dengan antarmuka pengguna (UI) yang premium, elegan, dan responsif menggunakan Vite, TypeScript, dan Tailwind CSS.

## ✨ Fitur Utama

### 1. Surtu 2 (Pengelola Cookie)
Fitur untuk mengelola dan memproses data Surtu 2.

### 2. Draft & Revisi
Alat canggih untuk memproses Nomor Dokumen secara instan dan cerdas dengan berbagai kemampuan otomatisasi:
- **Penyeragaman Otomatis (Auto-Format):** Mampu mendeteksi berbagai format nomor dokumen yang berantakan dari teks panjang dan secara otomatis menyeragamkannya ke format standar resmi (`2026-T1.0-3200.2-K.1.1-XXXXXX`).
- **Ekstraksi Cerdas (Smart Extract):** Cukup _paste_ teks panjang yang mengandung banyak nomor (baik nomor panjang maupun nomor pendek/ekornya saja seperti `1842` atau `7889`), dan sistem akan secara cerdas mengekstrak angka-angka tersebut lalu merakitnya menjadi format lengkap.
- **Input Kilat (Quick Input):** Tersedia kotak rahasia khusus angka (Maks 6 digit) untuk pengetikan sangat cepat. Setiap angka yang diketik akan secara _real-time_ diubah ke format lengkap tanpa perlu menekan tombol apapun.
- **Animasi Cerdas & Anti-Autofill:** Dilengkapi dengan sistem _debounce_ dan animasi loading interaktif untuk memberikan kesan premium, serta dirancang tahan terhadap gangguan _autofill_ (seperti pop-up sandi/rekening pada _keyboard_ HP).
- **Tab PDF:** Dukungan antarmuka untuk memilih dan mengunggah file PDF.

### 3. Progressive Web App (PWA)
- Dapat diinstal langsung ke layar utama (_Home Screen_) di perangkat Android maupun iOS.
- Bekerja layaknya aplikasi _native_ (layar penuh, tanpa _address bar_ browser).

## 🛠️ Teknologi yang Digunakan
- **Vite:** Build tool yang sangat cepat.
- **TypeScript:** Bahasa pemrograman utama untuk logika yang kuat dan bebas error.
- **Tailwind CSS:** Framework CSS untuk menghasilkan desain antarmuka (_Glassmorphism_, _Dark Mode_, Animasi) yang menawan dan berkelas.
- **Vanilla DOM:** Manipulasi elemen yang ringan dan super cepat tanpa _framework_ berat.

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repository ini**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Jalankan server _development_:**
   ```bash
   npm run dev
   ```
4. Buka browser dan akses `http://localhost:5173`

## 📦 Deployment
Aplikasi ini diatur untuk secara otomatis melakukan _deployment_ ke **GitHub Pages** setiap kali ada perubahan yang di-_push_ ke branch utama.

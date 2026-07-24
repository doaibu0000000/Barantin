@echo off
echo ======================================
echo  Barantin Captcha Solver Server
echo ======================================
echo.

:: Cek apakah ddddocr sudah terinstall
python -c "import ddddocr" 2>nul
if errorlevel 1 (
    echo [!] ddddocr belum terinstall. Menginstall sekarang...
    pip install ddddocr
    if errorlevel 1 (
        echo [ERROR] Gagal install ddddocr. Pastikan pip tersedia.
        pause
        exit /b 1
    )
)

echo [OK] Memulai server captcha...
echo [INFO] Server berjalan di http://localhost:5050
echo [INFO] Biarkan window ini tetap terbuka saat menggunakan aplikasi Barantin
echo.
python captcha_server.py
pause

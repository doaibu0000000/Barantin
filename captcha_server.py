#!/usr/bin/env python3
"""
Barantin Captcha Solver Server
Menggunakan ddddocr untuk membaca captcha otomatis.
Jalankan: python captcha_server.py
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import base64
import sys

PORT = 5050

# Coba import ddddocr
try:
    import ddddocr
    ocr = ddddocr.DdddOcr(show_ad=False)
    print("[OK] ddddocr loaded successfully")
except ImportError:
    print("[ERROR] ddddocr tidak ditemukan!")
    print("Install dengan: pip install ddddocr")
    sys.exit(1)


class CaptchaHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Hanya log error, bukan setiap request
        if args and str(args[1]) not in ('200', '204'):
            print(f"[LOG] {format % args}")

    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path != '/solve':
            self.send_response(404)
            self.end_headers()
            return

        try:
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            payload = json.loads(body)

            image_data = payload.get('image', '')

            # Hapus prefix data URI jika ada
            if ',' in image_data:
                image_data = image_data.split(',')[1]

            # Decode base64 ke bytes
            image_bytes = base64.b64decode(image_data)

            # Solve captcha dengan ddddocr
            result = ocr.classification(image_bytes)
            print(f"[CAPTCHA] Terdeteksi: {result}")

            response = json.dumps({'text': result, 'status': True})
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(response.encode())

        except Exception as e:
            print(f"[ERROR] {e}")
            response = json.dumps({'text': '', 'status': False, 'error': str(e)})
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(response.encode())


if __name__ == '__main__':
    server = HTTPServer(('localhost', PORT), CaptchaHandler)
    print(f"[SERVER] Barantin Captcha Solver running at http://localhost:{PORT}")
    print(f"[SERVER] Tekan Ctrl+C untuk berhenti")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[SERVER] Stopped.")
        server.server_close()

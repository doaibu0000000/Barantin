export const Login = () => {
  return `
    <div class="flex items-center justify-center min-h-screen bg-[#3b3b3b] w-full p-4">
      <div class="w-full max-w-md bg-brand-panel border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col gap-4">
        
        <div class="flex flex-col items-center gap-2">
          <img src="./barantin.png" alt="Barantin Logo" class="w-24 h-24 object-contain drop-shadow-xl" />
          <h1 class="text-2xl font-bold text-white">Barantin</h1>
        </div>

        <div id="loginFormContainer" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-white/80">Username</label>
            <div class="w-full h-[46px] bg-brand-input border border-brand-border rounded-lg focus-within:border-brand-accent transition-colors flex items-center overflow-hidden">
              <textarea 
                rows="1"
                id="username" 
                class="w-full h-full bg-transparent px-4 py-0 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none resize-none overflow-hidden whitespace-nowrap leading-[44px]"
                placeholder="Masukkan username"
                required
              ></textarea>
            </div>
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-white/80">Password</label>
            <div class="w-full h-[46px] bg-brand-input border border-brand-border rounded-lg focus-within:border-brand-accent transition-colors flex items-center overflow-hidden">
              <textarea 
                rows="1"
                id="password" 
                style="-webkit-text-security: disc;"
                class="w-full h-full bg-transparent pl-4 pr-2 py-0 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none resize-none overflow-hidden whitespace-nowrap leading-[44px]"
                placeholder="Masukkan password"
                required
              ></textarea>
              <button type="button" id="togglePasswordBtn" class="flex-shrink-0 pr-3 text-zinc-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center h-full" tabindex="-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <div class="h-[46px] flex items-center bg-white rounded-lg px-2 border border-brand-border relative" style="min-width:140px">
                <span id="captchaLoading" class="text-gray-400 text-xs px-2">Memuat...</span>
                <img id="captchaImage" src="" class="h-full max-w-[120px] object-contain" alt="captcha" style="display:none" />
                <button type="button" id="refreshCaptchaBtn" class="ml-2 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer flex-shrink-0" title="Refresh Captcha">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </button>
              </div>
              <div class="flex-1 h-[46px] bg-brand-input border border-brand-border rounded-lg focus-within:border-brand-accent transition-colors flex items-center overflow-hidden">
                <input type="text" id="captchaInput" class="w-full h-full bg-transparent px-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none" placeholder="Kode Captcha" maxlength="10" />
              </div>
            </div>
            <p id="captchaHint" class="text-xs text-zinc-500" style="display:none">Kode terisi otomatis. Koreksi jika salah.</p>
          </div>
          
          <div id="loginError" class="text-red-500 text-sm hidden"></div>

          <button 
            type="button" 
            id="loginSubmitBtn"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Masuk
          </button>
        </div>
        
      </div>
    </div>
  `;
};

export const bindLoginEvents = (onSuccess: () => void) => {
  const loginSubmitBtn = document.getElementById('loginSubmitBtn') as HTMLButtonElement;
  const loginError = document.getElementById('loginError');
  const usernameInput = document.getElementById('username') as HTMLTextAreaElement;
  const passwordInputEl = document.getElementById('password') as HTMLTextAreaElement;
  const captchaInputEl = document.getElementById('captchaInput') as HTMLInputElement;
  const captchaImageEl = document.getElementById('captchaImage') as HTMLImageElement;
  const refreshCaptchaBtn = document.getElementById('refreshCaptchaBtn');

  // Load saved credentials
  const savedUsername = localStorage.getItem('savedUsername');
  const savedPassword = localStorage.getItem('savedPassword');
  if (savedUsername && usernameInput) usernameInput.value = savedUsername;
  if (savedPassword && passwordInputEl) passwordInputEl.value = savedPassword;

  // CAPTCHA Logic
  let currentCaptchaToken = '';
  let currentCaptchaImageSrc = '';

  // === STRATEGI AUTO CAPTCHA (tanpa server) ===
  // 1. Decode JWT token → cek apakah ada teks captcha di payload
  // 2. Preprocessing canvas (scale 3x + binarisasi) → Tesseract.js OCR

  const decodeJwt = (token: string): any => {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const pad = parts[1] + '='.repeat((4 - parts[1].length % 4) % 4);
      return JSON.parse(atob(pad));
    } catch { return null; }
  };

  // --- ddddocr murni di Browser via ONNX Runtime Web ---
  const charsetMap: Record<number, string> = {
    0: '', 78: '2', 409: '7', 2879: '9', 4410: '1', 
    5806: '4', 5961: '6', 6749: '0', 6977: '5', 6979: '8', 7721: '3'
  };
  const allowedIndices = Object.keys(charsetMap).map(Number);

  let ortReady = false;
  let ddddOcrSession: any = null;

  const preloadDdddOcr = async () => {
    if (!(window as any).ort) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/ort.min.js';
      document.head.appendChild(s);
      await new Promise(r => { s.onload = r; });
    }
    ortReady = true;
    (window as any).ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/';
    try {
      // Load model ddddocr (sudah dipush ke folder public/)
      if (!ddddOcrSession) {
        ddddOcrSession = await (window as any).ort.InferenceSession.create('/Barantin/ddddocr.onnx');
      }
    } catch (e) { console.error('Gagal meload model ddddocr', e); }
  };
  preloadDdddOcr();

  const preprocessForDdddOcr = (imgSrc: string): Promise<{ data: Float32Array, width: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // ddddocr butuh tinggi fix 64
        const targetHeight = 64;
        const targetWidth = Math.floor(img.width * targetHeight / img.height);
        
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imgData.data;
        
        const tensorData = new Float32Array(targetHeight * targetWidth);
        for (let y = 0; y < targetHeight; y++) {
          for (let x = 0; x < targetWidth; x++) {
            const idx = (y * targetWidth + x) * 4;
            const gray = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
            // Normalisasi untuk model ONNX: (pixel / 127.5) - 1.0
            tensorData[y * targetWidth + x] = (gray / 127.5) - 1.0;
          }
        }
        resolve({ data: tensorData, width: targetWidth });
      };
      img.onerror = () => resolve({ data: new Float32Array(0), width: 0 });
      img.src = imgSrc;
    });
  };

  const solveCaptchaOCR = async (imgSrc: string): Promise<string> => {
    try {
      let waited = 0;
      while ((!ortReady || !ddddOcrSession) && waited < 100) {
        await new Promise(r => setTimeout(r, 100));
        waited++;
      }
      if (!ddddOcrSession) return '';

      const { data, width } = await preprocessForDdddOcr(imgSrc);
      if (width === 0) return '';

      const tensor = new (window as any).ort.Tensor('float32', data, [1, 1, 64, width]);
      const results = await ddddOcrSession.run({ 'input1': tensor });
      
      const outTensor = results['387']; // Output logits
      const resultData = outTensor.data;
      const seqLen = outTensor.dims[0];
      const numClasses = outTensor.dims[2]; // 8210

      let text = '';
      let lastIdx = -1;

      // CTC Decoding dengan Filter Hanya Angka (Whitelist)
      for (let t = 0; t < seqLen; t++) {
        let maxVal = -Infinity;
        let bestIdx = 0;
        
        for (const idx of allowedIndices) {
          const val = resultData[t * numClasses + idx];
          if (val > maxVal) { maxVal = val; bestIdx = idx; }
        }
        
        if (bestIdx !== 0 && bestIdx !== lastIdx) {
          text += charsetMap[bestIdx];
        }
        lastIdx = bestIdx;
      }
      return text;
    } catch (e) {
      console.error('OCR error:', e);
      return '';
    }
  };

  const loadCaptcha = async () => {
    const captchaLoadingEl = document.getElementById('captchaLoading');
    const captchaHintEl = document.getElementById('captchaHint');
    if (captchaLoadingEl) { captchaLoadingEl.textContent = 'Memuat...'; captchaLoadingEl.style.display = 'inline'; }
    if (captchaImageEl) captchaImageEl.style.display = 'none';
    if (captchaInputEl) captchaInputEl.value = '';

    try {
      const CAPTCHA_URL = 'https://api.karantinaindonesia.go.id/barantin-sys-v2/captcha?app=APP001';
      const fetchOptions = { headers: { 'Accept': 'application/json, text/plain, */*' }, referrerPolicy: 'no-referrer' as RequestInit['referrerPolicy'] };

      // Coba langsung dulu, jika gagal pakai CORS proxy
      let res = await fetch(CAPTCHA_URL, fetchOptions).catch(() => null);
      if (!res || !res.ok) {
        // Fallback: gunakan CORS proxy (tidak kirim Sec-Fetch-Site)
        res = await fetch('https://corsproxy.io/?' + encodeURIComponent(CAPTCHA_URL), fetchOptions).catch(() => null);
      }
      if (!res || !res.ok) throw new Error('Captcha tidak dapat dimuat');
      const data = await res.json();

      if (data.status && data.image) {
        // Normalkan format base64
        let imgSrc = data.image;
        if (imgSrc && !imgSrc.startsWith('data:') && !imgSrc.startsWith('http')) {
          imgSrc = 'data:image/png;base64,' + imgSrc;
        }
        currentCaptchaToken = data.token;
        currentCaptchaImageSrc = imgSrc;

        if (captchaImageEl) {
          captchaImageEl.src = imgSrc;
          captchaImageEl.onload = async () => {
            captchaImageEl.style.display = 'block';

            // Coba 1: Decode JWT token untuk dapat teks captcha langsung
            const jwtPayload = decodeJwt(data.token || '');
            const jwtText = (jwtPayload?.captcha || jwtPayload?.answer || jwtPayload?.code || jwtPayload?.text || '').toString().trim();

            if (jwtText && captchaInputEl) {
              // Dapat dari JWT — instant!
              captchaInputEl.value = jwtText;
              if (captchaLoadingEl) captchaLoadingEl.style.display = 'none';
              if (captchaHintEl) { captchaHintEl.textContent = `Terisi otomatis: ${jwtText}`; captchaHintEl.style.display = 'block'; }
            } else {
              // Coba 2: OCR via Tesseract.js (browser-native, tidak butuh server)
              if (captchaLoadingEl) { captchaLoadingEl.textContent = 'Membaca...'; captchaLoadingEl.style.display = 'inline'; }
              const solved = await solveCaptchaOCR(imgSrc);
              if (captchaLoadingEl) captchaLoadingEl.style.display = 'none';
              if (solved && captchaInputEl) {
                captchaInputEl.value = solved;
                if (captchaHintEl) { captchaHintEl.textContent = `Terisi otomatis: ${solved}`; captchaHintEl.style.display = 'block'; }
              }
            } // end else (OCR fallback)
          }; // end onload
          captchaImageEl.onerror = () => {
            if (captchaLoadingEl) captchaLoadingEl.textContent = 'Gagal memuat gambar';
          };
        }
      } else {
        if (captchaLoadingEl) captchaLoadingEl.textContent = 'Gagal memuat captcha';
      }
    } catch (e) {
      console.error('Error loading captcha:', e);
      if (captchaLoadingEl) captchaLoadingEl.textContent = 'Error: ' + (e as any).message;
    }
  };

  loadCaptcha();
  if (refreshCaptchaBtn) {
    refreshCaptchaBtn.addEventListener('click', loadCaptcha);
  }

  // Network & Location Logic
  let userIp = '103.152.232.25'; // Fallback to user's known IP
  
  fetch('https://api.ipify.org/?format=json')
    .then(r => r.json())
    .then(data => userIp = data.ip)
    .catch(e => console.error('Error fetching IP:', e));

  const getLocation = (): Promise<any> => {
    return Promise.resolve({
      timestamp: Date.now(),
      coords: { 
        accuracy: 212, 
        latitude: -6.577271, 
        longitude: 107.783081, 
        altitude: null, 
        altitudeAccuracy: null, 
        heading: null, 
        speed: null 
      }
    });
  };

  // Login Execution
  const attemptLogin = async () => {
      const username = usernameInput.value.trim();
      const password = passwordInputEl.value.trim();
      if (!username || !password) {
        if (loginError) {
          loginError.classList.remove('hidden');
          loginError.textContent = 'Harap isi username dan password';
        }
        return;
      }

      if (loginSubmitBtn) {
        loginSubmitBtn.disabled = true;
        loginSubmitBtn.textContent = 'Membaca captcha...';
      }

      // Auto-baca captcha via OCR jika belum terisi
      if (!captchaInputEl.value.trim()) {
        const ocrText = await solveCaptchaOCR(currentCaptchaImageSrc);
        captchaInputEl.value = ocrText;
      }
      const captcha = captchaInputEl.value.trim();

      if (!captcha) {
        if (loginError) {
          loginError.classList.remove('hidden');
          loginError.textContent = 'Gagal membaca captcha otomatis. Coba refresh captcha.';
        }
        if (loginSubmitBtn) { loginSubmitBtn.disabled = false; loginSubmitBtn.textContent = 'Masuk'; }
        return;
      }
      
      if (loginError) loginError.classList.add('hidden');

      try {
        const location = await getLocation();
        
        const response = await fetch('https://api.karantinaindonesia.go.id/barantin-sys-v2/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            app: 'APP001',
            ipaddress: userIp,
            captcha,
            captchaToken: currentCaptchaToken,
            location
          })
        });

        const data = await response.json();

        if (data.status) {
          // Success!
          localStorage.setItem('savedUsername', username);
          localStorage.setItem('savedPassword', password);
          
          if (data.data) {
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('userData', JSON.stringify(data.data));
          }
          
          onSuccess();
        } else {
          // API denied login
          if (loginError) {
            loginError.classList.remove('hidden');
            loginError.textContent = data.message || 'Login gagal';
          }
          passwordInputEl.value = '';
          captchaInputEl.value = '';
          loadCaptcha(); // Refresh captcha on failure
        }
      } catch (e) {
        if (loginError) {
          loginError.classList.remove('hidden');
          loginError.textContent = 'Terjadi kesalahan jaringan atau server tidak dapat dihubungi.';
        }
      } finally {
        if (loginSubmitBtn) {
          loginSubmitBtn.disabled = false;
          loginSubmitBtn.textContent = 'Masuk';
        }
      }
  };

  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      attemptLogin();
    });
  }

  // Handle Enter key for inputs
  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      attemptLogin();
    }
  };

  if (passwordInputEl) passwordInputEl.addEventListener('keydown', handleEnter);
  if (captchaInputEl) captchaInputEl.addEventListener('keydown', handleEnter);

  // Prevent spaces in Username and Password
  const preventSpace = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.includes(' ')) {
      target.value = target.value.replace(/\s/g, '');
    }
  };
  
  if (usernameInput) usernameInput.addEventListener('input', preventSpace);
  if (passwordInputEl) passwordInputEl.addEventListener('input', preventSpace);

  // Toggle Password Visibility
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  if (togglePasswordBtn && passwordInputEl) {
    togglePasswordBtn.addEventListener('click', () => {
      const isHidden = (passwordInputEl.style as any).webkitTextSecurity === 'disc';
      (passwordInputEl.style as any).webkitTextSecurity = isHidden ? 'none' : 'disc';
      togglePasswordBtn.innerHTML = isHidden 
        ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`
        : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>`;
    });
  }
};

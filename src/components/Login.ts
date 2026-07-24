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
              <div class="h-[46px] flex items-center bg-white rounded-lg px-2 border border-brand-border">
                <img id="captchaImage" src="" class="h-full max-w-[120px] object-contain" alt="captcha" />
                <button type="button" id="refreshCaptchaBtn" class="ml-2 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer" title="Refresh Captcha">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </button>
              </div>
              <div class="flex-1 h-[46px] bg-brand-input border border-brand-border rounded-lg focus-within:border-brand-accent transition-colors flex items-center overflow-hidden">
                <input type="text" id="captchaInput" class="w-full h-full bg-transparent px-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none" placeholder="Kode Captcha" required />
              </div>
            </div>
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
  
  const loadCaptcha = async () => {
    try {
      const res = await fetch('https://api.karantinaindonesia.go.id/barantin-sys-v2/captcha?app=APP001');
      if (!res.ok) throw new Error('Failed to fetch captcha');
      const data = await res.json();
      if (data.status && data.image) {
        captchaImageEl?.setAttribute('src', data.image);
        currentCaptchaToken = data.token;
      }
    } catch (e) {
      console.error('Error loading captcha:', e);
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
      const captcha = captchaInputEl.value.trim();

      if (!username || !password || !captcha) {
        if (loginError) {
          loginError.classList.remove('hidden');
          loginError.textContent = 'Harap isi semua kolom';
        }
        return;
      }

      if (loginSubmitBtn) {
        loginSubmitBtn.disabled = true;
        loginSubmitBtn.textContent = 'Memproses...';
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

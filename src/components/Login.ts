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
          
          <div id="loginError" class="text-red-500 text-sm hidden">Username atau password salah</div>

          <button 
            type="button" 
            id="loginSubmitBtn"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-2 shadow-lg"
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
  const passwordInput = document.getElementById('password') as HTMLTextAreaElement;

  // Auto-fill from localStorage
  const savedUsername = localStorage.getItem('savedUsername');
  const savedPassword = localStorage.getItem('savedPassword');
  
  if (savedUsername && usernameInput) usernameInput.value = savedUsername;
  if (savedPassword && passwordInput) passwordInput.value = savedPassword;

  const attemptLogin = () => {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      // Default dummy validation (username: admin, password: admin)
      if (username === 'admin' && password === 'admin') {
        if (loginError) loginError.classList.add('hidden');
        
        // Save to localStorage for next time
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('savedPassword', password);
        
        onSuccess();
      } else {
        if (loginError) {
          loginError.classList.remove('hidden');
          if (username !== 'admin') {
            loginError.textContent = 'Username salah';
          } else {
            loginError.textContent = 'Password salah';
          }
        }
        passwordInput.value = '';
      }
  };

  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      attemptLogin();
    });
  }

  const passwordInputEl = document.getElementById('password') as HTMLTextAreaElement;
  if (passwordInputEl) {
    passwordInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        attemptLogin();
      }
    });
  }

  // Prevent spaces in Username and Password
  const usernameInputEl = document.getElementById('username') as HTMLTextAreaElement;
  
  const preventSpace = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.includes(' ')) {
      target.value = target.value.replace(/\s/g, '');
    }
  };
  
  if (usernameInputEl) {
    usernameInputEl.addEventListener('input', preventSpace);
  }
  if (passwordInputEl) {
    passwordInputEl.addEventListener('input', preventSpace);
  }

  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  if (togglePasswordBtn && passwordInputEl) {
    togglePasswordBtn.addEventListener('click', () => {
      const isHidden = passwordInputEl.style.webkitTextSecurity === 'disc';
      passwordInputEl.style.webkitTextSecurity = isHidden ? 'none' : 'disc';
      togglePasswordBtn.innerHTML = isHidden 
        ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`
        : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>`;
    });
  }
};

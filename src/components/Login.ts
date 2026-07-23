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
            <textarea 
              rows="1"
              id="username" 
              class="w-full h-[46px] bg-brand-input border border-brand-border rounded-lg px-4 py-3 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none overflow-hidden whitespace-nowrap leading-tight"
              placeholder="Masukkan username"
              required
            ></textarea>
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-white/80">Password</label>
            <textarea 
              rows="1"
              id="password" 
              style="-webkit-text-security: disc;"
              class="w-full h-[46px] bg-brand-input border border-brand-border rounded-lg px-4 py-3 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none overflow-hidden whitespace-nowrap leading-tight"
              placeholder="Masukkan password"
              required
            ></textarea>
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
};

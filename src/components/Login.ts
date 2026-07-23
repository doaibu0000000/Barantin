export const Login = () => {
  return `
    <div class="flex items-center justify-center min-h-screen bg-[#1a1b1e] w-full p-4">
      <div class="w-full max-w-md bg-brand-panel border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
        
        <div class="flex flex-col items-center gap-4 mb-4">
          <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg relative">
            <span class="text-4xl font-bold text-white">B</span>
            <div class="absolute top-2 right-2 w-3 h-3 bg-blue-300 rounded-full"></div>
          </div>
          <h1 class="text-2xl font-bold text-white">Login ke Barantin</h1>
          <p class="text-brand-text-muted text-sm text-center">Silakan masukkan kredensial Anda untuk melanjutkan</p>
        </div>

        <div id="loginFormContainer" class="flex flex-col gap-5">
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

  const attemptLogin = () => {
      
      const usernameInput = document.getElementById('username') as HTMLTextAreaElement;
      const passwordInput = document.getElementById('password') as HTMLTextAreaElement;
      
      // Default dummy validation (username: admin, password: password)
      if (usernameInput.value.trim() === 'admin' && passwordInput.value.trim() === 'admin') {
        if (loginError) loginError.classList.add('hidden');
        onSuccess();
      } else {
        if (loginError) loginError.classList.remove('hidden');
        passwordInput.value = '';
      }
  };

  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      attemptLogin();
    });
  }

  const passwordInputEl = document.getElementById('password');
  if (passwordInputEl) {
    passwordInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        attemptLogin();
      }
    });
  }
};

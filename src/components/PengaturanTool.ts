export const PengaturanTool = () => {
  return `
    <div class="flex flex-col w-full relative">
      <!-- Main Settings Menu -->
      <div id="settingsMainScreen" class="flex flex-col gap-2 text-white max-w-2xl w-full transition-opacity duration-300">


        <button type="button" id="btnMenuProviders" class="flex items-center justify-between bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-zinc-700/50 p-4 rounded-xl shadow-md transition-colors w-full text-left group">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-brand-accent rounded-lg text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-white">Providers</h3>
              <p class="text-xs text-zinc-400 mt-0.5">Konfigurasi koneksi API ke model AI</p>
            </div>
          </div>
          <svg class="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <button type="button" id="btnPengaturanLogout" class="flex items-center justify-between bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 p-4 rounded-xl shadow-md transition-colors w-full text-left group">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-red-500 rounded-lg text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-red-400 group-hover:text-white transition-colors">Logout / Keluar</h3>
              <p class="text-xs text-red-400/70 group-hover:text-red-100 transition-colors mt-0.5">Akhiri sesi Anda saat ini</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Providers Sub-Screen -->
      <div id="settingsProvidersScreen" class="hidden flex-col w-full z-10 transition-transform duration-300">
        <!-- Top Bar -->
        <div class="flex items-center pb-2 border-b border-white/10">
          <button type="button" id="btnBackFromProviders" class="p-1 mr-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <h2 class="text-base font-semibold text-white">Konfigurasi Providers</h2>
        </div>
        
        <!-- Form Content -->
        <div class="pt-3 pb-4 text-white w-full">
          <div class="max-w-2xl w-full">
            <form id="providerForm" class="flex flex-col gap-4 bg-[#1e1e1e] border border-zinc-700/50 p-4 md:p-5 rounded-xl shadow-xl">
              
              <!-- Provider ID -->
              <div class="flex flex-col gap-1.5">
                <label for="providerId" class="text-xs font-semibold text-zinc-400">ID Provider</label>
                <input type="text" id="providerId" placeholder="myprovider" class="w-full bg-[#2a2a2a] border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 text-sm outline-none focus:border-brand-accent transition-colors" />
                <span class="text-xs text-zinc-500 font-medium">Hanya huruf kecil, angka, tanda hubung (-), atau garis bawah (_)</span>
              </div>

              <!-- Display name -->
              <div class="flex flex-col gap-1.5">
                <label for="displayName" class="text-xs font-semibold text-zinc-400">Nama Tampilan</label>
                <input type="text" id="displayName" placeholder="Provider AI Saya" class="w-full bg-[#2a2a2a] border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 text-sm outline-none focus:border-brand-accent transition-colors" />
              </div>

              <!-- Base URL -->
              <div class="flex flex-col gap-1.5">
                <label for="baseUrl" class="text-xs font-semibold text-zinc-400">URL Dasar (Base URL)</label>
                <input type="text" id="baseUrl" placeholder="https://api.myprovider.com/v1" class="w-full bg-[#2a2a2a] border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 text-sm outline-none focus:border-brand-accent transition-colors" />
              </div>

              <!-- API key -->
              <div class="flex flex-col gap-1.5">
                <label for="apiKey" class="text-xs font-semibold text-zinc-400">Kunci API (API Key)</label>
                <input type="password" id="apiKey" placeholder="API key" class="w-full bg-[#2a2a2a] border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 text-sm outline-none focus:border-brand-accent transition-colors" />
                <span class="text-xs text-zinc-500 font-medium mt-1">Opsional. Kosongkan jika Anda mengatur autentikasi melalui Headers.</span>
              </div>

              <!-- Models -->
              <div class="flex flex-col gap-2 mt-2">
                <label class="text-xs font-semibold text-zinc-400">Model</label>
                <div id="modelsContainer" class="flex flex-col gap-2">
                  <!-- Models injected here via JS -->
                </div>
                <button type="button" id="btnAddModel" class="flex items-center gap-2 text-sm text-brand-text-muted hover:text-white font-medium w-fit mt-1 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  Tambah model
                </button>
              </div>

              <!-- Headers -->
              <div class="flex flex-col gap-2 mt-2">
                <label class="text-xs font-semibold text-zinc-400">Headers (opsional)</label>
                <div id="headersContainer" class="flex flex-col gap-2">
                  <!-- Headers injected here via JS -->
                </div>
                <button type="button" id="btnAddHeader" class="flex items-center gap-2 text-sm text-brand-text-muted hover:text-white font-medium w-fit mt-1 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  Tambah header
                </button>
              </div>

              <div class="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-700">
                <button type="button" id="btnSubmitProvider" class="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-6 py-2 text-sm font-semibold cursor-pointer transition-colors shadow-md">
                  Simpan
                </button>
                <span id="providerStatus" class="text-xs font-medium text-emerald-400 opacity-0 transition-opacity">Berhasil disimpan!</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const bindPengaturanToolEvents = () => {
  // Logout
  const logoutBtn = document.getElementById('btnPengaturanLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isAuthenticated');
      window.location.reload();
    });
  }

  // Menu Navigation Logic
  const mainScreen = document.getElementById('settingsMainScreen');
  const providersScreen = document.getElementById('settingsProvidersScreen');
  const btnMenuProviders = document.getElementById('btnMenuProviders');
  const btnBackFromProviders = document.getElementById('btnBackFromProviders');

  if (btnMenuProviders && mainScreen && providersScreen) {
    btnMenuProviders.addEventListener('click', () => {
      // Show providers screen, hide main screen
      mainScreen.classList.add('hidden');
      mainScreen.classList.remove('flex');
      providersScreen.classList.remove('hidden');
      providersScreen.classList.add('flex');
    });
  }

  if (btnBackFromProviders && mainScreen && providersScreen) {
    btnBackFromProviders.addEventListener('click', () => {
      // Show main screen, hide providers screen
      providersScreen.classList.add('hidden');
      providersScreen.classList.remove('flex');
      mainScreen.classList.remove('hidden');
      mainScreen.classList.add('flex');
    });
  }

  // --- Providers Logic ---
  const modelsContainer = document.getElementById('modelsContainer');
  const headersContainer = document.getElementById('headersContainer');
  const btnAddModel = document.getElementById('btnAddModel');
  const btnAddHeader = document.getElementById('btnAddHeader');
  const btnSubmitProvider = document.getElementById('btnSubmitProvider');
  
  const providerIdInput = document.getElementById('providerId') as HTMLInputElement;
  const displayNameInput = document.getElementById('displayName') as HTMLInputElement;
  const baseUrlInput = document.getElementById('baseUrl') as HTMLInputElement;
  const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
  const providerStatus = document.getElementById('providerStatus');

  let models = [{ id: '', name: '' }];
  let headers = [{ key: '', value: '' }];

  // Load existing data if available
  const savedProviderRaw = localStorage.getItem('aiProviderConfig');
  if (savedProviderRaw) {
    try {
      const savedProvider = JSON.parse(savedProviderRaw);
      if (providerIdInput) providerIdInput.value = savedProvider.providerId || '';
      if (displayNameInput) displayNameInput.value = savedProvider.displayName || '';
      if (baseUrlInput) baseUrlInput.value = savedProvider.baseUrl || '';
      if (apiKeyInput) apiKeyInput.value = savedProvider.apiKey || '';
      
      if (savedProvider.models && savedProvider.models.length > 0) {
        models = savedProvider.models;
      }
      if (savedProvider.headers && savedProvider.headers.length > 0) {
        headers = savedProvider.headers;
      } else {
        headers = [];
      }
    } catch (e) {
      console.error('Failed to parse aiProviderConfig', e);
    }
  }

  const renderModels = () => {
    if (!modelsContainer) return;
    modelsContainer.innerHTML = '';
    models.forEach((m, index) => {
      const row = document.createElement('div');
      row.className = 'flex flex-col md:flex-row items-start md:items-center gap-2 w-full';
      row.innerHTML = `
        <input type="text" placeholder="id-model" value="${m.id}" class="model-id-input w-full md:flex-1 bg-[#2a2a2a] border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 text-sm outline-none focus:border-brand-accent transition-colors" />
        <div class="flex w-full md:flex-1 gap-2">
          <input type="text" placeholder="Nama Tampilan" value="${m.name}" class="model-name-input flex-1 bg-[#2a2a2a] border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 text-sm outline-none focus:border-brand-accent transition-colors" />
          <button type="button" class="btn-delete-model p-2 text-zinc-500 hover:text-red-400 transition-colors shrink-0" data-index="${index}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      `;
      
      const idInput = row.querySelector('.model-id-input') as HTMLInputElement;
      const nameInput = row.querySelector('.model-name-input') as HTMLInputElement;
      const delBtn = row.querySelector('.btn-delete-model');

      idInput?.addEventListener('input', (e) => { models[index].id = (e.target as HTMLInputElement).value; });
      nameInput?.addEventListener('input', (e) => { models[index].name = (e.target as HTMLInputElement).value; });
      delBtn?.addEventListener('click', () => {
        models.splice(index, 1);
        renderModels();
      });

      modelsContainer.appendChild(row);
    });
  };

  const renderHeaders = () => {
    if (!headersContainer) return;
    headersContainer.innerHTML = '';
    headers.forEach((h, index) => {
      const row = document.createElement('div');
      row.className = 'flex flex-col md:flex-row items-start md:items-center gap-2 w-full';
      row.innerHTML = `
        <input type="text" placeholder="Nama-Header" value="${h.key}" class="header-key-input w-full md:flex-1 bg-[#2a2a2a] border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 text-sm outline-none focus:border-brand-accent transition-colors" />
        <div class="flex w-full md:flex-1 gap-2">
          <input type="text" placeholder="nilai" value="${h.value}" class="header-value-input flex-1 bg-[#2a2a2a] border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 text-sm outline-none focus:border-brand-accent transition-colors" />
          <button type="button" class="btn-delete-header p-2 text-zinc-500 hover:text-red-400 transition-colors shrink-0" data-index="${index}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      `;

      const keyInput = row.querySelector('.header-key-input') as HTMLInputElement;
      const valueInput = row.querySelector('.header-value-input') as HTMLInputElement;
      const delBtn = row.querySelector('.btn-delete-header');

      keyInput?.addEventListener('input', (e) => { headers[index].key = (e.target as HTMLInputElement).value; });
      valueInput?.addEventListener('input', (e) => { headers[index].value = (e.target as HTMLInputElement).value; });
      delBtn?.addEventListener('click', () => {
        headers.splice(index, 1);
        renderHeaders();
      });

      headersContainer.appendChild(row);
    });
  };

  if (btnAddModel) {
    btnAddModel.addEventListener('click', () => {
      models.push({ id: '', name: '' });
      renderModels();
    });
  }

  if (btnAddHeader) {
    btnAddHeader.addEventListener('click', () => {
      headers.push({ key: '', value: '' });
      renderHeaders();
    });
  }

  renderModels();
  renderHeaders();

  if (btnSubmitProvider && providerStatus) {
    btnSubmitProvider.addEventListener('click', () => {
      const config = {
        providerId: providerIdInput?.value.trim(),
        displayName: displayNameInput?.value.trim(),
        baseUrl: baseUrlInput?.value.trim(),
        apiKey: apiKeyInput?.value.trim(),
        models: models.filter(m => m.id.trim() !== ''),
        headers: headers.filter(h => h.key.trim() !== '')
      };

      localStorage.setItem('aiProviderConfig', JSON.stringify(config));
      
      providerStatus.style.opacity = '1';
      setTimeout(() => {
        providerStatus.style.opacity = '0';
      }, 2500);
    });
  }
};

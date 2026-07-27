export const DraftTool = () => {
  return `
    <div class="flex flex-col gap-4 h-full">
      <div class="flex flex-row items-center gap-3 mb-2">
        <div class="flex w-fit bg-zinc-800/50 p-1 rounded-lg">
          <button type="button" id="tabPdf" class="px-4 py-2 text-sm font-semibold rounded-md bg-brand-accent text-white transition-all">PDF</button>
          <button type="button" id="tabKt" class="px-4 py-2 text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No KT</button>
        </div>
      </div>

      <div id="pdfSection" class="flex flex-col gap-2">
        <div class="relative">
          <input type="file" id="pdfUpload" accept=".pdf" class="hidden" />
          <label for="pdfUpload" class="w-full h-[140px] bg-brand-input hover:bg-brand-input/80 border border-brand-border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-brand-text-muted hover:text-white">
            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <span id="pdfFileName" class="text-sm font-medium">Klik untuk memilih file PDF</span>
          </label>
        </div>
      </div>

      <!-- Tab No KT: input nomor KT singkat, seperti di Surtu 2 -->
      <div id="ktSection" class="flex flex-col gap-2 hidden relative">
        <textarea id="ktNumber" placeholder="Contoh :&#10;1894&#10;2026-T1.0-3200.2-K.1.1-001894" class="w-full h-[140px] bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none"></textarea>
        
        <!-- Loading Overlay -->
        <div id="ktLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
          </div>
        </div>
      </div>

      <button type="button" id="processDraftBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md mt-auto">
        Buat Draft
      </button>

      <div class="flex flex-col gap-2 mt-4">
        <textarea id="draftResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors h-32" readonly></textarea>
      </div>
    </div>
  `;
};

export const bindDraftToolEvents = () => {
  let activeTab = localStorage.getItem('draftActiveTab') || 'pdf'; // Default to pdf
  const tabPdf = document.getElementById('tabPdf');
  const tabKt = document.getElementById('tabKt');
  const pdfSection = document.getElementById('pdfSection');
  const ktSection = document.getElementById('ktSection');
  const ktLoader = document.getElementById('ktLoader');

  const pdfUpload = document.getElementById('pdfUpload') as HTMLInputElement;
  const pdfFileName = document.getElementById('pdfFileName') as HTMLSpanElement;
  const ktNumber = document.getElementById('ktNumber') as HTMLTextAreaElement;
  const processDraftBtn = document.getElementById('processDraftBtn') as HTMLButtonElement;
  const draftResults = document.getElementById('draftResults') as HTMLTextAreaElement;

  // Helper: format apapun menjadi nomor KT baku
  // Ekstrak 6 digit terakhir → rebuild dengan tahun sekarang
  const formatNomorKT = (input: string): string => {
    const tahun = new Date().getFullYear();
    const template = `${tahun}-T1.0-3200.2-K.1.1`;

    // Ambil 6 digit terakhir dari input (nomor urut)
    // Contoh: 2026-T1.0-3200.2-K.T.1-001894 → 001894 → 001894
    const digitMatch = input.trim().match(/(\d{1,6})\s*$/);
    if (digitMatch) {
      const padded = digitMatch[1].padStart(6, '0');
      return `${template}-${padded}`;
    }
    // Jika tidak ada digit, kembalikan input apa adanya
    return input.trim();
  };

  // Helper banyak baris: tiap baris diformat
  const formatBanyakNomorKT = (input: string): string => {
    const tahun = new Date().getFullYear();
    const template = `${tahun}-T1.0-3200.2-K.1.1`;
    const lines = input.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    return lines.map(line => {
      // Cari kelompok digit (terutama di akhir baris)
      const digitMatch = line.match(/(\d{1,6})\s*$/);
      if (digitMatch) {
        const padded = digitMatch[1].padStart(6, '0');
        return `${template}-${padded}`;
      }
      return line;
    }).join('\n');
  };

  const showLoader = (loaderEl: HTMLElement | null, duration: number, callback: () => void) => {
    if (loaderEl) {
      loaderEl.classList.remove('opacity-0', 'pointer-events-none');
      loaderEl.classList.add('opacity-100');
    }
    setTimeout(() => {
      callback();
      if (loaderEl) {
        loaderEl.classList.remove('opacity-100');
        loaderEl.classList.add('opacity-0', 'pointer-events-none');
      }
    }, duration);
  };

  const switchTab = (tab: string) => {
    activeTab = tab;
    localStorage.setItem('draftActiveTab', tab);
    
    // Reset all tabs
    [tabPdf, tabKt].forEach(btn => {
      btn?.classList.remove('bg-brand-accent', 'text-white');
      btn?.classList.add('text-brand-text-muted', 'hover:text-white');
    });
    [pdfSection, ktSection].forEach(sec => sec?.classList.add('hidden'));

    if (tab === 'pdf') {
      tabPdf?.classList.add('bg-brand-accent', 'text-white');
      tabPdf?.classList.remove('text-brand-text-muted', 'hover:text-white');
      pdfSection?.classList.remove('hidden');
    } else if (tab === 'kt') {
      tabKt?.classList.add('bg-brand-accent', 'text-white');
      tabKt?.classList.remove('text-brand-text-muted', 'hover:text-white');
      ktSection?.classList.remove('hidden');
    }
  };

  // Set inisial UI berdasarkan tab terakhir yang aktif
  // Fallback ke pdf jika tab doc sebelumnya tersimpan
  if (activeTab === 'doc') activeTab = 'pdf';
  switchTab(activeTab);

  tabPdf?.addEventListener('click', () => switchTab('pdf'));
  tabKt?.addEventListener('click', () => switchTab('kt'));

  // ============================================================
  // Tab No KT: format otomatis - ekstrak 6 digit terakhir, rebuild dengan template baku
  // ============================================================
  if (ktNumber) {
    let ktDebounceTimer: ReturnType<typeof setTimeout>;

    ktNumber.addEventListener('input', () => {
      const currentVal = ktNumber.value;
      clearTimeout(ktDebounceTimer);

      if (!currentVal.trim()) return;

      // Cek apakah sudah PERSIS format yang benar
      const tahun = new Date().getFullYear();
      const correctFormatRegex = new RegExp(`^${tahun}-T1\.0-3200\.2-K\.1\.1-\\d{6}(\\n${tahun}-T1\.0-3200\.2-K\.1\.1-\\d{6})*$`);
      if (correctFormatRegex.test(currentVal.trim())) {
        return; // sudah benar sempurna, tidak perlu ubah
      }

      // Input apapun: format ulang setelah 500ms debounce
      ktDebounceTimer = setTimeout(() => {
        const lines = currentVal.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        // Hanya proses jika ada konten
        if (lines.length === 0) return;

        const formatted = formatBanyakNomorKT(currentVal);
        if (formatted !== currentVal.trim()) {
          showLoader(ktLoader, 400, () => {
            ktNumber.value = formatted;
          });
        }
      }, 500);
    });
  }

  if (pdfUpload && pdfFileName) {
    pdfUpload.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        pdfFileName.textContent = target.files[0].name;
        pdfFileName.classList.remove('text-brand-text-muted');
        pdfFileName.classList.add('text-brand-accent');
      } else {
        pdfFileName.textContent = 'Klik untuk memilih file PDF';
        pdfFileName.classList.add('text-brand-text-muted');
        pdfFileName.classList.remove('text-brand-accent');
      }
    });
  }

  if (processDraftBtn) {
    processDraftBtn.addEventListener('click', () => {
      let resultText = '';
      
      if (activeTab === 'pdf') {
        const file = pdfUpload?.files?.[0];
        if (!file) {
          draftResults.value = "Silakan pilih file PDF terlebih dahulu.";
          draftResults.classList.add('text-red-500');
          return;
        }
        draftResults.classList.remove('text-red-500');
        resultText = `File PDF yang dipilih: ${file.name}`;

      } else if (activeTab === 'kt') {
        // Tab No KT: selalu format ulang dengan template baku
        let rawKt = ktNumber?.value?.trim() || '';
        if (!rawKt) {
          draftResults.value = "Silakan masukkan No KT terlebih dahulu.";
          draftResults.classList.add('text-red-500');
          return;
        }
        draftResults.classList.remove('text-red-500');
        const finalKtFormatted = formatBanyakNomorKT(rawKt);
        if (ktNumber) ktNumber.value = finalKtFormatted;
        resultText = `Nomor KT:\n${finalKtFormatted}`;

      }

      draftResults.value = resultText + '\n\nDone';
    });
  }
};

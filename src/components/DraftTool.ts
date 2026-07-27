export const DraftTool = () => {
  return `
    <div class="flex flex-col gap-4 h-full">
      <div class="flex flex-row items-center gap-3 mb-2">
        <div class="flex w-fit bg-zinc-800/50 p-1 rounded-lg">
          <button type="button" id="tabPdf" class="px-4 py-2 text-sm font-semibold rounded-md bg-brand-accent text-white transition-all">PDF</button>
          <button type="button" id="tabDoc" class="px-4 py-2 text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No Dokumen</button>
          <button type="button" id="tabKt" class="px-4 py-2 text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No KT</button>
        </div>

        <!-- Badge: hanya tampil di tab No Dokumen, menampilkan nomor KT terakhir -->
        <span id="ktBadge" class="hidden px-3 py-1.5 text-sm font-bold rounded-md bg-zinc-700 border border-zinc-600 text-white font-mono"></span>
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

      <div id="docSection" class="flex flex-col gap-2 hidden relative">
        <textarea id="docNumber" placeholder="Masukan no Dokumen" class="w-full h-[140px] bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none"></textarea>
        
        <!-- Loading Overlay -->
        <div id="docLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
          </div>
        </div>
      </div>

      <!-- Tab No KT: input nomor KT singkat, seperti di Surtu 2 -->
      <div id="ktSection" class="flex flex-col gap-2 hidden relative">
        <textarea id="ktNumber" placeholder="Contoh :&#10;1894&#10;001894&#10;2026-T1.0-3200.2-K.1.1-001894" class="w-full h-[140px] bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none"></textarea>
        
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
  const tabDoc = document.getElementById('tabDoc');
  const tabKt = document.getElementById('tabKt');
  const pdfSection = document.getElementById('pdfSection');
  const docSection = document.getElementById('docSection');
  const ktSection = document.getElementById('ktSection');
  const docLoader = document.getElementById('docLoader');
  const ktLoader = document.getElementById('ktLoader');
  const ktBadge = document.getElementById('ktBadge') as HTMLSpanElement;

  const pdfUpload = document.getElementById('pdfUpload') as HTMLInputElement;
  const pdfFileName = document.getElementById('pdfFileName') as HTMLSpanElement;
  const docNumber = document.getElementById('docNumber') as HTMLTextAreaElement;
  const ktNumber = document.getElementById('ktNumber') as HTMLTextAreaElement;
  const processDraftBtn = document.getElementById('processDraftBtn') as HTMLButtonElement;
  const draftResults = document.getElementById('draftResults') as HTMLTextAreaElement;

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

  // Update badge nomor KT yang tampil di sebelah tabs
  const updateKtBadge = (nomor: string) => {
    if (!ktBadge) return;
    // Ekstrak angka terakhir (nomor urut) dari format 2026-T1.0-3200.2-K.1.1-001894 => 1894
    const match = nomor.match(/[-](\d{4,6})$/);
    if (match) {
      const shortNum = String(parseInt(match[1], 10)); // hapus leading zeros => "1894"
      ktBadge.textContent = shortNum;
      ktBadge.classList.remove('hidden');
    } else if (nomor.trim()) {
      ktBadge.textContent = '';
      ktBadge.classList.add('hidden');
    } else {
      ktBadge.textContent = '';
      ktBadge.classList.add('hidden');
    }
  };

  const switchTab = (tab: string) => {
    activeTab = tab;
    localStorage.setItem('draftActiveTab', tab);
    
    // Reset all tabs
    [tabPdf, tabDoc, tabKt].forEach(btn => {
      btn?.classList.remove('bg-brand-accent', 'text-white');
      btn?.classList.add('text-brand-text-muted', 'hover:text-white');
    });
    [pdfSection, docSection, ktSection].forEach(sec => sec?.classList.add('hidden'));

    if (tab === 'pdf') {
      tabPdf?.classList.add('bg-brand-accent', 'text-white');
      tabPdf?.classList.remove('text-brand-text-muted', 'hover:text-white');
      pdfSection?.classList.remove('hidden');
      ktBadge?.classList.add('hidden');
    } else if (tab === 'doc') {
      tabDoc?.classList.add('bg-brand-accent', 'text-white');
      tabDoc?.classList.remove('text-brand-text-muted', 'hover:text-white');
      docSection?.classList.remove('hidden');
      // Tampilkan badge jika sudah ada nomor di docNumber
      if (docNumber?.value?.trim()) {
        const lastLine = docNumber.value.trim().split('\n').pop() || '';
        updateKtBadge(lastLine);
      } else {
        ktBadge?.classList.add('hidden');
      }
    } else if (tab === 'kt') {
      tabKt?.classList.add('bg-brand-accent', 'text-white');
      tabKt?.classList.remove('text-brand-text-muted', 'hover:text-white');
      ktSection?.classList.remove('hidden');
      ktBadge?.classList.add('hidden');
    }
  };

  // Set inisial UI berdasarkan tab terakhir yang aktif
  switchTab(activeTab);

  tabPdf?.addEventListener('click', () => switchTab('pdf'));
  tabDoc?.addEventListener('click', () => switchTab('doc'));
  tabKt?.addEventListener('click', () => switchTab('kt'));

  // ============================================================
  // Tab No KT: input nomor singkat -> format otomatis seperti Surtu 2
  // ============================================================
  if (ktNumber) {
    let ktDebounceTimer: ReturnType<typeof setTimeout>;
    let lastKtRaw = '';

    ktNumber.addEventListener('input', () => {
      let rawVal = ktNumber.value.replace(/\D/g, '');
      if (rawVal.length > 6) rawVal = rawVal.slice(0, 6);

      if (rawVal === lastKtRaw) return;
      lastKtRaw = rawVal;

      clearTimeout(ktDebounceTimer);

      if (rawVal.length > 0) {
        ktDebounceTimer = setTimeout(() => {
          const padded = rawVal.padStart(6, '0');
          showLoader(ktLoader, 400, () => {
            ktNumber.value = `2026-T1.0-3200.2-K.1.1-${padded}`;
            lastKtRaw = ''; // reset agar tidak trigger ulang
          });
        }, 400);
      }
    });
  }

  // ============================================================
  // Tab No Dokumen: input/paste nomor dokumen lengkap
  // ============================================================
  if (docNumber) {
    let debounceTimer: ReturnType<typeof setTimeout>;

    docNumber.addEventListener('input', () => {
      clearTimeout(debounceTimer);

      const rawNumber = docNumber.value;
      if (!rawNumber) {
        updateKtBadge('');
        return;
      }

      const regex = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
      const matches = rawNumber.match(regex);
      
      if (matches && matches.length > 0) {
        const cleaned = matches.map(m => {
          const mUpper = m.toUpperCase();
          const digitMatch = mUpper.match(/\d{4,6}$/);
          if (digitMatch) {
            const padded = digitMatch[0].padStart(6, '0');
            return `2026-T1.0-3200.2-K.1.1-${padded}`;
          }
          return mUpper;
        }).join('\n');
        const withoutMatches = rawNumber.replace(regex, '');
        const hasGarbage = withoutMatches.trim().length > 0;
        
        if (hasGarbage) {
          showLoader(docLoader, 600, () => {
            docNumber.value = cleaned;
            const lastLine = cleaned.split('\n').pop() || '';
            updateKtBadge(lastLine);
          });
        } else {
          const lastLine = cleaned.split('\n').pop() || '';
          updateKtBadge(lastLine);
        }
      } else {
        // Logika untuk nomor pendek
        debounceTimer = setTimeout(() => {
          const currentVal = docNumber.value;
          const digitGroups = currentVal.match(/\b\d{3,6}\b/g);
          
          if (digitGroups && digitGroups.length > 0) {
            const formatted = digitGroups.map(g => {
              const padded = g.padStart(6, '0');
              return `2026-T1.0-3200.2-K.1.1-${padded}`;
            });
            showLoader(docLoader, 600, () => {
              docNumber.value = formatted.join('\n');
              const lastLine = formatted[formatted.length - 1];
              updateKtBadge(lastLine);
            });
          }
        }, 800);
      }
    });

    docNumber.addEventListener('change', () => {
      clearTimeout(debounceTimer);
      const rawNumber = docNumber.value;
      
      const regex = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
      if (!regex.test(rawNumber)) {
        const digitGroups = rawNumber.match(/\b\d{3,6}\b/g);
        if (digitGroups && digitGroups.length > 0) {
          const formatted = digitGroups.map(g => {
            const padded = g.padStart(6, '0');
            return `2026-T1.0-3200.2-K.1.1-${padded}`;
          });
          showLoader(docLoader, 600, () => {
            docNumber.value = formatted.join('\n');
            const lastLine = formatted[formatted.length - 1];
            updateKtBadge(lastLine);
          });
        }
      }
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
        // Tab No KT: ambil nilai dari ktNumber, format jika belum
        let rawKt = ktNumber?.value?.trim() || '';
        if (!rawKt) {
          draftResults.value = "Silakan masukkan No KT terlebih dahulu.";
          draftResults.classList.add('text-red-500');
          return;
        }
        draftResults.classList.remove('text-red-500');

        // Jika sudah dalam format lengkap, gunakan langsung
        const regexFull = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
        const matchesFull = rawKt.match(regexFull);
        let finalKt = rawKt;

        if (matchesFull && matchesFull.length > 0) {
          finalKt = matchesFull.map(m => {
            const mUpper = m.toUpperCase();
            const digitMatch = mUpper.match(/\d{4,6}$/);
            if (digitMatch) {
              const padded = digitMatch[0].padStart(6, '0');
              return `2026-T1.0-3200.2-K.1.1-${padded}`;
            }
            return mUpper;
          }).join('\n');
        } else {
          // Cari angka dari input
          const digitGroups = rawKt.match(/\b\d{1,6}\b/g);
          if (digitGroups) {
            const candidate = digitGroups.reverse().find(g => g.length >= 1 && g.length <= 6) || digitGroups[0];
            if (candidate) {
              const padded = candidate.padStart(6, '0');
              finalKt = `2026-T1.0-3200.2-K.1.1-${padded}`;
            }
          }
        }

        if (ktNumber) ktNumber.value = finalKt;
        resultText = `Nomor KT:\n${finalKt}`;

      } else {
        // Tab No Dokumen
        let rawNumber = docNumber.value.trim();
        if (!rawNumber) {
          draftResults.value = "Silakan masukkan Nomor Dokumen terlebih dahulu.";
          draftResults.classList.add('text-red-500');
          return;
        }
        draftResults.classList.remove('text-red-500');
        
        let finalNumber = rawNumber;
        
        // 1. Ekstrak satu atau banyak nomor dokumen lengkap
        const regex = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
        const matches = rawNumber.match(regex);
        
        if (matches && matches.length > 0) {
          finalNumber = matches.map(m => {
            const mUpper = m.toUpperCase();
            const digitMatch = mUpper.match(/\d{4,6}$/);
            if (digitMatch) {
              const padded = digitMatch[0].padStart(6, '0');
              return `2026-T1.0-3200.2-K.1.1-${padded}`;
            }
            return mUpper;
          }).join('\n');
        } else {
          // 2. Jika tidak ada format lengkap, cari angka 3-6 digit (contoh: 1615)
          const digitGroups = rawNumber.match(/\b\d{1,6}\b/g);
          if (digitGroups) {
             const candidate = digitGroups.reverse().find(g => g.length >= 3 && g.length <= 6) || digitGroups[0];
             if (candidate) {
                const padded = candidate.padStart(6, '0');
                finalNumber = `2026-T1.0-3200.2-K.1.1-${padded}`;
             }
          }
        }
        
        // Tampilkan nomor yang bersih di kotak input itu sendiri
        docNumber.value = finalNumber;
        updateKtBadge(finalNumber.split('\n').pop() || '');
        resultText = `Nomor Dokumen:\n${finalNumber}`;
      }

      draftResults.value = resultText + '\n\nDone';
    });
  }
};

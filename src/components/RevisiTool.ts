export const RevisiTool = () => {
  return `
    <div class="flex flex-col gap-4 h-full">
      <div class="flex flex-row items-center gap-3 mb-2">
        <div class="flex w-fit bg-zinc-800/50 p-1 rounded-lg">
          <button type="button" id="tabPdf" class="px-4 py-2 text-sm font-semibold rounded-md bg-brand-accent text-white transition-all">PDF</button>
          <button type="button" id="tabDoc" class="px-4 py-2 text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No Dokumen</button>
        </div>
        
        <textarea rows="1" maxlength="6" id="quickDocNumber" placeholder="No KT" class="w-20 h-[38px] bg-brand-input border border-brand-border rounded-lg px-2 py-2 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors text-center resize-none overflow-hidden whitespace-nowrap leading-tight"></textarea>
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
        <textarea id="docNumber" placeholder="Masukan no KT" class="w-full h-[140px] bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none"></textarea>
        
        <!-- Loading Overlay -->
        <div id="docLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
          </div>
        </div>
      </div>

      <button type="button" id="processRevisiBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md mt-auto">
        Revisi Draft
      </button>

      <div class="flex flex-col gap-2 mt-4">
        <textarea id="revisiResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors h-32" readonly></textarea>
      </div>
    </div>
  `;
};

export const bindRevisiToolEvents = () => {
  let activeTab = localStorage.getItem('revisiActiveTab') || 'pdf'; // Default to pdf
  const tabPdf = document.getElementById('tabPdf');
  const tabDoc = document.getElementById('tabDoc');
  const pdfSection = document.getElementById('pdfSection');
  const docSection = document.getElementById('docSection');
  const docLoader = document.getElementById('docLoader');
  const quickDocNumber = document.getElementById('quickDocNumber') as HTMLTextAreaElement;

  const pdfUpload = document.getElementById('pdfUpload') as HTMLInputElement;
  const pdfFileName = document.getElementById('pdfFileName') as HTMLSpanElement;
  const docNumber = document.getElementById('docNumber') as HTMLTextAreaElement;
  const processRevisiBtn = document.getElementById('processRevisiBtn') as HTMLButtonElement;
  const revisiResults = document.getElementById('revisiResults') as HTMLTextAreaElement;

  const showLoader = (duration: number, callback: () => void) => {
    if (docLoader) {
      docLoader.classList.remove('opacity-0', 'pointer-events-none');
      docLoader.classList.add('opacity-100');
    }
    setTimeout(() => {
      callback();
      if (docLoader) {
        docLoader.classList.remove('opacity-100');
        docLoader.classList.add('opacity-0', 'pointer-events-none');
      }
    }, duration);
  };

  const switchTab = (tab: string) => {
    activeTab = tab;
    localStorage.setItem('revisiActiveTab', tab);
    
    if (tab === 'pdf') {
      tabPdf?.classList.add('bg-brand-accent', 'text-white');
      tabPdf?.classList.remove('text-brand-text-muted', 'hover:text-white');
      tabDoc?.classList.remove('bg-brand-accent', 'text-white');
      tabDoc?.classList.add('text-brand-text-muted', 'hover:text-white');
      
      pdfSection?.classList.remove('hidden');
      docSection?.classList.add('hidden');
    } else {
      tabDoc?.classList.add('bg-brand-accent', 'text-white');
      tabDoc?.classList.remove('text-brand-text-muted', 'hover:text-white');
      tabPdf?.classList.remove('bg-brand-accent', 'text-white');
      tabPdf?.classList.add('text-brand-text-muted', 'hover:text-white');
      
      docSection?.classList.remove('hidden');
      pdfSection?.classList.add('hidden');
    }
  };

  // Set inisial UI berdasarkan tab terakhir yang aktif
  switchTab(activeTab);

  tabPdf?.addEventListener('click', () => switchTab('pdf'));
  tabDoc?.addEventListener('click', () => switchTab('doc'));

  if (quickDocNumber && docNumber) {
    quickDocNumber.addEventListener('focus', () => {
      quickDocNumber.placeholder = '';
    });
    quickDocNumber.addEventListener('blur', () => {
      quickDocNumber.placeholder = 'No KT';
    });
    
    let quickDebounceTimer: ReturnType<typeof setTimeout>;
    let lastRawVal = '';
    quickDocNumber.addEventListener('input', () => {
      let rawVal = quickDocNumber.value.replace(/\D/g, '');
      if (rawVal.length > 6) {
        rawVal = rawVal.slice(0, 6);
      }
      quickDocNumber.value = rawVal;
      
      if (rawVal === lastRawVal) return;
      lastRawVal = rawVal;
      
      clearTimeout(quickDebounceTimer);
      
      if (rawVal.length > 0) {
        quickDebounceTimer = setTimeout(() => {
          const padded = rawVal.padStart(6, '0');
          showLoader(600, () => {
            docNumber.value = `2026-T1.0-3200.2-K.1.1-${padded}`;
          });
        }, 400); // 400ms debounce
      } else {
        docNumber.value = '';
      }
    });
  }

  if (docNumber) {
    let debounceTimer: ReturnType<typeof setTimeout>;

    docNumber.addEventListener('input', () => {
      clearTimeout(debounceTimer);

      const rawNumber = docNumber.value;
      if (!rawNumber) return;

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
        // Bersihkan jika ada teks lain selain nomor dokumen yang diekstrak (termasuk spasi)
        const hasGarbage = withoutMatches.trim().length > 0;
        
        if (hasGarbage) {
          showLoader(600, () => {
            docNumber.value = cleaned;
          });
        }
      } else {
        // Logika untuk nomor pendek, baik 1 nomor (misal: "1842") maupun banyak nomor dalam teks (misal: "Tolong 1842 dan 1726")
        // Gunakan debounce agar tidak mengganggu saat sedang mengetik
        debounceTimer = setTimeout(() => {
          const currentVal = docNumber.value;
          const digitGroups = currentVal.match(/\b\d{3,6}\b/g);
          
          if (digitGroups && digitGroups.length > 0) {
            const formatted = digitGroups.map(g => {
              const padded = g.padStart(6, '0');
              return `2026-T1.0-3200.2-K.1.1-${padded}`;
            });
            showLoader(600, () => {
              docNumber.value = formatted.join('\n');
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
          showLoader(600, () => {
            docNumber.value = formatted.join('\n');
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

  if (processRevisiBtn) {
    processRevisiBtn.addEventListener('click', () => {
      let resultText = '';
      
      if (activeTab === 'pdf') {
        const file = pdfUpload?.files?.[0];
        if (!file) {
          revisiResults.value = "Silakan pilih file PDF terlebih dahulu.";
          revisiResults.classList.add('text-red-500');
          return;
        }
        revisiResults.classList.remove('text-red-500');
        resultText = `File PDF yang dipilih: ${file.name}`;
      } else {
        let rawNumber = docNumber.value.trim();
        if (!rawNumber) {
          revisiResults.value = "Silakan masukkan Nomor Dokumen terlebih dahulu.";
          revisiResults.classList.add('text-red-500');
          return;
        }
        revisiResults.classList.remove('text-red-500');
        
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
        resultText = `Nomor Dokumen:\n${finalNumber}`;
      }

      revisiResults.value = resultText + '\n\nDone';
    });
  }
};

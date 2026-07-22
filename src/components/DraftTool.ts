export const DraftTool = () => {
  return `
    <div class="flex flex-col gap-4 h-full">
      <div class="flex bg-zinc-800/50 p-1 rounded-lg mb-2">
        <button id="tabPdf" class="flex-1 py-2 text-sm font-semibold rounded-md bg-brand-accent text-white transition-all">Upload PDF</button>
        <button id="tabDoc" class="flex-1 py-2 text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">Nomor Dokumen</button>
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

      <div id="docSection" class="flex flex-col gap-2 hidden">
        <textarea id="docNumber" placeholder="Masukan no KT" class="w-full h-[140px] bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none"></textarea>
      </div>

      <button id="processDraftBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md mt-auto">
        Proses Data Draft
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
  const pdfSection = document.getElementById('pdfSection');
  const docSection = document.getElementById('docSection');

  const pdfUpload = document.getElementById('pdfUpload') as HTMLInputElement;
  const pdfFileName = document.getElementById('pdfFileName') as HTMLSpanElement;
  const docNumber = document.getElementById('docNumber') as HTMLInputElement;
  const processDraftBtn = document.getElementById('processDraftBtn') as HTMLButtonElement;
  const draftResults = document.getElementById('draftResults') as HTMLTextAreaElement;

  const switchTab = (tab: string) => {
    activeTab = tab;
    localStorage.setItem('draftActiveTab', tab);
    
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

  if (docNumber) {
    docNumber.addEventListener('input', () => {
      const rawNumber = docNumber.value;
      if (!rawNumber) return;

      const regex = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
      const matches = rawNumber.match(regex);
      
      if (matches && matches.length > 0) {
        const cleaned = matches.map(m => m.toUpperCase()).join('\n');
        const withoutMatches = rawNumber.replace(regex, '');
        // Bersihkan jika ada teks lain selain nomor dokumen yang diekstrak (termasuk spasi)
        const hasGarbage = withoutMatches.trim().length > 0;
        
        if (hasGarbage) {
          docNumber.value = cleaned;
        }
      } else {
        // Logika untuk nomor pendek (misal: "tolong 1615 pak")
        const hasNonDigit = /\D/.test(rawNumber);
        if (hasNonDigit) {
          const digitGroups = rawNumber.match(/\b\d{3,6}\b/g);
          if (digitGroups) {
             const candidate = digitGroups.reverse()[0];
             if (candidate) {
                const padded = candidate.padStart(6, '0');
                docNumber.value = `2026-T1.0-3200.2-K.1.1-${padded}`;
             }
          }
        }
      }
    });

    // Event change ter-trigger saat user selesai mengetik dan menyembunyikan keyboard/pindah fokus
    docNumber.addEventListener('change', () => {
      const rawNumber = docNumber.value.trim();
      // Cek apakah user HANYA mengetik 3-6 angka saja
      if (/^\d{3,6}$/.test(rawNumber)) {
        const padded = rawNumber.padStart(6, '0');
        docNumber.value = `2026-T1.0-3200.2-K.1.1-${padded}`;
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
      } else {
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
          finalNumber = matches.map(m => m.toUpperCase()).join('\n');
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

      draftResults.value = resultText + '\n\nDone';
    });
  }
};

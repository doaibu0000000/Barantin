import * as pdfjsLib from 'pdfjs-dist';

// Use CDN for worker to avoid Vite build issues with pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const DraftTool = () => {
  return `
    <div class="flex flex-col gap-3 flex-1 min-h-0 w-full h-full">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row items-center justify-between w-full">
        <div class="flex w-fit bg-[#0a0a0a] border border-zinc-700 p-1 rounded-lg shadow-sm">
          <button type="button" id="tabKt" class="px-4 py-1 md:px-5 md:py-1.5 text-xs md:text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No KT</button>
          <button type="button" id="tabPdf" class="px-4 py-1 md:px-5 md:py-1.5 text-xs md:text-sm font-bold rounded-md bg-brand-accent text-white shadow-sm transition-all">PDF</button>
        </div>
        <button type="button" id="processDraftBtn" class="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold cursor-pointer transition-all shadow-md shrink-0 whitespace-nowrap h-[36px] md:h-[38px]">
          Buat Draft
        </button>
      </div>

      <div id="pdfSection" class="flex flex-col gap-2">
        <div class="relative">
          <input type="file" id="pdfUpload" accept=".pdf" class="hidden" />
          <label for="pdfUpload" class="w-full h-28 md:h-48 bg-brand-input hover:bg-brand-input/80 border border-brand-border border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-brand-text-muted hover:text-white">
            <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <span id="pdfFileName" class="text-sm font-medium text-center px-4 max-w-full break-words">Klik untuk memilih file PDF</span>
          </label>
        </div>
      </div>

      <!-- Tab NO KT: input nomor KT singkat, seperti di Surtu 2 -->
      <div id="ktSection" class="flex flex-col gap-2 hidden relative">
        <textarea id="ktNumber" placeholder="Contoh :&#10;1894&#10;2026-T1.0-3200.2-K.1.1-001894" class="w-full h-28 md:h-auto bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none" rows="8"></textarea>
        
        <!-- Loading Overlay -->
        <div id="ktLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
          </div>
        </div>
      </div>
      </div>

      <div class="flex flex-col relative w-full overflow-hidden rounded-xl border border-zinc-700 bg-[#0a0a0a] shadow-2xl flex-1 min-h-0">
        <!-- Terminal Header -->
        <div class="flex items-center justify-between bg-[#1c1c1c] px-4 py-2 border-b border-zinc-700">
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
            <div class="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
            <div class="h-3 w-3 rounded-full bg-[#27c93f]"></div>
            <span class="ml-4 text-xs font-semibold text-zinc-500 tracking-widest uppercase"><span class="hidden md:inline">System </span>Terminal</span>
          </div>
          <div class="flex w-fit bg-[#0a0a0a] border border-zinc-700 p-0.5 rounded-md">
            <button type="button" id="termTabLog" class="px-3 py-0.5 text-[10px] font-bold rounded text-white bg-zinc-700 transition-all uppercase tracking-wider">Log</button>
            <button type="button" id="termTabHasil" class="px-3 py-0.5 text-[10px] font-bold rounded text-zinc-500 hover:text-white transition-all uppercase tracking-wider">Hasil</button>
          </div>
        </div>
        <!-- Terminal Body -->
        <textarea id="draftResults" wrap="off" placeholder="> Menghubungkan ke server..." class="w-full h-full flex-1 whitespace-pre overflow-x-auto bg-transparent px-2 py-3 md:px-2 md:py-4 text-zinc-300 placeholder-zinc-600 font-mono text-[11px] md:text-xs resize-none outline-none leading-tight md:leading-tight" readonly></textarea>
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
  const termTabLog = document.getElementById('termTabLog');
  const termTabHasil = document.getElementById('termTabHasil');

  // Terminal state variables
  let termActiveTab = 'log';
  let logContent = '> Menghubungkan ke server...\n';
  let hasilContent = 'Belum ada hasil yang diproses.';

  const updateTerminalView = () => {
    if (!draftResults) return;
    draftResults.value = termActiveTab === 'log' ? logContent : hasilContent;
    // auto scroll to bottom for log
    if (termActiveTab === 'log') {
      setTimeout(() => {
        draftResults.scrollTop = draftResults.scrollHeight;
      }, 0);
    }
  };

  const switchTermTab = (tab: string) => {
    termActiveTab = tab;
    if (tab === 'log') {
      termTabLog?.classList.add('bg-zinc-700', 'text-white');
      termTabLog?.classList.remove('text-zinc-500', 'hover:text-white');
      termTabHasil?.classList.remove('bg-zinc-700', 'text-white');
      termTabHasil?.classList.add('text-zinc-500', 'hover:text-white');
      
      // Styling khusus LOG
      if (draftResults) {
        draftResults.classList.remove('p-3', 'text-brand-text', 'text-sm', 'leading-normal', 'bg-brand-input');
        draftResults.classList.add('px-2', 'py-3', 'md:px-2', 'md:py-4', 'text-zinc-300', 'text-[11px]', 'md:text-xs', 'leading-tight', 'md:leading-tight', 'bg-transparent');
      }
    } else {
      termTabHasil?.classList.add('bg-zinc-700', 'text-white');
      termTabHasil?.classList.remove('text-zinc-500', 'hover:text-white');
      termTabLog?.classList.remove('bg-zinc-700', 'text-white');
      termTabLog?.classList.add('text-zinc-500', 'hover:text-white');
      
      // Styling khusus HASIL
      if (draftResults) {
        draftResults.classList.remove('px-2', 'py-3', 'md:px-2', 'md:py-4', 'text-zinc-300', 'text-[11px]', 'md:text-xs', 'leading-tight', 'md:leading-tight', 'bg-transparent');
        draftResults.classList.add('p-3', 'text-brand-text', 'text-sm', 'leading-normal', 'bg-brand-input');
      }
    }
    updateTerminalView();
  };

  termTabLog?.addEventListener('click', () => switchTermTab('log'));
  termTabHasil?.addEventListener('click', () => switchTermTab('hasil'));

  // Init terminal view
  updateTerminalView();
  switchTermTab(termActiveTab);

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
      btn?.classList.remove('bg-brand-accent', 'text-white', 'font-bold', 'shadow-sm');
      btn?.classList.add('text-brand-text-muted', 'hover:text-white', 'font-semibold');
    });
    [pdfSection, ktSection].forEach(sec => sec?.classList.add('hidden'));

    if (tab === 'pdf') {
      tabPdf?.classList.add('bg-brand-accent', 'text-white', 'font-bold', 'shadow-sm');
      tabPdf?.classList.remove('text-brand-text-muted', 'hover:text-white', 'font-semibold');
      pdfSection?.classList.remove('hidden');
    } else if (tab === 'kt') {
      tabKt?.classList.add('bg-brand-accent', 'text-white', 'font-bold', 'shadow-sm');
      tabKt?.classList.remove('text-brand-text-muted', 'hover:text-white', 'font-semibold');
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
      const timestamp = new Date().toLocaleTimeString();
      
      if (activeTab === 'pdf') {
        const file = pdfUpload?.files?.[0];
        if (!file) {
          logContent += `\n[${timestamp}] ERROR: Silakan pilih file PDF terlebih dahulu.`;
          draftResults.classList.add('text-red-500');
          updateTerminalView();
          return;
        }
        draftResults.classList.remove('text-red-500');
        logContent += `\n[${timestamp}] Membaca dokumen PDF: ${file.name}...`;
        updateTerminalView();
        
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;
            logContent += `\n[${new Date().toLocaleTimeString()}] PDF terdeteksi memiliki ${pdf.numPages} halaman. Membaca teks...`;
            updateTerminalView();
            
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item: any) => item.str).join(' ');
              fullText += pageText + '\n\n';
            }
            
            hasilContent = `File PDF yang dipilih: ${file.name}\n\n--- ISI DOKUMEN ---\n\n${fullText.trim()}\n\nDone`;
            logContent += `\n[${new Date().toLocaleTimeString()}] Selesai mengekstrak teks. Hasil dipindahkan ke tab 'Hasil'.`;
            
            // Auto switch to hasil tab on success
            switchTermTab('hasil');
          } catch (error) {
            console.error("Error reading PDF:", error);
            logContent += `\n[${new Date().toLocaleTimeString()}] Gagal membaca PDF: ${error instanceof Error ? error.message : String(error)}`;
            draftResults.classList.add('text-red-500');
            updateTerminalView();
          }
        };
        reader.onerror = () => {
          logContent += `\n[${new Date().toLocaleTimeString()}] Gagal membaca file PDF (File Reader Error).`;
          draftResults.classList.add('text-red-500');
          updateTerminalView();
        };
        reader.readAsArrayBuffer(file);
        
        return; // we will update draftResults async

      } else if (activeTab === 'kt') {
        // Tab No KT: selalu format ulang dengan template baku
        let rawKt = ktNumber?.value?.trim() || '';
        if (!rawKt) {
          logContent += `\n[${timestamp}] ERROR: Silakan masukkan No KT terlebih dahulu.`;
          draftResults.classList.add('text-red-500');
          updateTerminalView();
          return;
        }
        draftResults.classList.remove('text-red-500');
        logContent += `\n[${timestamp}] Memformat nomor KT...`;
        updateTerminalView();
        
        const finalKtFormatted = formatBanyakNomorKT(rawKt);
        if (ktNumber) ktNumber.value = finalKtFormatted;
        hasilContent = `Nomor KT:\n${finalKtFormatted}\n\nDone`;
        
        logContent += `\n[${new Date().toLocaleTimeString()}] Selesai memformat. Hasil dipindahkan ke tab 'Hasil'.`;
        // Auto switch to hasil tab on success
        switchTermTab('hasil');
      }
    });
  }

  const copyDraftBtn = document.getElementById('copyDraftBtn') as HTMLButtonElement;
  if (copyDraftBtn && draftResults) {
    copyDraftBtn.addEventListener('click', () => {
      const textToCopy = draftResults.value.trim();
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = copyDraftBtn.innerHTML;
        copyDraftBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Tersalin!`;
        copyDraftBtn.classList.add('bg-green-600', 'hover:bg-green-500');
        copyDraftBtn.classList.remove('bg-zinc-700', 'hover:bg-zinc-600');
        
        setTimeout(() => {
          copyDraftBtn.innerHTML = originalHtml;
          copyDraftBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
          copyDraftBtn.classList.add('bg-zinc-700', 'hover:bg-zinc-600');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
};

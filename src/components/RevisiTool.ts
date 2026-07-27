import * as pdfjsLib from 'pdfjs-dist';

export const RevisiTool = () => {
  return `
    <div class="flex flex-col gap-3 h-full">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row items-center justify-between w-full gap-3">
        <div class="flex flex-row items-center gap-3 flex-1 min-w-0">
          <input type="text" id="quickDocNumber" placeholder="NO KT" maxlength="6" class="w-[80px] md:w-[100px] shrink-0 px-2 md:px-3 py-1.5 md:py-2 bg-brand-input hover:bg-brand-input/80 text-brand-text placeholder-zinc-500 font-mono text-xs md:text-sm font-semibold outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all border border-brand-border rounded-lg h-[36px] md:h-[38px] text-center shadow-sm" />
          
          <div id="pdfUploadWrapper" class="relative flex-1 min-w-0 flex items-center">
            <input type="file" id="pdfUpload" accept=".pdf" class="hidden" />
            <label for="pdfUpload" class="flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs md:text-sm font-semibold rounded-lg cursor-pointer transition-all border border-zinc-700 h-[36px] md:h-[38px] shadow-sm w-fit max-w-full min-w-0">
              <svg class="w-4 h-4 shrink-0 text-brand-text-muted group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <span id="pdfFileName" class="block truncate min-w-0">File PDF</span>
            </label>
          </div>
        </div>

        <button type="button" id="processRevisiBtn" class="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold cursor-pointer transition-all shadow-md shrink-0 whitespace-nowrap h-[36px] md:h-[38px]">
          Revisi Draft
        </button>
      </div>

      <div id="docSection" class="flex flex-col gap-2 relative w-full">
        <textarea id="docNumber" placeholder="Masukkan NO KT..." class="w-full h-28 md:h-auto bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none" rows="8"></textarea>
        
        <!-- Loading Overlay -->
        <div id="docLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
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
        <textarea id="revisiResults" wrap="off" placeholder="> Menghubungkan ke server..." class="w-full h-full flex-1 whitespace-pre overflow-x-auto bg-transparent px-2 py-3 md:px-2 md:py-4 text-zinc-300 placeholder-zinc-600 font-mono text-[11px] md:text-xs resize-none outline-none leading-tight md:leading-tight" readonly></textarea>
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
  const copyRevisiBtn = document.getElementById('copyRevisiBtn') as HTMLButtonElement;
  const revisiResults = document.getElementById('revisiResults') as HTMLTextAreaElement;
  const termTabLog = document.getElementById('termTabLog');
  const termTabHasil = document.getElementById('termTabHasil');

  // Terminal state variables
  let termActiveTab = 'log';
  let logContent = '> Menghubungkan ke server...\n';
  let hasilContent = 'Belum ada hasil yang diproses.';

  const updateTerminalView = () => {
    if (!revisiResults) return;
    revisiResults.value = termActiveTab === 'log' ? logContent : hasilContent;
    if (termActiveTab === 'log') {
      setTimeout(() => {
        revisiResults.scrollTop = revisiResults.scrollHeight;
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
      if (revisiResults) {
        revisiResults.classList.remove('p-3', 'text-brand-text', 'text-sm', 'leading-normal', 'bg-brand-input');
        revisiResults.classList.add('px-2', 'py-3', 'md:px-2', 'md:py-4', 'text-zinc-300', 'text-[11px]', 'md:text-xs', 'leading-tight', 'md:leading-tight', 'bg-transparent');
      }
    } else {
      termTabHasil?.classList.add('bg-zinc-700', 'text-white');
      termTabHasil?.classList.remove('text-zinc-500', 'hover:text-white');
      termTabLog?.classList.remove('bg-zinc-700', 'text-white');
      termTabLog?.classList.add('text-zinc-500', 'hover:text-white');
      
      // Styling khusus HASIL
      if (revisiResults) {
        revisiResults.classList.remove('px-2', 'py-3', 'md:px-2', 'md:py-4', 'text-zinc-300', 'text-[11px]', 'md:text-xs', 'leading-tight', 'md:leading-tight', 'bg-transparent');
        revisiResults.classList.add('p-3', 'text-brand-text', 'text-sm', 'leading-normal', 'bg-brand-input');
      }
    }
    updateTerminalView();
  };

  termTabLog?.addEventListener('click', () => switchTermTab('log'));
  termTabHasil?.addEventListener('click', () => switchTermTab('hasil'));

  // Init terminal view
  updateTerminalView();
  switchTermTab(termActiveTab);

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

  if (quickDocNumber && docNumber) {
    quickDocNumber.addEventListener('focus', () => {
      quickDocNumber.placeholder = '';
    });
    quickDocNumber.addEventListener('blur', () => {
      quickDocNumber.placeholder = 'NO KT';
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
        pdfFileName.textContent = 'File PDF';
        pdfFileName.classList.add('text-brand-text-muted');
        pdfFileName.classList.remove('text-brand-accent');
      }
    });
  }

  if (processRevisiBtn) {
    processRevisiBtn.addEventListener('click', () => {
      const timestamp = new Date().toLocaleTimeString();
      const file = pdfUpload?.files?.[0];
      
      if (file) {
        revisiResults.classList.remove('text-red-500');
        updateTerminalView(`[${timestamp}] Membaca dokumen PDF: ${file.name}...`);
        
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
            const pdf = await (window as any).pdfjsLib.getDocument(typedArray).promise;
            
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item: any) => item.str).join(' ');
              fullText += pageText + '\n\n';
            }
            
            const ketText = docNumber ? docNumber.value.trim() : '';
            
            let finalOutput = `File PDF yang dipilih: ${file.name}\n\n--- ISI DOKUMEN ---\n\n${fullText.trim()}`;
            if (ketText) {
              finalOutput += `\n\n--- KETERANGAN ---\n\n${ketText}`;
            }
            
            hasilContent = finalOutput;
            updateTerminalView(hasilContent);
          } catch (error: any) {
            revisiResults.classList.add('text-red-500');
            updateTerminalView(`[${new Date().toLocaleTimeString()}] ERROR: Gagal membaca PDF - ${error.message}`);
          }
        };
        reader.readAsArrayBuffer(file);
        
      } else {
        // Proses mode No KT
        let rawDoc = docNumber?.value?.trim() || '';
        if (!rawDoc) {
          revisiResults.classList.add('text-red-500');
          logContent += `\n[${timestamp}] ERROR: Silakan masukkan No KT atau pilih file PDF terlebih dahulu.`;
          updateTerminalView();
          return;
        }
        revisiResults.classList.remove('text-red-500');
        logContent += `\n[${timestamp}] Memformat nomor KT...`;
        updateTerminalView();
        
        const regex = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
        if (!regex.test(rawDoc)) {
           const digitGroups = rawDoc.match(/\b\d{3,6}\b/g);
           if (digitGroups && digitGroups.length > 0) {
             const formatted = digitGroups.map(g => {
               const padded = g.padStart(6, '0');
               return `2026-T1.0-3200.2-K.1.1-${padded}`;
             });
             rawDoc = formatted.join('\n');
           }
        }
        
        if (docNumber) docNumber.value = rawDoc;
        hasilContent = `Nomor KT Hasil Revisi:\n${rawDoc}\n\nDone`;
        logContent += `\n[${new Date().toLocaleTimeString()}] Selesai memformat. Buka tab 'Hasil' untuk melihat.`;
        switchTermTab('hasil');
      }
    });
  }

  if (copyRevisiBtn && revisiResults) {
    copyRevisiBtn.addEventListener('click', () => {
      const textToCopy = revisiResults.value.trim();
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = copyRevisiBtn.innerHTML;
        copyRevisiBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Tersalin!`;
        copyRevisiBtn.classList.add('bg-green-600', 'hover:bg-green-500');
        copyRevisiBtn.classList.remove('bg-zinc-700', 'hover:bg-zinc-600');
        
        setTimeout(() => {
          copyRevisiBtn.innerHTML = originalHtml;
          copyRevisiBtn.classList.remove('bg-green-600', 'hover:bg-green-500');
          copyRevisiBtn.classList.add('bg-zinc-700', 'hover:bg-zinc-600');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
};

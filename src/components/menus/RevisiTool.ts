/**
 * RevisiTool.ts — Menu "Revisi": Revisi Draft dari No KT atau PDF
 * Shared components: TerminalPanel, HeaderActionBar
 * Tidak mengimpor/mengubah state menu lain.
 */

import * as pdfjsLib from 'pdfjs-dist';
import { terminalPanelHTML, bindTerminalTabs } from '../shared/TerminalPanel';

export const RevisiTool = () => {
  return `
    <div class="flex flex-col gap-3 flex-1 min-h-0 w-full h-full">
      <div class="flex flex-col gap-2 flex-1 min-h-0">
        <div class="flex flex-row items-center justify-between w-full gap-3">
          <div class="flex flex-row items-center gap-3 flex-1 min-w-0">
            <input type="text" id="quickDocNumber" placeholder="NO KT" maxlength="6"
              class="w-[80px] md:w-[100px] shrink-0 px-2 md:px-3 py-1.5 md:py-2 bg-brand-input hover:bg-brand-input/80 text-brand-text placeholder-zinc-500 font-mono text-xs md:text-sm font-semibold outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all border border-brand-border rounded-lg h-[36px] md:h-[38px] text-center shadow-sm" />

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

        <div id="docSection" class="flex flex-col gap-2 relative w-full flex-1 min-h-0">
          <textarea id="docNumber" placeholder="Masukkan NO KT..." class="w-full h-full flex-1 bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none" rows="8"></textarea>

          <!-- Loading Overlay -->
          <div id="docLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
            <div class="flex flex-col items-center gap-3">
              <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
              <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
            </div>
          </div>
        </div>
      </div>

      ${terminalPanelHTML({
        textareaId: 'revisiResults',
        logTabId: 'termTabLog',
        hasilTabId: 'termTabHasil',
      })}
    </div>
  `;
};

export const bindRevisiToolEvents = () => {
  const docLoader = document.getElementById('docLoader');
  const quickDocNumber = document.getElementById('quickDocNumber') as HTMLInputElement;
  const pdfUpload = document.getElementById('pdfUpload') as HTMLInputElement;
  const pdfFileName = document.getElementById('pdfFileName') as HTMLSpanElement;
  const docNumber = document.getElementById('docNumber') as HTMLTextAreaElement;
  const processRevisiBtn = document.getElementById('processRevisiBtn') as HTMLButtonElement;
  const copyRevisiBtn = document.getElementById('copyRevisiBtn') as HTMLButtonElement;
  const revisiResults = document.getElementById('revisiResults') as HTMLTextAreaElement;

  // Terminal state
  let logContent = '> Menghubungkan ke server...\n';
  let hasilContent = 'Belum ada hasil yang diproses.';

  const terminal = bindTerminalTabs(
    'termTabLog',
    'termTabHasil',
    'revisiResults',
    () => logContent,
    () => hasilContent
  );

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
    quickDocNumber.addEventListener('focus', () => { quickDocNumber.placeholder = ''; });
    quickDocNumber.addEventListener('blur', () => { quickDocNumber.placeholder = 'NO KT'; });

    let quickDebounceTimer: ReturnType<typeof setTimeout>;
    let lastRawVal = '';
    quickDocNumber.addEventListener('input', () => {
      let rawVal = quickDocNumber.value.replace(/\D/g, '');
      if (rawVal.length > 6) rawVal = rawVal.slice(0, 6);
      quickDocNumber.value = rawVal;
      if (rawVal === lastRawVal) return;
      lastRawVal = rawVal;
      clearTimeout(quickDebounceTimer);
      if (rawVal.length > 0) {
        quickDebounceTimer = setTimeout(() => {
          const padded = rawVal.padStart(6, '0');
          showLoader(600, () => { docNumber.value = `2026-T1.0-3200.2-K.1.1-${padded}`; });
        }, 400);
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
        const hasGarbage = withoutMatches.trim().length > 0;
        if (hasGarbage) showLoader(600, () => { docNumber.value = cleaned; });
      } else {
        debounceTimer = setTimeout(() => {
          const currentVal = docNumber.value;
          const digitGroups = currentVal.match(/\b\d{3,6}\b/g);
          if (digitGroups && digitGroups.length > 0) {
            const formatted = digitGroups.map(g => `2026-T1.0-3200.2-K.1.1-${g.padStart(6, '0')}`);
            showLoader(600, () => { docNumber.value = formatted.join('\n'); });
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
          const formatted = digitGroups.map(g => `2026-T1.0-3200.2-K.1.1-${g.padStart(6, '0')}`);
          showLoader(600, () => { docNumber.value = formatted.join('\n'); });
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
        logContent += `\n[${timestamp}] Membaca dokumen PDF: ${file.name}...`;
        terminal.updateView();

        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item: any) => item.str).join(' ');
              fullText += pageText + '\n\n';
            }
            const ketText = docNumber ? docNumber.value.trim() : '';
            let finalOutput = `File PDF yang dipilih: ${file.name}\n\n--- ISI DOKUMEN ---\n\n${fullText.trim()}`;
            if (ketText) finalOutput += `\n\n--- KETERANGAN ---\n\n${ketText}`;
            hasilContent = finalOutput;
            terminal.switchTab('hasil');
          } catch (error: any) {
            revisiResults.classList.add('text-red-500');
            logContent += `\n[${new Date().toLocaleTimeString()}] ERROR: Gagal membaca PDF - ${error.message}`;
            terminal.updateView();
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        let rawDoc = docNumber?.value?.trim() || '';
        if (!rawDoc) {
          revisiResults.classList.add('text-red-500');
          logContent += `\n[${timestamp}] ERROR: Silakan masukkan No KT atau pilih file PDF terlebih dahulu.`;
          terminal.updateView();
          return;
        }
        revisiResults.classList.remove('text-red-500');
        logContent += `\n[${timestamp}] Memformat nomor KT...`;
        terminal.updateView();

        const regex = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
        if (!regex.test(rawDoc)) {
          const digitGroups = rawDoc.match(/\b\d{3,6}\b/g);
          if (digitGroups && digitGroups.length > 0) {
            const formatted = digitGroups.map(g => `2026-T1.0-3200.2-K.1.1-${g.padStart(6, '0')}`);
            rawDoc = formatted.join('\n');
          }
        }

        if (docNumber) docNumber.value = rawDoc;
        hasilContent = `Nomor KT Hasil Revisi:\n${rawDoc}\n\nDone`;
        logContent += `\n[${new Date().toLocaleTimeString()}] Selesai memformat. Buka tab 'Hasil' untuk melihat.`;
        terminal.switchTab('hasil');
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
      }).catch(err => console.error('Failed to copy text: ', err));
    });
  }
};

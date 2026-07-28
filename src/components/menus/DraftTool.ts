/**
 * DraftTool.ts — Menu "Draft": Buat Draft dari PDF atau Nomor KT
 * Shared components: TerminalPanel, HeaderActionBar
 * Tidak mengimpor/mengubah state menu lain.
 */

import * as pdfjsLib from 'pdfjs-dist';
import { terminalPanelHTML, bindTerminalTabs } from '../shared/TerminalPanel';

// Use CDN for worker to avoid Vite build issues with pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const DraftTool = () => {
  return `
    <div class="flex flex-col gap-3 flex-1 min-h-0 w-full h-full">
      <div class="flex flex-col gap-2 flex-1 md:flex-none min-h-0">
        <div class="flex flex-row items-center justify-between w-full">
          <div class="flex w-fit bg-[#0a0a0a] border border-zinc-700 p-1 rounded-lg shadow-sm">
            <button type="button" id="tabKt" class="px-4 py-1 md:px-5 md:py-1.5 text-xs md:text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No KT</button>
            <button type="button" id="tabPdf" class="px-4 py-1 md:px-5 md:py-1.5 text-xs md:text-sm font-bold rounded-md bg-brand-accent text-white shadow-sm transition-all">PDF</button>
          </div>
          <button type="button" id="processDraftBtn" class="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold cursor-pointer transition-all shadow-md shrink-0 whitespace-nowrap h-[36px] md:h-[38px]">
            Buat Draft
          </button>
        </div>

        <div id="pdfSection" class="flex flex-col gap-2 flex-1 min-h-0">
          <div class="relative flex-1 min-h-0 flex flex-col md:block">
            <input type="file" id="pdfUpload" accept=".pdf" class="hidden" />
            <label for="pdfUpload" class="w-full h-full md:h-48 flex-1 bg-brand-input hover:bg-brand-input/80 border border-brand-border border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-brand-text-muted hover:text-white">
              <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <span id="pdfFileName" class="text-sm font-medium text-center px-4 max-w-full break-words">Klik untuk memilih file PDF</span>
            </label>
          </div>
        </div>

        <!-- Tab NO KT -->
        <div id="ktSection" class="flex flex-col gap-2 hidden relative flex-1 min-h-0">
          <textarea id="ktNumber" placeholder="Contoh :&#10;1894&#10;2026-T1.0-3200.2-K.1.1-001894" class="w-full h-full md:h-auto flex-1 bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none md:min-h-[112px]" rows="8"></textarea>

          <!-- Loading Overlay -->
          <div id="ktLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
            <div class="flex flex-col items-center gap-3">
              <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
              <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
            </div>
          </div>
        </div>
      </div>

      ${terminalPanelHTML({
        textareaId: 'draftResults',
        logTabId: 'termTabLog',
        hasilTabId: 'termTabHasil',
      })}
    </div>
  `;
};

export const bindDraftToolEvents = () => {
  let activeTab = localStorage.getItem('draftActiveTab') || 'pdf';
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

  // Terminal state
  let logContent = '> Menghubungkan ke server...\n';
  let hasilContent = 'Belum ada hasil yang diproses.';

  const terminal = bindTerminalTabs(
    'termTabLog',
    'termTabHasil',
    'draftResults',
    () => logContent,
    () => hasilContent
  );

  const formatBanyakNomorKT = (input: string): string => {
    const tahun = new Date().getFullYear();
    const template = `${tahun}-T1.0-3200.2-K.1.1`;
    const lines = input.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    return lines.map(line => {
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

  if (activeTab === 'doc') activeTab = 'pdf';
  switchTab(activeTab);
  tabPdf?.addEventListener('click', () => switchTab('pdf'));
  tabKt?.addEventListener('click', () => switchTab('kt'));

  if (ktNumber) {
    let ktDebounceTimer: ReturnType<typeof setTimeout>;
    ktNumber.addEventListener('input', () => {
      const currentVal = ktNumber.value;
      clearTimeout(ktDebounceTimer);
      if (!currentVal.trim()) return;
      const tahun = new Date().getFullYear();
      const correctFormatRegex = new RegExp(`^${tahun}-T1\\.0-3200\\.2-K\\.1\\.1-\\d{6}(\\n${tahun}-T1\\.0-3200\\.2-K\\.1\\.1-\\d{6})*$`);
      if (correctFormatRegex.test(currentVal.trim())) return;
      ktDebounceTimer = setTimeout(() => {
        const lines = currentVal.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length === 0) return;
        const formatted = formatBanyakNomorKT(currentVal);
        if (formatted !== currentVal.trim()) {
          showLoader(ktLoader, 400, () => { ktNumber.value = formatted; });
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
          terminal.updateView();
          return;
        }
        draftResults.classList.remove('text-red-500');
        logContent += `\n[${timestamp}] Membaca dokumen PDF: ${file.name}...`;
        terminal.updateView();

        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;
            logContent += `\n[${new Date().toLocaleTimeString()}] PDF terdeteksi memiliki ${pdf.numPages} halaman. Membaca teks...`;
            terminal.updateView();
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item: any) => item.str).join(' ');
              fullText += pageText + '\n\n';
            }
            hasilContent = `File PDF yang dipilih: ${file.name}\n\n--- ISI DOKUMEN ---\n\n${fullText.trim()}\n\nDone`;
            logContent += `\n[${new Date().toLocaleTimeString()}] Selesai mengekstrak teks. Hasil dipindahkan ke tab 'Hasil'.`;
            terminal.switchTab('hasil');
          } catch (error) {
            console.error("Error reading PDF:", error);
            logContent += `\n[${new Date().toLocaleTimeString()}] Gagal membaca PDF: ${error instanceof Error ? error.message : String(error)}`;
            draftResults.classList.add('text-red-500');
            terminal.updateView();
          }
        };
        reader.onerror = () => {
          logContent += `\n[${new Date().toLocaleTimeString()}] Gagal membaca file PDF (File Reader Error).`;
          draftResults.classList.add('text-red-500');
          terminal.updateView();
        };
        reader.readAsArrayBuffer(file);
      } else if (activeTab === 'kt') {
        let rawKt = ktNumber?.value?.trim() || '';
        if (!rawKt) {
          logContent += `\n[${timestamp}] ERROR: Silakan masukkan No KT terlebih dahulu.`;
          draftResults.classList.add('text-red-500');
          terminal.updateView();
          return;
        }
        draftResults.classList.remove('text-red-500');
        logContent += `\n[${timestamp}] Memformat nomor KT...`;
        terminal.updateView();
        const finalKtFormatted = formatBanyakNomorKT(rawKt);
        if (ktNumber) ktNumber.value = finalKtFormatted;
        hasilContent = `Nomor KT:\n${finalKtFormatted}\n\nDone`;
        logContent += `\n[${new Date().toLocaleTimeString()}] Selesai memformat. Hasil dipindahkan ke tab 'Hasil'.`;
        terminal.switchTab('hasil');
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
      }).catch(err => console.error('Failed to copy text: ', err));
    });
  }
};

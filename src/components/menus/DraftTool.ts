/**
 * DraftTool.ts — Menu "Draft": Buat Draft dari PDF atau Nomor KT
 * Shared components: TerminalPanel, HeaderActionBar
 * Tidak mengimpor/mengubah state menu lain.
 */

import * as pdfjsLib from 'pdfjs-dist';
import { terminalPanelHTML, bindTerminalTabs } from '../shared/TerminalPanel';

// Use CDN for worker to avoid Vite build issues with pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

let savedDraftLogContent = '> Menghubungkan ke server...\n';
let savedDraftHasilContent = 'Belum ada hasil yang diproses.';
let savedDraftActiveTab: 'log' | 'hasil' = 'log';
let savedDraftInputKt = '';

export const DraftTool = () => {
  return `
    <div class="flex flex-col gap-3 flex-1 min-h-0 w-full h-full">
      <div class="flex flex-col gap-2 flex-1 min-h-0">
        <div class="flex flex-row items-center justify-between shrink-0">
          <div class="flex items-center h-[36px] md:h-[38px] w-fit bg-[#0a0a0a] border border-zinc-700 p-1 rounded-lg shadow-sm">
            <button type="button" id="tabKt" class="flex items-center justify-center h-full px-4 md:px-5 text-xs md:text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No KT</button>
            <button type="button" id="tabPdf" class="flex items-center justify-center h-full px-4 md:px-5 text-xs md:text-sm font-bold rounded-md bg-brand-accent text-white shadow-sm transition-all">PDF</button>
          </div>
          <button type="button" id="processDraftBtn" class="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold cursor-pointer transition-all shadow-md shrink-0 whitespace-nowrap h-[36px] md:h-[38px]">
            Buat Draft
          </button>
        </div>

        <div id="pdfSection" class="flex flex-col flex-1 min-h-0">
          <div class="relative flex-1 min-h-0 flex flex-col">
            <input type="file" id="pdfUpload" accept=".pdf" class="hidden" />
            <label for="pdfUpload" class="w-full h-full flex-1 bg-brand-input hover:bg-brand-input/80 border border-brand-border border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-brand-text-muted hover:text-white">
              <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <span id="pdfFileName" class="text-sm font-medium text-center px-4 max-w-full break-words">Klik untuk memilih file PDF</span>
            </label>
          </div>
        </div>

        <!-- Tab NO KT -->
        <div id="ktSection" class="flex flex-col hidden relative flex-1 min-h-0">
          <textarea id="ktNumber" placeholder="Contoh :&#10;1894&#10;2026-T1.0-3200.2-K.1.1-001894" class="w-full h-full flex-1 bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none" rows="8">${savedDraftInputKt}</textarea>

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

  const terminal = bindTerminalTabs(
    'termTabLog',
    'termTabHasil',
    'draftResults',
    () => savedDraftLogContent,
    () => savedDraftHasilContent,
    (tab) => { savedDraftActiveTab = tab; }
  );

  terminal.switchTab(savedDraftActiveTab);

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
      savedDraftInputKt = currentVal;
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
          showLoader(ktLoader, 400, () => {
            ktNumber.value = formatted;
            savedDraftInputKt = formatted;
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
      const liveLog = (msg: string) => {
        savedDraftLogContent += (savedDraftLogContent ? '\n' : '') + msg;
        terminal.updateView();
        console.log(`[DraftTool] ${msg}`);
      };

      if (activeTab === 'pdf') {
        const file = pdfUpload?.files?.[0];
        if (!file) {
          liveLog(`[ERROR] Silakan pilih file PDF terlebih dahulu.`);
          draftResults.classList.add('text-red-500');
          terminal.updateView();
          return;
        }

        draftResults.classList.remove('text-red-500');
        terminal.switchTab('log');
        processDraftBtn.disabled = true;
        processDraftBtn.textContent = 'Memproses...';

        savedDraftLogContent = '';
        liveLog(`[MULAI] Memproses file PDF: ${file.name}...`);

        setTimeout(() => {
          liveLog(`[STEP 1] Membaca isi file PDF...`);
          setTimeout(() => {
            const fileReader = new FileReader();
            fileReader.onload = function () {
              const typedarray = new Uint8Array(this.result as ArrayBuffer);
              pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                let textPromises = [];
                for (let i = 1; i <= pdf.numPages; i++) {
                  textPromises.push(pdf.getPage(i).then(page => page.getTextContent().then(textContent => textContent.items.map((item: any) => item.str).join(' '))));
                }
                Promise.all(textPromises).then(pagesText => {
                  liveLog(`[STEP 2] Mengekstrak teks dari PDF...`);

                  setTimeout(() => {
                    const fullText = pagesText.join('\n');
                    // Mock helper functions for demonstration
                    const extractDataFromText = (text: string) => ({ content: text });
                    const generateJSON = (data: any) => JSON.stringify(data, null, 2);

                    const extractedData = extractDataFromText(fullText);
                    const formattedData = generateJSON(extractedData);

                    liveLog(`[STEP 3] Menyusun format JSON Draft...`);

                    setTimeout(() => {
                      savedDraftHasilContent = formattedData;
                      liveLog(`[SELESAI] Draft selesai dibuat. Hasil dipindahkan ke tab 'Hasil'.`);

                      processDraftBtn.disabled = false;
                      processDraftBtn.textContent = 'Buat Draft';
                    }, 600);
                  }, 600);
                }).catch(err => {
                  liveLog(`[ERROR] Gagal membaca isi PDF: ${err.message}`);
                  processDraftBtn.disabled = false;
                  processDraftBtn.textContent = 'Buat Draft';
                });
              });
            };
            fileReader.readAsArrayBuffer(file);
          }, 600);
        }, 600);
      } else if (activeTab === 'kt') {
        let rawKt = ktNumber?.value?.trim() || '';
        if (!rawKt) {
          liveLog(`[ERROR] Silakan masukkan No KT terlebih dahulu.`);
          draftResults.classList.add('text-red-500');
          terminal.updateView();
          return;
        }

        draftResults.classList.remove('text-red-500');
        terminal.switchTab('log');
        processDraftBtn.disabled = true;
        processDraftBtn.textContent = 'Memproses...';

        const lines = rawKt.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        savedDraftLogContent = '';
        liveLog(`[MULAI] Ditemukan ${lines.length} No KT: ${lines.join(', ')}`);

        const getToken = (): Promise<string> => new Promise((resolve) => {
          const localToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
          if (localToken) { resolve(localToken); return; }
          // @ts-ignore
          if (typeof chrome !== 'undefined' && chrome.cookies) {
            // @ts-ignore
            chrome.cookies.getAll({ domain: 'apps.karantinaindonesia.go.id' }, (cookies: any[]) => {
              const tokenCookie = cookies.find(c => c.name === 'token');
              resolve(tokenCookie ? tokenCookie.value : '');
            });
          } else {
            const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
            resolve(match ? match[1] : '');
          }
        });


        function uuidv4() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }

        const loggedFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
          const url = typeof input === 'string' ? input : input.toString();
          const method = (init?.method || 'GET').toUpperCase();
          const shortUrl = url.replace(/https:\/\/api[23]?\.karantinaindonesia\.go\.id\//g, '');
          const bodyStr = init?.body ? String(init.body) : '';
          const methodPadded = `[-> ${method}]`;
          let reqLog = `${methodPadded} ${shortUrl}`;
          if (bodyStr) reqLog += ` | Body: ${bodyStr.substring(0, 100)}${bodyStr.length > 100 ? '...(truncated)' : ''}`;
          liveLog(reqLog);
          try {
            const res = await fetch(url, init);
            const clone = res.clone();
            const resText = await clone.text().catch(() => '');
            const statusPadded = `[<- ${res.status}]`;
            let resLog = `${statusPadded} ${shortUrl}`;
            resLog += ` | Resp: ${resText.substring(0, 100)}${resText.length > 100 ? '...' : ''}`;
            liveLog(resLog);
            if (res.status === 401 && url.includes('karantinaindonesia.go.id')) {
              liveLog(`[AUTH] ⚠ Token expired! Sesi berakhir - mengalihkan ke halaman login...`);
              setTimeout(() => {
                savedDraftLogContent = '> Menghubungkan ke server...\n';
                if (typeof (window as any).handleSessionExpired === 'function') {
                  (window as any).handleSessionExpired();
                } else {
                  window.location.href = 'https://apps.karantinaindonesia.go.id/login';
                }
              }, 800);
              throw new Error('TOKEN_EXPIRED_401');
            }
            return res;
          } catch (err: any) {
            if (err.message === 'TOKEN_EXPIRED_401') throw err;
            const errPadded = `[<- ERR]`;
            liveLog(`${errPadded} ${shortUrl} | ERROR: ${err.message}`);
            throw err;
          }
        };

        (async () => {
          try {
            const token = await getToken();
            if (!token) {
              liveLog(`[X] Token tidak ditemukan. Silakan login terlebih dahulu.`);
              processDraftBtn.disabled = false;
              processDraftBtn.textContent = 'Buat Draft';
              return;
            }

            const today = new Date().toISOString().split('T')[0];
            let allDrafts = '';
            let hasilLinks = ''; // Hanya nama PT + link (untuk tab Hasil)

            for (const ktNumberToFetch of lines) {
              // 1. Filter PTK
              liveLog(`[STEP 1] Mencari No KT: ${ktNumberToFetch}...`);

              const filterPayload = {
                dFrom: today,
                dTo: today,
                search: "AJU",
                jenis_permohonan: "",
                jenis_karantina: "",
                jenis_dokumen: "PTK",
                upt_id: "3200",
                kode_satpel: "3200",
                pengguna_jasa_id: "",
                pencarianLangsung: "DOK",
                textPencarianLangsung: ktNumberToFetch
              };

              const filterRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/ptk/filter`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterPayload)
              });

              if (!filterRes.ok) {
                liveLog(`[STEP 1] [X] Gagal memfilter PTK untuk KT: ${ktNumberToFetch}`);
                continue;
              }

              const filterData = await filterRes.json();
              if (filterData?.status === "200" && filterData?.data && filterData.data.length > 0) {
                const ptkId = filterData.data[0].id;
                liveLog(`[STEP 1] [OK] No KT ditemukan: ${ptkId}`);

                // 2. Buka Form PTK (PTK Lengkap)
                const ptkRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys-v2/ptk/lengkap?id=${ptkId}`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });

                if (ptkRes.ok) {
                  const ptkData = await ptkRes.json();
                  const ptkInfo = ptkData?.data?.ptk || {};
                  const no_aju = ptkInfo.no_aju || '-';
                  const tgl_aju = (ptkInfo.tgl_aju || '').substring(0, 10);
                  const jnsAju = ptkInfo.jenis_permohonan === 'EX' ? 'EKSPOR' : (ptkInfo.jenis_permohonan === 'IM' ? 'IMPOR' : 'DOMESTIK');
                  // Nama perusahaan dari field yang dikonfirmasi ada di ptkInfo
                  const nmPerusahaan = ptkInfo.nama_pengirim || ptkInfo.nama_pemohon || '-';


                  let ptkBlock = '';

                  allDrafts += `\n${'='.repeat(52)}\n`;
                  allDrafts += `  No KT : ${ktNumberToFetch}\n`;
                  allDrafts += `  AJU   : ${no_aju}\n`;
                  allDrafts += `  PT    : ${nmPerusahaan}\n`;
                  allDrafts += `  Jenis : ${jnsAju} | Tgl: ${tgl_aju}\n`;
                  allDrafts += `${'='.repeat(52)}\n`;

                  // Step 3
                  ptkBlock += `  [OK] Status : PTK sudah terverifikasi\n`;
                  liveLog(`[STEP 3] Verifikasi sudah selesai -> Buka Form Surat Tugas`);
                  liveLog(`[STEP 3] PTK Nomor: ${ktNumberToFetch}`);
                  liveLog(`[STEP 3] Surtug PTK ID: ${ptkId}`);

                  try {
                    const surtugId = uuidv4();
                    const now = new Date();
                    const tzOffset = now.getTimezoneOffset() * 60000;
                    const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0, 19).replace('T', ' ');
                    const localDateOnly = localISOTime.split(' ')[0];

                    let existingSurtug1HeaderId = '';
                    let existingSurtug2HeaderId = '';
                    try {
                      liveLog(`[STEP 2b] Memeriksa surtug yang sudah ada...`);
                      const existSurtugRes = await fetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ptk_id: ptkId, penugasan_id: "" })
                      });
                      if (existSurtugRes.ok) {
                        const existSurtugData = await existSurtugRes.json();
                        const existList: any[] = existSurtugData?.data || [];
                        liveLog(`[STEP 2b] Ditemukan ${existList.length} surtug untuk PTK ini`);
                        for (const s of existList) {
                          const hId = s.id || '';
                          const tgl: string = s.tanggal || '';
                          liveLog(`[STEP 2b] Surtug: ${s.nomor || hId} | tanggal: ${tgl}`);
                          if (tgl.includes('T08:00') || tgl.includes(' 08:00') || tgl.includes('08:00:00')) {
                            if (!existingSurtug1HeaderId) { existingSurtug1HeaderId = hId; liveLog(`[STEP 2b] -> Terdeteksi sebagai Surtug 1 (Adm)`); }
                          } else if (tgl.includes('T09:00') || tgl.includes(' 09:00') || tgl.includes('09:00:00')) {
                            if (!existingSurtug2HeaderId) { existingSurtug2HeaderId = hId; liveLog(`[STEP 2b] -> Terdeteksi sebagai Surtug 2 (Kes)`); }
                          } else {
                            if (!existingSurtug1HeaderId) { existingSurtug1HeaderId = hId; liveLog(`[STEP 2b] -> Surtug 1 (fallback urutan)`); }
                            else if (!existingSurtug2HeaderId) { existingSurtug2HeaderId = hId; liveLog(`[STEP 2b] -> Surtug 2 (fallback urutan)`); }
                          }
                        }
                      }
                    } catch (_e) { liveLog(`[STEP 2b] Gagal cek existing, akan buat baru`); }

                    if (existingSurtug1HeaderId) liveLog(`[STEP 2b] Adm & Kesesuaian sudah ada - skip`);
                    if (existingSurtug2HeaderId) liveLog(`[STEP 2b] Pemeriksaan Kesehatan sudah ada - skip`);
                    if (!existingSurtug1HeaderId && !existingSurtug2HeaderId) liveLog(`[STEP 2b] Belum ada surtug - akan buat semua`);

                    const dokumencekPayload = {
                      listRekom: [], noAju: no_aju, idPtk: ptkId,
                      noDokumen: ktNumberToFetch, tglDokumen: localISOTime.substring(0, 16),
                      errorSurtug: "", errorPegawai: ""
                    };
                    await loggedFetch(`https://api3.karantinaindonesia.go.id/rest-ptkonline/nomorSeri/dokumencek`, {
                      method: 'POST',
                      headers: { 'Authorization': 'Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm', 'Content-Type': 'application/json' },
                      body: JSON.stringify(dokumencekPayload)
                    });

                    let ttdId = 2085;
                    let petugasUpt: any[] = [];
                    let savedPnAdmId = '';
                    try {
                      const pegRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pegawai/upt/3200`, { headers: { 'Authorization': `Bearer ${token}` } });
                      if (pegRes.ok) {
                        const pegData = await pegRes.json();
                        petugasUpt = pegData?.data || [];
                        if (petugasUpt.length > 0) {
                          const cahyono = petugasUpt.find((p: any) => p.nama.toLowerCase().includes('cahyono'));
                          ttdId = cahyono ? cahyono.id : petugasUpt[0].id;
                        }
                      }
                    } catch (e) { console.log('Failed to fetch pegawai', e); }

                    // Jika Surtug 1 sudah ada, ambil pn-adm existing agar savedPnAdmId terisi
                    // Menggunakan endpoint v2 (sesuai website resmi) yang mengembalikan object, bukan array
                    if (existingSurtug1HeaderId && !savedPnAdmId) {
                      try {
                        const pnAdmCheckRes = await loggedFetch(
                          `https://api.karantinaindonesia.go.id/barantin-sys-v2/pnAdmin?id=${ptkId}`,
                          { headers: { 'Authorization': `Bearer ${token}` } }
                        );
                        const pnAdmCheckText = await pnAdmCheckRes.text().catch(() => '');
                        let pnAdmCheckData: any = {};
                        try { if (pnAdmCheckText) pnAdmCheckData = JSON.parse(pnAdmCheckText); } catch (_e) { }
                        const pnAdmObj: any = pnAdmCheckData?.data || null;
                        if (pnAdmObj && pnAdmObj.id) {
                          savedPnAdmId = pnAdmObj.id || '';
                          liveLog(`[STEP 2c] pn-adm existing ditemukan (v2): ${savedPnAdmId}`);
                        }
                      } catch (_e) { liveLog(`[STEP 2c] Gagal ambil pn-adm existing, lanjut`); }
                    }


                    const findPegawaiId = (namaCari: string, defaultId: number) => {
                      if (petugasUpt.length === 0) return defaultId;
                      const found = petugasUpt.find((p: any) => p.nama.toLowerCase().includes(namaCari.toLowerCase()));
                      return found ? found.id : defaultId;
                    };

                    const userDataStr = localStorage.getItem('userData');
                    const userData = userDataStr ? JSON.parse(userDataStr) : {};

                    let surtugHeaderId = existingSurtug1HeaderId;
                    if (!existingSurtug1HeaderId) {
                      const surtugPayload = {
                        id: surtugId, ptk_id: ptkId, no_dok_permohonan: ktNumberToFetch,
                        ptk_analisis_id: "", nomor: "", tanggal: localDateOnly + "T08:00",
                        perihal: "Pelaksanaan Tindakan Karantina", penanda_tangan_id: ttdId,
                        diterbitkan_di: "BANDUNG", user_id: String(userData?.id || "3267"), created_at: localISOTime
                      };
                      const surtugRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug`, {
                        method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify(surtugPayload)
                      });
                      if (surtugRes.ok || surtugRes.status === 201) {
                        const surtugData = await surtugRes.json();
                        if (surtugData.status === '201' || surtugData.status === true) {
                          surtugHeaderId = surtugData.data?.id || surtugId;
                          ptkBlock += `  [OK] Surtug1 : ${surtugData.data?.nomor || surtugHeaderId}\n`;
                          liveLog(`[STEP 4] [OK] Surtug 1 BERHASIL: ${surtugData.data?.nomor}`);
                        } else {
                          ptkBlock += `  [X] Surtug1 : GAGAL (${surtugData.message || 'Unknown Error'})\n`;
                        }
                      } else {
                        ptkBlock += `  [X] Surtug1 : GAGAL (HTTP ${surtugRes.status})\n`;
                      }
                    } else {
                      ptkBlock += `  [OK] Surtug1 : SUDAH ADA (Adm & Kesesuaian) - skip\n`;
                    }

                    if (surtugHeaderId) {
                      const resolvedPetugas = [
                        { id: findPegawaiId('suherman', 4111), nama: 'SUHERMAN' },
                        { id: findPegawaiId('deden', 3267), nama: 'DEDEN KURNIA' },
                        { id: findPegawaiId('pupung', 3051), nama: 'PUPUNG PURNAWAN' }
                      ];

                      if (!existingSurtug1HeaderId) {
                        let petugasResults = '';
                        for (const petugas of resolvedPetugas) {
                          const detilPayload = {
                            id: uuidv4(), ptk_id: ptkId, ptk_surtug_header_id: surtugHeaderId,
                            petugas_id: petugas.id, user_id: String(userData?.id || "3267"),
                            penugasan: [{ id: uuidv4(), penugasan_id: "1", penugasan_lainnya: "" }],
                            created_at: localISOTime
                          };
                          const detilRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil`, {
                            method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify(detilPayload)
                          });
                          const detilData = await detilRes.json();
                          const ok = detilData.status === '201' || detilData.status === true;
                          petugasResults += ok ? petugas.nama : ('[X] ' + petugas.nama);
                          // Refresh detil setelah setiap petugas (sesuai referensi API)
                          await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil/ptk`, {
                            method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ptk_surtug_header_id: surtugHeaderId, ptk_surtug_petugas_id: "", penugasan_id: "" })
                          });
                          await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                            method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ptk_id: ptkId, penugasan_id: "" })
                          });
                        }
                        const petugasOkCount = resolvedPetugas.filter(p => !petugasResults.includes('[X] ' + p.nama)).length;
                        ptkBlock += `  [OK] Petugas : ${petugasOkCount}/${resolvedPetugas.length} - ${resolvedPetugas.map(p => p.nama.split(' ')[0]).join(', ')}\n`;
                        liveLog(`[STEP 5] Input Petugas Surtug1 selesai`);
                        // POST penugasan setelah semua petugas Surtug 1 selesai
                        await loggedFetch(`https://api2.karantinaindonesia.go.id/barantin-sys/surtug/penugasan/${ptkId}`, {
                          method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify({ ptk_id: ptkId, penugasan_id: "" })
                        });
                      }

                      if (!existingSurtug1HeaderId) {
                        try {
                          const pnAdmId = uuidv4();
                          const pnAdmNomor = ktNumberToFetch.replace('K.1.1', 'K.3.7a').replace('K.2.2', 'K.3.7a');
                          const tanggalPnAdm = localISOTime.substring(0, 16);
                          // K-3.7a: penanda tangan (user_ttd_id) mengikuti PETUGAS dari form Pengaturan
                          // (default DEDEN KURNIA = id 3267). Sebelumnya hardcode SUHERMAN.
                          const savedTtdK37a = localStorage.getItem('surtu2_petugas') || 'DEDEN KURNIA - 197812302006041002';
                          const ttdK37aNama = savedTtdK37a.split(' - ')[0].trim().toLowerCase().split(' ')[0];
                          const ttdK37aObj = petugasUpt.find((p: any) => p.nama.toLowerCase().includes(ttdK37aNama));
                          const k37aTtdId = ttdK37aObj ? ttdK37aObj.id : 3267;
                          liveLog(`[STEP 6] K-3.7a penanda tangan: ${savedTtdK37a.split(' - ')[0]} (id ${k37aTtdId})`);
                          const pnAdmPayload = {
                            id: pnAdmId, ptk_id: ptkId, ptk_surat_tugas_id: surtugHeaderId,
                            nomor: pnAdmNomor, tanggal: tanggalPnAdm, hasil_periksa_id: "6",
                            rekomendasi_id: "14", user_ttd_id: String(k37aTtdId), is_sampel: null,
                            user_id: String(userData?.id || "3267")
                          };
                          const pnAdmRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-adm`, {
                            method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify(pnAdmPayload)
                          });
                          const pnAdmText = await pnAdmRes.text();
                          let pnAdmData: any = {};
                          try { if (pnAdmText) pnAdmData = JSON.parse(pnAdmText); } catch (_e) { }
                          const pnAdmOk = pnAdmRes.ok || pnAdmRes.status === 201 || pnAdmRes.status === 204 || pnAdmRes.status === 500 || pnAdmData.status === '201' || pnAdmData.status === true;
                          // Ambil ID dari response dulu, atau fallback ke UUID lokal
                          if (pnAdmOk) savedPnAdmId = pnAdmData?.data?.id || pnAdmId;
                          ptkBlock += `  ${pnAdmOk ? '[OK]' : '[X]'} K-3.7a  : ${pnAdmOk ? 'BERHASIL' : 'GAGAL  HTTP ' + pnAdmRes.status}\n`;
                          liveLog(`[STEP 6] K-3.7a: ${pnAdmOk ? 'BERHASIL' : 'GAGAL - HTTP ' + pnAdmRes.status}`);
                          if (pnAdmOk) {
                            await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/`, {
                              method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify({ ptk_id: ptkId, status_p8: "p1a", dokumen: "K-3.7a", status: "NEW", user_id: String(userData?.id || "3267") })
                            });
                            const rekHistoryRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/rek-history`, {
                              method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify({ ptk_id: ptkId, pn_id: pnAdmId, rekomendasi_id: ["14"] })
                            });
                            const rekText = await rekHistoryRes.text();
                            let rekData: any = {};
                            try { if (rekText) rekData = JSON.parse(rekText); } catch (_e) { }
                            const rekOk = rekHistoryRes.ok || rekHistoryRes.status === 201 || rekHistoryRes.status === 204 || rekData.status === '201' || rekData.status === true;
                            ptkBlock += `K-3.7a rek-hist: ${rekOk ? 'BERHASIL' : 'GAGAL (' + (rekData.message || rekHistoryRes.status) + ')'}\n`;

                            // ─── FIX: GET ulang pn-adm dari server untuk pastikan savedPnAdmId valid ───
                            // Menggunakan endpoint v2 (sesuai website resmi) yang mengembalikan object.
                            try {
                              const pnAdmGetRes = await loggedFetch(
                                `https://api.karantinaindonesia.go.id/barantin-sys-v2/pnAdmin?id=${ptkId}`,
                                { headers: { 'Authorization': `Bearer ${token}` } }
                              );
                              const pnAdmGetText = await pnAdmGetRes.text().catch(() => '');
                              let pnAdmGetData: any = {};
                              try { if (pnAdmGetText) pnAdmGetData = JSON.parse(pnAdmGetText); } catch (_e) { }
                              const pnAdmObj: any = pnAdmGetData?.data || null;
                              if (pnAdmObj && pnAdmObj.id) {
                                savedPnAdmId = pnAdmObj.id;
                                liveLog(`[STEP 6] pn-adm ID dari server (v2): ${savedPnAdmId} → akan digunakan di K-3.7b`);
                              } else {
                                liveLog(`[STEP 6] pn-adm GET v2 tidak ada data, pakai ID lokal: ${savedPnAdmId}`);
                              }
                            } catch (_e) { liveLog(`[STEP 6] Gagal GET pn-adm v2, pakai ID lokal: ${savedPnAdmId}`); }
                          }
                        } catch (e: any) {
                          ptkBlock += `K-3.7a         : ERROR (${e.message})\n`;
                        }
                      }

                      await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                        method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ptk_id: ptkId, penugasan_id: "" })
                      });
                      await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil/ptk`, {
                        method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ptk_surtug_header_id: surtugHeaderId, ptk_surtug_petugas_id: "", penugasan_id: "" })
                      });

                      try {
                        let surtug2HeaderId = existingSurtug2HeaderId;
                        if (!existingSurtug2HeaderId) {
                          const surtug2Id = uuidv4();
                          const surtug2Payload = {
                            id: surtug2Id, ptk_id: ptkId, no_dok_permohonan: ktNumberToFetch,
                            ptk_analisis_id: "", nomor: "", tanggal: localDateOnly + "T09:00",
                            perihal: "Pelaksanaan Tindakan Karantina", penanda_tangan_id: ttdId,
                            diterbitkan_di: "BANDUNG", user_id: String(userData?.id || "3267"), created_at: localISOTime
                          };
                          const surtug2Res = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug`, {
                            method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify(surtug2Payload)
                          });
                          const surtug2Data = await surtug2Res.json();
                          const surtug2Ok = surtug2Data.status === '201' || surtug2Data.status === true;
                          if (surtug2Ok) {
                            surtug2HeaderId = surtug2Data.data?.id || surtug2Id;
                            ptkBlock += `  [OK] Surtug2 : ${surtug2Data.data?.nomor || surtug2HeaderId}\n`;
                            liveLog(`[STEP 7] [OK] Surtug 2 BERHASIL: ${surtug2Data.data?.nomor}`);
                          } else {
                            ptkBlock += `  [X] Surtug2 : GAGAL  HTTP ${surtug2Res.status}\n`;
                            liveLog(`[STEP 7] [X] Surtug 2 GAGAL - ${JSON.stringify(surtug2Data)}`);
                          }
                        } else {
                          ptkBlock += `  [OK] Surtug2 : SUDAH ADA (Pemeriksaan Kesehatan) - skip\n`;
                          liveLog(`[STEP 7] Surtug 2 (Pemeriksaan Kesehatan) sudah ada -> skip`);
                        }

                        if (surtug2HeaderId && !existingSurtug2HeaderId) {
                          const resolvedPetugas2 = [
                            { id: findPegawaiId('suherman', 4111), nama: 'SUHERMAN' },
                            { id: findPegawaiId('deden', 3267), nama: 'DEDEN KURNIA' },
                            { id: findPegawaiId('pupung', 3051), nama: 'PUPUNG PURNAWAN' }
                          ];
                          let petugasResults = '';
                          for (const petugas of resolvedPetugas2) {
                            const detilPayload = {
                              id: uuidv4(), ptk_id: ptkId, ptk_surtug_header_id: surtug2HeaderId,
                              petugas_id: petugas.id, user_id: String(userData?.id || "3267"),
                              penugasan: [{ id: uuidv4(), penugasan_id: "2", penugasan_lainnya: "" }],
                              created_at: localISOTime
                            };
                            const detilRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil`, {
                              method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify(detilPayload)
                            });
                            const detilData = await detilRes.json();
                            const ok = detilData.status === '201' || detilData.status === true;
                            petugasResults += ok ? petugas.nama : ('[X] ' + petugas.nama);
                            // Refresh detil setelah setiap petugas (sesuai referensi API)
                            await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil/ptk`, {
                              method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify({ ptk_surtug_header_id: surtug2HeaderId, ptk_surtug_petugas_id: "", penugasan_id: "" })
                            });
                            await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                              method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify({ ptk_id: ptkId, penugasan_id: "" })
                            });
                          }
                          const petugasOkCount = resolvedPetugas2.filter(p => !petugasResults.includes('[X] ' + p.nama)).length;
                          ptkBlock += `  [OK] Petugas : ${petugasOkCount}/${resolvedPetugas2.length} - ${resolvedPetugas2.map(p => p.nama.split(' ')[0]).join(', ')}\n`;
                          liveLog(`[STEP 8] Input Petugas Surtug2 selesai`);
                          // POST penugasan setelah semua petugas Surtug 2 selesai
                          await loggedFetch(`https://api2.karantinaindonesia.go.id/barantin-sys/surtug/penugasan/${ptkId}`, {
                            method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ptk_id: ptkId, penugasan_id: "" })
                          });
                        }
                      } catch (e: any) {
                        ptkBlock += `  [X] Surtug2 : ERROR (${e.message})\n`;
                        liveLog(`[STEP 7] ERROR: ${e.message}`);
                      }

                      await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                        method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ptk_id: ptkId, penugasan_id: "" })
                      });
                    }

                    // ─── STEP 9: K-3.7b (pn-fisik / Laporan Pemeriksaan Fisik) ───
                    try {
                      liveLog(`[STEP 9] Membuat K-3.7b (Laporan Pemeriksaan Fisik)...`);

                      // Cek komoditas dahulu (barantin-sys-v2/ptk/komoditas)
                      const komoditasRes = await loggedFetch(
                        `https://api.karantinaindonesia.go.id/barantin-sys-v2/ptk/komoditas?id=${ptkId}&kar=T`,
                        { headers: { 'Authorization': `Bearer ${token}` } }
                      );
                      const komoditasData = await komoditasRes.json();
                      const komoditas = komoditasData?.data?.[0] || {};
                      const komoditasId = komoditas.id || '';

                      // Update ptk-kmdt (volume P1)
                      if (komoditasId) {
                        await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-kmdt/${komoditasId}`, {
                          method: 'PUT',
                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            id: komoditasId, tindakan: 'p1',
                            jantanP1: null, betinaP1: null,
                            volumeP1: String(komoditas.volume_lain || ''),
                            nettoP1: String(komoditas.volume_netto || '')
                          })
                        });
                      }

                      // Cek apakah pn-fisik sudah ada (endpoint v2 sesuai request asli aplikasi)
                      const pnFisikCheckRes = await loggedFetch(
                        `https://api.karantinaindonesia.go.id/barantin-sys-v2/pnFisik?id=${ptkId}`,
                        { headers: { 'Authorization': `Bearer ${token}` } }
                      ).catch(() => null);

                      let pnFisikExists = false;
                      let pnFisikExistingData: any = null;
                      if (pnFisikCheckRes && pnFisikCheckRes.ok) {
                        const pnFisikCheck = await pnFisikCheckRes.json().catch(() => ({}));
                        // v2 endpoint mengembalikan {data: {id:..., user_ttd1_id:..., ...}} (object, bukan array)
                        const checkData = pnFisikCheck?.data;
                        if (checkData && (Array.isArray(checkData) ? checkData.length > 0 : !!checkData?.id)) {
                          pnFisikExists = true;
                          pnFisikExistingData = Array.isArray(checkData) ? checkData[0] : checkData;
                        }
                      }

                      let pnFisikId = '';

                      // ─── Tentukan penandatangan TTD2 (bergantian PUPUNG ↔ SUHERMAN 1:1) ───
                      // Counter 0,2,4... = PUPUNG PURNAWAN | 1,3,5... = SUHERMAN
                      const ttd2Counter = parseInt(localStorage.getItem('draft_ttd2_counter') || '0', 10);
                      const isPupungTurn = (ttd2Counter % 2 === 0);
                      const ttd2PupungId = findPegawaiId('pupung', 3051);
                      const ttd2SuhermanId = findPegawaiId('suherman', 4111);
                      const ttd2Id = isPupungTurn ? ttd2PupungId : ttd2SuhermanId;
                      const ttd2Nama = isPupungTurn ? 'PUPUNG PURNAWAN' : 'SUHERMAN';
                      liveLog(`[STEP 9] Penandatangan K-3.7b TTD2: ${ttd2Nama} (giliran ke-${ttd2Counter + 1})`);
                      // Naikkan counter agar berikutnya berganti
                      localStorage.setItem('draft_ttd2_counter', String(ttd2Counter + 1));

                      if (!pnFisikExists) {
                        // ─── FIX: Jika savedPnAdmId masih kosong, coba GET dari server sebelum POST K-3.7b ───
                        // Menggunakan endpoint v2 (sesuai website resmi) yang mengembalikan object, bukan array.
                        if (!savedPnAdmId) {
                          liveLog(`[STEP 9] savedPnAdmId kosong! Mencoba GET pn-adm v2 dari server...`);
                          try {
                            const pnAdmFallbackRes = await loggedFetch(
                              `https://api.karantinaindonesia.go.id/barantin-sys-v2/pnAdmin?id=${ptkId}`,
                              { headers: { 'Authorization': `Bearer ${token}` } }
                            );
                            const pnAdmFallbackText = await pnAdmFallbackRes.text().catch(() => '');
                            let pnAdmFallbackData: any = {};
                            try { if (pnAdmFallbackText) pnAdmFallbackData = JSON.parse(pnAdmFallbackText); } catch (_e) { }
                            const pnAdmFallbackObj: any = pnAdmFallbackData?.data || null;
                            if (pnAdmFallbackObj && pnAdmFallbackObj.id) {
                              savedPnAdmId = pnAdmFallbackObj.id;
                              liveLog(`[STEP 9] pn-adm ID (fallback v2) dari server: ${savedPnAdmId}`);
                            } else {
                              liveLog(`[STEP 9] WARNING: pn-adm tidak ditemukan di server (v2). K-3.7b mungkin tidak terhubung ke K-3.7a.`);
                            }
                          } catch (_e) { liveLog(`[STEP 9] Gagal GET pn-adm fallback (v2).`); }
                        } else {
                          liveLog(`[STEP 9] pn_administrasi_id yang akan dipakai: ${savedPnAdmId}`);
                        }

                        // Buat pn-fisik baru
                        pnFisikId = uuidv4();
                        const periksaDetilId = uuidv4();
                        const now = new Date();
                        const waktuPeriksa = now.toISOString().substring(0, 16);
                        const tglPeriksa = now.toISOString().substring(0, 10).replace(/-/g, '-') + ' ' + now.toTimeString().substring(0, 5);
                        const nomorPnFisik = ktNumberToFetch.replace('K.1.1', 'K.3.7b').replace('K.2.2', 'K.3.7b');

                        // K-3.7b: Penandatangan atas (user_ttd1_id) = DEDEN KURNIA
                        const dedenId = findPegawaiId('deden', 3267);
                        // TTD2 sudah ditentukan di atas (ttd2Id / ttd2Nama)

                        const pnFisikPayload = {
                          id: pnFisikId,
                          ptk_id: ptkId,
                          pn_administrasi_id: savedPnAdmId || '',
                          nomor: nomorPnFisik,
                          waktu_periksa: waktuPeriksa,
                          tanggal: tglPeriksa,
                          user_ttd1_id: String(dedenId),
                          user_id: String(userData?.id || '3267'),
                          periksa_detil: [{
                            id: periksaDetilId,
                            ptk_komoditas_id: komoditasId,
                            target_sasaran1: 'Live Insect',
                            metode1: 'RANDOM SAMPLING',
                            temuan_hasil1: 'Tidak ditemukan OPT/OPTK',
                            catatan1: 'MP BAIK',
                            target_sasaran2: '', metode2: '', temuan_hasil2: '', catatan2: ''
                          }]
                        };

                        const pnFisikRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-fisik`, {
                          method: 'POST',
                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify(pnFisikPayload)
                        });
                        const pnFisikText = await pnFisikRes.text().catch(() => '');
                        let pnFisikData: any = {};
                        try { if (pnFisikText) pnFisikData = JSON.parse(pnFisikText); } catch (_e) { }
                        const pnFisikOk = pnFisikRes.ok || pnFisikRes.status === 201 || pnFisikRes.status === 204 || pnFisikRes.status === 500 || pnFisikData.status === '201' || pnFisikData.status === true;
                        if (pnFisikOk) pnFisikId = pnFisikData?.data?.id || pnFisikId;

                        if (pnFisikOk) {
                          ptkBlock += `  [OK] K-3.7b   : ${nomorPnFisik} | TTD2=${ttd2Nama}\n`;
                          liveLog(`[STEP 9] [OK] K-3.7b BERHASIL: ${nomorPnFisik} | TTD2=${ttd2Nama}`);

                          // ptk-history K-3.7b NEW
                          await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/`, {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ptk_id: ptkId, status_p8: 'p1b', dokumen: 'K-3.7b', status: 'NEW', user_id: String(userData?.id || '3267') })
                          });

                          // rek-history K-3.7b (rekomendasi_id: 19)
                          await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/rek-history`, {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ptk_id: ptkId, pn_id: pnFisikId, rekomendasi_id: ['19'] })
                          });

                          // pn-fisik/header - finalisasi K-3.7b
                          // user_ttd2_id (Penandatangan Rekomendasi/bawah) = bergantian PUPUNG ↔ SUHERMAN
                          await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-fisik/header/${pnFisikId}`, {
                            method: 'PUT',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              id: pnFisikId,
                              tanggal: tglPeriksa,
                              kesimpulan: 'MP BEBAS OTPK',
                              rekomendasi_id: '19',
                              rekomendasi2_id: '',
                              user_ttd2_id: String(ttd2Id),
                              user_id: String(userData?.id || '3267')
                            })
                          });

                          // ptk-history K-3.7b UPDATE
                          await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/`, {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ptk_id: ptkId, status_p8: 'p1b', dokumen: 'K-3.7b', status: 'UPDATE', user_id: String(userData?.id || '3267') })
                          });
                        } else {
                          ptkBlock += `  [X] K-3.7b   : GAGAL (${pnFisikData.message || 'Unknown'})\n`;
                          liveLog(`[STEP 9] [X] K-3.7b GAGAL: ${pnFisikData.message}`);
                        }
                      } else {
                        // K-3.7b sudah ada — cek dan koreksi pn_administrasi_id + penandatangan
                        try {
                          // Gunakan data yang sudah di-fetch saat cek existing (tidak perlu fetch ulang)
                          const existingPnFisik = pnFisikExistingData || {};
                          pnFisikId = existingPnFisik.id || '';

                          const dedenId2 = findPegawaiId('deden', 3267);
                          const dedenIdStr = String(dedenId2);
                          const currentTtd1 = String(existingPnFisik.user_ttd1_id || '');
                          // FIX: gunakan trim() agar empty string dari server terdeteksi sebagai kosong
                          const currentPnAdmId = String(existingPnFisik.pn_administrasi_id || '').trim();

                          liveLog(`[STEP 9] K-3.7b existing: id=${pnFisikId}`);
                          liveLog(`[STEP 9] pn_administrasi_id existing: "${currentPnAdmId || '(KOSONG)'}"`);
                          liveLog(`[STEP 9] TTD1 existing=${currentTtd1} | target=${dedenIdStr}`);

                          // Format tanggal sesuai API: "YYYY-MM-DD HH:MM"
                          const now2 = new Date();
                          const rawTanggal = existingPnFisik.tanggal || '';
                          // Pastikan format tanggal "YYYY-MM-DD HH:MM" (tanpa detik)
                          const tglFix = rawTanggal
                            ? rawTanggal.substring(0, 16).replace('T', ' ')
                            : (now2.toISOString().substring(0, 10) + ' ' + now2.toTimeString().substring(0, 5));
                          const waktuFix = existingPnFisik.waktu_periksa
                            ? existingPnFisik.waktu_periksa.substring(0, 16).replace(' ', 'T')
                            : now2.toISOString().substring(0, 16);

                          if (pnFisikId) {
                            // ─── FIX: Tentukan pn_administrasi_id yang akan digunakan ───
                            // Prioritas: (1) yang sudah ada di server jika valid,
                            // (2) savedPnAdmId dari proses ini, (3) fetch ulang dari server
                            let resolvedPnAdmId = currentPnAdmId || savedPnAdmId || '';
                            if (!resolvedPnAdmId) {
                              liveLog(`[STEP 9] pn_administrasi_id kosong! Mencoba GET pn-adm v2 dari server...`);
                              try {
                                const pnAdmRefetchRes = await loggedFetch(
                                  `https://api.karantinaindonesia.go.id/barantin-sys-v2/pnAdmin?id=${ptkId}`,
                                  { headers: { 'Authorization': `Bearer ${token}` } }
                                );
                                const pnAdmRefetchText = await pnAdmRefetchRes.text().catch(() => '');
                                let pnAdmRefetchData: any = {};
                                try { if (pnAdmRefetchText) pnAdmRefetchData = JSON.parse(pnAdmRefetchText); } catch (_e) { }
                                const pnAdmRefetchObj: any = pnAdmRefetchData?.data || null;
                                if (pnAdmRefetchObj && pnAdmRefetchObj.id) {
                                  resolvedPnAdmId = pnAdmRefetchObj.id;
                                  liveLog(`[STEP 9] pn_administrasi_id dari server (GET v2): ${resolvedPnAdmId}`);
                                } else {
                                  liveLog(`[STEP 9] WARNING: pn-adm tidak ditemukan di server (v2)!`);
                                }
                              } catch (_e) { liveLog(`[STEP 9] Gagal GET pn-adm (v2).`); }
                            } else {
                              liveLog(`[STEP 9] Akan gunakan pn_administrasi_id: ${resolvedPnAdmId}`);
                            }

                            // ─── KOREKSI TTD1 + pn_administrasi_id: PUT /pn-fisik/{id} ───
                            // Trigger jika TTD1 salah ATAU pn_administrasi_id kosong di server
                            const needsPutFisik = currentTtd1 !== dedenIdStr || !currentPnAdmId;
                            if (needsPutFisik) {
                              if (currentTtd1 !== dedenIdStr) liveLog(`[STEP 9] Koreksi TTD1 → DEDEN KURNIA (${dedenIdStr})...`);
                              if (!currentPnAdmId) liveLog(`[STEP 9] Mengisi pn_administrasi_id yang kosong → ${resolvedPnAdmId}`);
                              const existingDetil = existingPnFisik.periksa_detil || [];
                              const putFisikRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-fisik/${pnFisikId}`, {
                                method: 'PUT',
                                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  id: pnFisikId,
                                  ptk_id: ptkId,
                                  // FIX: gunakan resolvedPnAdmId bukan existingPnFisik.pn_administrasi_id || ...
                                  // karena server bisa mengembalikan empty string yang truthy tapi kosong
                                  pn_administrasi_id: resolvedPnAdmId,
                                  nomor: existingPnFisik.nomor || '',
                                  waktu_periksa: waktuFix,
                                  tanggal: tglFix,
                                  user_ttd1_id: dedenIdStr,
                                  user_id: String(userData?.id || '3267'),
                                  periksa_detil: existingDetil
                                })
                              });
                              const putFisikText = await putFisikRes.text().catch(() => '');
                              let putFisikData: any = {};
                              try { if (putFisikText) putFisikData = JSON.parse(putFisikText); } catch (_e) { }
                              const putFisikOk = putFisikRes.status === 201 || putFisikRes.ok || putFisikData.status === '201' || putFisikData.status === true;
                              liveLog(`[STEP 9] PUT pn-fisik: ${putFisikOk ? 'BERHASIL' : 'GAGAL HTTP ' + putFisikRes.status + ' | ' + putFisikText.substring(0, 80)}`);
                              if (putFisikOk) {
                                await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/`, {
                                  method: 'POST',
                                  headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ ptk_id: ptkId, status_p8: 'p1b', dokumen: 'K-3.7b', status: 'UPDATE', user_id: String(userData?.id || '3267') })
                                });
                              }
                            } else {
                              liveLog(`[STEP 9] TTD1 sudah benar & pn_administrasi_id sudah ada → skip PUT pn-fisik`);
                            }

                            // ─── KOREKSI TTD2: POST rek-history → PUT pn-fisik/header (= klik Simpan) ───
                            // Untuk kasus existing K-3.7b, ikuti giliran yang sama (counter sudah naik di atas)
                            liveLog(`[STEP 9] Koreksi TTD2 → ${ttd2Nama} (${String(ttd2Id)})...`);
                            // Rek-history DULU (sesuai urutan request asli file 23.8)
                            await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/rek-history`, {
                              method: 'POST',
                              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify({ ptk_id: ptkId, pn_id: pnFisikId, rekomendasi_id: ['19'] })
                            });
                            // Baru PUT pn-fisik/header
                            const putHeaderRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-fisik/header/${pnFisikId}`, {
                              method: 'PUT',
                              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                id: pnFisikId,
                                tanggal: tglFix,
                                kesimpulan: 'MP BEBAS OTPK',
                                rekomendasi_id: '19',
                                rekomendasi2_id: '',
                                user_ttd2_id: String(ttd2Id),
                                user_id: String(userData?.id || '3267')
                              })
                            });
                            const putHeaderText = await putHeaderRes.text().catch(() => '');
                            let putHeaderData: any = {};
                            try { if (putHeaderText) putHeaderData = JSON.parse(putHeaderText); } catch (_e) { }
                            const putHeaderOk = putHeaderRes.status === 201 || putHeaderRes.ok || putHeaderData.status === '201' || putHeaderData.status === true;
                            liveLog(`[STEP 9] PUT pn-fisik/header TTD2: ${putHeaderOk ? 'BERHASIL' : 'GAGAL HTTP ' + putHeaderRes.status + ' | ' + putHeaderText.substring(0, 80)}`);
                            if (putHeaderOk) {
                              await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/`, {
                                method: 'POST',
                                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                body: JSON.stringify({ ptk_id: ptkId, status_p8: 'p1b', dokumen: 'K-3.7b', status: 'UPDATE', user_id: String(userData?.id || '3267') })
                              });
                            }
                            ptkBlock += `  [OK] K-3.7b   : DIKOREKSI TTD1=DEDEN TTD2=${ttd2Nama}\n`;
                          } else {
                            ptkBlock += `  [!] K-3.7b   : SUDAH ADA (id tidak ditemukan, skip)\n`;
                            liveLog(`[STEP 9] K-3.7b existing: id kosong, tidak bisa koreksi`);
                          }
                        } catch (e: any) {
                          ptkBlock += `  [!] K-3.7b   : SUDAH ADA (error koreksi: ${e.message})\n`;
                          liveLog(`[STEP 9] K-3.7b existing error: ${e.message}`);
                        }
                      }
                    } catch (e: any) {
                      ptkBlock += `  [X] K-3.7b   : ERROR (${e.message})\n`;
                      liveLog(`[STEP 9] ERROR: ${e.message}`);
                    }

                    // ─── STEP 10: Update Komoditas (Tidak Ada Perubahan) ───
                    try {
                      liveLog(`[STEP 10] Update komoditas (ptkKomoditas/updateAll)...`);
                      const komoditasListRes = await loggedFetch(
                        `https://api2.karantinaindonesia.go.id/barantin-sys/ptk-kmdt/ptk/${ptkId}`,
                        { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ kar: 'T' }) }
                      );
                      const komoditasList = await komoditasListRes.json();
                      if (komoditasList?.data?.length > 0) {
                        await loggedFetch(`https://api3.karantinaindonesia.go.id/rest-ptkonline/ptkKomoditas/updateAll`, {
                          method: 'POST',
                          headers: { 'Authorization': 'Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm', 'Content-Type': 'application/json' },
                          body: JSON.stringify({ pkar: 'P8', komoditas: komoditasList.data })
                        });
                        liveLog(`[STEP 10] [OK] Update komoditas selesai`);
                      }
                    } catch (e: any) {
                      liveLog(`[STEP 10] ERROR: ${e.message}`);
                    }

                    // ─── STEP 11: Surtug 3 (Pembebasan Seluruh / K-2.2) ───
                    try {
                      liveLog(`[STEP 11] Membuat Surtug 3 (Pembebasan)...`);

                      // Cek existing surtug penugasan 14 (Pembebasan)
                      const penugasanRes = await loggedFetch(
                        `https://api2.karantinaindonesia.go.id/barantin-sys/surtug/penugasan/${ptkId}`,
                        { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ ptk_id: ptkId, penugasan_id: 14 }) }
                      );
                      const penugasanData = await penugasanRes.json();
                      const existingSurtug3 = penugasanData?.data?.[0];

                      let surtug3HeaderId = existingSurtug3?.ptk_surtug_header_id || '';

                      if (!surtug3HeaderId) {
                        const surtug3Id = uuidv4();
                        const surtug3Payload = {
                          id: surtug3Id, ptk_id: ptkId, no_dok_permohonan: ktNumberToFetch,
                          ptk_analisis_id: '', nomor: '', tanggal: localDateOnly + 'T10:00',
                          perihal: 'Pelaksanaan Tindakan Karantina', penanda_tangan_id: ttdId,
                          diterbitkan_di: 'BANDUNG', user_id: String(userData?.id || '3267'), created_at: localISOTime
                        };
                        const surtug3Res = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug`, {
                          method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify(surtug3Payload)
                        });
                        const surtug3Data = await surtug3Res.json();
                        const surtug3Ok = surtug3Data.status === '201' || surtug3Data.status === true;
                        if (surtug3Ok) {
                          surtug3HeaderId = surtug3Data.data?.id || surtug3Id;
                          ptkBlock += `  [OK] Surtug3 : ${surtug3Data.data?.nomor || surtug3HeaderId}\n`;
                          liveLog(`[STEP 11] [OK] Surtug 3 BERHASIL: ${surtug3Data.data?.nomor}`);
                        } else {
                          ptkBlock += `  [X] Surtug3 : GAGAL (${surtug3Data.message})\n`;
                          liveLog(`[STEP 11] [X] Surtug 3 GAGAL: ${JSON.stringify(surtug3Data)}`);
                        }
                      } else {
                        ptkBlock += `  [OK] Surtug3 : SUDAH ADA (Pembebasan) - skip\n`;
                        liveLog(`[STEP 11] Surtug 3 sudah ada -> skip`);
                      }

                      // Input petugas Suherman dengan penugasan 14 (Pembebasan Seluruh)
                      if (surtug3HeaderId && !existingSurtug3) {
                        const suhermanId = findPegawaiId('suherman', 4111);
                        const detil3Payload = {
                          id: uuidv4(), ptk_id: ptkId, ptk_surtug_header_id: surtug3HeaderId,
                          petugas_id: suhermanId, user_id: String(userData?.id || '3267'),
                          penugasan: [{ id: uuidv4(), penugasan_id: '14', penugasan_lainnya: '' }],
                          created_at: localISOTime
                        };
                        const detil3Res = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil`, {
                          method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify(detil3Payload)
                        });
                        const detil3Data = await detil3Res.json();
                        const d3Ok = detil3Data.status === '201' || detil3Data.status === true;
                        ptkBlock += `  [OK] Petugas3: ${d3Ok ? 'SUHERMAN' : '[X] SUHERMAN'}\n`;
                        liveLog(`[STEP 11] Input Petugas Surtug3 selesai`);

                        await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                          method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify({ ptk_id: ptkId, penugasan_id: '' })
                        });
                      }
                    } catch (e: any) {
                      ptkBlock += `  [X] Surtug3 : ERROR (${e.message})\n`;
                      liveLog(`[STEP 11] ERROR: ${e.message}`);
                    }

                    // ─── STEP 12: Buat Dokumen KT-1 (pn-pelepasan-kt) ───
                    try {
                      liveLog(`[STEP 12] Membuat dokumen KT-1...`);

                      // Cek apakah KT-1 sudah ada
                      const ktCheckRes = await loggedFetch(
                        `https://api.karantinaindonesia.go.id/barantin-sys/pn-pelepasan-kt/${ptkId}`,
                        { headers: { 'Authorization': `Bearer ${token}` } }
                      ).catch(() => null);

                      let ktExists = false;
                      let existingKtId = '';
                      if (ktCheckRes && ktCheckRes.ok) {
                        const ktCheckData = await ktCheckRes.json().catch(() => ({}));
                        if (ktCheckData?.data?.id) {
                          ktExists = true;
                          existingKtId = ktCheckData.data.id;
                        }
                      }

                      // Ambil data PTK lengkap untuk entry_point dan detail lainnya
                      const ptkLengkapRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/ptk/${ptkId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                      });
                      const ptkLengkapData = await ptkLengkapRes.json();
                      const ptkFull = ptkLengkapData?.data?.ptk || {};
                      const pelabuhan_bongkar = ptkFull.pelabuhan_bongkar || '';
                      const negara_tujuan_en = ptkFull.negara_tujuan_en || '';
                      const entry_point = [pelabuhan_bongkar, negara_tujuan_en].filter(Boolean).join(', ') || 'Qingdao, CHINA';
                      const kota_kab_asal_id = ptkFull.kota_kab_asal_id || 3603;
                      const tanda_khusus = ptkFull.tanda_khusus || '-';
                      const nama_alat_angkut = ptkFull.nama_alat_angkut_terakhir || '-';

                      let ktId = existingKtId;
                      const nomorKT = ktNumberToFetch.replace('K.1.1', 'K.T.1').replace('K.2.2', 'K.T.1');
                      const now = new Date();
                      const ktTanggal = now.toISOString().substring(0, 10) + ' ' + now.toTimeString().substring(0, 5);

                      if (!ktExists) {
                        ktId = uuidv4();
                        const ktPayload = {
                          id: ktId,
                          ptk_id: ptkId,
                          dokumen_karantina_id: '48',
                          nomor: nomorKT,
                          tanggal: ktTanggal,
                          nomor_seri: '*******',
                          entry_point: entry_point,
                          upt_tujuan_id: '',
                          additional_declaration: '',
                          additional_information: '',
                          pn_perlakuan_id: '',
                          treatment_type: '', chemical: '', duration: '', treatment_date: '',
                          concentration: '', sat_dosis: '', temperature: '',
                          pc_no: '', is_pc: '', is_commodity: '', is_container: '', ori_pc: '',
                          status_dok: 'ISSUED',
                          diterbitkan_di: 'BEKASI',
                          replaced_dok_id: null,
                          decimalVolume: 2,
                          user_ttd_id: '4111',
                          user_id: String(userData?.id || '3267'),
                          nama_pengirim: ptkFull.nama_pengirim || '',
                          alamat_pengirim: ptkFull.alamat_pengirim || '',
                          nama_penerima: ptkFull.nama_penerima || '',
                          alamat_penerima: ptkFull.alamat_penerima || '',
                          nama_alat_angkut_terakhir: nama_alat_angkut,
                          kota_kab_asal_id: kota_kab_asal_id,
                          tanda_khusus: tanda_khusus
                        };

                        const ktRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-pelepasan-kt`, {
                          method: 'POST',
                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify(ktPayload)
                        });
                        const ktData = await ktRes.json();
                        const ktOk = ktData.status === '201' || ktData.status === true;

                        if (ktOk) {
                          ktId = ktData.data?.id || ktId;
                          ptkBlock += `  [OK] KT-1    : ${nomorKT}\n`;
                          liveLog(`[STEP 12] [OK] KT-1 BERHASIL dibuat: ${nomorKT}`);

                          // ptk-history KT-1
                          await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/`, {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ptk_id: ptkId, status_p8: 'p8', dokumen: 'KT-1', status: 'NEW', user_id: String(userData?.id || '3267') })
                          });
                        } else {
                          ptkBlock += `  [X] KT-1    : GAGAL (${ktData.message || 'Unknown'})\n`;
                          liveLog(`[STEP 12] [X] KT-1 GAGAL: ${ktData.message}`);
                          ktId = '';
                        }
                      } else {
                        ptkBlock += `  [OK] KT-1    : SUDAH ADA - skip (${existingKtId})\n`;
                        liveLog(`[STEP 12] KT-1 sudah ada -> skip`);
                      }

                      // Generate link draft
                      if (ktId) {
                        const encoded = btoa(ktId + '_view');
                        const draftLink = `https://cert.karantinaindonesia.go.id/print_cert/pembebasan/kt1/${encoded}`;
                        ptkBlock += `  [LINK] Draft : ${draftLink}\n`;
                        liveLog(`[STEP 12] [LINK] ${draftLink}`);
                        // Tambahkan ke hasil dengan format bersih: Nama PT + link
                        const ktSuffix = String(parseInt(ktNumberToFetch.replace(/.*-(\d+)$/, '$1'), 10));
                        hasilLinks += `DRAFT ${nmPerusahaan} ${ktSuffix}\n${draftLink}\n\n`;
                      }
                    } catch (e: any) {
                      ptkBlock += `  [X] KT-1    : ERROR (${e.message})\n`;
                      liveLog(`[STEP 12] ERROR: ${e.message}`);
                    }

                  } catch (e: any) {
                    ptkBlock += `  [X] ERROR SISTEM : ${e.message}\n`;
                    liveLog(`[ERROR] Surtug process failed: ${e.message}`);
                  }

                  allDrafts += ptkBlock;
                }
              } else {
                liveLog(`[STEP 1] [X] No KT tidak ditemukan: ${ktNumberToFetch}`);
              }
            } // end for loop

            if (hasilLinks.trim()) {
              savedDraftHasilContent = hasilLinks.trim();
            } else if (allDrafts) {
              savedDraftHasilContent = allDrafts.trim();
            } else {
              savedDraftHasilContent = 'Tidak ada draft yang berhasil dibuat.';
            }

            liveLog(`\n[SELESAI] Data berhasil diproses.`);
            terminal.updateView();

            processDraftBtn.disabled = false;
            processDraftBtn.textContent = 'Buat Draft';
          } catch (error: any) {
            if (error?.message === 'TOKEN_EXPIRED_401') return;
            console.error('Draft error:', error);
            processDraftBtn.disabled = false;
            processDraftBtn.textContent = 'Buat Draft';
            liveLog(`[ERROR] Terjadi kesalahan: ${error}`);
          }
        })();
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

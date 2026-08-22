/**
 * RevisiTool.ts â€” Menu "Revisi": Revisi Draft dari No KT, PDF, atau Screenshot
 * Fitur baru: Paste gambar (Ctrl+V) â†’ OCR teks otomatis dengan Tesseract.js
 */

import * as pdfjsLib from 'pdfjs-dist';
import { terminalPanelHTML, bindTerminalTabs } from '../shared/TerminalPanel';

// Use CDN for worker to avoid Vite build issues with pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const RevisiTool = () => {
  return `
    <div class="flex flex-col gap-3 flex-1 min-h-0 w-full h-full">
      <div class="flex flex-col gap-2 flex-1 min-h-0">
        <div class="flex flex-row items-center justify-between w-full gap-3">
          <div class="flex flex-row items-center gap-3 flex-1 min-w-0">
            <input type="text" id="quickDocNumber" placeholder="NO KT" maxlength="6"
              class="w-[80px] md:w-[100px] shrink-0 px-2 md:px-3 py-1.5 md:py-2 bg-brand-input hover:bg-brand-input/80 text-brand-text placeholder-zinc-500 font-mono text-xs md:text-sm font-semibold outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-all border border-brand-border rounded-lg h-[36px] md:h-[38px] text-center shadow-sm" />
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <button type="button" id="processRevisiBtn" class="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold cursor-pointer transition-all shadow-md shrink-0 whitespace-nowrap h-[36px] md:h-[38px]">
              Revisi Draft
            </button>
          </div>
        </div>

        <div id="docSection" class="flex flex-col gap-2 relative w-full flex-1 min-h-0">
          <textarea id="docNumber"
            placeholder="Paste path PDF (file:///C:/...), No KT, atau PASTE GAMBAR (Ctrl+V) langsung di sini..."
            class="w-full h-full flex-1 bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none"
            rows="8"></textarea>

          <!-- Paste Image Preview Overlay -->
          <div id="pasteImageOverlay" class="absolute inset-0 bg-zinc-900/90 backdrop-blur-[3px] rounded-lg flex flex-col items-center justify-center opacity-0 pointer-events-none transition-all duration-300 z-20 border-2 border-brand-accent/60">
            <div class="flex flex-col items-center gap-3 p-4 text-center w-full max-w-[90%]">
              <img id="pasteImagePreview" src="" alt="preview" class="max-h-48 max-w-full rounded-lg border border-zinc-600 object-contain shadow-lg" />
              <p class="text-white text-sm font-bold mt-2">Gambar terdeteksi!</p>
              <p class="text-zinc-400 text-xs">Klik <strong class="text-brand-accent">Revisi Draft</strong> untuk ekstrak teks dengan OCR</p>
            </div>
          </div>

          <!-- Drop Overlay -->
          <div id="dropOverlay" class="absolute inset-0 bg-zinc-900/85 backdrop-blur-[3px] rounded-lg flex flex-col items-center justify-center opacity-0 pointer-events-none transition-all duration-300 z-20 border-2 border-dashed border-brand-accent/60">
            <div class="flex flex-col items-center gap-3 p-4 text-center">
              <svg class="w-10 h-10 text-brand-accent animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="text-white text-sm font-bold">Drop file PDF di sini</p>
              <p id="dropOverlayPath" class="text-brand-accent text-xs font-mono break-all max-w-[90%] leading-relaxed"></p>
            </div>
          </div>

          <!-- Loading Overlay -->
          <div id="docLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
            <div class="flex flex-col items-center gap-3">
              <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
              <span id="docLoaderText" class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
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
  const docLoader = document.getElementById('docLoader') as HTMLDivElement;
  const docLoaderText = document.getElementById('docLoaderText') as HTMLSpanElement;
  const dropOverlay = document.getElementById('dropOverlay') as HTMLDivElement;
  const dropOverlayPath = document.getElementById('dropOverlayPath') as HTMLElement;
  const pasteImageOverlay = document.getElementById('pasteImageOverlay') as HTMLDivElement;
  const pasteImagePreview = document.getElementById('pasteImagePreview') as HTMLImageElement;
  const quickDocNumber = document.getElementById('quickDocNumber') as HTMLInputElement;
  const docNumber = document.getElementById('docNumber') as HTMLTextAreaElement;
  const docSection = document.getElementById('docSection') as HTMLDivElement;
  const processRevisiBtn = document.getElementById('processRevisiBtn') as HTMLButtonElement;
  const copyRevisiBtn = document.getElementById('copyRevisiBtn') as HTMLButtonElement;
  const revisiResults = document.getElementById('revisiResults') as HTMLTextAreaElement;

  // Terminal state
  let logContent = '> Menghubungkan ke server...\n';
  let hasilContent = 'Belum ada hasil yang diproses.';
  // State gambar yang di-paste
  let pastedImageDataUrl: string | null = null;

  const terminal = bindTerminalTabs(
    'termTabLog',
    'termTabHasil',
    'revisiResults',
    () => logContent,
    () => hasilContent
  );



  const liveLog = (msg: string) => {
    logContent += (logContent ? '\n' : '') + msg;
    terminal.updateView();
    console.log(`[RevisiTool] ${msg}`);
  };

  // â”€â”€â”€ Helper: Deteksi path file PDF â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const isPdfFilePath = (text: string): boolean => {
    const t = text.trim();
    return (
      t.startsWith('file:///') ||
      /^[A-Za-z]:\\/.test(t) ||
      /^\/[^/]/.test(t)
    ) && t.toLowerCase().endsWith('.pdf');
  };

  // â”€â”€â”€ Helper: Show/Hide overlays â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const showDropOverlay = (pathText?: string) => {
    dropOverlay.classList.remove('opacity-0', 'pointer-events-none');
    dropOverlay.classList.add('opacity-100');
    if (dropOverlayPath && pathText) dropOverlayPath.textContent = pathText;
  };

  const hideDropOverlay = () => {
    dropOverlay.classList.add('opacity-0', 'pointer-events-none');
    dropOverlay.classList.remove('opacity-100');
    if (dropOverlayPath) dropOverlayPath.textContent = '';
  };

  // showPasteOverlay dihapus — gambar langsung di-OCR tanpa overlay preview

  const hidePasteOverlay = () => {
    pastedImageDataUrl = null;
    pasteImagePreview.src = '';
    pasteImageOverlay.classList.add('opacity-0', 'pointer-events-none');
    pasteImageOverlay.classList.remove('opacity-100');
  };

  const showLoader = (text = 'MEMPROSES...') => {
    if (docLoaderText) docLoaderText.textContent = text;
    docLoader.classList.remove('opacity-0', 'pointer-events-none');
    docLoader.classList.add('opacity-100');
  };

  const hideLoader = () => {
    docLoader.classList.remove('opacity-100');
    docLoader.classList.add('opacity-0', 'pointer-events-none');
  };

  const setBtnLoading = (text: string) => {
    processRevisiBtn.disabled = true;
    processRevisiBtn.textContent = text;
  };

  const resetBtn = () => {
    processRevisiBtn.disabled = false;
    processRevisiBtn.textContent = 'Revisi Draft';
  };

  // â”€â”€â”€ Helper: Ekstrak teks dari PDF â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const extractTextFromPdf = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    const LINE_THRESHOLD = 5;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const items = content.items as any[];
      const sortedItems = [...items].sort((a, b) => {
        const yDiff = b.transform[5] - a.transform[5];
        if (Math.abs(yDiff) > LINE_THRESHOLD) return yDiff;
        return a.transform[4] - b.transform[4];
      });

      const lines: string[][] = [];
      let currentLine: string[] = [];
      let lastY: number | null = null;

      for (const item of sortedItems) {
        const y = item.transform[5];
        if (lastY === null || Math.abs(y - lastY) > LINE_THRESHOLD) {
          if (currentLine.length > 0) lines.push(currentLine);
          currentLine = [item.str];
        } else {
          currentLine.push(item.str);
        }
        lastY = y;
      }
      if (currentLine.length > 0) lines.push(currentLine);

      const pageText = lines
        .map(line => line.join(' ').trim())
        .filter(line => line.length > 0)
        .join('\n');

      if (pageNum > 1) fullText += '\n\n';
      fullText += `--- Halaman ${pageNum} dari ${pdf.numPages} ---\n${pageText}`;
    }

    return fullText;
  };

  // ================================================================
  // OCR HELPERS — Kamus EN+ID 687.000+ kata (identik dengan main.py)
  // Kamus di-fetch dari /kamus/ (tersedia di GitHub Pages via public/)
  // ================================================================

  // --- State kamus (lazy-loaded, cached) ---
  let _kamusCache: Set<string> | null = null;
  let _kamusLoading: Promise<Set<string>> | null = null;

  const KATA_KHUSUS_OCR = new Set([
    'phytosanitary','consignment','pallets','pallet','fcl','lcl','others','said',
    'contain','contains','finger','joint','acacia','mangium','brasiliensis','hevea',
    'rubber','rubbers','seal','seals','cargo','cargos','appendix','appendices',
    'certificate','certificates','description','detail','details','container',
    'containers','general','size','sizes','type','types','total','totals','serial',
    'feet','foot','gross','weight','weights','net','kgs','pcs','pieces','solid',
    'solids','wood','woods','name','address','exporter','importer','shipper',
    'consignee','notify','party','vessel','port','loading','discharge','invoice',
    'packing','list','bill','lading','country','origin','destination','quantity',
    'unit','price','amount','marks','numbers','goods','declared','value',
    'ruko','jakarta','timur','barat','utara','selatan','kota','administrasi',
    'daerah','khusus','ibukota','rt','rw','no','jl','jalan','indonesia',
  ]);

  const getKamus = (): Promise<Set<string>> => {
    if (_kamusCache) return Promise.resolve(_kamusCache);
    if (_kamusLoading) return _kamusLoading;
    _kamusLoading = (async () => {
      const set = new Set<string>(KATA_KHUSUS_OCR);
      const PATHS = ['/kamus/kamus_inggris.txt', '/kamus/kamus_indonesia.txt'];
      try {
        liveLog('[KAMUS] Memuat kamus EN+ID (7.6 MB)...');
        const [rEn, rId] = await Promise.all(PATHS.map(p => fetch(p)));
        if (rEn.ok && rId.ok) {
          const [tEn, tId] = await Promise.all([rEn.text(), rId.text()]);
          let n = 0;
          for (const baris of tEn.split('\n')) {
            const w = baris.trim().toLowerCase();
            if (w && w.length >= 2) { set.add(w); n++; }
          }
          liveLog(`[KAMUS] Inggris: ${n.toLocaleString()} kata`);
          let m = 0;
          for (const baris of tId.split('\n')) {
            const w = baris.trim().split(/\s/)[0]?.toLowerCase();
            if (w && w.length >= 2) { set.add(w); m++; }
          }
          liveLog(`[KAMUS] Indonesia: ${m.toLocaleString()} kata. Total: ${set.size.toLocaleString()}`);
        } else {
          liveLog('[KAMUS] File kamus tidak ditemukan, memakai kata khusus saja');
        }
      } catch (e: any) {
        liveLog(`[KAMUS] Gagal memuat: ${e.message}`);
      }
      _kamusCache = set;
      return set;
    })();
    return _kamusLoading;
  };

  // Pre-load kamus di background (sudah setelah getKamus dideklarasikan)
  getKamus().catch(() => {});

  // --- Tabel confusion OCR (sama persis main.py) ---
  const DIGIT_KE_HURUF: Record<string,string[]> = {
    '0':['O','o'],'1':['I','i','l'],'2':['Z','z'],'3':['E','e','B'],
    '4':['A','a'],'5':['S','s','B','b'],'6':['G','g','b'],'7':['T','t','l'],
    '8':['B','b'],'9':['g','q'],
  };
  const HURUF_KE_HURUF: Record<string,string[]> = {
    'l':['I','1'],'I':['l','1'],'O':['0','Q'],'o':['0'],
    'S':['5'],'B':['8','3'],'G':['6'],'Z':['2'],'E':['3'],'A':['4'],'T':['7'],
  };

  function* _kombinasiOcr(arrays: {i:number,h:string}[][]): Generator<{i:number,h:string}[]> {
    if (!arrays.length) { yield []; return; }
    for (const first of arrays[0])
      for (const rest of _kombinasiOcr(arrays.slice(1)))
        yield [first, ...rest];
  }

  const _deteksiKasus = (kata: string) => {
    const h = kata.replace(/[^a-zA-Z]/g,'');
    if (!h) return 'mixed';
    const b = [...h].filter(c=>c===c.toUpperCase()&&/[A-Z]/.test(c)).length;
    const k = [...h].filter(c=>c===c.toLowerCase()&&/[a-z]/.test(c)).length;
    if (b===h.length) return 'upper';
    if (k===h.length) return 'lower';
    if (h[0]===h[0].toUpperCase()&&k>0) return 'title';
    return b>k?'upper':'lower';
  };

  const _terapkanKasus = (kata: string, pola: string) => {
    if (pola==='upper') return kata.toUpperCase();
    if (pola==='lower') return kata.toLowerCase();
    if (pola==='title') return kata[0].toUpperCase()+kata.slice(1).toLowerCase();
    return kata;
  };

  // koreksiKataOcr — identik dengan koreksi_kata() di main.py
  const koreksiKataOcr = (kata: string, skorKepercayaan: number, kamus: Set<string>): string => {
    const prefixM = kata.match(/^([,:.!\-/()+\[\]]+)/);
    const suffixM = kata.match(/([,:.!\-/()+\[\]]+)$/);
    const prefix = prefixM?.[0]??'';
    const suffix = suffixM?.[0]??'';
    const inti = kata.slice(prefix.length, suffix.length?-suffix.length:undefined);
    if (!inti) return kata;

    const polKasus = _deteksiKasus(inti);
    const intiL = inti.toLowerCase();

    if (intiL.length>=3 && !/\d/.test(inti) && kamus.has(intiL))
      return prefix+_terapkanKasus(intiL,polKasus)+suffix;

    const digits = [...inti].map((c,i)=>({c,i})).filter(({c})=>/\d/.test(c));
    const hurufCount = inti.replace(/[^a-zA-Z]/g,'').length;
    if (digits.length>2||hurufCount===0||hurufCount/inti.length<0.5) return kata;

    if (digits.length>0) {
      const subArr = digits.map(({c,i})=>([c,...(DIGIT_KE_HURUF[c]||[])]).map(h=>({i,h})));
      for (const kom of _kombinasiOcr(subArr)) {
        const arr=[...inti]; for(const{i,h}of kom)arr[i]=h;
        const kand=arr.join('').toLowerCase();
        if(kamus.has(kand)) return prefix+_terapkanKasus(kand,polKasus)+suffix;
      }
    }

    if (skorKepercayaan<0.85) {
      const temp=intiL.replace('rn','m');
      if(temp!==intiL&&kamus.has(temp)) return prefix+_terapkanKasus(temp,polKasus)+suffix;
      for(let idx=0;idx<intiL.length;idx++) {
        const huruf=intiL[idx];
        if(HURUF_KE_HURUF[huruf]) {
          for(const pg of HURUF_KE_HURUF[huruf]) {
            const arr=[...intiL]; arr[idx]=pg.toLowerCase();
            const kand=arr.join('');
            if(kamus.has(kand)) return prefix+_terapkanKasus(kand,polKasus)+suffix;
          }
        }
      }
    }
    if(kamus.has(intiL)) return prefix+_terapkanKasus(intiL,polKasus)+suffix;
    return kata;
  };

  // --- Image enhancement: selalu hasilkan grayscale kontras tinggi untuk Tesseract ---
  const enhanceImageForOcr = (dataUrl: string): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Scale ke minimal 1800px agar Tesseract bisa membaca teks kecil
        const scale = Math.max(1, Math.min(4, 1800 / Math.max(img.width, img.height, 1)));
        const W = Math.round(img.width * scale);
        const H = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d')!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, W, H);

        const id = ctx.getImageData(0, 0, W, H);
        const d = id.data;
        const gray = new Uint8Array(W * H);

        // Langkah 1: Konversi ke grayscale dengan luminance standard
        // Teks merah (R=255, G=0, B=0) → gray ≈ 76 (gelap) ✓
        // Teks biru (R=0, G=0, B=255) → gray ≈ 29 (gelap) ✓
        // Background putih (R=255,G=255,B=255) → gray = 255 ✓
        for (let i = 0, p = 0; p < d.length; i++, p += 4) {
          gray[i] = Math.round(d[p] * 0.299 + d[p+1] * 0.587 + d[p+2] * 0.114);
        }

        // Langkah 2: Deteksi apakah background gelap (inverted) → balik
        let darkPixels = 0;
        const sampleStep = Math.max(1, Math.floor(W / 100));
        for (let y = 0; y < H; y += sampleStep)
          for (let x = 0; x < W; x += sampleStep)
            if (gray[y * W + x] < 128) darkPixels++;
        const totalSampled = Math.ceil(H / sampleStep) * Math.ceil(W / sampleStep);
        const isDark = darkPixels / totalSampled > 0.5;

        // Langkah 3: Contrast stretch (histogram normalization)
        let lo = 255, hi = 0;
        for (let i = 0; i < gray.length; i++) { if (gray[i] < lo) lo = gray[i]; if (gray[i] > hi) hi = gray[i]; }
        const range = (hi - lo) || 1;

        // Langkah 4: Tulis kembali ke ImageData sebagai grayscale
        for (let i = 0, p = 0; p < d.length; i++, p += 4) {
          let v = Math.round((gray[i] - lo) / range * 255);
          if (isDark) v = 255 - v; // invert jika background gelap
          d[p] = d[p+1] = d[p+2] = v;
          d[p+3] = 255;
        }
        ctx.putImageData(id, 0, 0);

        // Langkah 5: Unsharp masking untuk gambar buram
        const blurCanvas = document.createElement('canvas');
        blurCanvas.width = W; blurCanvas.height = H;
        const bCtx = blurCanvas.getContext('2d')!;
        bCtx.filter = 'blur(1px)';
        bCtx.drawImage(canvas, 0, 0);
        const blurData = bCtx.getImageData(0, 0, W, H).data;
        const sharp2 = ctx.getImageData(0, 0, W, H);
        const sd = sharp2.data;
        for (let p = 0; p < sd.length; p += 4) {
          const v = Math.min(255, Math.max(0, Math.round(1.8 * sd[p] - 0.8 * blurData[p])));
          sd[p] = sd[p+1] = sd[p+2] = v;
        }
        ctx.putImageData(sharp2, 0, 0);

        // ─── Hapus border gelap (misalnya kotak merah → hitam setelah enhance) ───
        // Border akan membingungkan Tesseract dalam deteksi blok/paragraf
        const finalId = ctx.getImageData(0, 0, W, H);
        const fd = finalId.data;
        const DARK_TH2 = 128;
        const BRD_PCT = 0.6; // kolom/baris >60% gelap = bagian border

        const colDarkFn = (cx: number) => {
          let cnt = 0;
          for (let cy = 0; cy < H; cy++) if (fd[(cy * W + cx) * 4] < DARK_TH2) cnt++;
          return cnt / H > BRD_PCT;
        };
        const rowDarkFn = (ry: number) => {
          let cnt = 0;
          for (let cx = 0; cx < W; cx++) if (fd[(ry * W + cx) * 4] < DARK_TH2) cnt++;
          return cnt / W > BRD_PCT;
        };

        let cL = 0, cR = W - 1, cT = 0, cB = H - 1;
        while (cL < W - 1 && colDarkFn(cL)) cL++;
        while (cR > 0 && colDarkFn(cR)) cR--;
        while (cT < H - 1 && rowDarkFn(cT)) cT++;
        while (cB > 0 && rowDarkFn(cB)) cB--;

        if (cL > 0 || cR < W - 1 || cT > 0 || cB < H - 1) {
          const mg = 10;
          const contentW = cR - cL + 1;
          const contentH = cB - cT + 1;
          // Safety: hanya crop jika area konten masih cukup besar (min 30% dimensi asli)
          if (contentW > W * 0.3 && contentH > H * 0.3) {
            const bCanvas = document.createElement('canvas');
            bCanvas.width = contentW + mg * 2;
            bCanvas.height = contentH + mg * 2;
            const bCtx2 = bCanvas.getContext('2d')!;
            bCtx2.fillStyle = 'white';
            bCtx2.fillRect(0, 0, bCanvas.width, bCanvas.height);
            bCtx2.drawImage(canvas, cL, cT, contentW, contentH, mg, mg, contentW, contentH);
            liveLog(`[OCR] Border dihapus: (${cL},${cT})→(${cR},${cB}) → ${bCanvas.width}×${bCanvas.height}`);
            resolve(bCanvas.toDataURL('image/png'));
          } else {
            liveLog(`[OCR] Border detection tidak wajar (${contentW}×${contentH}), skip crop`);
            resolve(canvas.toDataURL('image/png'));
          }
        } else {
          liveLog(`[OCR] Enhance selesai (${isDark ? 'dark-bg' : 'light-bg'}, scale=${scale.toFixed(1)}×)`);
          resolve(canvas.toDataURL('image/png'));
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });


  // ─── runOcrOnImage: Pipeline OCR ─────────────────────────────────────────
  // Tier 1: PaddleOCR Python (lokal)               ⭐⭐⭐⭐⭐
  // Tier 2: Gemini Vision API (jika key tersimpan)  ⭐⭐⭐⭐⭐
  // Tier 3: Hybrid Tesseract-layout + TrOCR/baris  ⭐⭐⭐⭐
  //         (cara kerja sama seperti PaddleOCR: detect baris → baca per baris)
  const runOcrOnImage = async (dataUrl: string): Promise<string> => {

    // ── TIER 1: PaddleOCR Python (hanya saat npm run dev lokal) ───────────
    try {
      if (docLoaderText) docLoaderText.textContent = 'OCR...';
      liveLog('[OCR] Mencoba PaddleOCR Python lokal...');
      terminal.updateView();
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 3000);
      const resp = await fetch('/api/ocr-image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data_url: dataUrl }), signal: ctrl.signal,
      });
      clearTimeout(tid);
      const json = await resp.json();
      if (!resp.ok || json.error) throw new Error(json.error || `HTTP ${resp.status}`);
      liveLog(`[OCR] PaddleOCR berhasil! Baris: ${json.total_lines}`);
      return (json.text as string) || '';
    } catch {
      liveLog('[OCR] PaddleOCR tidak tersedia → lanjut browser OCR...');
    }

    // ── TIER 2: Gemini Vision API (jika key sudah tersimpan, tanpa prompt) ─
    const geminiKey = localStorage.getItem('barantin_gemini_api_key') || '';
    if (geminiKey) {
      try {
        liveLog('[OCR] Gemini Vision API...');
        if (docLoaderText) docLoaderText.textContent = 'Gemini OCR...';
        const enhanced = await enhanceImageForOcr(dataUrl);
        const b64 = enhanced.split(',')[1];
        const mime = enhanced.split(';')[0].split(':')[1] || 'image/png';
        const gr = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [
              { text: 'Ekstrak SEMUA teks dari gambar ini PERSIS seperti yang tertulis. Pertahankan baris baru. Hanya kembalikan teks.' },
              { inline_data: { mime_type: mime, data: b64 } }
            ]}], generationConfig: { temperature: 0, maxOutputTokens: 4096 } }) }
        );
        const gj = await gr.json();
        if (!gr.ok) { if (gr.status === 401 || gr.status === 403) localStorage.removeItem('barantin_gemini_api_key'); throw new Error(gj.error?.message); }
        const gt: string = gj.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!gt.trim()) throw new Error('empty');
        liveLog(`[OCR] Gemini berhasil! Karakter: ${gt.length}`);
        const km = await getKamus();
        return gt.split('\n').filter(l => l.trim()).map(l =>
          l.trim().split(' ').map((w: string) => w ? koreksiKataOcr(w, 0.95, km) : w).join(' ')
        ).join('\n');
      } catch (e: any) {
        liveLog(`[OCR] Gemini gagal: ${e?.message} → browser OCR...`);
      }
    }

    // ── TIER 3: Hybrid Tesseract-layout + TrOCR per baris ─────────────────
    // CARA KERJA: Identik dengan PaddleOCR
    //   Step 1 → Detect posisi tiap baris teks (Tesseract layout mode)
    //   Step 2 → Crop tiap baris
    //   Step 3 → Baca teks tiap baris dengan TrOCR neural network
    //   Step 4 → Koreksi kamus 687K kata
    liveLog('[OCR] [1/4] Memuat kamus 687K kata...');
    const kamus = await getKamus();
    liveLog(`[OCR] Kamus: ${kamus.size.toLocaleString()} kata`);

    liveLog('[OCR] [2/4] Preprocessing gambar (CLAHE + Unsharp Masking)...');
    const processedUrl = await enhanceImageForOcr(dataUrl);

    // Step 1: Tesseract PSM 3 — setelah border dihapus di enhance, deteksi lebih akurat
    liveLog('[OCR] [3/4] Tesseract PSM 3 — mendeteksi baris & paragraf...');
    if (docLoaderText) docLoaderText.textContent = 'Mendeteksi baris...';
    const Tesseract = await import('tesseract.js');
    const layoutWorker = await Tesseract.createWorker(['eng', 'ind'], 1, {
      logger: (m: any) => {
        if (m.status === 'recognizing text' && docLoaderText)
          docLoaderText.textContent = `Layout ${Math.round((m.progress||0)*100)}%...`;
      }
    });
    await layoutWorker.setParameters({ tessedit_pageseg_mode: '3' } as any);
    const { data: layoutData } = await layoutWorker.recognize(processedUrl);
    await layoutWorker.terminate();

    // Ambil semua lines dengan bbox, sort by y (untuk TrOCR crop)
    const allLines = (layoutData as any).lines as any[] || [];
    const textLines = allLines
      .filter((l: any) => l.text?.trim() && l.bbox)
      .sort((a: any, b: any) => (a.bbox.y0 || 0) - (b.bbox.y0 || 0));

    liveLog(`[OCR] Terdeteksi ${textLines.length} baris teks`);

    if (textLines.length === 0) {
      liveLog('[OCR] Tesseract tidak menemukan baris → fallback langsung');
      return (layoutData.text || '').split('\n').map((l: string) =>
        l.trim() ? l.trim().split(' ').map((w: string) => w ? koreksiKataOcr(w, 0.8, kamus) : w).join(' ') : ''
      ).join('\n');
    }

    // ─── Whole-row pixel scan untuk blank line detection ──────────────────────
    // Scan SETIAP baris piksel processedUrl (bukan gap bbox Tesseract)
    // Baris "putih" = tidak ada teks → kumpulan baris putih yang lebar = blank line visual
    const scanCvs = document.createElement('canvas');
    const scanCx = scanCvs.getContext('2d')!;
    const scanI = new Image();
    scanI.src = processedUrl;
    await new Promise<void>(r => { scanI.onload = () => r(); scanI.onerror = () => r(); });
    const SW = scanI.width, SH = scanI.height;
    scanCvs.width = SW; scanCvs.height = SH;
    scanCx.drawImage(scanI, 0, 0);
    const px = scanCx.getImageData(0, 0, SW, SH).data;

    // Hitung piksel gelap per baris (inner 80%)
    const xS = Math.floor(SW * 0.1), xE = Math.ceil(SW * 0.9);
    const pxSt = Math.max(1, Math.floor((xE - xS) / 120));
    const totalPerRow = Math.ceil((xE - xS) / pxSt);
    const DARK_TH3 = 190; // piksel < 190 = gelap (teks)
    const MIN_DARK = 0.005; // baris dengan > 0.5% dark = baris teks

    const isTextRow = new Uint8Array(SH);
    for (let y = 0; y < SH; y++) {
      let dark = 0;
      for (let x = xS; x < xE; x += pxSt) {
        if (px[(y * SW + x) * 4] < DARK_TH3) dark++;
      }
      isTextRow[y] = (dark / totalPerRow) > MIN_DARK ? 1 : 0;
    }

    // Temukan "white run" = rentang baris putih berurutan
    interface WRun { y0: number; y1: number; h: number; }
    const whiteRuns: WRun[] = [];
    let wInRun = false, wStart = 0;
    for (let y = 0; y < SH; y++) {
      if (!isTextRow[y]) {
        if (!wInRun) { wInRun = true; wStart = y; }
      } else {
        if (wInRun) { wInRun = false; whiteRuns.push({ y0: wStart, y1: y - 1, h: y - wStart }); }
      }
    }
    if (wInRun) whiteRuns.push({ y0: wStart, y1: SH - 1, h: SH - wStart });

    // Hitung avgLineHeight dari Tesseract bbox
    const avgLH = textLines.reduce((s: number, l: any) =>
      s + ((l.bbox.y1 || 0) - (l.bbox.y0 || 0)), 0) / (textLines.length || 1);
    const minBlankH = avgLH * 0.4; // blank run >= 40% tinggi baris = blank line
    const sigRuns = whiteRuns.filter(r => r.h >= minBlankH);
    liveLog(`[SCAN] avgLH=${avgLH.toFixed(0)}px minBlankH=${minBlankH.toFixed(0)}px img=${SW}×${SH}`);
    liveLog(`[SCAN] White runs: ${whiteRuns.length} total, ${sigRuns.length} significant (h>=${minBlankH.toFixed(0)})`);

    // Bangun orderedItems
    interface LineItem { isBlank: boolean; text: string; bbox: any; conf: number; }
    const orderedItems: LineItem[] = [];
    if (textLines.length === 0) {
      liveLog('[OCR] textLines kosong setelah scan → fallback');
      return (layoutData.text || '').split('\n').map((l: string) =>
        l.trim() ? l.trim() : ''
      ).join('\n');
    }
    orderedItems.push({ isBlank: false, text: textLines[0].text.trim(), bbox: textLines[0].bbox, conf: (textLines[0].confidence || 0) / 100 });

    for (let i = 1; i < textLines.length; i++) {
      const prevY1: number = textLines[i - 1].bbox.y1 || 0;
      const currY0: number = textLines[i].bbox.y0 || 0;
      const hasBlank = sigRuns.some((r: WRun) => {
        const center = (r.y0 + r.y1) / 2;
        return center > (prevY1 - avgLH * 0.1) && center < (currY0 + avgLH * 0.1);
      });
      liveLog(`[LINE] "${textLines[i-1].text.trim().substring(0,12)}"→"${textLines[i].text.trim().substring(0,12)}" gap=${(currY0-prevY1).toFixed(0)}${hasBlank ? ' BLANK✓' : ''}`);
      if (hasBlank) orderedItems.push({ isBlank: true, text: '', bbox: null, conf: 0 });
      orderedItems.push({ isBlank: false, text: textLines[i].text.trim(), bbox: textLines[i].bbox, conf: (textLines[i].confidence || 0) / 100 });
    }

    const allLineCount = textLines.length;
    const blankCount = orderedItems.filter((i: LineItem) => i.isBlank).length;
    liveLog(`[OCR] Struktur: ${allLineCount} baris + ${blankCount} blank`);

    if (allLineCount === 0) {
      return (layoutData.text || '').split('\n').map((l: string) =>
        l.trim() ? l.trim().split(' ').map((w: string) => w ? koreksiKataOcr(w, 0.8, kamus) : w).join(' ') : ''
      ).join('\n');
    }


    // Step 2: Load TrOCR model
    liveLog('[OCR] [4/4] Memuat TrOCR neural network (Microsoft)...');
    liveLog('[OCR] Pertama kali: download ~340MB dari HuggingFace (tersimpan di cache)');
    if (docLoaderText) docLoaderText.textContent = 'Memuat model TrOCR...';
    terminal.updateView();

    let trocr: any = null;
    try {
      const { pipeline, env } = await import('@huggingface/transformers');
      (env as any).allowRemoteModels = true;
      (env as any).useBrowserCache = true;
      trocr = await (pipeline as any)('image-to-text', 'Xenova/trocr-base-printed', {
        progress_callback: (info: any) => {
          if (info.status === 'downloading') {
            const pct = info.total > 0 ? Math.round((info.loaded / info.total) * 100) : 0;
            if (docLoaderText) docLoaderText.textContent = `Download TrOCR ${pct}%...`;
            if (pct % 10 === 0) { liveLog(`[OCR] Download TrOCR: ${pct}%`); terminal.updateView(); }
          }
        },
      });
      liveLog('[OCR] TrOCR model siap ✓');
    } catch (err: any) {
      liveLog(`[OCR] TrOCR gagal: ${err?.message} → fallback Tesseract`);
      return (layoutData.text || '').split('\n').map((l: string) =>
        l.trim() ? l.trim().split(' ').map((w: string) => w ? koreksiKataOcr(w, 0.8, kamus) : w).join(' ') : ''
      ).join('\n');
    }

    // Step 3: Proses setiap item dengan TrOCR
    liveLog('[OCR] Membaca teks per baris dengan TrOCR...');
    const img = new Image();
    img.src = processedUrl;
    await new Promise<void>(r => { img.onload = () => r(); img.onerror = () => r(); });

    const cropCanvas = document.createElement('canvas');
    const cropCtx = cropCanvas.getContext('2d')!;
    const resultLines: string[] = [];
    let processedCount = 0;

    for (const item of orderedItems) {
      if (item.isBlank) { resultLines.push(''); continue; }

      const bbox = item.bbox;
      const pad = 6;
      const x = Math.max(0, (bbox.x0 || 0) - pad);
      const y = Math.max(0, (bbox.y0 || 0) - pad);
      const w = Math.min(img.width, (bbox.x1 || img.width) + pad) - x;
      const h = Math.min(img.height, (bbox.y1 || img.height) + pad) - y;

      if (w < 20 || h < 8) {
        const corrected = item.text.split(' ').map((w2: string) => w2 ? koreksiKataOcr(w2, item.conf, kamus) : w2).join(' ');
        resultLines.push(corrected);
        processedCount++;
        continue;
      }

      cropCanvas.width = w; cropCanvas.height = h;
      cropCtx.fillStyle = 'white';
      cropCtx.fillRect(0, 0, w, h);
      cropCtx.drawImage(img, x, y, w, h, 0, 0, w, h);
      const lineDataUrl = cropCanvas.toDataURL('image/png');

      try {
        const res = await trocr(lineDataUrl, { max_new_tokens: 200 });
        const lineText: string = Array.isArray(res) ? (res[0]?.generated_text || '') : (res?.generated_text || '');
        const finalText = lineText.trim() || item.text;
        const skor = lineText.trim() ? 0.9 : item.conf;
        const corrected = finalText.split(' ').map((w2: string) => w2 ? koreksiKataOcr(w2, skor, kamus) : w2).join(' ');
        resultLines.push(corrected);
      } catch {
        const corrected = item.text.split(' ').map((w2: string) => w2 ? koreksiKataOcr(w2, item.conf, kamus) : w2).join(' ');
        resultLines.push(corrected);
      }

      processedCount++;
      if (processedCount % 5 === 0 || processedCount === allLineCount) {
        const pct = Math.round((processedCount / allLineCount) * 100);
        liveLog(`[OCR] Baris ${processedCount}/${allLineCount} (${pct}%)`);
        if (docLoaderText) docLoaderText.textContent = `TrOCR baris ${processedCount}/${allLineCount}...`;
        terminal.updateView();
      }
    }

    // Step 4: Post-processing — perbaiki error OCR umum
    // Pola: HURUF_BESAR ; angka/teks → ganti ; dengan : (misal: "TEL ; 0093..." → "TEL : 0093...")
    const fixedLines = resultLines.map(line => {
      // Label seperti "TEL ; 1234" atau "FAX ; text" → "TEL : 1234"
      return line.replace(/\b([A-Z]{2,})\s*;\s*/g, '$1 : ');
    });

    const hasil = fixedLines.join('\n');
    liveLog(`[OCR] ✓ Selesai. Baris: ${resultLines.length} (termasuk baris kosong), Karakter: ${hasil.length}`);
    return hasil;
  };



  // Saat gambar di-paste: langsung jalankan OCR, hasil masuk ke docNumber
  let _isOcrResult = false; // flag agar input handler tidak format ulang teks OCR
  const runOcrFromPaste = async (dataUrl: string) => {
    revisiResults.classList.remove('text-red-500');
    terminal.switchTab('log');
    setBtnLoading('OCR...');
    showLoader('OCR...');
    logContent = '';
    liveLog('[MULAI] Gambar di-paste → menjalankan OCR otomatis...');

    try {
      const rawText = await runOcrOnImage(dataUrl);
      liveLog(`[SELESAI] OCR selesai. Karakter: ${rawText.length}`);
      // Masukkan hasil OCR ke kotak besar — TANPA trigger auto-formatter
      if (docNumber) {
        _isOcrResult = true;          // skip KT auto-format
        docNumber.value = rawText.trim();
        _isOcrResult = false;
        docNumber.focus();
        // Posisikan kursor di akhir teks
        docNumber.setSelectionRange(docNumber.value.length, docNumber.value.length);
      }
      hidePasteOverlay();
    } catch (err: any) {
      liveLog(`[ERROR] OCR gagal: ${err.message}`);
      revisiResults.classList.add('text-red-500');
    } finally {
      resetBtn();
      hideLoader();
    }
  };


  document.addEventListener('paste', (e: ClipboardEvent) => {
    // Hanya aktif jika fokus di area revisi (atau tidak ada elemen lain aktif)
    const active = document.activeElement;
    const isInRevisi = !active || active === docNumber || active === document.body || docSection.contains(active);
    if (!isInRevisi) return;

    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const blob = item.getAsFile();
        if (!blob) continue;

        const reader = new FileReader();
        reader.onload = (ev) => {
          const dataUrl = ev.target?.result as string;
          if (dataUrl) {
            pastedImageDataUrl = dataUrl;
            // Langsung jalankan OCR — tidak perlu klik tombol
            runOcrFromPaste(dataUrl);
          }
        };
        reader.readAsDataURL(blob);
        break;
      }
    }
  });

  // ─── Drag & Drop PDF ke docSection ────────────────────────────────────────
  if (docSection) {
    docSection.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
      showDropOverlay('Lepaskan file PDF di sini...');
    });

    docSection.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!docSection.contains(e.relatedTarget as Node)) {
        const currentVal = docNumber?.value?.trim() || '';
        if (!isPdfFilePath(currentVal)) hideDropOverlay();
      }
    });

    docSection.addEventListener('drop', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      hideDropOverlay();

      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!(file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
        liveLog(`[ERROR] File yang di-drop bukan PDF: ${file.name}`);
        return;
      }

      setBtnLoading('Memproses...');
      showLoader('Membaca PDF...');
      logContent = '';
      liveLog(`[MULAI] Membaca file PDF (drop): ${file.name}`);
      liveLog(`[INFO] Ukuran: ${(file.size / 1024).toFixed(1)} KB`);

      try {
        const arrayBuffer = await file.arrayBuffer();
        liveLog(`[STEP 1] File dibaca ke memori`);
        liveLog(`[STEP 2] Mengekstrak teks dari PDF...`);
        const fullText = await extractTextFromPdf(arrayBuffer);
        liveLog(`[STEP 3] Selesai. Total karakter: ${fullText.length}`);
        hasilContent = `=== FILE: ${file.name} ===\n\n${fullText.trim()}`;
        terminal.switchTab('hasil');
        if (docNumber) docNumber.value = '';
      } catch (err: any) {
        liveLog(`[ERROR] Gagal membaca PDF: ${err.message}`);
      } finally {
        resetBtn();
        hideLoader();
      }
    });
  }

  // ─── Deteksi path file:/// di textarea ────────────────────────────────────
  if (docNumber) {
    docNumber.addEventListener('input', () => {
      const val = docNumber.value.trim();
      if (isPdfFilePath(val)) {
        hidePasteOverlay();
        showDropOverlay(val);
      } else {
        hideDropOverlay();
      }
    });

    docNumber.addEventListener('paste', () => {
      setTimeout(() => {
        const val = docNumber.value.trim();
        if (isPdfFilePath(val)) {
          hidePasteOverlay();
          showDropOverlay(val);
        }
      }, 50);
    });
  }

  // ─── Quick NO KT ──────────────────────────────────────────────────────────
  if (quickDocNumber && docNumber) {
    quickDocNumber.addEventListener('focus', () => { quickDocNumber.placeholder = ''; });
    quickDocNumber.addEventListener('blur', () => { quickDocNumber.placeholder = 'NO KT'; });

    let quickDebounceTimer: ReturnType<typeof setTimeout>;
    let lastRawVal = '';

    quickDocNumber.addEventListener('input', () => {
      const raw = quickDocNumber.value.trim();
      if (raw === lastRawVal) return;
      lastRawVal = raw;
      clearTimeout(quickDebounceTimer);
      if (raw.length === 0) return;

      quickDebounceTimer = setTimeout(() => {
        const digits = raw.replace(/\D/g, '');
        if (digits.length >= 3 && digits.length <= 6) {
          const formatted = `2026-T1.0-3200.2-K.1.1-${digits.padStart(6, '0')}`;
          docNumber.value = formatted;
          hideDropOverlay();
          hidePasteOverlay();
        }
      }, 400);
    });

    quickDocNumber.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const raw = quickDocNumber.value.trim();
        const digits = raw.replace(/\D/g, '');
        if (digits.length >= 3 && digits.length <= 6) {
          const formatted = `2026-T1.0-3200.2-K.1.1-${digits.padStart(6, '0')}`;
          docNumber.value = formatted;
          hideDropOverlay();
          hidePasteOverlay();
          processRevisiBtn.click();
        }
      }
    });

    let debounceTimer: ReturnType<typeof setTimeout>;

    docNumber.addEventListener('input', () => {
      if (_isOcrResult) return; // jangan format ulang hasil OCR
      clearTimeout(debounceTimer);
      const rawNumber = docNumber.value;
      if (isPdfFilePath(rawNumber.trim())) return;

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
          showLoader();
          setTimeout(() => { docNumber.value = cleaned; hideLoader(); }, 600);
        }
      } else {
        debounceTimer = setTimeout(() => {
          const currentVal = docNumber.value;
          if (isPdfFilePath(currentVal.trim())) return;
          const digitGroups = currentVal.match(/\b\d{3,6}\b/g);
          if (digitGroups && digitGroups.length > 0) {
            const formatted = digitGroups.map(g => `2026-T1.0-3200.2-K.1.1-${g.padStart(6, '0')}`);
            showLoader();
            setTimeout(() => { docNumber.value = formatted.join('\n'); hideLoader(); }, 600);
          }
        }, 800);
      }
    });

    docNumber.addEventListener('change', () => {
      if (_isOcrResult) return; // jangan format ulang hasil OCR
      clearTimeout(debounceTimer);
      const rawNumber = docNumber.value;
      if (isPdfFilePath(rawNumber.trim())) return;
      const regex = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
      if (!regex.test(rawNumber)) {
        const digitGroups = rawNumber.match(/\b\d{3,6}\b/g);
        if (digitGroups && digitGroups.length > 0) {
          const formatted = digitGroups.map(g => `2026-T1.0-3200.2-K.1.1-${g.padStart(6, '0')}`);
          showLoader();
          setTimeout(() => { docNumber.value = formatted.join('\n'); hideLoader(); }, 600);
        }
      }
    });
  }

  // â”€â”€â”€ Tombol Revisi Draft â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (processRevisiBtn) {
    processRevisiBtn.addEventListener('click', async () => {

      // â”€â”€ KASUS 1: Ada gambar yang di-paste â†’ OCR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      if (pastedImageDataUrl) {
        revisiResults.classList.remove('text-red-500');
        terminal.switchTab('log');
        setBtnLoading('Memproses OCR...');
        showLoader('OCR 0%...');
        logContent = '';
        liveLog(`[MULAI] Membaca teks dari gambar (OCR)...`);
        liveLog(`[INFO] Menggunakan PaddleOCR (lokal) / Tesseract+Kamus 687K (GitHub Pages)`);

        try {
          const imageDataUrl = pastedImageDataUrl;
          const rawText = await runOcrOnImage(imageDataUrl);
          liveLog(`[SELESAI] OCR selesai. Total karakter: ${rawText.length}`);
          hasilContent = `=== HASIL OCR GAMBAR ===\n\n${rawText.trim()}`;
          terminal.switchTab('hasil');
          hidePasteOverlay();
        } catch (err: any) {
          liveLog(`[ERROR] OCR gagal: ${err.message}`);
          revisiResults.classList.add('text-red-500');
        } finally {
          resetBtn();
          hideLoader();
        }
        return;
      }

      // â”€â”€ KASUS 2: Input path PDF â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      const rawDoc = docNumber?.value?.trim() || '';

      if (!rawDoc) {
        revisiResults.classList.add('text-red-500');
        liveLog(`[ERROR] Silakan masukkan No KT, path file PDF, atau paste gambar screenshot.`);
        terminal.updateView();
        return;
      }

      if (isPdfFilePath(rawDoc)) {
        revisiResults.classList.remove('text-red-500');
        terminal.switchTab('log');
        setBtnLoading('Memproses...');
        showLoader('Membaca PDF...');
        logContent = '';

        const displayPath = decodeURIComponent(rawDoc.trim());
        liveLog(`[MULAI] Membaca PDF dari path:`);
        liveLog(`        ${displayPath}`);
        liveLog(`[INFO] Mengambil file via server lokal...`);

        try {
          const apiUrl = `/api/local-file?path=${encodeURIComponent(rawDoc.trim())}`;
          const response = await fetch(apiUrl);
          const json = await response.json();

          if (!json.ok) throw new Error(json.error || `HTTP ${response.status}`);

          // Decode base64 â†’ ArrayBuffer (bypass IDM)
          const binaryStr = atob(json.data);
          const bytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
          const arrayBuffer = bytes.buffer;

          liveLog(`[STEP 1] File berhasil diambil (${(json.size / 1024).toFixed(1)} KB)`);
          liveLog(`[STEP 2] Mengekstrak teks dari PDF...`);

          const fullText = await extractTextFromPdf(arrayBuffer);

          liveLog(`[STEP 3] Ekstraksi selesai. Total karakter: ${fullText.length}`);
          liveLog(`[SELESAI] Teks PDF berhasil diekstrak.`);

          const fileName = decodeURIComponent(rawDoc.trim().split(/[/\\]/).pop() || 'dokumen.pdf');
          hasilContent = `=== FILE: ${fileName} ===\n\n${fullText.trim()}`;
          terminal.switchTab('hasil');

          if (docNumber) docNumber.value = '';
          hideDropOverlay();
        } catch (err: any) {
          liveLog(`[ERROR] Gagal membaca file: ${err.message}`);
          liveLog(`[PETUNJUK] Pastikan server lokal (npm run dev) sedang berjalan.`);
          liveLog(`[PETUNJUK] Atau drag & drop file PDF ke area input.`);
          revisiResults.classList.add('text-red-500');
          showDropOverlay(decodeURIComponent(rawDoc.trim()));
        } finally {
          resetBtn();
          hideLoader();
        }
        return;
      }

      // â”€â”€ KASUS 3: Nomor KT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      revisiResults.classList.remove('text-red-500');
      liveLog(`[INFO] Memformat nomor KT...`);
      terminal.updateView();

      let formattedDoc = rawDoc;
      const regex = /2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi;
      if (!regex.test(rawDoc)) {
        const digitGroups = rawDoc.match(/\b\d{3,6}\b/g);
        if (digitGroups && digitGroups.length > 0) {
          const formatted = digitGroups.map(g => `2026-T1.0-3200.2-K.1.1-${g.padStart(6, '0')}`);
          formattedDoc = formatted.join('\n');
        }
      }

      if (docNumber) docNumber.value = formattedDoc;
      hasilContent = `Nomor KT Hasil Revisi:\n${formattedDoc}\n\nDone`;
      liveLog(`[SELESAI] Format selesai. Buka tab 'Hasil' untuk melihat.`);
      terminal.switchTab('hasil');
    });
  }

  // â”€â”€â”€ Tombol Copy â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

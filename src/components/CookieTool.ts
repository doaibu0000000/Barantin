let savedInput = '';
let savedLogContent = '> Menghubungkan ke server...\n';
let savedHasilContent = 'Belum ada hasil yang diproses.';
let savedActiveTab = 'log';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Bersihkan nama perusahaan dari duplikat prefix "PT. PT." -> "PT."
const cleanCompanyName = (name: string): string => {
  if (!name) return '';
  // Hapus duplikat "PT. PT." berulang -> "PT."
  let cleaned = name.replace(/^(PT\.\s*)+/i, 'PT. ').trim();
  // Hapus duplikat "CV. CV." berulang -> "CV."
  cleaned = cleaned.replace(/^(CV\.\s*)+/i, 'CV. ').trim();
  return cleaned;
};

const buildPtkPayload = (data: any, xmlObj: any, userData: any, existingPtkId: string = '') => {
  const dok = xmlObj?.DOKUMEN || {};
  const header = dok.HEADER || {};
  const perus = header.PERUSAHAAN || {};
  const pjawab = perus.PJAWAB || {};
  const pengirim = header.PENGIRIM || {};
  const penerima = header.PEMASOK || header.PENERIMA || {};
  const ga = dok.GA?.KARANTINA || {};
  const instalasi = ga.INSTALASI || {};
  const pemeriksa = ga.PEMERIKSAAN || {};
  
  const komoditiArr = (dok.ITEMS?.BARANG || []).map((b: any) => ({
    id: uuidv4(),
    ptk_id: "",
    kode_hs: b.KDHS || "",
    kode_hs10: b.KDHS10 || "",
    klasifikasi_id: b.GA?.KARANTINA?.KLASIFIKASI || "2C0",
    komoditas_id: b.GA?.KARANTINA?.ID_KOMODITI || "1149",
    nama_umum_tercetak: b.URAIAN || "",
    nama_latin_tercetak: b.GA?.KARANTINA?.NMLATIN || "",
    jenisMp: "Non Benih",
    jenisMpId: 5,
    bentukMp: b.GA?.KARANTINA?.KLASIFIKASI || "2C0",
    negaraAsalMp: b.NEGASALBRG || "ID",
    jantan: null,
    betina: null,
    negaraAsalMpId: 99,
    volume_netto: parseFloat(b.NETTO) || 0,
    volume_bruto: parseFloat(b.BRUTO) || 0,
    satuan_bruto_id: "1356",
    satuan_netto_id: "1356",
    keterangan: "",
    sat_tercetak_netto: b.JNSSATUAN || "KGM",
    volume_lain: parseFloat(b.JMLSATUAN) || 0,
    satuan_lain_id: 1356,
    sat_tercetak_lain: b.JNSSATUAN || "KGM",
    jumlah_kemasan: parseFloat(b.JMLKEMAS) || 0,
    kemasan_id: 2,
    kemasan: b.JNSKEMAS || "BG",
    mata_uang: b.KURS?.KODE || "USD",
    kurs: parseFloat(b.KURS?.NILAI) || 15000,
    harga: parseFloat(b.HARGA) || 0,
    harga_rp: (parseFloat(b.HARGA) || 0) * (parseFloat(b.KURS?.NILAI) || 15000) * (parseFloat(b.JMLSATUAN) || 0)
  }));
  
  const kontainerArr = (dok.CONTLIST?.CONT || []).map((c: any) => ({
    id: uuidv4(),
    ptk_id: "",
    nomor: c.NOCONT || "xxxxxx",
    size: (c.UKCONT || "20") + " feet",
    ukuran_kontainer_id: "2",
    stuff_kontainer_id: "1",
    stuff: c.TPCONT || "FCL",
    segel: c.NOSEAL || "",
    tipe_kontainer_id: "1"
  }));
  
  const dokumenArr = (dok.DOKUMENLAMPIRAN?.DOK || []).map((d: any) => ({
    id: uuidv4(),
    ptk_id: "",
    jenis_dokumen_id: d.JENIS || "99",
    jenisDokumenUraian: "Lainnya",
    kategori_dokumen: "S",
    no_dokumen: d.NOMOR || "",
    instansi_penerbit: "",
    tanggal_dokumen: d.TANGGAL ? d.TANGGAL.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : "",
    negara_asal_id: "99",
    negaraAsalDokumen: d.NEGPENERBIT || "ID",
    kota_kab_asal_id: "",
    keterangan: "",
    efile: d.FILELINK || ""
  }));

  const ptkUuid = existingPtkId || uuidv4();
  komoditiArr.forEach((k: any) => k.ptk_id = ptkUuid);
  kontainerArr.forEach((c: any) => c.ptk_id = ptkUuid);
  dokumenArr.forEach((d: any) => d.ptk_id = ptkUuid);

  return {
    id: ptkUuid,
    tssm_id: data.id,
    no_aju: data.noReg || data.noAju,
    jenis_dokumen: "PTK",
    jenis_karantina: data.jenis_karantina === 'Tumbuhan' ? 'T' : (data.jenis_karantina === 'Hewan' ? 'H' : 'I'),
    jenis_media_pembawa_id: "5",
    stat_pemohon: "PEMILIK",
    is_guest: "0",
    user_id: userData?.id || "3267",
    pengguna_jasa_id: userData?.pengguna_jasa_id || "9e7347a8-ea62-4aee-899e-ea7087949eb7",
    calo_id: "0",
    upt_id: '3200',        // UPT Bandung
    kode_satpel: '3200',   // Server menentukan suffix .2 dari posLayanan secara internal
    nama_pemohon: cleanCompanyName(perus.NAMA || data.nmPerusahaan),
    jenis_identitas_pemohon: "NPWP",
    nomor_identitas_pemohon: perus.ID || data.npwp,
    alamat_pemohon: perus.ALAMAT || "",
    telepon_pemohon: "0",
    fax_pemohon: "0",
    provinsi_pemohon_id: "33",
    kota_kab_pemohon_id: "3328",
    nama_cp: pjawab.NAMA || "",
    alamat_cp: pjawab.ALAMAT || "",
    telepon_cp: pjawab.EMAIL || "",
    nama_ttd: pjawab.NAMA || "",
    jenis_identitas_ttd: "LAINNYA",
    nomor_identitas_ttd: perus.ID || data.npwp,
    jabatan_ttd: pjawab.JABATAN || "DIREKTUR",
    alamat_ttd: pjawab.ALAMAT || "",
    jenis_permohonan: data.jnsAju === 'EKSPOR' ? 'EX' : (data.jnsAju === 'IMPOR' ? 'IM' : 'DP'),
    nama_pengirim: cleanCompanyName(pengirim.NMPENGIRIM || perus.NAMA || ""),
    alamat_pengirim: pengirim.ALPENGIRIM || perus.ALAMAT || "",
    telepon_pengirim: "0",
    jenis_identitas_pengirim: "NPWP",
    nomor_identitas_pengirim: perus.ID || data.npwp,
    provinsi_pengirim_id: "33",
    kota_kab_pengirim_id: "3328",
    negara_pengirim_id: "99",
    nama_penerima: penerima.NMPEMASOK || penerima.NMPENERIMA || "",
    alamat_penerima: penerima.ALPEMASOK || penerima.ALAMAT || "",
    telepon_penerima: "",
    jenis_identitas_penerima: "LAINNYA",
    nomor_identitas_penerima: "",
    provinsi_penerima_id: "",
    kota_kab_penerima_id: "",
    negara_penerima_id: "186",
    is_from_ptk: "2",
    tanggal_rencana_masuk: "",
    negara_muat_id: "99",
    negara_bongkar_id: "186",
    negara_transit_id: "",
    pelabuhan_muat_id: "134",
    pelabuhan_bongkar_id: "53427",
    moda_alat_angkut_transit_id: "0",
    tipe_alat_angkut_transit_id: "",
    nama_alat_angkut_transit: "",
    bendera_alat_angkut_transit_id: "0",
    no_voyage_transit: "",
    call_sign_transit: "NIHIL",
    tanggal_rencana_tiba_transit: "",
    tanggal_rencana_berangkat_transit: "",
    moda_alat_angkut_terakhir_id: 1,
    moda_alat_angkut_lainnya: "",
    tipe_alat_angkut_terakhir_id: "3",
    nama_alat_angkut_terakhir: "-",
    bendera_alat_angkut_terakhir_id: "186",
    no_voyage_terakhir: "-",
    call_sign_terakhir: "NIHIL",
    tanggal_rencana_tiba_terakhir: "",
    tanggal_rencana_berangkat_terakhir: "2026-07-27",
    is_transit: "0",
    is_kontainer: "2",
    sumber_mp: "",
    area_tangkap_id: "",
    mutuIkan: "",
    peruntukan_id: ga.PERUNTUKAN || "5",
    peruntukan_lainnya: "",
    kemasan_id: "2",
    merk_kemasan: "560 Bag",
    jumlah_kemasan: "560",
    tanda_khusus: "",
    nilai_barang: ga.NILAI || "0",
    mata_uang: "IDR",
    negara_asal_id: "99",
    negara_tujuan_id: "186",
    kota_kab_asal_id: "3172",
    kota_kab_tujuan_id: "",
    tingkat_pengolahan: ga.TINGKATPENGOLAHAN || "2",
    informasi_tambahan: "",
    tgl_pemeriksaan: pemeriksa.TGPERIKSA || "",
    tempat_pemeriksaan: "D",
    kode_gudang: null,
    jenis_tempat: instalasi.JNS || "IK",
    nama_tempat_pemeriksaan: instalasi.NAMA || "",
    alamat_tempat_pemeriksaan: instalasi.ALAMAT || "",
    instalasi_karantina_id: null,
    status_ptk: "1",
    tgl_dok_permohonan: data.tglAju?.substring(0, 16) || "",
    is_draft: "1",
    is_verifikasi: "1",
    petugas: "SUHERMAN",           // PETUGAS: fixed SUHERMAN
    nip: "196702031992031001",    // NIP SUHERMAN: fixed
    tgl_aju: data.tglAju || "",
    user_created: userData?.id || "3267",
    komoditi: komoditiArr,
    kontainer: kontainerArr,
    dokumen: dokumenArr
  };
};

export const CookieTool = () => {
  return `
    <div class="flex flex-col gap-3 flex-1 min-h-0 w-full h-full">
      <div class="flex flex-col gap-2 flex-1 md:flex-none min-h-0">
        <div class="flex flex-row items-center justify-between shrink-0">
          <label for="cookieContent" class="text-sm font-semibold text-white">Nomor AJU SSM / PTK</label>
          <button type="button" id="processBtn" class="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold cursor-pointer transition-all shadow-md shrink-0 whitespace-nowrap h-[36px] md:h-[38px]">
            Proses Data
          </button>
        </div>
        <div class="relative flex-1 min-h-0 flex flex-col md:block">
          <textarea id="cookieContent" placeholder="Contoh :&#10;30104S14616EA2026071000009&#10;32002EXT260709130318MBZS1S" class="w-full h-full md:h-auto flex-1 block bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="4"></textarea>
          
          <!-- Loading Overlay -->
          <div id="cookieLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
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
          <button type="button" id="cookieTermTabLog" class="px-3 py-0.5 text-[10px] font-bold rounded text-zinc-500 hover:text-white transition-all uppercase tracking-wider">Log</button>
          <button type="button" id="cookieTermTabHasil" class="px-3 py-0.5 text-[10px] font-bold rounded text-zinc-500 hover:text-white transition-all uppercase tracking-wider">Hasil</button>
        </div>
      </div>
      <textarea id="processingResults" wrap="off" placeholder="> Menghubungkan ke server..." class="w-full h-full flex-1 whitespace-pre overflow-x-auto bg-transparent px-2 py-3 md:px-2 md:py-4 text-zinc-300 placeholder-zinc-600 font-mono text-[11px] md:text-xs resize-none outline-none leading-tight md:leading-tight" readonly></textarea>
      
    </div>
  </div>
  `;
};

export const bindCookieToolEvents = () => {
  const processBtn = document.getElementById('processBtn') as HTMLButtonElement;
  const cookieContent = document.getElementById('cookieContent') as HTMLTextAreaElement;
  const processingResults = document.getElementById('processingResults') as HTMLTextAreaElement;
  const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
  const copyText = document.getElementById('copyText') as HTMLSpanElement;
  const cookieLoader = document.getElementById('cookieLoader');

  if (cookieContent) {
    cookieContent.value = savedInput;
    cookieContent.addEventListener('input', () => {
      savedInput = cookieContent.value;
    });
  }

  const cookieTermTabLog = document.getElementById('cookieTermTabLog');
  const cookieTermTabHasil = document.getElementById('cookieTermTabHasil');

  const updateTerminalView = () => {
    if (!processingResults) return;
    processingResults.value = savedActiveTab === 'log' ? savedLogContent : savedHasilContent;
    if (savedActiveTab === 'log') {
      setTimeout(() => {
        processingResults.scrollTop = processingResults.scrollHeight;
      }, 0);
    }
  };

  const switchTermTab = (tab: string) => {
    savedActiveTab = tab;
    if (tab === 'log') {
      cookieTermTabLog?.classList.add('bg-zinc-700', 'text-white');
      cookieTermTabLog?.classList.remove('text-zinc-500', 'hover:text-white');
      cookieTermTabHasil?.classList.remove('bg-zinc-700', 'text-white');
      cookieTermTabHasil?.classList.add('text-zinc-500', 'hover:text-white');
      
      // Styling khusus LOG
      if (processingResults) {
        processingResults.classList.remove('p-3', 'text-brand-text', 'text-sm', 'leading-normal', 'bg-brand-input');
        processingResults.classList.add('px-2', 'py-3', 'md:px-2', 'md:py-4', 'text-zinc-300', 'text-[11px]', 'md:text-xs', 'leading-tight', 'md:leading-tight', 'bg-transparent');
      }
    } else {
      cookieTermTabHasil?.classList.add('bg-zinc-700', 'text-white');
      cookieTermTabHasil?.classList.remove('text-zinc-500', 'hover:text-white');
      cookieTermTabLog?.classList.remove('bg-zinc-700', 'text-white');
      cookieTermTabLog?.classList.add('text-zinc-500', 'hover:text-white');
      
      // Styling khusus HASIL (menyerupai input form di atas)
      if (processingResults) {
        processingResults.classList.remove('px-2', 'py-3', 'md:px-2', 'md:py-4', 'text-zinc-300', 'text-[11px]', 'md:text-xs', 'leading-tight', 'md:leading-tight', 'bg-transparent');
        processingResults.classList.add('p-3', 'text-brand-text', 'text-sm', 'leading-normal', 'bg-brand-input');
      }
    }
    updateTerminalView();
  };

  if (cookieTermTabLog) {
    cookieTermTabLog.addEventListener('click', () => switchTermTab('log'));
  }
  if (cookieTermTabHasil) {
    cookieTermTabHasil.addEventListener('click', () => switchTermTab('hasil'));
  }

  // Initialize terminal view
  updateTerminalView();
  switchTermTab(savedActiveTab);

  if (copyBtn) {
    const isDefault = savedLogContent === '> Menghubungkan ke server...\n';
    if (!isDefault) copyBtn.classList.remove('hidden');
    else copyBtn.classList.add('hidden');
  }

  const showLoader = (duration: number, callback: () => void) => {
    if (cookieLoader) {
      cookieLoader.classList.remove('opacity-0', 'pointer-events-none');
      cookieLoader.classList.add('opacity-100');
    }
    setTimeout(() => {
      callback();
      if (cookieLoader) {
        cookieLoader.classList.remove('opacity-100');
        cookieLoader.classList.add('opacity-0', 'pointer-events-none');
      }
    }, duration);
  };

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const textToCopy = processingResults.value;
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalText = copyText.innerText;
          copyText.innerText = "Tersalin!";
          copyBtn.classList.replace('bg-zinc-800', 'bg-green-600');
          copyBtn.classList.replace('hover:bg-zinc-700', 'hover:bg-green-500');
          copyBtn.classList.replace('border-zinc-700', 'border-green-500');
          
          setTimeout(() => {
            copyText.innerText = originalText;
            copyBtn.classList.replace('bg-green-600', 'bg-zinc-800');
            copyBtn.classList.replace('hover:bg-green-500', 'hover:bg-zinc-700');
            copyBtn.classList.replace('border-green-500', 'border-zinc-700');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      }
    });
  }

  if (cookieContent) {
    cookieContent.addEventListener('input', () => {
      const val = cookieContent.value;
      const regex = /([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g;
      const matches = val.match(regex);
      
      if (matches && matches.length > 0) {
        const cleaned = matches.join('\n');
        const withoutMatches = val.replace(regex, '');
        // If there is any text other than spaces/newlines, clean the box
        const hasGarbage = withoutMatches.trim().length > 0;
        
        if (hasGarbage) {
          showLoader(600, () => {
            cookieContent.value = cleaned;
          });
        }
      }
    });
  }

  if (processBtn) {
    processBtn.addEventListener('click', async () => {
      const inputCookies = cookieContent.value;
      
      if (!inputCookies.trim()) {
        processingResults.value = "Silakan masukan terlebih dahulu teks atau No SSM / PTK untuk diproses.";
        processingResults.classList.add('text-red-500');
        if (copyBtn) copyBtn.classList.add('hidden');
        return;
      }

      processingResults.classList.remove('text-red-500');
      
      const regex = /([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g;
      const matches = inputCookies.match(regex);
      
      if (matches && matches.length > 0) {
        processBtn.disabled = true;
        processBtn.textContent = 'Mencari Data...';
        savedLogContent = `[MULAI] Ditemukan ${matches.length} AJU: ${matches.join(', ')}\n`;
        savedHasilContent = 'Sedang memproses...';
        switchTermTab('log');
        
        // Helper: live update output
        const liveLog = (text: string) => {
          savedLogContent += text + '\n';
          updateTerminalView();
        };
        
        let finalOutput = '';

        // Helper: fetch dengan logging request & response
        const loggedFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
          const url = typeof input === 'string' ? input : input.toString();
          const method = (init?.method || 'GET').toUpperCase();
          const shortUrl = url.replace(/https:\/\/api[23]?\.karantinaindonesia\.go\.id\//g, '');
          const bodyStr = init?.body ? String(init.body) : '';
          
          const methodPadded = `[-> ${method}]`;
          let reqLog = `${methodPadded} ${shortUrl}`;
          if (bodyStr) reqLog += ` | Body: ${bodyStr.substring(0, 5000)}${bodyStr.length > 5000 ? '...(truncated)' : ''}`;
          liveLog(reqLog);

          try {
            const res = await fetch(url, init);
            const clone = res.clone();
            const resText = await clone.text().catch(() => '');
            
            const statusPadded = `[<- ${res.status}]`;
            let resLog = `${statusPadded} ${shortUrl}`;
            resLog += ` | Resp: ${resText.substring(0, 500)}${resText.length > 500 ? '...' : ''}`;
            liveLog(resLog);

            // Jika token expired (401) dari endpoint yang memerlukan auth -> langsung logout
            if (res.status === 401 && url.includes('karantinaindonesia.go.id')) {
              liveLog(`[AUTH] ⚠ Token expired! Sesi berakhir - mengalihkan ke halaman login...`);
              // Beri sedikit jeda agar log terakhir terlihat sebelum redirect
              setTimeout(() => {
                if (typeof (window as any).handleSessionExpired === 'function') {
                  (window as any).handleSessionExpired();
                }
              }, 800);
              throw new Error('TOKEN_EXPIRED_401');
            }
            
            return res;
          } catch (err: any) {
            if (err.message === 'TOKEN_EXPIRED_401') throw err; // re-throw tanpa log ulang
            const errPadded = `[<- ERR]`;
            liveLog(`${errPadded} ${shortUrl} | ERROR: ${err.message}`);
            throw err;
          }
        };
        
        // Helper function to fetch data
        const fetchAju = async (noAju: string, jeniscari: string) => {
          const today = new Date().toISOString().split('T')[0];
          let dFrom = '';
          
          // Ekstrak tanggal langsung dari teks (format YYYYMMDD atau YYMMDD) untuk query super cepat
          const datePattern1 = /(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/;
          const match1 = noAju.match(datePattern1);
          if (match1 && parseInt(match1[1]) >= 2020) {
            dFrom = `${match1[1]}-${match1[2]}-${match1[3]}`;
          } else {
            const datePattern2 = /(?:EXT|IMP|DOM)(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/;
            const match2 = noAju.match(datePattern2);
            if (match2) {
              dFrom = `20${match2[1]}-${match2[2]}-${match2[3]}`;
            } else {
              const lastYear = new Date();
              lastYear.setFullYear(lastYear.getFullYear() - 1);
              dFrom = lastYear.toISOString().split('T')[0];
            }
          }
          
          let userUpt = '3200';
          const userDataStr = localStorage.getItem('userData');
          if (userDataStr) {
            try {
              const userData = JSON.parse(userDataStr);
              userUpt = userData.upt || '3200';
            } catch (e) {}
          }

          const payload = {
            dFrom: dFrom, 
            dTo: today,
            stat: "",
            karantina: "",
            upt: userUpt,
            jnsAju: "EKSPOR",
            jeniscari,
            noAju
          };
          
          try {
            const res = await fetch('https://api.karantinaindonesia.go.id/ssm/getAju', {
              method: 'POST',
              headers: {
                'Authorization': 'Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            });
            
            if (!res.ok) return null;
            const data = await res.json();
            if (data.status && data.data && data.data.length > 0) {
              return data.data[0];
            }
            return null;
          } catch (e) {
            return null;
          }
        };

        const getToken = (): Promise<string> => {
          return new Promise((resolve) => {
            const localToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
            if (localToken) {
              resolve(localToken);
              return;
            }
            if (typeof chrome !== 'undefined' && chrome.cookies) {
              chrome.cookies.getAll({ domain: 'apps.karantinaindonesia.go.id' }, (cookies) => {
                const tokenCookie = cookies.find(c => c.name === 'token');
                resolve(tokenCookie ? tokenCookie.value : '');
              });
            } else {
              const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
              resolve(match ? match[1] : '');
            }
          });
        };

        // Ambil semua cookie apps.karantinaindonesia.go.id untuk dikirim ke api
        // Server membaca cookie posLayanan=32002 untuk menentukan suffix .2 (DRY PORT CIKARANG)
        const getAppsCookies = (): Promise<string> => {
          return new Promise((resolve) => {
            if (typeof chrome !== 'undefined' && chrome.cookies) {
              chrome.cookies.getAll({ domain: 'apps.karantinaindonesia.go.id' }, (cookies) => {
                // Ambil cookie penting: posLayanan, kodeSatpel, uptId, userId, token
                const important = ['posLayanan', 'posLayananNama', 'kodeSatpel', 'uptId', 'userId', 'token', 'PHPSESSID'];
                const cookieStr = cookies
                  .filter(c => important.includes(c.name))
                  .map(c => `${c.name}=${c.value}`)
                  .join('; ');
                resolve(cookieStr);
              });
            } else {
              // Fallback: baca dari document.cookie
              resolve(document.cookie);
            }
          });
        };

        const token = await getToken(); // Ambil token sekali di luar loop untuk mempercepat
        const appsCookies = await getAppsCookies(); // Cookie posLayanan untuk suffix nomor PTK
        
        const fetchPromises = matches.map(async (aju) => {
          let outputBlock = '';
          let currentSsmPtk = '';
          let currentSsmPtkId = '';
          
          liveLog(`[STEP 1] Mencari AJU: ${aju}...`);
          
          const [dataAju, dataReg] = await Promise.all([
            fetchAju(aju, 'noAju'),
            fetchAju(aju, 'noReg')
          ]);
          let data = dataAju || dataReg;
          
          if (data) {
            liveLog(`[STEP 1] [OK] AJU ditemukan: ${data.noReg || data.noAju}`);
            currentSsmPtkId = data.ptk_id || '';  // HANYA pakai ptk_id, bukan data.id (SSM id)
            if (currentSsmPtkId) liveLog(`[STEP 1] PTK ID existing: ${currentSsmPtkId}`);
            else liveLog(`[STEP 1] PTK belum ada, akan dibuat baru`);
            if (data.noReg) currentSsmPtk = data.noReg;
            
            if (currentSsmPtkId && token) {
              try {
                const ptkRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk/${currentSsmPtkId}`, {
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                if (ptkRes.ok) {
                  const ptkData = await ptkRes.json();
                  if (ptkData?.data?.ptk?.no_dok_permohonan) {
                    currentSsmPtk = ptkData.data.ptk.no_dok_permohonan;
                    liveLog(`[STEP 1] PTK Nomor: ${currentSsmPtk}`);
                  }
                } else if (ptkRes.status === 401) {
                  liveLog(`[STEP 1] âš  Token expired (401) - PTK detail tidak bisa diambil. Silakan Login ulang!`);
                }
              } catch (e) {
                console.error('Failed to fetch PTK details', e);
              }
            }
            
            let barangText = '-';
            let nettoText = '-';
            let kemasanText = '-';

            let xmlObjParsed: any = null;
            if (data.xml) {
              try {
                xmlObjParsed = JSON.parse(data.xml);
                const barangArr = xmlObjParsed?.DOKUMEN?.ITEMS?.BARANG;
                if (barangArr && barangArr.length > 0) {
                  const brg = barangArr[0];
                  barangText = brg.URAIAN ? brg.URAIAN.trim() : '-';
                  nettoText = `${brg.NETTO || '-'} ${brg.JNSSATUAN || ''}`.trim();
                  kemasanText = `${brg.JMLKEMAS || '-'} ${brg.JNSKEMAS || ''}`.trim();
                  
                  if (barangArr.length > 1) {
                    barangText += ` (+${barangArr.length - 1} item lainnya)`;
                  }
                }
              } catch(e) {
                console.error('Failed parsing xml', e);
              }
            }

            let ptkBlock = '';
            
            const nmPerusahaan = data.nmPerusahaan || '-';
            const jnsAju = data.jnsAju || '-';
            const tglAju = (data.tglAju || '').substring(0, 10);
            outputBlock += `\n${'='.repeat(52)}\n`;
            outputBlock += `  AJU  : ${aju}\n`;
            outputBlock += `  PT   : ${nmPerusahaan}\n`;
            outputBlock += `  Jenis: ${jnsAju} | Tgl: ${tglAju}\n`;
            outputBlock += `${'='.repeat(52)}\n`;
            
            // Automation Logic for Proses PTK & Verifikasi
            if (xmlObjParsed) {
               if (!token) {
                   ptkBlock += `  X PTK    : GAGAL - token tidak ditemukan, silakan Login\n`;
               } else {
                  try {
                      const userDataStr = localStorage.getItem('userData');
                      const userData = userDataStr ? JSON.parse(userDataStr) : {};
                      const ptkPayload = buildPtkPayload(data, xmlObjParsed, userData, currentSsmPtkId);
                      
                      // Jika PTK sudah ada, skip POST - langsung pakai existing ID
                      const skipPtkPost = !!currentSsmPtkId;
                      liveLog(`[STEP 2] ${skipPtkPost ? '[OK] PTK sudah ada (skip POST): ' + currentSsmPtkId : 'Membuat PTK baru...'}`);
                      
                      let submitOk = false;
                      let submitData: any = {};
                      const posLayananVal = appsCookies.match(/posLayanan=([^;]+)/)?.[1] || '';
                      const ptkHeaders: Record<string, string> = {
                         'Authorization': `Bearer ${token}`,
                         'Content-Type': 'application/json'
                      };
                      if (posLayananVal) ptkHeaders['X-Pos-Layanan'] = posLayananVal;
                      
                      if (skipPtkPost) {
                         // Gunakan PTK yang sudah ada
                         submitOk = true;
                         submitData = { status: true, data: { id: currentSsmPtkId } };
                         ptkBlock += `  [OK] PTK    : SUDAH ADA  [${currentSsmPtkId.substring(0,8)}...]\n`;
                      } else {
                         const submitRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ssm`, {
                            method: 'POST',
                            headers: ptkHeaders,
                            body: JSON.stringify(ptkPayload)
                         });
                         if (submitRes.ok || submitRes.status === 201) {
                            try { submitData = await submitRes.json(); } catch(_e) {}
                            submitOk = true;
                         } else {
                            let errBody = '';
                            try { errBody = await submitRes.text(); } catch(_e) {}
                            const hint = submitRes.status === 401 ? ' - silakan Login ulang!' : '';
                            ptkBlock += `  [X] PTK    : GAGAL  HTTP ${submitRes.status}${hint}\n`;
                            liveLog(`[STEP 2] [X] GAGAL HTTP ${submitRes.status}${hint}`);
                            liveLog(`[STEP 2] Server response: ${errBody}`);
                         }
                      }
                      
                      if (submitOk) {
                         if (submitData.status === '201' || submitData.status === true) {
                            const finalPtkId = submitData.data?.id || currentSsmPtkId || ptkPayload.id;
                            if (!skipPtkPost) {
                               ptkBlock += `  [OK] PTK    : BERHASIL DIBUAT  [${finalPtkId.substring(0,8)}...]\n`;
                            }
                            liveLog(`[STEP 2] [OK] PTK ID: ${finalPtkId}`);
                           
                           // Fetch detail PTK untuk mendapatkan nomor K.1.1 yang benar
                           try {
                              const ptkDetailRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk/${finalPtkId}`, {
                                 headers: { 'Authorization': `Bearer ${token}` }
                              });
                              if (ptkDetailRes.ok) {
                                 const ptkDetailData = await ptkDetailRes.json();
                                 if (ptkDetailData?.data?.ptk?.no_dok_permohonan) {
                                    currentSsmPtk = ptkDetailData.data.ptk.no_dok_permohonan;
                                 }
                              }
                           } catch(e) {}
                         
                         // Verification Step
                         // Jika PTK sudah ada = verifikasi sudah dilakukan sebelumnya
                         // (tombol Simpan hilang, diganti tombol "Buka Form Surat Tugas")
                         // Maka skip verifikasi dan langsung ke surtug
                         let verifyOk = false;
                         
                         if (skipPtkPost) {
                             // PTK sudah ada -> verifikasi sudah selesai sebelumnya -> langsung ke surtug
                             verifyOk = true;
                             ptkBlock += `  [OK] Status : PTK sudah terverifikasi\n`;
                             liveLog(`[STEP 3] Verifikasi sudah selesai -> Buka Form Surat Tugas`);
                         } else {
                             // PTK baru -> lakukan verifikasi
                             const verifyRes = await loggedFetch(`https://api.karantinaindonesia.go.id/ssm/sendStatus/ptk`, {
                                method: 'POST',
                                headers: {
                                   'Authorization': 'Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm',
                                   'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                   id: data.tssm_id || data.id,
                                   ptk_id: finalPtkId,
                                   noReg: data.noReg || data.noAju
                                 })
                             });
                             if (verifyRes.ok || verifyRes.status === 201) {
                                verifyOk = true;
                                ptkBlock += `  [OK] Status : Terverifikasi (GA - PROSES VERIFIKASI)\n`;
                                liveLog(`[STEP 3] [OK] Verifikasi BERHASIL`);
                             } else {
                                ptkBlock += `  [X] Status : Verifikasi GAGAL  HTTP ${verifyRes.status}\n`;
                                liveLog(`[STEP 3] [X] Verifikasi GAGAL (HTTP ${verifyRes.status})`);
                             }
                         }
                         
                         if (verifyOk) {
                             // surtugPtkId: gunakan existing ptk_id dari SSM jika ada, atau finalPtkId (baru dibuat)
                             const surtugPtkId = currentSsmPtkId || finalPtkId;
                             // ptkNomor: dari detail PTK (format K.1.1) atau fallback
                             const ptkNomor = currentSsmPtk || submitData.data?.nomor || data.noReg || data.noAju;
                             liveLog(`[STEP 3] PTK Nomor: ${ptkNomor}`);
                             liveLog(`[STEP 3] Surtug PTK ID: ${surtugPtkId}`);
                               
                                    try {
                                     const surtugId = uuidv4();
                                     const now = new Date();
                                     const tzOffset = now.getTimezoneOffset() * 60000;
                                     const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0, 19).replace('T', ' ');
                                     const localDateOnly = localISOTime.split(' ')[0];
                                     
                                     // STEP 2b: Cek surtug yang sudah ada untuk PTK ini - cegah duplikasi
                                     // Identifikasi: Surtug 1 (Adm) = tanggal T08:00, Surtug 2 (Kes) = tanggal T09:00
                                     let existingSurtug1HeaderId = '';
                                     let existingSurtug2HeaderId = '';
                                     try {
                                        liveLog(`[STEP 2b] Memeriksa surtug yang sudah ada...`);
                                        const existSurtugRes = await fetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                                           method: 'POST',
                                           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                           body: JSON.stringify({ ptk_id: surtugPtkId, penugasan_id: "" })
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
                                                 if (!existingSurtug1HeaderId) {
                                                    existingSurtug1HeaderId = hId;
                                                    liveLog(`[STEP 2b] -> Terdeteksi sebagai Surtug 1 (Adm)`);
                                                 }
                                              } else if (tgl.includes('T09:00') || tgl.includes(' 09:00') || tgl.includes('09:00:00')) {
                                                 if (!existingSurtug2HeaderId) {
                                                    existingSurtug2HeaderId = hId;
                                                    liveLog(`[STEP 2b] -> Terdeteksi sebagai Surtug 2 (Kes)`);
                                                 }
                                              } else {
                                                 // Fallback: urutan - pertama = Adm, kedua = Kes
                                                 if (!existingSurtug1HeaderId) {
                                                    existingSurtug1HeaderId = hId;
                                                    liveLog(`[STEP 2b] -> Surtug 1 (fallback urutan)`);
                                                 } else if (!existingSurtug2HeaderId) {
                                                    existingSurtug2HeaderId = hId;
                                                    liveLog(`[STEP 2b] -> Surtug 2 (fallback urutan)`);
                                                 }
                                              }
                                           }
                                        }
                                     } catch(_e) { liveLog(`[STEP 2b] Gagal cek existing, akan buat baru`); }
                                     
                                     if (existingSurtug1HeaderId) liveLog(`[STEP 2b] Adm & Kesesuaian sudah ada - skip`);
                                     if (existingSurtug2HeaderId) liveLog(`[STEP 2b] Pemeriksaan Kesehatan sudah ada - skip`);
                                     if (!existingSurtug1HeaderId && !existingSurtug2HeaderId) liveLog(`[STEP 2b] Belum ada surtug - akan buat semua`);
                                     
                                     // 1. DokumenCek Request (Simulasi klik Buat Surat Tugas Baru)
                                     const dokumencekPayload = {
                                        listRekom: [],
                                        noAju: data.noReg || data.noAju,
                                        idPtk: surtugPtkId,
                                        noDokumen: ptkNomor,
                                        tglDokumen: localISOTime.substring(0, 16),
                                        errorSurtug: "",
                                        errorPegawai: ""
                                     };
                                     
                                     await loggedFetch(`https://api3.karantinaindonesia.go.id/rest-ptkonline/nomorSeri/dokumencek`, {
                                        method: 'POST',
                                        headers: {
                                           'Authorization': 'Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm',
                                           'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(dokumencekPayload)
                                     });

                                     // Ambil daftar pegawai untuk UPT terkait
                                     let ttdId = 2085; // Default Cahyono ID
                                     try {
                                         const pegRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pegawai/upt/3200`, {
                                            headers: { 'Authorization': `Bearer ${token}` }
                                         });
                                         if (pegRes.ok) {
                                            const pegData = await pegRes.json();
                                            if (pegData?.data && pegData.data.length > 0) {
                                                const cahyono = pegData.data.find((p: any) => p.nama.toLowerCase().includes('cahyono'));
                                                ttdId = cahyono ? cahyono.id : pegData.data[0].id;
                                            }
                                         }
                                     } catch (e) {
                                         console.log('Failed to fetch pegawai', e);
                                     }
                                     
                                     // Cari ID petugas dari daftar pegawai UPT jika tersedia
                                     let petugasUpt: any[] = [];
                                     try {
                                        const pegRes2 = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pegawai/upt/3200`, {
                                           headers: { 'Authorization': `Bearer ${token}` }
                                        });
                                        if (pegRes2.ok) {
                                           const pegData2 = await pegRes2.json();
                                           petugasUpt = pegData2?.data || [];
                                        }
                                     } catch(e) {}
                                     
                                     const findPegawaiId = (namaCari: string, defaultId: number) => {
                                        if (petugasUpt.length === 0) return defaultId;
                                        const found = petugasUpt.find((p: any) => p.nama.toLowerCase().includes(namaCari.toLowerCase()));
                                        return found ? found.id : defaultId;
                                     };
                                     
                                     // 2. Buat Surtug 1 (Adm & Kesesuaian) - hanya jika belum ada
                                     let surtugHeaderId = existingSurtug1HeaderId;
                                     if (!existingSurtug1HeaderId) {
                                        const surtugPayload = {
                                           id: surtugId,
                                           ptk_id: surtugPtkId,
                                           no_dok_permohonan: ptkNomor,
                                           ptk_analisis_id: "",
                                           nomor: "",
                                           tanggal: localDateOnly + "T08:00",
                                           perihal: "Pelaksanaan Tindakan Karantina",
                                           penanda_tangan_id: ttdId,
                                           diterbitkan_di: "BANDUNG",
                                           user_id: String(userData?.id || "3267"),
                                           created_at: localISOTime
                                        };
                                        const surtugRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug`, {
                                           method: 'POST',
                                           headers: {
                                              'Authorization': `Bearer ${token}`,
                                              'Content-Type': 'application/json'
                                           },
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
                                        // 3. Input Petugas: Suherman, Deden Kurnia, Pupung Purnawan
                                        // penugasan_id: "1" = Pemeriksaan Administrasi & Kesesuaian
                                        const resolvedPetugas = [
                                           { id: findPegawaiId('suherman', 4111), nama: 'SUHERMAN' },
                                           { id: findPegawaiId('deden', 3267), nama: 'DEDEN KURNIA' },
                                           { id: findPegawaiId('pupung', 3051), nama: 'PUPUNG PURNAWAN' }
                                        ];
                                        
                                        if (!existingSurtug1HeaderId) {
                                           let petugasResults = '';
                                           for (const petugas of resolvedPetugas) {
                                              const detilPayload = {
                                                 id: uuidv4(),
                                                 ptk_id: surtugPtkId,
                                                 ptk_surtug_header_id: surtugHeaderId,
                                                 petugas_id: petugas.id,
                                                 user_id: String(userData?.id || "3267"),
                                                 penugasan: [{
                                                    id: uuidv4(),
                                                    penugasan_id: "1",
                                                    penugasan_lainnya: ""
                                                 }],
                                                 created_at: localISOTime
                                              };
                                              const detilRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil`, {
                                                 method: 'POST',
                                                 headers: {
                                                    'Authorization': `Bearer ${token}`,
                                                    'Content-Type': 'application/json'
                                                 },
                                                 body: JSON.stringify(detilPayload)
                                              });
                                              const detilData = await detilRes.json();
                                              const ok = detilData.status === '201' || detilData.status === true;
                                              petugasResults += ok ? petugas.nama : ('[X] ' + petugas.nama);
                                           }
                                           const petugasOkCount = resolvedPetugas.filter(p => !petugasResults.includes('[X] ' + p.nama)).length;
                                           ptkBlock += `  [OK] Petugas : ${petugasOkCount}/${resolvedPetugas.length} - ${resolvedPetugas.map(p=>p.nama.split(' ')[0]).join(', ')}\n`;
                                           liveLog(`[STEP 5] Input Petugas Surtug1 selesai`);
                                        }
                                        
                                        // 5. K-3.7a: Simpan Pemeriksaan Administrasi (pn-adm)
                                        if (!existingSurtug1HeaderId) {
                                           try {
                                              const pnAdmId = uuidv4();
                                              const pnAdmNomor = ptkNomor.replace('K.1.1', 'K.3.7a').replace('K.2.2', 'K.3.7a');
                                              const tanggalPnAdm = localISOTime.substring(0, 16);
                                              const suhermanObj = petugasUpt.find((p: any) => p.nama.toLowerCase().includes('suherman'));
                                              const suhermanId = suhermanObj ? suhermanObj.id : 4111;
                                              const pnAdmPayload = {
                                                 id: pnAdmId,
                                                 ptk_id: surtugPtkId,
                                                 ptk_surat_tugas_id: surtugHeaderId,
                                                 nomor: pnAdmNomor,
                                                 tanggal: tanggalPnAdm,
                                                 hasil_periksa_id: "6",
                                                 rekomendasi_id: "14",
                                                 user_ttd_id: String(suhermanId),
                                                 is_sampel: null,
                                                 user_id: String(userData?.id || "3267")
                                              };
                                              const pnAdmRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-adm`, {
                                                 method: 'POST',
                                                 headers: {
                                                    'Authorization': `Bearer ${token}`,
                                                    'Content-Type': 'application/json'
                                                 },
                                                 body: JSON.stringify(pnAdmPayload)
                                              });
                                              const pnAdmText = await pnAdmRes.text();
                                              let pnAdmData: any = {};
                                              try { if (pnAdmText) pnAdmData = JSON.parse(pnAdmText); } catch(_e) {}
                                              const pnAdmOk = pnAdmRes.ok || pnAdmRes.status === 201 || pnAdmRes.status === 204 || pnAdmRes.status === 500 || pnAdmData.status === '201' || pnAdmData.status === true;
                                              ptkBlock += `  ${pnAdmOk ? '[OK]' : '[X]'} K-3.7a  : ${pnAdmOk ? 'BERHASIL' : 'GAGAL  HTTP ' + pnAdmRes.status}\n`;
                                              liveLog(`[STEP 6] K-3.7a: ${pnAdmOk ? 'BERHASIL' : 'GAGAL - HTTP ' + pnAdmRes.status}`);
                                              if (pnAdmOk) {
                                                 await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/`, {
                                                    method: 'POST',
                                                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ ptk_id: surtugPtkId, status_p8: "p1a", dokumen: "K-3.7a", status: "NEW", user_id: String(userData?.id || "3267") })
                                                 });
                                                 const rekHistoryRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/rek-history`, {
                                                    method: 'POST',
                                                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ ptk_id: surtugPtkId, pn_id: pnAdmId, rekomendasi_id: ["14"] })
                                                 });
                                                 const rekText = await rekHistoryRes.text();
                                                 let rekData: any = {};
                                                 try { if (rekText) rekData = JSON.parse(rekText); } catch(_e) {}
                                                 const rekOk = rekHistoryRes.ok || rekHistoryRes.status === 201 || rekHistoryRes.status === 204 || rekData.status === '201' || rekData.status === true;
                                                 ptkBlock += `K-3.7a rek-hist: ${rekOk ? 'BERHASIL' : 'GAGAL (' + (rekData.message || rekHistoryRes.status) + ')'}\n`;
                                              }
                                           } catch(e: any) {
                                              ptkBlock += `K-3.7a         : ERROR (${e.message})\n`;
                                           }
                                        }
                                        
                                        // 8. Refresh PTK & Detil Surtug
                                        await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                                           method: 'POST',
                                           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                           body: JSON.stringify({ ptk_id: surtugPtkId, penugasan_id: "" })
                                        });
                                        await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil/ptk`, {
                                           method: 'POST',
                                           headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                           body: JSON.stringify({ ptk_surtug_header_id: surtugHeaderId, ptk_surtug_petugas_id: "", penugasan_id: "" })
                                        });
                                        
                                        // 9. Buat Surat Tugas ke-2 (Pemeriksaan Kesehatan) - hanya jika belum ada
                                        try {
                                           let surtug2HeaderId = existingSurtug2HeaderId;
                                           if (!existingSurtug2HeaderId) {
                                              const surtug2Id = uuidv4();
                                              const surtug2Payload = {
                                                 id: surtug2Id,
                                                 ptk_id: surtugPtkId,
                                                 no_dok_permohonan: ptkNomor,
                                                 ptk_analisis_id: "",
                                                 nomor: "",
                                                 tanggal: localDateOnly + "T09:00",
                                                 perihal: "Pelaksanaan Tindakan Karantina",
                                                 penanda_tangan_id: ttdId,
                                                 diterbitkan_di: "BANDUNG",
                                                 user_id: String(userData?.id || "3267"),
                                                 created_at: localISOTime
                                              };
                                              const surtug2Res = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug`, {
                                                 method: 'POST',
                                                 headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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
                                           
                                           if (surtug2HeaderId) {
                                              // Input Petugas ke Surtug ke-2 (penugasan_id "2" = pemeriksaan fisik)
                                              if (!existingSurtug2HeaderId) {
                                                 const resolvedPetugas2 = [
                                                    { id: findPegawaiId('suherman', 4111), nama: 'SUHERMAN' },
                                                    { id: findPegawaiId('deden', 3267), nama: 'DEDEN KURNIA' },
                                                    { id: findPegawaiId('pupung', 3051), nama: 'PUPUNG PURNAWAN' }
                                                 ];
                                                 let petugasResults2 = '';
                                                 for (const petugas of resolvedPetugas2) {
                                                    const detil2Payload = {
                                                       id: uuidv4(),
                                                       ptk_id: surtugPtkId,
                                                       ptk_surtug_header_id: surtug2HeaderId,
                                                       petugas_id: petugas.id,
                                                       user_id: String(userData?.id || "3267"),
                                                       penugasan: [{
                                                          id: uuidv4(),
                                                          penugasan_id: "2",
                                                          penugasan_lainnya: ""
                                                       }],
                                                       created_at: localISOTime
                                                    };
                                                    const detil2Res = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil`, {
                                                       method: 'POST',
                                                       headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                                       body: JSON.stringify(detil2Payload)
                                                    });
                                                    const detil2Data = await detil2Res.json();
                                                    const d2Ok = detil2Data.status === '201' || detil2Data.status === true;
                                                    petugasResults2 += d2Ok ? petugas.nama : ('[X] ' + petugas.nama);
                                                    await loggedFetch(`https://api2.karantinaindonesia.go.id/barantin-sys/surtug/penugasan/${surtugPtkId}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ ptk_id: surtugPtkId, penugasan_id: "" }) });
                                                 }
                                                 const petugas2OkCount = resolvedPetugas2.filter(p => !petugasResults2.includes('[X] ' + p.nama)).length;
                                                 ptkBlock += `  [OK] Petugas : ${petugas2OkCount}/${resolvedPetugas2.length} - ${resolvedPetugas2.map(p=>p.nama.split(' ')[0]).join(', ')}\n`;
                                              }
                                              
                                              // Refresh detil surtug ke-2
                                              await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil/ptk`, {
                                                 method: 'POST',
                                                 headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                                 body: JSON.stringify({ ptk_surtug_header_id: surtug2HeaderId, ptk_surtug_petugas_id: "", penugasan_id: "" })
                                              });
                                              await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/surtug/ptk`, {
                                                 method: 'POST',
                                                 headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                                 body: JSON.stringify({ ptk_id: surtugPtkId, penugasan_id: "" })
                                              });
                                              
                                              // K-3.7b: Simpan Pemeriksaan Kesehatan
                                              if (!existingSurtug2HeaderId) {
                                                 try {
                                                    const pnKesId = uuidv4();
                                                    const pnKesNomor = ptkNomor.replace('K.1.1', 'K.3.7b').replace('K.2.2', 'K.3.7b').replace('K.3.7a', 'K.3.7b');
                                                    const tanggalPnKes = localISOTime.substring(0, 16);
                                                    const suhermanObj2 = petugasUpt.find((p: any) => p.nama.toLowerCase().includes('suherman'));
                                                    const suhermanId2 = suhermanObj2 ? suhermanObj2.id : 4111;
                                                    const pnKesPayload = {
                                                       id: pnKesId,
                                                       ptk_id: surtugPtkId,
                                                       ptk_surat_tugas_id: surtug2HeaderId,
                                                       nomor: pnKesNomor,
                                                       tanggal: tanggalPnKes,
                                                       hasil_periksa_id: "6",
                                                       rekomendasi_id: "22",
                                                       user_ttd_id: String(suhermanId2),
                                                       is_sampel: null,
                                                       user_id: String(userData?.id || "3267")
                                                    };
                                                    const pnKesRes = await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-adm`, {
                                                       method: 'POST',
                                                       headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                                       body: JSON.stringify(pnKesPayload)
                                                    });
                                                    const pnKesText = await pnKesRes.text();
                                                    let pnKesData: any = {};
                                                    try { if (pnKesText) pnKesData = JSON.parse(pnKesText); } catch(_e) {}
                                                    const pnKesOk = pnKesRes.ok || pnKesRes.status === 201 || pnKesRes.status === 204 || pnKesRes.status === 500 || pnKesData.status === '201' || pnKesData.status === true;
                                                    ptkBlock += `K-3.7b pn-adm  : ${pnKesOk ? 'BERHASIL' : 'GAGAL (' + (pnKesData.message || pnKesRes.status) + ')'}${pnKesRes.status === 500 ? ' (server 500=berhasil)' : ''}\n`;
                                                    liveLog(`[STEP 8] K-3.7b: ${pnKesOk ? 'BERHASIL' : 'GAGAL - HTTP ' + pnKesRes.status}`);
                                                    if (pnKesOk) {
                                                       await loggedFetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/`, {
                                                          method: 'POST',
                                                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                                          body: JSON.stringify({ ptk_id: surtugPtkId, status_p8: "p1b", dokumen: "K-3.7b", status: "NEW", user_id: String(userData?.id || "3267") })
                                                       });
                                                       const rekKesRes = await loggedFetch(`https://api3.karantinaindonesia.go.id/barantin-sys/rek-history`, {
                                                          method: 'POST',
                                                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                                          body: JSON.stringify({ ptk_id: surtugPtkId, pn_id: pnKesId, rekomendasi_id: ["22"] })
                                                       });
                                                       const rekKesText = await rekKesRes.text();
                                                       let rekKesData: any = {};
                                                       try { if (rekKesText) rekKesData = JSON.parse(rekKesText); } catch(_e) {}
                                                       const rekKesOk = rekKesRes.ok || rekKesRes.status === 201 || rekKesRes.status === 204 || rekKesData.status === '201' || rekKesData.status === true;
                                                       ptkBlock += `K-3.7b rek-hist: ${rekKesOk ? 'BERHASIL' : 'GAGAL (' + (rekKesData.message || rekKesRes.status) + ')'}\n`;
                                                    }
                                                 } catch(e: any) {
                                                    if (e.message === 'TOKEN_EXPIRED_401') throw e;
                                                    ptkBlock += `K-3.7b         : ERROR (${e.message})\n`;
                                                 }
                                              }
                                           }
                                        } catch(e: any) {
                                           if (e.message === 'TOKEN_EXPIRED_401') throw e;
                                           ptkBlock += `Surtug ke-2    : ERROR (${e.message})\n`;
                                        }
                                     }
                                   } catch(err: any) {
                                      if (err.message === 'TOKEN_EXPIRED_401') throw err;
                                      ptkBlock += `Status Surtug  : ERROR (${err.message})\n`;
                                   }
                           } else {
                              ptkBlock += `Verifikasi     : GAGAL DIPROSES\n`;
                           }
                        } else {
                           ptkBlock += `Status PTK     : GAGAL (${submitData.message || 'Unknown Error'})\n`;
                        }
                      } else {
                         ptkBlock += `Status PTK     : GAGAL (lihat log di atas)\n`;
                      }
                   } catch (err: any) {
                     if (err.message === 'TOKEN_EXPIRED_401') throw err;
                     ptkBlock += `Status PTK     : ERROR (${err.message})\n`;
                   }
               }
            }
            
            outputBlock += ptkBlock;
            outputBlock += `${'-'.repeat(52)}\n`;
            
          } else {
            outputBlock += `Status         : TIDAK DITEMUKAN / GAGAL\n`;
          }
          
          return outputBlock;
        });
        
        let resultsArray: string[] = [];
        try {
          resultsArray = await Promise.all(fetchPromises);
        } catch (err: any) {
          if (err.message === 'TOKEN_EXPIRED_401') {
            // Proses berhenti - handleSessionExpired sudah dijadwalkan (setTimeout 800ms)
            // Jangan reset tombol atau tampilkan summary
            return;
          }
          throw err;
        }
        finalOutput = resultsArray.join('');
        
        // Simpan log akhir
        savedLogContent += '\n[SELESAI] Data berhasil diproses.\n';
        
        // Masukkan ringkasan (summary) ke tab Hasil
        savedHasilContent = matches.join('\n') + '\nDone';
        
        // Perbarui tampilan terminal
        updateTerminalView();
        
        processBtn.disabled = false;
        processBtn.textContent = 'Proses Data';
        
        if (copyBtn) copyBtn.classList.remove('hidden');
      } else {
        savedLogContent = "Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.";
        savedHasilContent = "Belum ada hasil yang diproses.";
        switchTermTab('log');
        if (copyBtn) copyBtn.classList.add('hidden');
      }
    });
  }

};

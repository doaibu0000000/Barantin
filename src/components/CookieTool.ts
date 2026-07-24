let savedInput = '';
let savedOutput = '';
let savedAutoProcess = false;
let savedAutoSurtug = true;

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const buildPtkPayload = (data: any, xmlObj: any, userData: any) => {
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

  const ptkUuid = uuidv4();
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
    upt_id: data.upt,
    kode_satpel: data.upt,
    nama_pemohon: perus.NAMA || data.nmPerusahaan,
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
    nama_pengirim: pengirim.NMPENGIRIM || perus.NAMA || "",
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
    petugas: userData?.petugas || "SUHERMAN",
    nip: userData?.nip || "196702031992031001",
    tgl_aju: data.tglAju || "",
    user_created: userData?.id || "3267",
    komoditi: komoditiArr,
    kontainer: kontainerArr,
    dokumen: dokumenArr
  };
};

export const CookieTool = () => {
  return `
    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-sm font-semibold text-white">Nomor AJU SSM / PTK</label>
      <div class="relative">
        <textarea id="cookieContent" placeholder="Contoh :&#10;30104S14616EA2026071000009&#10;32002EXT260709130318MBZS1S" class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
        
        <!-- Loading Overlay -->
        <div id="cookieLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 mt-2 mb-1">
      <input type="checkbox" id="autoProcessPtk" class="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand-accent focus:ring-brand-accent focus:ring-offset-zinc-900" ${savedAutoProcess ? 'checked' : ''}>
      <label for="autoProcessPtk" class="text-sm text-zinc-300 select-none cursor-pointer">Otomatis Proses PTK & Verifikasi (GA)</label>
    </div>
    <div class="flex items-center gap-2 mt-1 mb-2">
      <input type="checkbox" id="autoSurtug" class="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand-accent focus:ring-brand-accent focus:ring-offset-zinc-900" ${savedAutoSurtug ? 'checked' : ''}>
      <label for="autoSurtug" class="text-sm text-zinc-300 select-none cursor-pointer">Otomatis Buat Surtug (Cahyono, 08:00, Bandung)</label>
    </div>

    <button type="button" id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md">
      Proses Data
    </button>

    <div class="flex flex-col gap-2 relative">
      <textarea id="processingResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
      
      <div class="flex gap-2 mt-2">
        <button type="button" id="copyBtn" class="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md flex items-center justify-center gap-2 hidden">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          <span id="copyText">Salin Text</span>
        </button>
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
  const autoProcessPtk = document.getElementById('autoProcessPtk') as HTMLInputElement;
  const autoSurtug = document.getElementById('autoSurtug') as HTMLInputElement;

  if (autoProcessPtk) {
    autoProcessPtk.addEventListener('change', () => {
      savedAutoProcess = autoProcessPtk.checked;
    });
  }
  
  if (autoSurtug) {
    autoSurtug.addEventListener('change', () => {
      savedAutoSurtug = autoSurtug.checked;
    });
  }

  if (cookieContent) {
    cookieContent.value = savedInput;
    cookieContent.addEventListener('input', () => {
      savedInput = cookieContent.value;
    });
  }

  if (processingResults) {
    processingResults.value = savedOutput;
  }

  if (copyBtn) {
    if (savedOutput) copyBtn.classList.remove('hidden');
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
        processingResults.value = "Sedang mengambil data dari server, mohon tunggu...";
        
        let finalOutput = '';
        
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

        const token = await getToken(); // Ambil token sekali di luar loop untuk mempercepat
        
        const fetchPromises = matches.map(async (aju) => {
          let outputBlock = `\n--- MENCARI AJU: ${aju} ---\n`;
          let currentSsmPtk = '';
          let currentSsmPtkId = '';
          
          const [dataAju, dataReg] = await Promise.all([
            fetchAju(aju, 'noAju'),
            fetchAju(aju, 'noReg')
          ]);
          let data = dataAju || dataReg;
          
          if (data) {
            currentSsmPtkId = data.ptk_id || data.id || '';
            if (data.noReg) currentSsmPtk = data.noReg;
            
            if (currentSsmPtkId && token) {
              try {
                const ptkRes = await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk/${currentSsmPtkId}`, {
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                if (ptkRes.ok) {
                  const ptkData = await ptkRes.json();
                  if (ptkData?.data?.ptk?.no_dok_permohonan) {
                    currentSsmPtk = ptkData.data.ptk.no_dok_permohonan;
                  }
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
            let debugBlock = '';
            
            debugBlock += `[DEBUG] Token      : ${token ? 'ADA' : 'KOSONG'}\n`;
            debugBlock += `[DEBUG] XML Parsed : ${xmlObjParsed ? 'BERHASIL' : 'GAGAL/KOSONG'}\n`;
            debugBlock += `[DEBUG] Checkbox   : ${(autoProcessPtk && autoProcessPtk.checked) ? 'DICENTANG' : 'TIDAK DICENTANG'}\n`;
            
            // Automation Logic for Proses PTK & Verifikasi
            if (autoProcessPtk && autoProcessPtk.checked && xmlObjParsed) {
               if (!token) {
                  ptkBlock += `Status PTK     : GAGAL (Sesi Token tidak ditemukan. Silakan ke menu Login terlebih dahulu)\n`;
               } else {
                  try {
                     const userDataStr = localStorage.getItem('userData');
                     const userData = userDataStr ? JSON.parse(userDataStr) : {};
                     const ptkPayload = buildPtkPayload(data, xmlObjParsed, userData);
                     
                     const submitRes = await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/ssm`, {
                        method: 'POST',
                        headers: {
                           'Authorization': `Bearer ${token}`,
                           'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(ptkPayload)
                     });
                     
                     if (submitRes.ok || submitRes.status === 201) {
                        const submitData = await submitRes.json();
                        if (submitData.status === '201' || submitData.status === true) {
                           ptkBlock += `Status PTK     : BERHASIL DIBUAT (ID: ${ptkPayload.id})\n`;
                           
                           // Verification Step
                           const verifyRes = await fetch(`https://api.karantinaindonesia.go.id/ssm/sendStatus/ptk`, {
                              method: 'POST',
                              headers: {
                                 'Authorization': 'Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm',
                                 'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                 id: data.id,
                                 ptk_id: ptkPayload.id,
                                 noReg: data.noReg || data.noAju
                              })
                           });
                           
                           if (verifyRes.ok || verifyRes.status === 201) {
                              ptkBlock += `Verifikasi     : BERHASIL (GA - PROSES VERIFIKASI)\n`;
                              
                              const autoSurtugEl = document.getElementById('autoSurtug') as HTMLInputElement;
                              if (autoSurtugEl && autoSurtugEl.checked) {
                                 try {
                                    const surtugId = uuidv4();
                                    const now = new Date();
                                    const tzOffset = now.getTimezoneOffset() * 60000;
                                    const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0, 19).replace('T', ' ');
                                    const localDateOnly = localISOTime.split(' ')[0];
                                    
                                    const ptkNomor = submitData.data?.nomor || data.noReg || data.noAju;
                                    
                                    const surtugPayload = {
                                       id: surtugId,
                                       ptk_id: ptkPayload.id,
                                       no_dok_permohonan: ptkNomor,
                                       ptk_analisis_id: "",
                                       nomor: "",
                                       tanggal: localDateOnly + "T08:00",
                                       perihal: "Pelaksanaan Tindakan Karantina",
                                       penanda_tangan_id: 2085,
                                       diterbitkan_di: "BANDUNG",
                                       user_id: userData?.id || "3267",
                                       created_at: localISOTime
                                    };
                                    
                                    const surtugRes = await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/surtug`, {
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
                                          ptkBlock += `Status Surtug  : BERHASIL DIBUAT (${surtugData.data?.nomor || surtugId})\n`;
                                       } else {
                                          ptkBlock += `Status Surtug  : GAGAL (${surtugData.message || 'Unknown Error'})\n`;
                                       }
                                    } else {
                                       ptkBlock += `Status Surtug  : GAGAL (HTTP ${surtugRes.status})\n`;
                                    }
                                 } catch(err: any) {
                                    ptkBlock += `Status Surtug  : ERROR (${err.message})\n`;
                                 }
                              }
                           } else {
                              ptkBlock += `Verifikasi     : GAGAL DIPROSES\n`;
                           }
                        } else {
                           ptkBlock += `Status PTK     : GAGAL (${submitData.message || 'Unknown Error'})\n`;
                        }
                     } else {
                        ptkBlock += `Status PTK     : GAGAL (HTTP ${submitRes.status})\n`;
                     }
                  } catch (err: any) {
                     ptkBlock += `Status PTK     : ERROR (${err.message})\n`;
                  }
               }
            }
            
            outputBlock += ptkBlock;
            outputBlock += debugBlock;

            outputBlock += `\n--- DATA JSON LENGKAP ---\n`;
            const displayData = { ...data };
            if (displayData.xml) {
              try {
                displayData.xml = JSON.parse(displayData.xml);
              } catch (e) {}
            }
            outputBlock += JSON.stringify(displayData, null, 2) + `\n`;
            
          } else {
            outputBlock += `Status         : TIDAK DITEMUKAN / GAGAL\n`;
          }
          
          return outputBlock;
        });
        
        const resultsArray = await Promise.all(fetchPromises);
        finalOutput = resultsArray.join('');
        
        processingResults.value = finalOutput.trim();
        savedOutput = finalOutput.trim();
        processBtn.disabled = false;
        processBtn.textContent = 'Proses Data';
        
        if (copyBtn) copyBtn.classList.remove('hidden');
      } else {
        processingResults.value = "Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.";
        savedOutput = processingResults.value;
        if (copyBtn) copyBtn.classList.add('hidden');
      }
    });
  }

};
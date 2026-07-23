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
        
        <button type="button" id="openSsmFormBtn" class="flex-1 bg-green-700 hover:bg-green-600 border border-green-600 text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md flex items-center justify-center gap-2 hidden">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Buka Form SSM
        </button>
        
        <button type="button" id="openK37aFormBtn" class="flex-1 bg-blue-700 hover:bg-blue-600 border border-blue-600 text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md flex items-center justify-center gap-2 hidden">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Buka K-3.7a
        </button>
      </div>
    </div>

    <!-- Modal K-3.7a -->
    <div id="k37aModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex-col items-center justify-end sm:justify-center p-4 transition-opacity opacity-0">
      <div class="bg-brand-panel w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 transform translate-y-full transition-transform duration-300" id="k37aModalContent">
        <div class="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
          <h3 class="text-white font-semibold flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Automasi K-3.7a
          </h3>
          <button id="closeK37aModalBtn" class="text-zinc-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="p-5 flex flex-col gap-4">
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Pemeriksaan Administratif</label>
            <select id="k37aHasil" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="6" selected>Semua persyaratan yang diperlukan... lengkap dan sah</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Rekomendasi</label>
            <select id="k37aRekomendasi" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="14" selected>Dilanjutkan pemeriksaan kesehatan</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Penandatangan</label>
            <select id="k37aPetugas" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="3267" selected>DEDEN KURNIA - 197812302006041002</option>
              <option value="4111">SUHERMAN - 196702031992031001</option>
              <option value="3051">PUPUNG PURNAWAN - 198105152011011014</option>
            </select>
          </div>
          <button type="button" id="submitK37aBtn" class="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-3 mt-2 text-sm font-semibold cursor-pointer transition-colors shadow-lg flex justify-center items-center gap-2">
            <span>Simpan K-3.7a (Otomatis)</span>
            <svg id="k37aSpinner" class="animate-spin h-4 w-4 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </button>
          
          <div id="k37aResult" class="hidden mt-3 p-3 rounded-lg text-sm"></div>
        </div>
      </div>
    </div>

    <!-- Modal Respon SSM -->
    <div id="ssmModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex-col items-center justify-end sm:justify-center p-4 transition-opacity opacity-0">
      <div class="bg-brand-panel w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 transform translate-y-full transition-transform duration-300" id="ssmModalContent">
        <div class="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
          <h3 class="text-white font-semibold flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Respon SSM
          </h3>
          <button id="closeSsmModalBtn" class="text-zinc-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="p-5 flex flex-col gap-4">
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Nomor Dokumen PTK</label>
            <input type="text" id="ssmPtkNo" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Tanggal Verifikasi</label>
            <input type="text" id="ssmTanggal" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Respon</label>
            <select id="ssmRespon" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="GA - PROSES VERIFIKASI" selected>GA - PROSES VERIFIKASI</option>
              <option value="GA - PENOLAKAN PERMOHONAN / PEMBERITAHUAN">GA - PENOLAKAN PERMOHONAN / PEMBERITAHUAN</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Pos Layanan</label>
            <select id="ssmPos" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="3200.0">3200.0 | -</option>
              <option value="3200.1">3200.1 | KANTOR POS MPC BANDUNG</option>
              <option value="3200.2" selected>3200.2 | DRY PORT CIKARANG</option>
              <option value="3200.3">3200.3 | KANTOR POS BOGOR</option>
              <option value="3200.4">3200.4 | PELABUHAN LAUT MARUNDA</option>
              <option value="3200.5">3200.5 | TPK GEDE BAGE</option>
              <option value="3200.6">3200.6 | BANDARA HUSEIN SASTRANEGARA</option>
              <option value="3200.7">3200.7 | KANTOR POS TASIKMALAYA</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Petugas</label>
            <select id="ssmPetugas" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="196702031992031001" selected>SUHERMAN - 196702031992031001</option>
              <option value="197812302006041002">DEDEN KURNIA - 197812302006041002</option>
              <option value="198105152011011014">PUPUNG PURNAWAN - 198105152011011014</option>
            </select>
          </div>
          <button type="button" id="submitSsmBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 mt-2 text-sm font-semibold cursor-pointer transition-colors shadow-lg flex justify-center items-center gap-2">
            <span>Buat Surat Tugas (Otomatis)</span>
            <svg id="surtugSpinner" class="animate-spin h-4 w-4 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </button>
          
          <div id="surtugResult" class="hidden mt-3 p-3 rounded-lg text-sm"></div>
        </div>
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
          const payload = {
            dFrom: "2000-01-01", // Make date range very broad so we always find it
            dTo: today,
            stat: "",
            karantina: "",
            upt: "",
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

        // Promise wrapper for getting token
        const getToken = (): Promise<string> => {
          return new Promise((resolve) => {
            if (typeof chrome !== 'undefined' && chrome.cookies) {
              chrome.cookies.getAll({ domain: 'apps.karantinaindonesia.go.id' }, (cookies) => {
                const tokenCookie = cookies.find(c => c.name === 'token');
                resolve(tokenCookie ? tokenCookie.value : '');
              });
            } else {
              resolve('');
            }
          });
        };

        // Variables to store current active data
        let currentSsmPtk = '';
        let currentSsmPtkId = '';
        
        for (const aju of matches) {
          finalOutput += `\n--- MENCARI AJU: ${aju} ---\n`;
          
          let data = await fetchAju(aju, 'noAju');
          if (!data) data = await fetchAju(aju, 'noReg');
          
          if (data) {
            // Priority: if it's an SSM record, it has a ptk_id. Otherwise fallback to its own id
            currentSsmPtkId = data.ptk_id || data.id || '';
            if (data.noReg) currentSsmPtk = data.noReg;
            
            // Auto fetch K.1.1 Document Number if possible
            if (currentSsmPtkId) {
              try {
                const token = await getToken();
                if (token) {
                  const ptkRes = await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk/${currentSsmPtkId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                  });
                  if (ptkRes.ok) {
                    const ptkData = await ptkRes.json();
                    if (ptkData?.data?.ptk?.no_dok_permohonan) {
                      currentSsmPtk = ptkData.data.ptk.no_dok_permohonan;
                    }
                  }
                }
              } catch (e) {
                console.error('Failed to fetch PTK details', e);
              }
            }
            
            finalOutput += `Status         : DITEMUKAN (${data.jnsAju})\n`;
            finalOutput += `No Aju SSM     : ${data.noAju || '-'}\n`;
            finalOutput += `No Dokumen     : ${currentSsmPtk || data.noReg || '-'}\n`;
            finalOutput += `Perusahaan     : ${data.nmPerusahaan || '-'}\n`;
            finalOutput += `Alat Angkut    : ${data.namaAngkut || '-'}\n`;
            finalOutput += `Tgl Tiba       : ${data.tglTiba || '-'}\n`;
            finalOutput += `Pelabuhan Asal : ${data.portAsal || '-'}\n`;
            finalOutput += `Pelabuhan Tuju : ${data.portTujuan || '-'}\n`;
            finalOutput += `Karantina      : ${data.jenis_karantina || '-'}\n`;
            finalOutput += `UPT            : ${data.upt || '-'}\n`;
          } else {
            finalOutput += `Status         : TIDAK DITEMUKAN / GAGAL\n`;
          }
        }
        
        processingResults.value = finalOutput.trim();
        processBtn.disabled = false;
        processBtn.textContent = 'Proses Data';
        
        const openSsmFormBtn = document.getElementById('openSsmFormBtn');
        const openK37aFormBtn = document.getElementById('openK37aFormBtn');
        const ssmPtkNo = document.getElementById('ssmPtkNo') as HTMLInputElement;
        
        if (copyBtn) copyBtn.classList.remove('hidden');
        
        // Show Buka Form SSM & K37a button if we found at least one PTK
        if (openSsmFormBtn && openK37aFormBtn) {
          if (currentSsmPtk) {
            openSsmFormBtn.classList.remove('hidden');
            openK37aFormBtn.classList.remove('hidden');
            if (ssmPtkNo) ssmPtkNo.value = currentSsmPtk;
            const submitBtn = document.getElementById('submitSsmBtn');
            if (submitBtn) submitBtn.dataset.ptkId = currentSsmPtkId;
            const submitK37aBtn = document.getElementById('submitK37aBtn');
            if (submitK37aBtn) {
              submitK37aBtn.dataset.ptkId = currentSsmPtkId;
              submitK37aBtn.dataset.noReg = currentSsmPtk;
            }
          } else {
            openSsmFormBtn.classList.add('hidden');
            openK37aFormBtn.classList.add('hidden');
          }
        }
      } else {
        processingResults.value = "Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.";
        if (copyBtn) copyBtn.classList.add('hidden');
        const openSsmFormBtn = document.getElementById('openSsmFormBtn');
        const openK37aFormBtn = document.getElementById('openK37aFormBtn');
        if (openSsmFormBtn) openSsmFormBtn.classList.add('hidden');
        if (openK37aFormBtn) openK37aFormBtn.classList.add('hidden');
      }
    });
  }

  // Modal logic
  const ssmModal = document.getElementById('ssmModal');
  const ssmModalContent = document.getElementById('ssmModalContent');
  const openSsmFormBtn = document.getElementById('openSsmFormBtn');
  const closeSsmModalBtn = document.getElementById('closeSsmModalBtn');
  const submitSsmBtn = document.getElementById('submitSsmBtn') as HTMLButtonElement;

  const openModal = () => {
    if (ssmModal && ssmModalContent) {
      const ssmTanggal = document.getElementById('ssmTanggal') as HTMLInputElement;
      if (ssmTanggal) {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        ssmTanggal.value = `${dd}/${mm}/${yyyy} ${hh}:${min}`;
      }

      ssmModal.classList.remove('hidden');
      // small delay to allow display block to apply before animation
      setTimeout(() => {
        ssmModal.classList.remove('opacity-0');
        ssmModalContent.classList.remove('translate-y-full');
      }, 10);
    }
  };

  const closeModal = () => {
    if (ssmModal && ssmModalContent) {
      ssmModal.classList.add('opacity-0');
      ssmModalContent.classList.add('translate-y-full');
      setTimeout(() => {
        ssmModal.classList.add('hidden');
      }, 300);
    }
  };

  if (openSsmFormBtn) openSsmFormBtn.addEventListener('click', openModal);
  if (closeSsmModalBtn) closeSsmModalBtn.addEventListener('click', closeModal);
  if (ssmModal) {
    ssmModal.addEventListener('click', (e) => {
      if (e.target === ssmModal) closeModal();
    });
  }

  if (submitSsmBtn) {
    submitSsmBtn.addEventListener('click', async () => {
      const ptkId = submitSsmBtn.dataset.ptkId;
      const noReg = (document.getElementById('ssmPtkNo') as HTMLInputElement)?.value;
      const spinner = document.getElementById('surtugSpinner');
      const resultDiv = document.getElementById('surtugResult');
      
      let token = localStorage.getItem('accessToken') || '';
      let userId = '3267';
      const userDataStr = localStorage.getItem('userData');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          userId = userData.id || userData.userId || '3267';
        } catch (e) {}
      }

      if (!token) {
        // Fallback if they somehow pasted it in the textarea
        const cookieContent = document.getElementById('cookieContent') as HTMLTextAreaElement;
        token = cookieContent?.value?.match(/token=([^;]+)/)?.[1] || '';
        userId = cookieContent?.value?.match(/userId=([^;]+)/)?.[1] || userId;
      }
      
      if (!ptkId || !token) {
        if (resultDiv) {
          resultDiv.textContent = 'Gagal: Token atau Data PTK tidak ditemukan. Pastikan Cookie lengkap.';
          resultDiv.className = 'mt-3 p-3 rounded-lg text-sm bg-red-500/20 text-red-300 border border-red-500/30';
          resultDiv.classList.remove('hidden');
        }
        return;
      }

      // Show loading
      submitSsmBtn.disabled = true;
      if (spinner) spinner.classList.remove('hidden');
      if (resultDiv) {
        resultDiv.classList.remove('hidden');
        resultDiv.className = 'mt-3 p-3 rounded-lg text-sm bg-blue-500/20 text-blue-300 border border-blue-500/30';
        resultDiv.textContent = 'Sedang membuat Surat Tugas...';
      }

      try {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const sec = String(now.getSeconds()).padStart(2, '0');
        
        const tanggalSurtug = `${yyyy}-${mm}-${dd}T08:00`;
        const createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;

        const surtugHeaderId = crypto.randomUUID();

        // 1. Create Surtug Header
        const headerRes = await fetch('https://api3.karantinaindonesia.go.id/barantin-sys/surtug', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: surtugHeaderId,
            ptk_id: ptkId,
            no_dok_permohonan: noReg,
            ptk_analisis_id: "",
            nomor: "",
            tanggal: tanggalSurtug,
            perihal: "Pelaksanaan Tindakan Karantina",
            penanda_tangan_id: 2085, // CAHYONO
            diterbitkan_di: "BANDUNG",
            user_id: userId,
            created_at: createdAt
          })
        });

        if (!headerRes.ok) throw new Error('Gagal membuat Surat Tugas Induk');
        const headerData = await headerRes.json();
        const surtugNomor = headerData?.data?.nomor || '';

        // 2. Add 3 Officers
        if (resultDiv) resultDiv.textContent = 'Menambahkan 3 Petugas (Suherman, Deden, Pupung)...';
        
        const petugasIds = [4111, 3267, 3051]; 
        for (const pid of petugasIds) {
          await fetch('https://api3.karantinaindonesia.go.id/barantin-sys/surtug/detil', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: crypto.randomUUID(),
              ptk_id: ptkId,
              ptk_surtug_header_id: surtugHeaderId,
              petugas_id: pid,
              user_id: userId,
              penugasan: [
                {
                  id: crypto.randomUUID(),
                  penugasan_id: "1",
                  penugasan_lainnya: ""
                }
              ],
              created_at: createdAt
            })
          });
        }

        // Success
        if (resultDiv) {
          resultDiv.className = 'mt-3 p-3 rounded-lg text-sm bg-green-500/20 text-green-300 border border-green-500/30';
          resultDiv.innerHTML = `<strong>Berhasil!</strong><br>Surat Tugas berhasil dibuat dengan 3 Petugas.<br>Nomor: <span class="font-mono text-white">${surtugNomor}</span>`;
        }
      } catch (err: any) {
        if (resultDiv) {
          resultDiv.className = 'mt-3 p-3 rounded-lg text-sm bg-red-500/20 text-red-300 border border-red-500/30';
          resultDiv.textContent = err.message || 'Terjadi kesalahan sistem';
        }
      } finally {
        submitSsmBtn.disabled = false;
        if (spinner) spinner.classList.add('hidden');
      }
    });
  }

  // Modal logic K-3.7a
  const k37aModal = document.getElementById('k37aModal');
  const k37aModalContent = document.getElementById('k37aModalContent');
  const openK37aFormBtn = document.getElementById('openK37aFormBtn');
  const closeK37aModalBtn = document.getElementById('closeK37aModalBtn');
  const submitK37aBtn = document.getElementById('submitK37aBtn') as HTMLButtonElement;

  const openK37aModal = () => {
    if (k37aModal && k37aModalContent) {
      k37aModal.classList.remove('hidden');
      setTimeout(() => {
        k37aModal.classList.remove('opacity-0');
        k37aModalContent.classList.remove('translate-y-full');
      }, 10);
    }
  };

  const closeK37aModal = () => {
    if (k37aModal && k37aModalContent) {
      k37aModal.classList.add('opacity-0');
      k37aModalContent.classList.add('translate-y-full');
      setTimeout(() => {
        k37aModal.classList.add('hidden');
      }, 300);
    }
  };

  if (openK37aFormBtn) openK37aFormBtn.addEventListener('click', openK37aModal);
  if (closeK37aModalBtn) closeK37aModalBtn.addEventListener('click', closeK37aModal);
  if (k37aModal) {
    k37aModal.addEventListener('click', (e) => {
      if (e.target === k37aModal) closeK37aModal();
    });
  }

  if (submitK37aBtn) {
    submitK37aBtn.addEventListener('click', async () => {
      const ptkId = submitK37aBtn.dataset.ptkId;
      const noReg = submitK37aBtn.dataset.noReg;
      const spinner = document.getElementById('k37aSpinner');
      const resultDiv = document.getElementById('k37aResult');
      
      const hasilSelect = document.getElementById('k37aHasil') as HTMLSelectElement;
      const rekSelect = document.getElementById('k37aRekomendasi') as HTMLSelectElement;
      const petugasSelect = document.getElementById('k37aPetugas') as HTMLSelectElement;
      
      let token = localStorage.getItem('accessToken') || '';
      let userId = '3267';
      const userDataStr = localStorage.getItem('userData');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          userId = userData.id || userData.userId || '3267';
        } catch (e) {}
      }

      if (!token) {
        const cookieContent = document.getElementById('cookieContent') as HTMLTextAreaElement;
        token = cookieContent?.value?.match(/token=([^;]+)/)?.[1] || '';
        userId = cookieContent?.value?.match(/userId=([^;]+)/)?.[1] || userId;
      }
      
      if (!ptkId || !token || !noReg) {
        if (resultDiv) {
          resultDiv.textContent = 'Gagal: Token atau Data PTK tidak ditemukan.';
          resultDiv.className = 'mt-3 p-3 rounded-lg text-sm bg-red-500/20 text-red-300 border border-red-500/30';
          resultDiv.classList.remove('hidden');
        }
        return;
      }

      submitK37aBtn.disabled = true;
      if (spinner) spinner.classList.remove('hidden');
      if (resultDiv) {
        resultDiv.classList.remove('hidden');
        resultDiv.className = 'mt-3 p-3 rounded-lg text-sm bg-blue-500/20 text-blue-300 border border-blue-500/30';
        resultDiv.textContent = 'Mengambil draft K-3.7a...';
      }

      try {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        
        const currentDateTimeStr = `${yyyy}-${mm}-${dd} ${hh}:${min}`;

        // 1. Get existing draft
        const draftRes = await fetch(`https://api.karantinaindonesia.go.id/barantin-sys-v2/pnAdmin?id=${ptkId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!draftRes.ok) throw new Error('Gagal mengambil draft K-3.7a');
        
        const draftData = await draftRes.json();
        const draftItem = draftData?.data;
        if (!draftItem || !draftItem.id) {
          throw new Error('Draft K-3.7a kosong.');
        }

        const pnAdminId = draftItem.id;
        const ptkSuratTugasId = draftItem.ptk_surat_tugas_id || '';
        const nomor = draftItem.nomor || noReg;
        
        if (resultDiv) resultDiv.textContent = 'Menyimpan Form K-3.7a...';

        // 2. PUT Form Data
        const saveRes = await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/pn-adm/${pnAdminId}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: pnAdminId,
            ptk_id: ptkId,
            ptk_surat_tugas_id: ptkSuratTugasId,
            nomor: nomor,
            tanggal: currentDateTimeStr,
            hasil_periksa_id: hasilSelect?.value || "6",
            rekomendasi_id: rekSelect?.value || "14",
            user_ttd_id: petugasSelect?.value || "3267",
            user_id: userId
          })
        });

        if (!saveRes.ok) throw new Error('Gagal menyimpan Form K-3.7a');

        // 3. Post to history
        await fetch('https://api.karantinaindonesia.go.id/barantin-sys/ptk-history/', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ ptk_id: ptkId, status_p8: "p1a", dokumen: "K-3.7a", status: "UPDATE", user_id: userId })
        });

        // 4. Post to rek-history
        const rekRes = await fetch('https://api.karantinaindonesia.go.id/barantin-sys/rek-history', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ ptk_id: ptkId, pn_id: pnAdminId, rekomendasi_id: [rekSelect?.value || "14"] })
        });
        if (!rekRes.ok) console.warn('Gagal rek-history', await rekRes.text());

        if (resultDiv) {
          resultDiv.className = 'mt-3 p-3 rounded-lg text-sm bg-green-500/20 text-green-300 border border-green-500/30';
          resultDiv.innerHTML = `<strong>Berhasil!</strong><br>Pemeriksaan Administratif (K-3.7a) telah disimpan.`;
        }
      } catch (err: any) {
        if (resultDiv) {
          resultDiv.className = 'mt-3 p-3 rounded-lg text-sm bg-red-500/20 text-red-300 border border-red-500/30';
          resultDiv.textContent = err.message || 'Terjadi kesalahan sistem';
        }
      } finally {
        submitK37aBtn.disabled = false;
        if (spinner) spinner.classList.add('hidden');
      }
    });
  }
};

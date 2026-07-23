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
            <input type="text" id="ssmPtkNo" class="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-zinc-300 text-sm outline-none" readonly>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Respon</label>
            <select id="ssmRespon" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="GA - PROSES VERIFIKASI">GA - PROSES VERIFIKASI</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Pos Layanan</label>
            <select id="ssmPos" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="3200.2">3200.2 | DRY PORT CIKARANG</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-zinc-400 mb-1">Petugas</label>
            <select id="ssmPetugas" class="w-full bg-brand-input border border-brand-border rounded-lg p-2 text-white text-sm outline-none focus:border-brand-accent">
              <option value="197812302006041002">DEDEN KURNIA - 197812302006041002</option>
            </select>
          </div>
          
          <button type="button" id="submitSsmBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 mt-2 text-sm font-semibold cursor-pointer transition-colors shadow-lg">
            Proses PTK
          </button>
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
      const regex = /[a-zA-Z0-9]{26}/g;
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
      
      const regex = /[a-zA-Z0-9]{26}/g;
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

        // Variables to store current active data
        let currentSsmPtk = '';
        
        for (const aju of matches) {
          finalOutput += `\n--- MENCARI AJU: ${aju} ---\n`;
          
          let data = await fetchAju(aju, 'noAju');
          if (!data) data = await fetchAju(aju, 'noReg');
          
          if (data) {
            // Save the noReg for the form submission
            if (data.noReg) currentSsmPtk = data.noReg;
            
            finalOutput += `Status         : DITEMUKAN (${data.jnsAju})\n`;
            finalOutput += `No Aju SSM     : ${data.noAju || '-'}\n`;
            finalOutput += `No Aju PTK     : ${data.noReg || '-'}\n`;
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
        const ssmPtkNo = document.getElementById('ssmPtkNo') as HTMLInputElement;
        
        if (copyBtn) copyBtn.classList.remove('hidden');
        
        // Show Buka Form SSM button if we found at least one PTK
        if (openSsmFormBtn) {
          if (currentSsmPtk) {
            openSsmFormBtn.classList.remove('hidden');
            if (ssmPtkNo) ssmPtkNo.value = currentSsmPtk;
          } else {
            openSsmFormBtn.classList.add('hidden');
          }
        }
      } else {
        processingResults.value = "Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.";
        if (copyBtn) copyBtn.classList.add('hidden');
        const openSsmFormBtn = document.getElementById('openSsmFormBtn');
        if (openSsmFormBtn) openSsmFormBtn.classList.add('hidden');
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
    submitSsmBtn.addEventListener('click', () => {
      alert("TBD: Anda perlu menginformasikan apa endpoint API untuk tombol ini melalui chat agar kami bisa melengkapinya.");
      closeModal();
    });
  }
};

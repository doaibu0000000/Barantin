let savedInput = '';
let savedOutput = '';

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

        // Promise wrapper for getting token
        const getToken = (): Promise<string> => {
          return new Promise((resolve) => {
            const localToken = localStorage.getItem('accessToken');
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
              resolve('');
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

            if (data.xml) {
              try {
                const xmlObj = JSON.parse(data.xml);
                const barangArr = xmlObj?.DOKUMEN?.ITEMS?.BARANG;
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

            outputBlock += `Status         : DITEMUKAN (${data.jnsAju})\n`;
            outputBlock += `No Aju SSM     : ${data.noAju || '-'}\n`;
            outputBlock += `No Dokumen     : ${currentSsmPtk || data.noReg || '-'}\n`;
            outputBlock += `Perusahaan     : ${data.nmPerusahaan || '-'}\n`;
            outputBlock += `Barang         : ${barangText}\n`;
            outputBlock += `Netto          : ${nettoText}\n`;
            outputBlock += `Kemasan        : ${kemasanText}\n`;
            outputBlock += `Alat Angkut    : ${data.namaAngkut || '-'}\n`;
            outputBlock += `Tgl Tiba       : ${data.tglTiba || '-'}\n`;
            outputBlock += `Pelabuhan Asal : ${data.portAsal || '-'}\n`;
            outputBlock += `Pelabuhan Tuju : ${data.portTujuan || '-'}\n`;
            outputBlock += `Karantina      : ${data.jenis_karantina || '-'}\n`;
            outputBlock += `UPT            : ${data.upt || '-'}\n`;
            
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
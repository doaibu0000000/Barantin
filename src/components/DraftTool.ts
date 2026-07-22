export const DraftTool = () => {
  return `
    <div class="flex flex-col gap-4 h-full">
      <div class="flex flex-col gap-2">
        <label for="pdfUpload" class="text-sm font-semibold text-white">Upload File PDF</label>
        <div class="relative">
          <input type="file" id="pdfUpload" accept=".pdf" class="hidden" />
          <label for="pdfUpload" class="w-full bg-brand-input hover:bg-brand-input/80 border border-brand-border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-brand-text-muted hover:text-white">
            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <span id="pdfFileName" class="text-sm font-medium">Klik untuk memilih file PDF</span>
          </label>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label for="docNumber" class="text-sm font-semibold text-white">Nomor Dokumen</label>
        <input type="text" id="docNumber" placeholder="Contoh: 1615 atau 2026-T1.0-3200.2-K.1.1-001615" class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors" />
        <p class="text-xs text-brand-text-muted mt-1">Anda bisa memasukkan nomor lengkap atau hanya angka belakangnya (misal: 1615).</p>
      </div>

      <button id="processDraftBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md mt-auto">
        Proses Data Draft
      </button>

      <div class="flex flex-col gap-2 mt-4">
        <textarea id="draftResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors h-32" readonly></textarea>
      </div>
    </div>
  `;
};

export const bindDraftToolEvents = () => {
  const pdfUpload = document.getElementById('pdfUpload') as HTMLInputElement;
  const pdfFileName = document.getElementById('pdfFileName') as HTMLSpanElement;
  const docNumber = document.getElementById('docNumber') as HTMLInputElement;
  const processDraftBtn = document.getElementById('processDraftBtn') as HTMLButtonElement;
  const draftResults = document.getElementById('draftResults') as HTMLTextAreaElement;

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
      const file = pdfUpload?.files?.[0];
      let rawNumber = docNumber.value.trim();

      if (!rawNumber) {
        draftResults.value = "Silakan masukkan Nomor Dokumen terlebih dahulu.";
        draftResults.classList.add('text-red-500');
        return;
      }

      draftResults.classList.remove('text-red-500');
      
      let finalNumber = rawNumber;
      
      // Jika input hanya berisi angka (contoh: 1615), format menjadi lengkap
      if (/^\d+$/.test(rawNumber)) {
        const padded = rawNumber.padStart(6, '0');
        finalNumber = `2026-T1.0-3200.2-K.1.1-${padded}`;
      }

      let resultText = `Nomor Dokumen : ${finalNumber}`;
      if (file) {
        resultText += `\nFile PDF      : ${file.name}`;
      } else {
        resultText += `\nFile PDF      : (Tidak ada file yang dipilih)`;
      }

      draftResults.value = resultText + '\n\nDone';
    });
  }
};

export const CookieTool = () => {
  return `
    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-xs font-semibold text-white">Nomor AJU SSM / PTK</label>
      <textarea id="cookieContent" placeholder="Contoh :&#10;30104S14616EA2026071000009&#10;32002EXT260709130318MBZS1S" class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
    </div>

    <button id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md">
      Proses Data
    </button>

    <div class="flex flex-col gap-2">
      <label for="processingResults" class="text-xs font-semibold text-white">Done</label>
      <textarea id="processingResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
    </div>
  `;
};

export const bindCookieToolEvents = () => {
  const processBtn = document.getElementById('processBtn') as HTMLButtonElement;
  const cookieContent = document.getElementById('cookieContent') as HTMLTextAreaElement;
  const processingResults = document.getElementById('processingResults') as HTMLTextAreaElement;
  if (processBtn) {
    processBtn.addEventListener('click', () => {
      const inputCookies = cookieContent.value;
      
      if (!inputCookies.trim()) {
        processingResults.value = "Silakan masukkan No SSM / PTK untuk diproses.";
        processingResults.classList.add('text-red-500');
        return;
      }

      processingResults.classList.remove('text-red-500');
      let result = "Processing...\n\n";
      result += `Input Length: ${inputCookies.length} characters.\n`;
      result += "\n(Cookie parsing logic goes here)";
      
      processingResults.value = result;
    });
  }
};

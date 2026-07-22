export const CookieTool = () => {
  return `
    <div class="flex flex-col gap-2 mb-1">
      <h1 class="text-xl font-bold text-white">Cookie Handle Tools</h1>
      <div class="flex items-center gap-3">
        <span class="text-xs font-semibold text-white">Extract UID</span>
        <label class="switch">
          <input type="checkbox" id="extractUidToggle" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-xs font-semibold text-white">Cookie Content</label>
      <textarea id="cookieContent" placeholder="Input cookie contents..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
    </div>

    <button id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md">
      Processing Cookies
    </button>

    <div class="flex flex-col gap-2">
      <label for="processingResults" class="text-xs font-semibold text-white">Processing Results</label>
      <textarea id="processingResults" placeholder="The processing results are shown here..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
    </div>
  `;
};

export const bindCookieToolEvents = () => {
  const processBtn = document.getElementById('processBtn') as HTMLButtonElement;
  const cookieContent = document.getElementById('cookieContent') as HTMLTextAreaElement;
  const processingResults = document.getElementById('processingResults') as HTMLTextAreaElement;
  const extractUidToggle = document.getElementById('extractUidToggle') as HTMLInputElement;

  if (processBtn) {
    processBtn.addEventListener('click', () => {
      const inputCookies = cookieContent.value;
      const shouldExtractUid = extractUidToggle.checked;
      
      if (!inputCookies.trim()) {
        processingResults.value = "Please enter some cookies to process.";
        return;
      }

      let result = "Processing...\n\n";
      result += `Extract UID Option: ${shouldExtractUid ? 'Enabled' : 'Disabled'}\n\n`;
      result += `Input Length: ${inputCookies.length} characters.\n`;
      result += "\n(Cookie parsing logic goes here)";
      
      processingResults.value = result;
    });
  }
};

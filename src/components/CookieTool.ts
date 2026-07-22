export const CookieTool = () => {
  return `
    <div class="flex flex-col gap-3 mb-2">
      <h1 class="text-xl font-bold">Cookie Handle Tools</h1>
      <div class="flex items-center gap-3">
        <span class="text-[13px] font-medium">Extract UID</span>
        <label class="switch">
          <input type="checkbox" id="extractUidToggle" checked>
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-sm font-medium">Cookie Content</label>
      <textarea id="cookieContent" class="w-full bg-brand-input border border-brand-border rounded-md p-3 text-brand-text font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
    </div>

    <button id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-md p-3.5 text-sm font-semibold cursor-pointer transition-colors">
      Processing Cookies
    </button>

    <div class="flex flex-col gap-2">
      <label for="processingResults" class="text-sm font-medium">Processing Results</label>
      <textarea id="processingResults" class="w-full bg-brand-input border border-brand-border rounded-md p-3 text-brand-text font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
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

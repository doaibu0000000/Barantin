/**
 * TerminalPanel.ts — Shared UI: Panel Terminal
 * Dipakai oleh: SurtuTool, DraftTool, RevisiTool
 *
 * Komponen murni tampilan. Tidak boleh ada logic proses/parsing menu di sini.
 * Kata "SYSTEM" dibungkus class .terminal-system-word, disembunyikan via CSS di Mobile.
 */

export interface TerminalPanelOptions {
  textareaId: string;
  logTabId: string;
  hasilTabId: string;
}

/**
 * Mengembalikan HTML string panel terminal.
 * Dipanggil dari masing-masing file menu.
 */
export const terminalPanelHTML = ({
  textareaId,
  logTabId,
  hasilTabId,
}: TerminalPanelOptions): string => `
  <div class="flex flex-col relative w-full overflow-hidden rounded-xl border border-zinc-700 bg-[#0a0a0a] shadow-2xl flex-1 min-h-0">
    <!-- Terminal Header -->
    <div class="flex items-center justify-between bg-[#1c1c1c] px-4 py-2 border-b border-zinc-700">
      <div class="flex items-center gap-2">
        <div class="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
        <div class="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
        <div class="h-3 w-3 rounded-full bg-[#27c93f]"></div>
        <span class="ml-4 text-xs font-semibold text-zinc-500 tracking-widest uppercase">
          <span class="terminal-system-word">System </span>Terminal
        </span>
      </div>
      <div class="flex w-fit bg-[#0a0a0a] border border-zinc-700 p-0.5 rounded-md">
        <button type="button" id="${logTabId}"
          class="px-3 py-0.5 text-[10px] font-bold rounded text-white bg-zinc-700 transition-all uppercase tracking-wider">
          Log
        </button>
        <button type="button" id="${hasilTabId}"
          class="px-3 py-0.5 text-[10px] font-bold rounded text-zinc-500 hover:text-white transition-all uppercase tracking-wider">
          Hasil
        </button>
      </div>
    </div>
    <!-- Terminal Body -->
    <textarea
      id="${textareaId}"
      wrap="off"
      placeholder="> Menghubungkan ke server..."
      class="w-full h-full flex-1 whitespace-pre overflow-x-auto bg-transparent px-2 py-3 md:px-2 md:py-4 text-zinc-300 placeholder-zinc-600 font-mono text-[11px] md:text-xs resize-none outline-none leading-tight md:leading-tight"
      readonly
    ></textarea>
  </div>
`;

/**
 * bindTerminalTabs — Menghubungkan event klik tab LOG/HASIL ke textarea.
 *
 * @param logTabId      ID elemen tombol LOG
 * @param hasilTabId    ID elemen tombol HASIL
 * @param textareaId    ID textarea output terminal
 * @param getLogContent     Fungsi getter isi log saat ini
 * @param getHasilContent   Fungsi getter isi hasil saat ini
 * @param onTabChange       Callback dipanggil saat tab berubah (opsional)
 */
export const bindTerminalTabs = (
  logTabId: string,
  hasilTabId: string,
  textareaId: string,
  getLogContent: () => string,
  getHasilContent: () => string,
  onTabChange?: (tab: 'log' | 'hasil') => void
): {
  switchTab: (tab: 'log' | 'hasil') => void;
  updateView: () => void;
} => {
  const logTab = document.getElementById(logTabId);
  const hasilTab = document.getElementById(hasilTabId);
  const textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null;

  let activeTab: 'log' | 'hasil' = 'log';

  const updateView = () => {
    if (!textarea) return;
    const content = activeTab === 'log' ? getLogContent() : getHasilContent();
    textarea.value = content;

    // Styling mode LOG
    if (activeTab === 'log') {
      textarea.classList.remove('p-3', 'text-brand-text', 'text-sm', 'leading-normal', 'bg-brand-input');
      textarea.classList.add('px-2', 'py-3', 'md:px-2', 'md:py-4', 'text-zinc-300', 'text-[11px]', 'md:text-xs', 'leading-tight', 'md:leading-tight', 'bg-transparent');
      setTimeout(() => { textarea.scrollTop = textarea.scrollHeight; }, 0);
    } else {
      // Styling mode HASIL
      textarea.classList.remove('px-2', 'py-3', 'md:px-2', 'md:py-4', 'text-zinc-300', 'text-[11px]', 'md:text-xs', 'leading-tight', 'md:leading-tight', 'bg-transparent');
      textarea.classList.add('p-3', 'text-brand-text', 'text-sm', 'leading-normal', 'bg-brand-input');
    }
  };

  const switchTab = (tab: 'log' | 'hasil') => {
    activeTab = tab;

    if (tab === 'log') {
      logTab?.classList.add('bg-zinc-700', 'text-white');
      logTab?.classList.remove('text-zinc-500', 'hover:text-white');
      hasilTab?.classList.remove('bg-zinc-700', 'text-white');
      hasilTab?.classList.add('text-zinc-500', 'hover:text-white');
    } else {
      hasilTab?.classList.add('bg-zinc-700', 'text-white');
      hasilTab?.classList.remove('text-zinc-500', 'hover:text-white');
      logTab?.classList.remove('bg-zinc-700', 'text-white');
      logTab?.classList.add('text-zinc-500', 'hover:text-white');
    }

    updateView();
    onTabChange?.(tab);
  };

  logTab?.addEventListener('click', () => switchTab('log'));
  hasilTab?.addEventListener('click', () => switchTab('hasil'));

  // Inisialisasi tampilan default
  updateView();
  switchTab('log');

  return { switchTab, updateView };
};

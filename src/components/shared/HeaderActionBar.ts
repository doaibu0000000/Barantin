/**
 * HeaderActionBar.ts — Shared UI: Bar judul + tombol aksi
 * Dipakai oleh: SurtuTool, DraftTool, RevisiTool
 * TIDAK dipakai oleh: PengaturanTool (Settings punya pola sendiri)
 */

export interface HeaderActionBarOptions {
  title: string;
  buttonLabel: string;
  buttonId: string;
}

/**
 * Mengembalikan HTML string header bar.
 * Teks judul dan tombol bersifat dinamis per menu.
 */
export const headerActionBarHTML = ({
  title,
  buttonLabel,
  buttonId,
}: HeaderActionBarOptions): string => `
  <div class="flex flex-row items-center justify-between shrink-0">
    <label class="text-sm font-semibold text-white">${title}</label>
    <button
      type="button"
      id="${buttonId}"
      class="bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold cursor-pointer transition-all shadow-md shrink-0 whitespace-nowrap h-[36px] md:h-[38px]"
    >
      ${buttonLabel}
    </button>
  </div>
`;

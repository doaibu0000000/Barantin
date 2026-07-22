import { Sidebar, bindSidebarEvents } from './components/Sidebar';
import { CookieTool, bindCookieToolEvents } from './components/CookieTool';
import { DraftTool, bindDraftToolEvents } from './components/DraftTool';

export const App = () => {
  return `
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 h-full overflow-hidden pb-24 md:pb-8">
      ${Sidebar()}
      
      <main id="mainContent" class="w-full bg-brand-panel border border-white/5 rounded-xl md:flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl h-full overflow-hidden overflow-y-auto">
        ${CookieTool()}
      </main>
    </div>
  `;
};

export const bindAppEvents = () => {
  const mainContent = document.getElementById('mainContent');

  bindSidebarEvents((menuId) => {
    if (!mainContent) return;

    if (menuId === 'Draft') {
      mainContent.innerHTML = DraftTool();
      bindDraftToolEvents();
    } else if (menuId === 'Surtu 2') {
      mainContent.innerHTML = CookieTool();
      bindCookieToolEvents();
    } else {
      mainContent.innerHTML = `<div class="text-white text-center mt-10">Fitur ${menuId} belum tersedia</div>`;
    }
  });

  // Default bindings on load
  bindCookieToolEvents();
};

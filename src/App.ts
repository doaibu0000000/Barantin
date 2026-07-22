import { Sidebar, bindSidebarEvents } from './components/Sidebar';
import { CookieTool, bindCookieToolEvents } from './components/CookieTool';
import { DraftTool, bindDraftToolEvents } from './components/DraftTool';

export const App = () => {
  return `
    <div class="flex flex-col md:flex-row w-full max-w-[1600px] mx-auto h-[100dvh] pb-[80px] md:pb-0 md:p-8">
      ${Sidebar()}
      
      <main id="mainContent" class="w-full bg-brand-panel md:border md:border-white/5 md:rounded-xl md:flex-1 p-4 md:p-8 flex flex-col gap-5 shadow-2xl h-full overflow-y-auto">
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

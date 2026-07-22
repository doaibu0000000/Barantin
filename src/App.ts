import { Sidebar, bindSidebarEvents } from './components/Sidebar';
import { CookieTool, bindCookieToolEvents } from './components/CookieTool';
import { DraftTool, bindDraftToolEvents } from './components/DraftTool';

export const App = () => {
  const activeMenu = localStorage.getItem('activeMenu') || 'Surtu 2';
  let initialContent = '';
  
  if (activeMenu === 'Draft') {
    initialContent = DraftTool();
  } else if (activeMenu === 'Surtu 2') {
    initialContent = CookieTool();
  } else {
    initialContent = `<div class="text-white text-center mt-10">Fitur ${activeMenu} belum tersedia</div>`;
  }

  return `
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${Sidebar(activeMenu)}
      
      <main id="mainContent" class="w-full bg-brand-panel border border-white/5 rounded-xl md:flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${initialContent}
      </main>
    </div>
  `;
};

export const bindAppEvents = () => {
  const mainContent = document.getElementById('mainContent');
  const activeMenu = localStorage.getItem('activeMenu') || 'Surtu 2';

  bindSidebarEvents((menuId) => {
    localStorage.setItem('activeMenu', menuId);
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

  // Default bindings on load based on active menu
  if (activeMenu === 'Draft') {
    bindDraftToolEvents();
  } else if (activeMenu === 'Surtu 2') {
    bindCookieToolEvents();
  }
};

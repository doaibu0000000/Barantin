import { Sidebar, bindSidebarEvents } from './components/Sidebar';
import { CookieTool, bindCookieToolEvents } from './components/CookieTool';
import { DraftTool, bindDraftToolEvents } from './components/DraftTool';
import { RevisiTool, bindRevisiToolEvents } from './components/RevisiTool';
import { PengaturanTool, bindPengaturanToolEvents } from './components/PengaturanTool';

export const App = () => {
  let activeMenu = localStorage.getItem('activeMenu') || 'Surtu 2';
  if (activeMenu === 'Profile') {
    activeMenu = 'Surtu 2';
    localStorage.setItem('activeMenu', 'Surtu 2');
  }
  let initialContent = '';
  
  if (activeMenu === 'Draft') {
    initialContent = DraftTool();
  } else if (activeMenu === 'Revisi') {
    initialContent = RevisiTool();
  } else if (activeMenu === 'Surtu 2') {
    initialContent = CookieTool();
  } else if (activeMenu === 'Settings') {
    initialContent = PengaturanTool();
  } else {
    initialContent = `<div class="text-white text-center mt-10">Fitur ${activeMenu} belum tersedia</div>`;
  }

  return `
    <div id="appWrapper" class="flex flex-col md:flex-row items-start gap-4 md:gap-4 w-full max-w-[1600px] mx-auto p-4 md:p-6 h-full overflow-hidden">
      ${Sidebar(activeMenu)}
      
      <main id="mainContent" class="${activeMenu === 'Settings' ? 'w-full md:w-fit md:min-w-[500px]' : 'w-full flex-1 min-h-0 overflow-hidden'} bg-brand-panel border border-white/5 rounded-xl p-3 md:p-5 flex flex-col gap-3 shadow-2xl">
        ${initialContent}
      </main>
    </div>
  `;
};

export const bindAppEvents = () => {
  const mainContent = document.getElementById('mainContent');
  let activeMenu = localStorage.getItem('activeMenu') || 'Surtu 2';
  if (activeMenu === 'Profile') {
    activeMenu = 'Surtu 2';
  }

  // Dynamically measure sidebar height and apply as bottom padding on mobile
  const setNavPadding = () => {
    const sidebar = document.querySelector('aside');
    const wrapper = document.getElementById('appWrapper');
    if (sidebar && wrapper && window.innerWidth < 768) {
      const navH = sidebar.getBoundingClientRect().height;
      wrapper.style.paddingBottom = navH + 'px';
    } else if (wrapper) {
      wrapper.style.paddingBottom = '';
    }
  };
  setNavPadding();
  window.addEventListener('resize', setNavPadding);

  bindSidebarEvents((menuId) => {
    localStorage.setItem('activeMenu', menuId);
    if (!mainContent) return;

    if (menuId === 'Settings') {
      mainContent.className = "w-full md:w-fit md:min-w-[500px] bg-brand-panel border border-white/5 rounded-xl p-3 md:p-5 flex flex-col gap-3 shadow-2xl";
    } else {
      mainContent.className = "w-full bg-brand-panel border border-white/5 rounded-xl flex-1 p-3 md:p-5 flex flex-col gap-3 shadow-2xl min-h-0 overflow-hidden";
    }

    if (menuId === 'Draft') {
      mainContent.innerHTML = DraftTool();
      bindDraftToolEvents();
    } else if (menuId === 'Revisi') {
      mainContent.innerHTML = RevisiTool();
      bindRevisiToolEvents();
    } else if (menuId === 'Surtu 2') {
      mainContent.innerHTML = CookieTool();
      bindCookieToolEvents();
    } else if (menuId === 'Settings') {
      mainContent.innerHTML = PengaturanTool();
      bindPengaturanToolEvents();
    } else {
      mainContent.innerHTML = `<div class="text-white text-center mt-10">Fitur ${menuId} belum tersedia</div>`;
    }
  });

  // Default bindings on load based on active menu
  if (activeMenu === 'Draft') {
    bindDraftToolEvents();
  } else if (activeMenu === 'Revisi') {
    bindRevisiToolEvents();
  } else if (activeMenu === 'Surtu 2') {
    bindCookieToolEvents();
  } else if (activeMenu === 'Settings') {
    bindPengaturanToolEvents();
  }
};

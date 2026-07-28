import { Sidebar, bindSidebarEvents } from './components/shared/Sidebar';
import { BottomNavBar, bindBottomNavBarEvents } from './components/shared/BottomNavBar';
import { SurtuTool, bindSurtuToolEvents } from './components/menus/SurtuTool';
import { DraftTool, bindDraftToolEvents } from './components/menus/DraftTool';
import { RevisiTool, bindRevisiToolEvents } from './components/menus/RevisiTool';
import { PengaturanTool, bindPengaturanToolEvents } from './components/menus/PengaturanTool';

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
    initialContent = SurtuTool();
  } else if (activeMenu === 'Settings') {
    initialContent = PengaturanTool();
  } else {
    initialContent = `<div class="text-white text-center mt-10">Fitur ${activeMenu} belum tersedia</div>`;
  }

  return `
    <div id="appWrapper" class="flex flex-col md:flex-row items-start md:items-stretch gap-4 md:gap-4 w-full max-w-[1600px] mx-auto p-4 md:p-6 h-full overflow-hidden">
      ${Sidebar(activeMenu)}

      <main id="mainContent" class="${
        activeMenu === 'Settings'
          ? 'w-full md:w-fit md:min-w-[500px] mt-auto md:mt-0 min-h-0 flex flex-col'
          : 'w-full flex-1 min-h-0 overflow-hidden flex flex-col'
      } bg-brand-panel border border-white/5 rounded-xl p-3 md:p-5 gap-3 shadow-2xl">
        ${initialContent}
      </main>
    </div>
    ${BottomNavBar(activeMenu)}
  `;
};

export const bindAppEvents = () => {
  const mainContent = document.getElementById('mainContent');
  let activeMenu = localStorage.getItem('activeMenu') || 'Surtu 2';
  if (activeMenu === 'Profile') activeMenu = 'Surtu 2';

  // Dynamically measure sidebar height and apply as bottom padding on mobile
  const setNavPadding = () => {
    const bottomNav = document.getElementById('bottomNav');
    const wrapper = document.getElementById('appWrapper');
    if (bottomNav && wrapper && window.innerWidth < 768) {
      const navH = bottomNav.getBoundingClientRect().height;
      wrapper.style.paddingBottom = (navH + 16) + 'px';
    } else if (wrapper) {
      wrapper.style.paddingBottom = '';
    }
  };
  setNavPadding();
  window.addEventListener('resize', setNavPadding);

  // Fungsi load konten menu
  const loadMenu = (menuId: string) => {
    localStorage.setItem('activeMenu', menuId);
    if (!mainContent) return;

    if (menuId === 'Settings') {
      mainContent.className = 'w-full md:w-fit md:min-w-[500px] mt-auto md:mt-0 min-h-0 flex flex-col bg-brand-panel border border-white/5 rounded-xl p-3 md:p-5 gap-3 shadow-2xl';
    } else {
      mainContent.className = 'w-full bg-brand-panel border border-white/5 rounded-xl flex-1 p-3 md:p-5 flex flex-col gap-3 shadow-2xl min-h-0 overflow-hidden';
    }

    if (menuId === 'Draft') {
      mainContent.innerHTML = DraftTool();
      bindDraftToolEvents();
    } else if (menuId === 'Revisi') {
      mainContent.innerHTML = RevisiTool();
      bindRevisiToolEvents();
    } else if (menuId === 'Surtu 2') {
      mainContent.innerHTML = SurtuTool();
      bindSurtuToolEvents();
    } else if (menuId === 'Settings') {
      mainContent.innerHTML = PengaturanTool();
      bindPengaturanToolEvents();
    } else {
      mainContent.innerHTML = `<div class="text-white text-center mt-10">Fitur ${menuId} belum tersedia</div>`;
    }
  };

  // Bind Sidebar Desktop
  bindSidebarEvents(loadMenu);

  // Bind BottomNavBar Mobile
  bindBottomNavBarEvents(loadMenu);

  // Default bindings on load
  if (activeMenu === 'Draft') {
    bindDraftToolEvents();
  } else if (activeMenu === 'Revisi') {
    bindRevisiToolEvents();
  } else if (activeMenu === 'Surtu 2') {
    bindSurtuToolEvents();
  } else if (activeMenu === 'Settings') {
    bindPengaturanToolEvents();
  }
};

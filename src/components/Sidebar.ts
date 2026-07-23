export const Sidebar = (activeMenu: string = 'Surtu 2') => {
  const menus = [
    { 
      id: 'Surtu 2', 
      label: 'Surtu 2',
      icon: '<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>' 
    },
    { 
      id: 'Draft', 
      label: 'Draft',
      icon: '<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>' 
    },
    { 
      id: 'Revisi', 
      label: 'Revisi',
      icon: '<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>' 
    }
  ];
  
  const renderNavItems = () => {
    return menus.map(menu => `
      <a href="#" class="nav-item flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all ${menu.id === activeMenu ? 'active text-brand-accent md:bg-brand-accent-bg font-semibold' : 'text-brand-text-muted hover:text-white md:hover:bg-white/5'}" data-menu="${menu.id}">
        ${menu.icon}
        <span>${menu.label}</span>
      </a>
    `).join('');
  };

  return `
    <aside class="fixed bottom-0 left-0 w-full md:relative md:w-[280px] bg-brand-panel border-t md:border border-white/5 md:rounded-xl p-2 md:p-6 flex flex-row md:flex-col shrink-0 shadow-2xl z-50">
      <div class="hidden md:flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold tracking-wide text-white text-left w-full">Barantin Tools</h2>
      </div>
      <nav id="sidebarNav" class="flex flex-row md:flex-col justify-around md:justify-start w-full md:gap-1.5 flex-1">
        ${renderNavItems()}
        <a href="#" onclick="window.location.reload(true); return false;" class="flex md:hidden flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all text-brand-text-muted hover:text-white">
          <svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          <span>Reload</span>
        </a>
        
        <a href="#" class="nav-item flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all ${activeMenu === 'Profile' ? 'active text-brand-accent md:bg-brand-accent-bg font-semibold' : 'text-brand-text-muted hover:text-white md:hover:bg-white/5'}" data-menu="Profile">
          <svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span>Profile</span>
        </a>

        <div class="hidden md:block mt-auto pt-6 w-full">
          <button id="logoutBtn" class="flex flex-row items-center justify-start gap-3 px-4 py-3 rounded-lg w-full text-base transition-all text-brand-text-muted hover:text-white hover:bg-white/5 hover:text-red-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  `;
};

export const bindSidebarEvents = (onChange?: (menuId: string) => void) => {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const menuId = item.getAttribute('data-menu');
      
      navItems.forEach(nav => {
        nav.classList.remove('active', 'md:bg-brand-accent-bg', 'text-brand-accent', 'font-semibold');
        nav.classList.add('text-brand-text-muted');
      });
      item.classList.remove('text-brand-text-muted');
      item.classList.add('active', 'md:bg-brand-accent-bg', 'text-brand-accent', 'font-semibold');

      if (onChange && menuId) {
        onChange(menuId);
      }
    });
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isAuthenticated');
      window.location.reload();
    });
  }
};


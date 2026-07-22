export const Sidebar = () => {
  const menus = ['Cookie', 'Text Editor', 'Card Key Splitter'];
  
  const renderNavItems = () => {
    return menus.map(menu => `
      <a href="#" class="nav-item ${menu === 'Cookie' ? 'active bg-brand-accent-bg text-brand-accent' : 'text-brand-text-muted hover:bg-white/5 hover:text-white'} px-4 py-3 rounded-md text-sm font-medium transition-all" data-menu="${menu}">
        ${menu}
      </a>
    `).join('');
  };

  return `
    <aside class="w-full md:w-[250px] bg-brand-panel md:rounded-lg p-4 md:p-6 flex flex-col shrink-0 overflow-hidden">
      <div class="flex justify-between items-center md:mb-6">
        <h2 class="text-base font-bold text-center md:text-left w-full">Practical Tools</h2>
        <button id="mobileMenuBtn" class="md:hidden text-white p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
      <nav id="sidebarNav" class="hidden md:flex flex-col gap-1 mt-4 md:mt-0">
        ${renderNavItems()}
      </nav>
    </aside>
  `;
};

export const bindSidebarEvents = () => {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(nav => {
        nav.classList.remove('active', 'bg-brand-accent-bg', 'text-brand-accent');
        nav.classList.add('text-brand-text-muted');
      });
      item.classList.remove('text-brand-text-muted');
      item.classList.add('active', 'bg-brand-accent-bg', 'text-brand-accent');
    });
  });

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarNav = document.getElementById('sidebarNav');
  if (mobileMenuBtn && sidebarNav) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebarNav.classList.toggle('hidden');
      sidebarNav.classList.toggle('flex');
    });
  }
};

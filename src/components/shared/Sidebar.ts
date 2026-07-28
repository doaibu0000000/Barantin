/**
 * Sidebar.ts — Navigasi Desktop (vertikal, kiri)
 * Dipakai oleh: App.ts
 * Data menu diambil dari: menuConfig.ts
 *
 * Hanya me-render item type='page'.
 * Item type='action' (Reload) TIDAK dirender di Desktop — itu urusan BottomNavBar Mobile.
 */

import { menuConfig, MenuItem } from './menuConfig';

export const Sidebar = (activeMenu: string = 'Surtu 2'): string => {
  const pageItems = menuConfig.filter((m: MenuItem) => m.type === 'page');

  const navItems = pageItems.map((menu: MenuItem) => `
    <a href="#"
      class="nav-item flex flex-row items-center justify-start gap-3 px-4 py-3 rounded-lg text-base transition-all ${
        menu.id === activeMenu
          ? 'active text-brand-accent bg-brand-accent-bg font-semibold'
          : 'text-brand-text-muted hover:text-white hover:bg-white/5'
      }"
      data-menu="${menu.id}">
      ${menu.icon}
      <span>${menu.label}</span>
    </a>
  `).join('');

  return `
    <aside class="fixed bottom-0 left-0 w-full md:relative md:w-[280px] bg-brand-panel border-t md:border border-white/5 md:rounded-xl p-2 md:p-6 flex flex-row md:flex-col shrink-0 shadow-2xl z-50 md:self-start">
      <!-- Judul (hanya Desktop) -->
      <div class="hidden md:flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold tracking-wide text-white text-left w-full">Barantin Tools</h2>
      </div>
      <!-- Navigasi Desktop -->
      <nav id="sidebarNav" class="hidden md:flex md:flex-col justify-start w-full md:gap-1.5 flex-1">
        ${navItems}
      </nav>
    </aside>
  `;
};

export const bindSidebarEvents = (onChange?: (menuId: string) => void): void => {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const menuId = item.getAttribute('data-menu');

      navItems.forEach(nav => {
        nav.classList.remove('active', 'bg-brand-accent-bg', 'text-brand-accent', 'font-semibold');
        nav.classList.add('text-brand-text-muted');
      });
      item.classList.remove('text-brand-text-muted');
      item.classList.add('active', 'bg-brand-accent-bg', 'text-brand-accent', 'font-semibold');

      if (onChange && menuId) {
        onChange(menuId);
      }
    });
  });
};

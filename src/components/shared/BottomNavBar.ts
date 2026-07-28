/**
 * BottomNavBar.ts — Navigasi Mobile (horizontal, bawah)
 * Dipakai oleh: App.ts
 * Data menu diambil dari: menuConfig.ts
 *
 * Me-render semua item: type='page' dan type='action' (termasuk Reload).
 * Hanya tampil di Mobile (md:hidden).
 */

import { menuConfig, MenuItem } from './menuConfig';

export const BottomNavBar = (activeMenu: string = 'Surtu 2'): string => {
  const navItems = menuConfig.map((menu: MenuItem) => `
    <a href="#"
      class="bottom-nav-item flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-xl text-[11px] transition-all ${
        menu.type === 'page' && menu.id === activeMenu
          ? 'active text-brand-accent font-semibold'
          : 'text-brand-text-muted hover:text-white'
      }"
      data-menu="${menu.id}"
      data-type="${menu.type}">
      ${menu.icon}
      <span>${menu.label}</span>
    </a>
  `).join('');

  return `
    <nav id="bottomNav"
      class="md:hidden fixed bottom-0 left-0 w-full bg-brand-panel border-t border-white/5 p-2 flex flex-row justify-around z-50 shadow-2xl">
      ${navItems}
    </nav>
  `;
};

export const bindBottomNavBarEvents = (onChange?: (menuId: string) => void): void => {
  const navItems = document.querySelectorAll('.bottom-nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const menuId = item.getAttribute('data-menu');
      const itemType = item.getAttribute('data-type');

      // Item type='action': jalankan aksi, tidak berpindah halaman
      if (itemType === 'action') {
        const menuEntry = menuConfig.find(m => m.id === menuId);
        if (menuEntry?.action) {
          menuEntry.action();
        }
        return;
      }

      // Item type='page': perbarui state aktif dan panggil callback
      navItems.forEach(nav => {
        nav.classList.remove('active', 'text-brand-accent', 'font-semibold');
        nav.classList.add('text-brand-text-muted');
      });
      item.classList.remove('text-brand-text-muted');
      item.classList.add('active', 'text-brand-accent', 'font-semibold');

      if (onChange && menuId) {
        onChange(menuId);
      }
    });
  });
};

export const ProfileTool = () => {
  const menuItems = [
    { id: 'view_profile', label: 'View profile', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>' },
    { id: 'get_coins', label: 'Get Coins', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' },
    { id: 'creator_tools', label: 'Creator tools', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>' },
    { id: 'settings', label: 'Settings', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' },
    { id: 'language', label: 'English (US)', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>' },
    { id: 'feedback', label: 'Feedback and help', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' },
    { id: 'dark_mode', label: 'Dark mode', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>' },
  ];

  return `
    <div class="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-4">
      <!-- Header Profile -->
      <div class="flex items-center gap-6 bg-[#1a1b1e] border border-white/5 rounded-xl p-6 shadow-lg">
        <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg relative shrink-0">
          <span class="text-4xl font-bold text-white">A</span>
          <div class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#1a1b1e]"></div>
        </div>
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold text-white">Admin User</h2>
          <p class="text-brand-text-muted">@admin_barantin</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full font-medium border border-blue-500/20">Active</span>
          </div>
        </div>
      </div>

      <!-- Menu List -->
      <div class="flex flex-col bg-[#1a1b1e] border border-white/5 rounded-xl shadow-lg overflow-hidden py-2">
        ${menuItems.map(item => `
          <button class="menu-action-btn flex items-center gap-4 w-full px-6 py-4 text-white hover:bg-white/5 transition-colors text-left" data-action="${item.id}">
            <div class="text-white/70">${item.icon}</div>
            <span class="text-base font-medium flex-1">${item.label}</span>
            <svg class="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        `).join('')}
        
        <div class="h-px bg-white/10 mx-6 my-2"></div>
        
        <button id="profileLogoutBtn" class="flex items-center gap-4 w-full px-6 py-4 text-red-400 hover:bg-red-400/10 transition-colors text-left">
          <div class="text-red-400/80">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </div>
          <span class="text-base font-medium flex-1">Log out</span>
        </button>
      </div>
    </div>
  `;
};

export const bindProfileToolEvents = () => {
  const actionBtns = document.querySelectorAll('.menu-action-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = (e.currentTarget as HTMLElement).getAttribute('data-action');
      if (action) {
        alert('Fitur "' + action.replace('_', ' ') + '" akan segera hadir!');
      }
    });
  });

  const logoutBtn = document.getElementById('profileLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isAuthenticated');
      window.location.reload();
    });
  }
};

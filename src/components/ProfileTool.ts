export const ProfileTool = () => {
  return `
    <div class="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div class="flex items-center gap-6 bg-[#1a1b1e] border border-white/5 rounded-xl p-6 shadow-lg">
        <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg relative shrink-0">
          <span class="text-4xl font-bold text-white">A</span>
          <div class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-[#1a1b1e]"></div>
        </div>
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold text-white">Admin User</h2>
          <p class="text-brand-text-muted">Administrator</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full font-medium border border-blue-500/20">Active</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 bg-[#1a1b1e] border border-white/5 rounded-xl p-6 shadow-lg">
        <h3 class="text-lg font-semibold text-white mb-2">Informasi Akun</h3>
        
        <div class="flex justify-between items-center py-3 border-b border-white/5">
          <span class="text-brand-text-muted">Username</span>
          <span class="text-white font-medium">admin</span>
        </div>
        
        <div class="flex justify-between items-center py-3 border-b border-white/5">
          <span class="text-brand-text-muted">Email</span>
          <span class="text-white font-medium">admin@barantin.local</span>
        </div>
        
        <div class="flex justify-between items-center py-3">
          <span class="text-brand-text-muted">Bergabung Sejak</span>
          <span class="text-white font-medium">Juli 2026</span>
        </div>
      </div>
      
      <div class="flex flex-col gap-4 mt-2">
        <button id="editProfileBtn" class="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          Edit Profile
        </button>
      </div>
    </div>
  `;
};

export const bindProfileToolEvents = () => {
  const editProfileBtn = document.getElementById('editProfileBtn');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      alert('Fitur edit profile akan segera hadir!');
    });
  }
};

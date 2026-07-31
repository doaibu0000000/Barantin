/**
 * PengaturanTool.ts — Menu "Settings": Logout
 * Tidak menggunakan TerminalPanel maupun HeaderActionBar.
 * Berdiri sendiri sebagai SettingsList.
 * Tidak mengimpor/mengubah state menu lain.
 */

const RESPON_LIST = [
  'GA - PROSES VERIFIKASI',
  'GA - PENOLAKAN PERMOHONAN / PEMBERITAHUAN'
];

const POS_LAYANAN_LIST = [
  '3200.0 | -',
  '3200.1 | KANTOR POS MPC BANDUNG',
  '3200.2 | DRY PORT CIKARANG',
  '3200.3 | KANTOR POS BOGOR',
  '3200.4 | PELABUHAN LAUT MARUNDA',
  '3200.5 | TPK GEDE BAGE',
  '3200.6 | BANDARA HUSEIN SASTRANEGARA',
  '3200.7 | KANTOR POS TASIKMALAYA'
];

const PETUGAS_LIST = [
  'ENNIE SETYANI RAHAYU - 199106112022212001',
  'IDA HARTATI - 198101052003122003',
  'ACHMAD SURADI - 198011252006041014',
  'ZAENAL ABIDIN - 198710232015031002',
  'IKA SUHARTI - 198304132008012009',
  'DWI SANTOSA - 198406252014031001',
  'ISMAYANTI - 197402142003122004',
  'DEVI NURSANTI - 198408232011012017',
  'UCI SANUSI - 196909101990021002',
  'HUDAIBIYA AL FARUQIE - 198706282009121001',
  'BEBA BAIZAHROH - 199005022015032003',
  'YUNI ISWARI - 197906072009122002',
  'DEVI SARIYANTI - 197803142011012008',
  'ARDIANTI RETNANINGRUM - 197806112011012007',
  'ALTIFA - 197502132003122001',
  'CEP HENDRIANSYAH SUBAGJA - 198302282009121005',
  'ENENG YULIAWATI DEWI - 197707082009102001',
  'ARIF BUDIMAN - 199503292019021001',
  'YONO ARYONO - 198907232011011002',
  'MIA SRI LESTARI SYAF - 198101122009122003',
  'TRI SUGIYARTO - 198309302015031001',
  'LUSSY SILVIANINGRUM - 197606222003122001',
  'SARI WIDANINGSIH - 198710132009122003',
  'RADEN GALIHATI HASAN SAPUTRA - 198303062009122003',
  'IYAR - 196409261987032001',
  'BUDI SANTOSO - 197907022005021001',
  'RADEN BAYU SETIAWAN - 198406142009121007',
  'MAMAN - 198305132009121002',
  'ASRI DWIANDARY - 197801022002122003',
  'LATIFAH NURHAYATI - 198910312014032005',
  'RANTA HADI - 198009112006041002',
  'EDI KUSNADI - 198009272009121002',
  'HARNI NURMILLAH FAUZI - 198710242007012001',
  'WAWAN - 197205052006041035',
  'ANNISA EKAWIDA PUTRI - 199410312022032006',
  'RISTA MARYAM - 198703232009122004',
  'KHORI ARIANTI - 198205102014032001',
  'CACA PERMANA - 199001232009121003',
  'SANDI - 198206022011011012',
  'HARRIS P SILITONGA - 197602122000031001',
  'RISMA INDRA PURNAMA RD - 198605192011011009',
  'LINA ISTIANI - 197404061999032001',
  'RIZAN ABDUL SAMLI - 199306102014031001',
  'SRI IDEALTI PURBA - 197904282009122001',
  'RINA NURDIANA - 198302072011012009',
  'DESI SURASTINI - 197701022010122001',
  'DEVI AYU KOMALANINGRAT - 198104012011012010',
  'NURAENI RETNO - 198104072008012014',
  'CATUR OKI YUWONO - 198703112009121006',
  'MOHAMAD NUR SABARUDIN - 197607072005011001',
  'LIA HERAWATI - 198212192009012004',
  'ADE AMIRUDIN - 196907062002121001',
  'SHELLY EKA OCTAVIA MELAWATI - 198510152009122003',
  'NURAIDAH - 198802262009122005',
  'SHINTA STEPHANIE DIAN LESTARI - 198409022011012010',
  'DAYAT HIDAYAT - 197605232008121002',
  'YANI MAULANI - 197902102005022001',
  'CAHYONO - 198310292008011003',
  'INDRI KOMALASARI - 198207072011012011',
  'SAPRUDIN - 196804101995031001',
  'AEP CAHYANTO - 199207142015031002',
  'FARHAN M IKHSAN - 199706122022031002',
  'HARI ABDI - 197604102006041002',
  'MAYA PURNAMA ISMAYANTI - 198705082009122004',
  'NURHASANAH - 196901221990032001',
  'NOVI KUSUMANING ASTUTI - 198311242009122003',
  'ARIEF HIDAYAT - 198406032008011006',
  'CHRISTANTO - 198109202009121003',
  'FRANSISCA ARIS WIDYASTUTI - 197510062009122001',
  'DODY REAGEAN - 198111172006041004',
  'NOVA WIJAYA - 198311172011011007',
  'MUGIYANTO - 197902072009121002',
  'TITIEK SOELASTRI EKAWATI - 197812222005022002',
  'RONY MANGIHUTTUA HUTASOIT - 198309172011011012',
  'BERTHA AULIDYA SURI - 199109212022032005',
  'WAWAN HERAWAN - 197808162009121001',
  'ALI RAMDAN - 199601212019021004',
  'DODI FRANDIKA - 198701142011011006',
  'HARI RAMDAN SUHANDA - 198606172015031001',
  'MUHAMMAD ANGGA SAPUTRA - 199306072018011001',
  'WAWAN SYUHUD - 197004141991031002',
  'IRFAN JUANDA - 198708142009121009',
  'PUPUNG PURNAWAN - 198105152011011014',
  'APEP SAEPUDIN - 197112121994031003',
  'HERTI ENDANG ROSMAYANI - 197911122005012002',
  'SAPEI - 199212042015031001',
  'MATHEUS BAYU WAHYUDI - 197511022003121001',
  'DEDEN KURNIA - 197812302006041002',
  'RISKA RESTIKA NORI MEIDIANA - 199405092019022001',
  'IRHAM SIDIQ - 198806132009121003',
  'M.WAHYUNA SYAFEI - 196901091998031002',
  'HENDAYANI - 197907082003122002',
  'HARIS SANTOSA JUHANA - 198510022009011006',
  'ENENG RINA AGUSTINA - 198404072011012011',
  'ZULFIKAR BASRUL - 199206012022031001',
  'TARYU - 198106212008011009',
  'ASTRI HARTIANTI - 197604021999032003',
  'DADAN SAEFULOH - 198909082009121002',
  'HARI HARYANTO - 197611182005021001',
  'ROSADI - 197203211993031001',
  'PUJI LESTARI - 199511032019022003',
  'DEDE SRI RAHAYU - 197609192011012004',
  'R IDA ZULNIDA N - 197012011991032001',
  'ASTARINA UTARI - 199007142014032005',
  'JUNIAH - 198511042008012002',
  'YAYAT SUPRIYATNA - 199003192015031002',
  'RITA SARI DEWI - 197409292003122001',
  'BAMBANG GURITNO - 197211112003121001',
  'AHMAD ADE INDRAWAN - 196906092000031001',
  'ANDAR ASIH AMIATI - 198710242011012013',
  'ISMANTO - 198101032009011005',
  'AQEL JUANG AL QOSAM - 199604042019021001',
  'AGUS SUPRIYADI - 198208102008121001',
  'ENDRI NATALIANTORO - 198412252011011013',
  'BUDI HERDIANA - 197103222001121002',
  'EUIS WIDANENGSIH - 198210022009122002',
  'SUHERMAN - 196702031992031001',
  'NITA RYOLITA - 197811102003122001',
  'INDRA MULYANA - 198110172008011007',
  'WAWAN SETIA - 197612092009121001',
  'AHMAD RIZAL - 196707311992031002',
  'DEDI SUPRIADI - 198909032011011001',
  'DINAR DWI NUGROHO - 198708162009011001',
  'ADIZA LARASATI - 199412222019022002',
  'TSANI ISMI ISDARIYAH - 197606302010122002',
  'HERU HERLAMBANG - 197812242006041017',
  'NUR RAHMAHTRI RAHAYU - 198302162014032002',
  'DINI ROSALIA INDAH - 197610202008122002'
];

export const PengaturanTool = () => {
  return `
    <div class="flex flex-col w-full relative flex-1 min-h-0">
      <!-- Main Settings Menu -->
      <div id="settingsMainScreen" class="flex flex-col gap-2 text-white max-w-2xl w-full transition-opacity duration-300">
        
        <button type="button" id="btnConfigSurtu2" class="flex items-center justify-between bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-zinc-700/50 p-4 rounded-xl shadow-md transition-colors w-full text-left group">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-brand-accent rounded-lg text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-white">Konfigurasi Surtu 2</h3>
              <p class="text-xs text-zinc-400 mt-0.5">Pengaturan dan preferensi untuk Surtu 2</p>
            </div>
          </div>
          <svg class="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <button type="button" id="btnConfigDraft" class="flex items-center justify-between bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-zinc-700/50 p-4 rounded-xl shadow-md transition-colors w-full text-left group">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-brand-accent rounded-lg text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-white">Konfigurasi Draft</h3>
              <p class="text-xs text-zinc-400 mt-0.5">Pengaturan dan preferensi untuk Draft</p>
            </div>
          </div>
          <svg class="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <button type="button" id="btnConfigRevisi" class="flex items-center justify-between bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-zinc-700/50 p-4 rounded-xl shadow-md transition-colors w-full text-left group">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-brand-accent rounded-lg text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-white">Konfigurasi Revisi</h3>
              <p class="text-xs text-zinc-400 mt-0.5">Pengaturan dan preferensi untuk Revisi</p>
            </div>
          </div>
          <svg class="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <button type="button" id="btnPengaturanLogout" class="flex items-center justify-between bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 p-4 rounded-xl shadow-md transition-colors w-full text-left group">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-red-500 rounded-lg text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-red-400 group-hover:text-white transition-colors">Logout / Keluar</h3>
              <p class="text-xs text-red-400/70 group-hover:text-red-100 transition-colors mt-0.5">Akhiri sesi Anda saat ini</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Surtu 2 Sub-Screen -->
      <div id="settingsSurtu2Screen" class="hidden flex-col w-full z-10 transition-transform duration-300 flex-1 min-h-0">
        <!-- Top Bar -->
        <div class="flex items-center pb-2 border-b border-white/10 shrink-0">
          <button type="button" id="btnBackFromSurtu2" class="p-1 mr-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <h2 class="text-base font-semibold text-white">Konfigurasi Surtu 2</h2>
        </div>

        <!-- Form Content -->
        <div class="pt-3 pb-4 text-white w-full flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
          <div class="max-w-2xl w-full">
            <form id="surtu2Form" class="flex flex-col gap-2 bg-brand-input border border-brand-border rounded-lg px-4 py-3 md:px-5 md:py-4">
              <h3 class="text-sm font-bold text-white mb-3 tracking-wide uppercase">RESPON SSM</h3>
              
              <!-- Respon -->
              <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <label for="responSurtu2" class="text-[11px] font-semibold text-zinc-400 uppercase w-32 shrink-0">RESPON</label>
                <div class="flex-1 relative max-w-sm" id="responContainer">
                  <input type="text" id="responSearch" placeholder="Pilih atau cari respon..." class="w-full bg-transparent border border-zinc-600 rounded px-3 py-1.5 text-zinc-300 text-xs outline-none focus:border-brand-accent transition-colors" value="GA - PROSES VERIFIKASI" autocomplete="off" />
                  <input type="hidden" id="responSurtu2" value="GA - PROSES VERIFIKASI" />
                  <svg class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  
                  <!-- Custom Dropdown Menu -->
                  <div id="responDropdown" class="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto overflow-x-hidden bg-zinc-800 border border-zinc-600 rounded shadow-xl hidden">
                    <ul id="responListContainer" class="py-1"></ul>
                  </div>
                </div>
              </div>

              <!-- Pos Layanan -->
              <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <label for="posLayanan" class="text-[11px] font-semibold text-zinc-400 uppercase w-32 shrink-0">POS LAYANAN</label>
                <div class="flex-1 relative max-w-sm" id="posLayananContainer">
                  <input type="text" id="posLayananSearch" placeholder="Pilih atau cari pos layanan..." class="w-full bg-transparent border border-zinc-600 rounded px-3 py-1.5 text-zinc-300 text-xs outline-none focus:border-brand-accent transition-colors" value="3200.2 | DRY PORT CIKARANG" autocomplete="off" />
                  <input type="hidden" id="posLayanan" value="3200.2 | DRY PORT CIKARANG" />
                  <svg class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  
                  <!-- Custom Dropdown Menu -->
                  <div id="posLayananDropdown" class="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto overflow-x-hidden bg-zinc-800 border border-zinc-600 rounded shadow-xl hidden">
                    <ul id="posLayananListContainer" class="py-1"></ul>
                  </div>
                </div>
              </div>

              <!-- Tanggal Verifikasi -->
              <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <label for="tanggalVerifikasi" class="text-[11px] font-semibold text-zinc-400 uppercase w-32 shrink-0">TANGGAL VERIFIKASI</label>
                <div class="w-fit relative">
                  <input type="text" id="tanggalVerifikasi" value="24/07/2026 09:09" class="w-[180px] bg-transparent border border-zinc-600 rounded px-3 py-1.5 text-zinc-300 text-xs outline-none focus:border-brand-accent transition-colors" />
                  <svg class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
              </div>

              <!-- Petugas -->
              <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <label for="petugasSearch" class="text-[11px] font-semibold text-zinc-400 uppercase w-32 shrink-0">PETUGAS</label>
                <div class="flex-1 relative max-w-sm" id="petugasContainer">
                  <input type="text" id="petugasSearch" placeholder="Pilih atau cari petugas..." class="w-full bg-transparent border border-zinc-600 rounded px-3 py-1.5 text-zinc-300 text-xs outline-none focus:border-brand-accent transition-colors" value="DEDEN KURNIA - 197812302006041002" autocomplete="off" />
                  <input type="hidden" id="petugas" value="DEDEN KURNIA - 197812302006041002" />
                  <svg class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  
                  <!-- Custom Dropdown Menu -->
                  <div id="petugasDropdown" class="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto overflow-x-hidden bg-zinc-800 border border-zinc-600 rounded shadow-xl hidden">
                    <ul id="petugasListContainer" class="py-1"></ul>
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mt-1">
                <div class="w-32 shrink-0 hidden md:block"></div> <!-- Spacing to align buttons -->
                <div class="flex items-center gap-3">
                  <button type="button" id="btnSimpanSurtu2" class="flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold transition-all shadow-md shrink-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Simpan
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const bindPengaturanToolEvents = () => {
  // Logout
  const logoutBtn = document.getElementById('btnPengaturanLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isAuthenticated');
      window.location.reload();
    });
  }

  // Menu Navigation Logic for Surtu 2
  const mainScreen = document.getElementById('settingsMainScreen');
  const surtu2Screen = document.getElementById('settingsSurtu2Screen');
  const btnConfigSurtu2 = document.getElementById('btnConfigSurtu2');
  const btnBackFromSurtu2 = document.getElementById('btnBackFromSurtu2');

  let surtu2TimeInterval: ReturnType<typeof setInterval>;

  const updateTanggalVerifikasi = () => {
    const tanggalInput = document.getElementById('tanggalVerifikasi') as HTMLInputElement;
    if (tanggalInput) {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      tanggalInput.value = `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    }
  };

  if (btnConfigSurtu2 && mainScreen && surtu2Screen) {
    btnConfigSurtu2.addEventListener('click', () => {
      mainScreen.classList.add('hidden');
      mainScreen.classList.remove('flex');
      surtu2Screen.classList.remove('hidden');
      surtu2Screen.classList.add('flex');

      // Update waktu ke saat ini dan jalankan interval agar realtime
      updateTanggalVerifikasi();
      if (surtu2TimeInterval) clearInterval(surtu2TimeInterval);
      surtu2TimeInterval = setInterval(updateTanggalVerifikasi, 1000);
    });
  }

  if (btnBackFromSurtu2 && mainScreen && surtu2Screen) {
    btnBackFromSurtu2.addEventListener('click', () => {
      surtu2Screen.classList.add('hidden');
      surtu2Screen.classList.remove('flex');
      mainScreen.classList.remove('hidden');
      mainScreen.classList.add('flex');

      // Hentikan interval saat keluar dari layar konfigurasi
      if (surtu2TimeInterval) clearInterval(surtu2TimeInterval);
    });
  }

  // Reusable Custom Dropdown Logic
  const setupCustomDropdown = (
    containerId: string,
    searchId: string,
    hiddenId: string,
    dropdownId: string,
    listContainerId: string,
    dataList: string[]
  ) => {
    const container = document.getElementById(containerId);
    const search = document.getElementById(searchId) as HTMLInputElement;
    const hidden = document.getElementById(hiddenId) as HTMLInputElement;
    const dropdown = document.getElementById(dropdownId);
    const listContainer = document.getElementById(listContainerId);

    if (container && search && hidden && dropdown && listContainer) {
      let currentFocus = -1;

      const renderList = (filterText = '') => {
        const filtered = dataList.filter(p => p.toLowerCase().includes(filterText.toLowerCase()));
        if (filtered.length === 0) {
          listContainer.innerHTML = '<li class="px-3 py-2 text-xs text-zinc-500">Tidak ditemukan</li>';
        } else {
          listContainer.innerHTML = filtered.map(p => `
            <li class="px-3 py-1.5 text-xs text-zinc-300 hover:bg-brand-accent hover:text-white cursor-pointer transition-colors truncate list-item-custom" data-value="${p}" title="${p}">
              ${p}
            </li>
          `).join('');
        }
        currentFocus = -1;

        listContainer.querySelectorAll('li[data-value]').forEach(li => {
          li.addEventListener('click', (e) => {
            e.stopPropagation();
            const val = li.getAttribute('data-value') || '';
            search.value = val;
            hidden.value = val;
            dropdown.classList.add('hidden');
          });
        });
      };

      search.addEventListener('focus', () => {
        document.dispatchEvent(new CustomEvent('closeOtherCustomDropdowns', { detail: { exclude: containerId } }));
        dropdown.classList.remove('hidden');
        renderList('');
      });

      search.addEventListener('click', (e) => {
        e.stopPropagation();
        document.dispatchEvent(new CustomEvent('closeOtherCustomDropdowns', { detail: { exclude: containerId } }));
        dropdown.classList.remove('hidden');
        renderList('');
      });

      document.addEventListener('closeOtherCustomDropdowns', (e: any) => {
        if (e.detail && e.detail.exclude !== containerId) {
          dropdown.classList.add('hidden');
          search.value = hidden.value;
        }
      });

      search.addEventListener('input', (e) => {
        dropdown.classList.remove('hidden');
        renderList((e.target as HTMLInputElement).value);
      });

      const addActive = (items: HTMLCollectionOf<Element>) => {
        if (!items || items.length === 0) return;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        const activeItem = items[currentFocus] as HTMLElement;
        activeItem.classList.add('bg-brand-accent', 'text-white');
        activeItem.scrollIntoView({ block: 'nearest' });
      };

      const removeActive = (items: HTMLCollectionOf<Element>) => {
        for (let i = 0; i < items.length; i++) {
          items[i].classList.remove('bg-brand-accent', 'text-white');
        }
      };

      search.addEventListener('keydown', (e) => {
        let items = listContainer.getElementsByClassName('list-item-custom');
        if (e.key === 'ArrowDown') {
          currentFocus++;
          addActive(items);
          e.preventDefault();
        } else if (e.key === 'ArrowUp') {
          currentFocus--;
          addActive(items);
          e.preventDefault();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (currentFocus > -1 && items.length > 0) {
            (items[currentFocus] as HTMLElement).click();
          } else if (items.length === 1) {
            (items[0] as HTMLElement).click();
          }
        } else if (e.key === 'Escape') {
          dropdown.classList.add('hidden');
          search.value = hidden.value;
          search.blur();
        }
      });

      document.addEventListener('click', (e) => {
        if (!container.contains(e.target as Node)) {
          dropdown.classList.add('hidden');
          search.value = hidden.value;
        }
      });
    }
  };

  // Setup Custom Dropdowns
  setupCustomDropdown('responContainer', 'responSearch', 'responSurtu2', 'responDropdown', 'responListContainer', RESPON_LIST);
  setupCustomDropdown('posLayananContainer', 'posLayananSearch', 'posLayanan', 'posLayananDropdown', 'posLayananListContainer', POS_LAYANAN_LIST);
  setupCustomDropdown('petugasContainer', 'petugasSearch', 'petugas', 'petugasDropdown', 'petugasListContainer', PETUGAS_LIST);

  // Handle Simpan Button Click (Save to LocalStorage)
  const btnSimpanSurtu2 = document.getElementById('btnSimpanSurtu2');
  const responSurtu2 = document.getElementById('responSurtu2') as HTMLInputElement;
  const responSearch = document.getElementById('responSearch') as HTMLInputElement;
  const posLayanan = document.getElementById('posLayanan') as HTMLInputElement;
  const posLayananSearch = document.getElementById('posLayananSearch') as HTMLInputElement;
  const petugasHidden = document.getElementById('petugas') as HTMLInputElement;
  const petugasSearch = document.getElementById('petugasSearch') as HTMLInputElement;

  // Initialize from saved defaults if they exist
  if (responSurtu2 && responSearch && localStorage.getItem('surtu2_respon')) {
    const savedRespon = localStorage.getItem('surtu2_respon') || '';
    responSurtu2.value = savedRespon;
    responSearch.value = savedRespon;
  }
  if (posLayanan && posLayananSearch && localStorage.getItem('surtu2_posLayanan')) {
    const savedPos = localStorage.getItem('surtu2_posLayanan') || '';
    posLayanan.value = savedPos;
    posLayananSearch.value = savedPos;
  }
  if (petugasSearch && petugasHidden && localStorage.getItem('surtu2_petugas')) {
    const savedPetugas = localStorage.getItem('surtu2_petugas') || '';
    petugasSearch.value = savedPetugas;
    petugasHidden.value = savedPetugas;
  }

  if (btnSimpanSurtu2) {
    btnSimpanSurtu2.addEventListener('click', () => {
      if (responSurtu2) localStorage.setItem('surtu2_respon', responSurtu2.value);
      if (posLayanan) localStorage.setItem('surtu2_posLayanan', posLayanan.value);
      if (petugasHidden) localStorage.setItem('surtu2_petugas', petugasHidden.value);

      // Visual feedback
      const originalHtml = btnSimpanSurtu2.innerHTML;
      btnSimpanSurtu2.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Tersimpan!';
      btnSimpanSurtu2.classList.replace('bg-brand-accent', 'bg-green-600');
      btnSimpanSurtu2.classList.replace('hover:bg-brand-accent-hover', 'hover:bg-green-700');

      setTimeout(() => {
        btnSimpanSurtu2.innerHTML = originalHtml;
        btnSimpanSurtu2.classList.replace('bg-green-600', 'bg-brand-accent');
        btnSimpanSurtu2.classList.replace('hover:bg-green-700', 'hover:bg-brand-accent-hover');
      }, 2000);
    });
  }
};

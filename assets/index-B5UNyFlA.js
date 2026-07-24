(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const c of d.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(s){if(s.ep)return;s.ep=!0;const d=e(s);fetch(s.href,d)}})();const X=(o="Surtu 2")=>{const t=[{id:"Surtu 2",label:"Surtu 2",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'},{id:"Draft",label:"Draft",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'},{id:"Revisi",label:"Revisi",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>'}];return`
    <aside class="fixed bottom-0 left-0 w-full md:relative md:w-[280px] bg-brand-panel border-t md:border border-white/5 md:rounded-xl p-2 md:p-6 flex flex-row md:flex-col shrink-0 shadow-2xl z-50">
      <div class="hidden md:flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold tracking-wide text-white text-left w-full">Barantin Tools</h2>
      </div>
      <nav id="sidebarNav" class="flex flex-row md:flex-col justify-around md:justify-start w-full md:gap-1.5 flex-1">
        ${t.map(i=>`
      <a href="#" class="nav-item flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all ${i.id===o?"active text-brand-accent md:bg-brand-accent-bg font-semibold":"text-brand-text-muted hover:text-white md:hover:bg-white/5"}" data-menu="${i.id}">
        ${i.icon}
        <span>${i.label}</span>
      </a>
    `).join("")}
        <a href="#" onclick="window.location.reload(true); return false;" class="flex md:hidden flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all text-brand-text-muted hover:text-white">
          <svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          <span>Reload</span>
        </a>
        
        <button class="logout-btn flex md:hidden flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all text-red-400 hover:text-red-300">
          <svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span>Keluar</span>
        </button>

        <div class="hidden md:block mt-auto pt-6 w-full">
          <button class="logout-btn flex flex-row items-center justify-start gap-3 px-4 py-3 rounded-lg w-full text-base transition-all text-brand-text-muted hover:text-white hover:bg-white/5 hover:text-red-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  `},Y=o=>{const t=document.querySelectorAll(".nav-item");t.forEach(i=>{i.addEventListener("click",s=>{s.preventDefault();const d=i.getAttribute("data-menu");t.forEach(c=>{c.classList.remove("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),c.classList.add("text-brand-text-muted")}),i.classList.remove("text-brand-text-muted"),i.classList.add("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),o&&d&&o(d)})}),document.querySelectorAll(".logout-btn").forEach(i=>{i.addEventListener("click",s=>{s.preventDefault(),localStorage.removeItem("isAuthenticated"),window.location.reload()})})};let G="",K="",J=!1;function C(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(o){var t=Math.random()*16|0,e=o=="x"?t:t&3|8;return e.toString(16)})}const Q=(o,t,e)=>{var m,p,n,h,v;const i=(t==null?void 0:t.DOKUMEN)||{},s=i.HEADER||{},d=s.PERUSAHAAN||{},c=d.PJAWAB||{},b=s.PENGIRIM||{},g=s.PEMASOK||s.PENERIMA||{},r=((m=i.GA)==null?void 0:m.KARANTINA)||{},_=r.INSTALASI||{},w=r.PEMERIKSAAN||{},x=(((p=i.ITEMS)==null?void 0:p.BARANG)||[]).map(a=>{var k,f,S,M,E,L,I,P,j,N,B;return{id:C(),ptk_id:"",kode_hs:a.KDHS||"",kode_hs10:a.KDHS10||"",klasifikasi_id:((f=(k=a.GA)==null?void 0:k.KARANTINA)==null?void 0:f.KLASIFIKASI)||"2C0",komoditas_id:((M=(S=a.GA)==null?void 0:S.KARANTINA)==null?void 0:M.ID_KOMODITI)||"1149",nama_umum_tercetak:a.URAIAN||"",nama_latin_tercetak:((L=(E=a.GA)==null?void 0:E.KARANTINA)==null?void 0:L.NMLATIN)||"",jenisMp:"Non Benih",jenisMpId:5,bentukMp:((P=(I=a.GA)==null?void 0:I.KARANTINA)==null?void 0:P.KLASIFIKASI)||"2C0",negaraAsalMp:a.NEGASALBRG||"ID",jantan:null,betina:null,negaraAsalMpId:99,volume_netto:parseFloat(a.NETTO)||0,volume_bruto:parseFloat(a.BRUTO)||0,satuan_bruto_id:"1356",satuan_netto_id:"1356",keterangan:"",sat_tercetak_netto:a.JNSSATUAN||"KGM",volume_lain:parseFloat(a.JMLSATUAN)||0,satuan_lain_id:1356,sat_tercetak_lain:a.JNSSATUAN||"KGM",jumlah_kemasan:parseFloat(a.JMLKEMAS)||0,kemasan_id:2,kemasan:a.JNSKEMAS||"BG",mata_uang:((j=a.KURS)==null?void 0:j.KODE)||"USD",kurs:parseFloat((N=a.KURS)==null?void 0:N.NILAI)||15e3,harga:parseFloat(a.HARGA)||0,harga_rp:(parseFloat(a.HARGA)||0)*(parseFloat((B=a.KURS)==null?void 0:B.NILAI)||15e3)*(parseFloat(a.JMLSATUAN)||0)}}),A=(((n=i.CONTLIST)==null?void 0:n.CONT)||[]).map(a=>({id:C(),ptk_id:"",nomor:a.NOCONT||"xxxxxx",size:(a.UKCONT||"20")+" feet",ukuran_kontainer_id:"2",stuff_kontainer_id:"1",stuff:a.TPCONT||"FCL",segel:a.NOSEAL||"",tipe_kontainer_id:"1"})),l=(((h=i.DOKUMENLAMPIRAN)==null?void 0:h.DOK)||[]).map(a=>({id:C(),ptk_id:"",jenis_dokumen_id:a.JENIS||"99",jenisDokumenUraian:"Lainnya",kategori_dokumen:"S",no_dokumen:a.NOMOR||"",instansi_penerbit:"",tanggal_dokumen:a.TANGGAL?a.TANGGAL.replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3"):"",negara_asal_id:"99",negaraAsalDokumen:a.NEGPENERBIT||"ID",kota_kab_asal_id:"",keterangan:"",efile:a.FILELINK||""})),u=C();return x.forEach(a=>a.ptk_id=u),A.forEach(a=>a.ptk_id=u),l.forEach(a=>a.ptk_id=u),{id:u,tssm_id:o.id,no_aju:o.noReg||o.noAju,jenis_dokumen:"PTK",jenis_karantina:o.jenis_karantina==="Tumbuhan"?"T":o.jenis_karantina==="Hewan"?"H":"I",jenis_media_pembawa_id:"5",stat_pemohon:"PEMILIK",is_guest:"0",user_id:(e==null?void 0:e.id)||"3267",pengguna_jasa_id:(e==null?void 0:e.pengguna_jasa_id)||"9e7347a8-ea62-4aee-899e-ea7087949eb7",calo_id:"0",upt_id:o.upt,kode_satpel:o.upt,nama_pemohon:d.NAMA||o.nmPerusahaan,jenis_identitas_pemohon:"NPWP",nomor_identitas_pemohon:d.ID||o.npwp,alamat_pemohon:d.ALAMAT||"",telepon_pemohon:"0",fax_pemohon:"0",provinsi_pemohon_id:"33",kota_kab_pemohon_id:"3328",nama_cp:c.NAMA||"",alamat_cp:c.ALAMAT||"",telepon_cp:c.EMAIL||"",nama_ttd:c.NAMA||"",jenis_identitas_ttd:"LAINNYA",nomor_identitas_ttd:d.ID||o.npwp,jabatan_ttd:c.JABATAN||"DIREKTUR",alamat_ttd:c.ALAMAT||"",jenis_permohonan:o.jnsAju==="EKSPOR"?"EX":o.jnsAju==="IMPOR"?"IM":"DP",nama_pengirim:b.NMPENGIRIM||d.NAMA||"",alamat_pengirim:b.ALPENGIRIM||d.ALAMAT||"",telepon_pengirim:"0",jenis_identitas_pengirim:"NPWP",nomor_identitas_pengirim:d.ID||o.npwp,provinsi_pengirim_id:"33",kota_kab_pengirim_id:"3328",negara_pengirim_id:"99",nama_penerima:g.NMPEMASOK||g.NMPENERIMA||"",alamat_penerima:g.ALPEMASOK||g.ALAMAT||"",telepon_penerima:"",jenis_identitas_penerima:"LAINNYA",nomor_identitas_penerima:"",provinsi_penerima_id:"",kota_kab_penerima_id:"",negara_penerima_id:"186",is_from_ptk:"2",tanggal_rencana_masuk:"",negara_muat_id:"99",negara_bongkar_id:"186",negara_transit_id:"",pelabuhan_muat_id:"134",pelabuhan_bongkar_id:"53427",moda_alat_angkut_transit_id:"0",tipe_alat_angkut_transit_id:"",nama_alat_angkut_transit:"",bendera_alat_angkut_transit_id:"0",no_voyage_transit:"",call_sign_transit:"NIHIL",tanggal_rencana_tiba_transit:"",tanggal_rencana_berangkat_transit:"",moda_alat_angkut_terakhir_id:1,moda_alat_angkut_lainnya:"",tipe_alat_angkut_terakhir_id:"3",nama_alat_angkut_terakhir:"-",bendera_alat_angkut_terakhir_id:"186",no_voyage_terakhir:"-",call_sign_terakhir:"NIHIL",tanggal_rencana_tiba_terakhir:"",tanggal_rencana_berangkat_terakhir:"2026-07-27",is_transit:"0",is_kontainer:"2",sumber_mp:"",area_tangkap_id:"",mutuIkan:"",peruntukan_id:r.PERUNTUKAN||"5",peruntukan_lainnya:"",kemasan_id:"2",merk_kemasan:"560 Bag",jumlah_kemasan:"560",tanda_khusus:"",nilai_barang:r.NILAI||"0",mata_uang:"IDR",negara_asal_id:"99",negara_tujuan_id:"186",kota_kab_asal_id:"3172",kota_kab_tujuan_id:"",tingkat_pengolahan:r.TINGKATPENGOLAHAN||"2",informasi_tambahan:"",tgl_pemeriksaan:w.TGPERIKSA||"",tempat_pemeriksaan:"D",kode_gudang:null,jenis_tempat:_.JNS||"IK",nama_tempat_pemeriksaan:_.NAMA||"",alamat_tempat_pemeriksaan:_.ALAMAT||"",instalasi_karantina_id:null,status_ptk:"1",tgl_dok_permohonan:((v=o.tglAju)==null?void 0:v.substring(0,16))||"",is_draft:"1",is_verifikasi:"1",petugas:(e==null?void 0:e.petugas)||"SUHERMAN",nip:(e==null?void 0:e.nip)||"196702031992031001",tgl_aju:o.tglAju||"",user_created:(e==null?void 0:e.id)||"3267",komoditi:x,kontainer:A,dokumen:l}},V=()=>`
    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-sm font-semibold text-white">Nomor AJU SSM / PTK</label>
      <div class="relative">
        <textarea id="cookieContent" placeholder="Contoh :&#10;30104S14616EA2026071000009&#10;32002EXT260709130318MBZS1S" class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
        
        <!-- Loading Overlay -->
        <div id="cookieLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 mt-2 mb-1">
      <input type="checkbox" id="autoProcessPtk" class="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand-accent focus:ring-brand-accent focus:ring-offset-zinc-900" ${J?"checked":""}>
      <label for="autoProcessPtk" class="text-sm text-zinc-300 select-none cursor-pointer">Otomatis Proses PTK & Verifikasi (GA)</label>
    </div>

    <button type="button" id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md">
      Proses Data
    </button>

    <div class="flex flex-col gap-2 relative">
      <textarea id="processingResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
      
      <div class="flex gap-2 mt-2">
        <button type="button" id="copyBtn" class="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md flex items-center justify-center gap-2 hidden">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          <span id="copyText">Salin Text</span>
        </button>
      </div>
    </div>

  `,z=()=>{const o=document.getElementById("processBtn"),t=document.getElementById("cookieContent"),e=document.getElementById("processingResults"),i=document.getElementById("copyBtn"),s=document.getElementById("copyText"),d=document.getElementById("cookieLoader"),c=document.getElementById("autoProcessPtk");c&&c.addEventListener("change",()=>{J=c.checked}),t&&(t.value=G,t.addEventListener("input",()=>{G=t.value})),e&&(e.value=K),i&&(K?i.classList.remove("hidden"):i.classList.add("hidden"));const b=(g,r)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{r(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},g)};i&&i.addEventListener("click",async()=>{const g=e.value;if(g)try{await navigator.clipboard.writeText(g);const r=s.innerText;s.innerText="Tersalin!",i.classList.replace("bg-zinc-800","bg-green-600"),i.classList.replace("hover:bg-zinc-700","hover:bg-green-500"),i.classList.replace("border-zinc-700","border-green-500"),setTimeout(()=>{s.innerText=r,i.classList.replace("bg-green-600","bg-zinc-800"),i.classList.replace("hover:bg-green-500","hover:bg-zinc-700"),i.classList.replace("border-green-500","border-zinc-700")},2e3)}catch(r){console.error("Failed to copy text: ",r)}}),t&&t.addEventListener("input",()=>{const g=t.value,r=/([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g,_=g.match(r);if(_&&_.length>0){const w=_.join(`
`);g.replace(r,"").trim().length>0&&b(600,()=>{t.value=w})}}),o&&o.addEventListener("click",async()=>{const g=t.value;if(!g.trim()){e.value="Silakan masukan terlebih dahulu teks atau No SSM / PTK untuk diproses.",e.classList.add("text-red-500"),i&&i.classList.add("hidden");return}e.classList.remove("text-red-500");const r=/([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g,_=g.match(r);if(_&&_.length>0){o.disabled=!0,o.textContent="Mencari Data...",e.value="Sedang mengambil data dari server, mohon tunggu...";let w="";const x=async(p,n)=>{const h=new Date().toISOString().split("T")[0];let v="";const a=/(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/,k=p.match(a);if(k&&parseInt(k[1])>=2020)v=`${k[1]}-${k[2]}-${k[3]}`;else{const E=/(?:EXT|IMP|DOM)(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/,L=p.match(E);if(L)v=`20${L[1]}-${L[2]}-${L[3]}`;else{const I=new Date;I.setFullYear(I.getFullYear()-1),v=I.toISOString().split("T")[0]}}let f="3200";const S=localStorage.getItem("userData");if(S)try{f=JSON.parse(S).upt||"3200"}catch{}const M={dFrom:v,dTo:h,stat:"",karantina:"",upt:f,jnsAju:"EKSPOR",jeniscari:n,noAju:p};try{const E=await fetch("https://api.karantinaindonesia.go.id/ssm/getAju",{method:"POST",headers:{Authorization:"Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm","Content-Type":"application/json"},body:JSON.stringify(M)});if(!E.ok)return null;const L=await E.json();return L.status&&L.data&&L.data.length>0?L.data[0]:null}catch{return null}},l=await new Promise(p=>{const n=localStorage.getItem("accessToken")||localStorage.getItem("token");if(n){p(n);return}if(typeof chrome<"u"&&chrome.cookies)chrome.cookies.getAll({domain:"apps.karantinaindonesia.go.id"},h=>{const v=h.find(a=>a.name==="token");p(v?v.value:"")});else{const h=document.cookie.match(/(?:^|; )token=([^;]*)/);p(h?h[1]:"")}}),u=_.map(async p=>{var S,M,E,L;let n=`
--- MENCARI AJU: ${p} ---
`,h="",v="";const[a,k]=await Promise.all([x(p,"noAju"),x(p,"noReg")]);let f=a||k;if(f){if(v=f.ptk_id||f.id||"",f.noReg&&(h=f.noReg),v&&l)try{const y=await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk/${v}`,{headers:{Authorization:`Bearer ${l}`}});if(y.ok){const T=await y.json();(M=(S=T==null?void 0:T.data)==null?void 0:S.ptk)!=null&&M.no_dok_permohonan&&(h=T.data.ptk.no_dok_permohonan)}}catch(y){console.error("Failed to fetch PTK details",y)}let I="-",P="-",j="-",N=null;if(f.xml)try{N=JSON.parse(f.xml);const y=(L=(E=N==null?void 0:N.DOKUMEN)==null?void 0:E.ITEMS)==null?void 0:L.BARANG;if(y&&y.length>0){const T=y[0];I=T.URAIAN?T.URAIAN.trim():"-",P=`${T.NETTO||"-"} ${T.JNSSATUAN||""}`.trim(),j=`${T.JMLKEMAS||"-"} ${T.JNSKEMAS||""}`.trim(),y.length>1&&(I+=` (+${y.length-1} item lainnya)`)}}catch(y){console.error("Failed parsing xml",y)}if(n+=`Status         : DITEMUKAN (${f.jnsAju})
`,n+=`No Aju SSM     : ${f.noAju||"-"}
`,n+=`No Dokumen     : ${h||f.noReg||"-"}
`,n+=`Perusahaan     : ${f.nmPerusahaan||"-"}
`,n+=`Barang         : ${I}
`,n+=`Netto          : ${P}
`,n+=`Kemasan        : ${j}
`,n+=`Alat Angkut    : ${f.namaAngkut||"-"}
`,n+=`Tgl Tiba       : ${f.tglTiba||"-"}
`,n+=`Pelabuhan Asal : ${f.portAsal||"-"}
`,n+=`Pelabuhan Tuju : ${f.portTujuan||"-"}
`,n+=`Karantina      : ${f.jenis_karantina||"-"}
`,n+=`UPT            : ${f.upt||"-"}
`,n+=`[DEBUG] Token      : ${l?"ADA":"KOSONG"}
`,n+=`[DEBUG] XML Parsed : ${N?"BERHASIL":"GAGAL/KOSONG"}
`,n+=`[DEBUG] Checkbox   : ${c&&c.checked?"DICENTANG":"TIDAK DICENTANG"}
`,c&&c.checked&&N)if(!l)n+=`Status PTK     : GAGAL (Sesi Token tidak ditemukan. Silakan ke menu Login terlebih dahulu)
`;else try{const y=localStorage.getItem("userData"),T=y?JSON.parse(y):{},$=Q(f,N,T),R=await fetch("https://api.karantinaindonesia.go.id/barantin-sys/ssm",{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify($)});if(R.ok||R.status===201){const O=await R.json();if(O.status==="201"||O.status===!0){n+=`Status PTK     : BERHASIL DIBUAT (ID: ${$.id})
`;const D=await fetch("https://api.karantinaindonesia.go.id/ssm/sendStatus/ptk",{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({id:f.id,ptk_id:$.id,noReg:f.noReg||f.noAju})});D.ok||D.status===201?n+=`Verifikasi     : BERHASIL (GA - PROSES VERIFIKASI)
`:n+=`Verifikasi     : GAGAL DIPROSES
`}else n+=`Status PTK     : GAGAL (${O.message||"Unknown Error"})
`}else n+=`Status PTK     : GAGAL (HTTP ${R.status})
`}catch(y){n+=`Status PTK     : ERROR (${y.message})
`}n+=`
--- DATA JSON LENGKAP ---
`;const B={...f};if(B.xml)try{B.xml=JSON.parse(B.xml)}catch{}n+=JSON.stringify(B,null,2)+`
`}else n+=`Status         : TIDAK DITEMUKAN / GAGAL
`;return n});w=(await Promise.all(u)).join(""),e.value=w.trim(),K=w.trim(),o.disabled=!1,o.textContent="Proses Data",i&&i.classList.remove("hidden")}else e.value="Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.",K=e.value,i&&i.classList.add("hidden")})},q=()=>`
    <div class="flex flex-col gap-4 h-full">
      <div class="flex flex-row items-center gap-3 mb-2">
        <div class="flex w-fit bg-zinc-800/50 p-1 rounded-lg">
          <button type="button" id="tabPdf" class="px-4 py-2 text-sm font-semibold rounded-md bg-brand-accent text-white transition-all">PDF</button>
          <button type="button" id="tabDoc" class="px-4 py-2 text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No Dokumen</button>
        </div>
        
        <textarea rows="1" maxlength="6" id="quickDocNumber" placeholder="No KT" class="w-20 h-[38px] bg-brand-input border border-brand-border rounded-lg px-2 py-2 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors text-center resize-none overflow-hidden whitespace-nowrap leading-tight"></textarea>
      </div>

      <div id="pdfSection" class="flex flex-col gap-2">
        <div class="relative">
          <input type="file" id="pdfUpload" accept=".pdf" class="hidden" />
          <label for="pdfUpload" class="w-full h-[140px] bg-brand-input hover:bg-brand-input/80 border border-brand-border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-brand-text-muted hover:text-white">
            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <span id="pdfFileName" class="text-sm font-medium">Klik untuk memilih file PDF</span>
          </label>
        </div>
      </div>

      <div id="docSection" class="flex flex-col gap-2 hidden relative">
        <textarea id="docNumber" placeholder="Masukan no KT" class="w-full h-[140px] bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none"></textarea>
        
        <!-- Loading Overlay -->
        <div id="docLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
          </div>
        </div>
      </div>

      <button type="button" id="processDraftBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md mt-auto">
        Buat Draft
      </button>

      <div class="flex flex-col gap-2 mt-4">
        <textarea id="draftResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors h-32" readonly></textarea>
      </div>
    </div>
  `,U=()=>{let o=localStorage.getItem("draftActiveTab")||"pdf";const t=document.getElementById("tabPdf"),e=document.getElementById("tabDoc"),i=document.getElementById("pdfSection"),s=document.getElementById("docSection"),d=document.getElementById("docLoader"),c=document.getElementById("quickDocNumber"),b=document.getElementById("pdfUpload"),g=document.getElementById("pdfFileName"),r=document.getElementById("docNumber"),_=document.getElementById("processDraftBtn"),w=document.getElementById("draftResults"),x=(l,u)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{u(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},l)},A=l=>{o=l,localStorage.setItem("draftActiveTab",l),l==="pdf"?(t==null||t.classList.add("bg-brand-accent","text-white"),t==null||t.classList.remove("text-brand-text-muted","hover:text-white"),e==null||e.classList.remove("bg-brand-accent","text-white"),e==null||e.classList.add("text-brand-text-muted","hover:text-white"),i==null||i.classList.remove("hidden"),s==null||s.classList.add("hidden")):(e==null||e.classList.add("bg-brand-accent","text-white"),e==null||e.classList.remove("text-brand-text-muted","hover:text-white"),t==null||t.classList.remove("bg-brand-accent","text-white"),t==null||t.classList.add("text-brand-text-muted","hover:text-white"),s==null||s.classList.remove("hidden"),i==null||i.classList.add("hidden"))};if(A(o),t==null||t.addEventListener("click",()=>A("pdf")),e==null||e.addEventListener("click",()=>A("doc")),c&&r){c.addEventListener("focus",()=>{c.placeholder=""}),c.addEventListener("blur",()=>{c.placeholder="No KT"});let l,u="";c.addEventListener("input",()=>{let m=c.value.replace(/\D/g,"");m.length>6&&(m=m.slice(0,6)),c.value=m,m!==u&&(u=m,clearTimeout(l),m.length>0?l=setTimeout(()=>{const p=m.padStart(6,"0");x(600,()=>{r.value=`2026-T1.0-3200.2-K.1.1-${p}`})},400):r.value="")})}if(r){let l;r.addEventListener("input",()=>{clearTimeout(l);const u=r.value;if(!u)return;const m=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,p=u.match(m);if(p&&p.length>0){const n=p.map(a=>{const k=a.toUpperCase(),f=k.match(/\d{4,6}$/);return f?`2026-T1.0-3200.2-K.1.1-${f[0].padStart(6,"0")}`:k}).join(`
`);u.replace(m,"").trim().length>0&&x(600,()=>{r.value=n})}else l=setTimeout(()=>{const h=r.value.match(/\b\d{3,6}\b/g);if(h&&h.length>0){const v=h.map(a=>`2026-T1.0-3200.2-K.1.1-${a.padStart(6,"0")}`);x(600,()=>{r.value=v.join(`
`)})}},800)}),r.addEventListener("change",()=>{clearTimeout(l);const u=r.value;if(!/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi.test(u)){const p=u.match(/\b\d{3,6}\b/g);if(p&&p.length>0){const n=p.map(h=>`2026-T1.0-3200.2-K.1.1-${h.padStart(6,"0")}`);x(600,()=>{r.value=n.join(`
`)})}}})}b&&g&&b.addEventListener("change",l=>{const u=l.target;u.files&&u.files.length>0?(g.textContent=u.files[0].name,g.classList.remove("text-brand-text-muted"),g.classList.add("text-brand-accent")):(g.textContent="Klik untuk memilih file PDF",g.classList.add("text-brand-text-muted"),g.classList.remove("text-brand-accent"))}),_&&_.addEventListener("click",()=>{var u;let l="";if(o==="pdf"){const m=(u=b==null?void 0:b.files)==null?void 0:u[0];if(!m){w.value="Silakan pilih file PDF terlebih dahulu.",w.classList.add("text-red-500");return}w.classList.remove("text-red-500"),l=`File PDF yang dipilih: ${m.name}`}else{let m=r.value.trim();if(!m){w.value="Silakan masukkan Nomor Dokumen terlebih dahulu.",w.classList.add("text-red-500");return}w.classList.remove("text-red-500");let p=m;const n=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,h=m.match(n);if(h&&h.length>0)p=h.map(v=>{const a=v.toUpperCase(),k=a.match(/\d{4,6}$/);return k?`2026-T1.0-3200.2-K.1.1-${k[0].padStart(6,"0")}`:a}).join(`
`);else{const v=m.match(/\b\d{1,6}\b/g);if(v){const a=v.reverse().find(k=>k.length>=3&&k.length<=6)||v[0];a&&(p=`2026-T1.0-3200.2-K.1.1-${a.padStart(6,"0")}`)}}r.value=p,l=`Nomor Dokumen:
${p}`}w.value=l+`

Done`})},Z=()=>`
    <div class="flex flex-col gap-4 h-full">
      <div class="flex flex-row items-center gap-3 mb-2">
        <div class="flex w-fit bg-zinc-800/50 p-1 rounded-lg">
          <button type="button" id="tabPdf" class="px-4 py-2 text-sm font-semibold rounded-md bg-brand-accent text-white transition-all">PDF</button>
          <button type="button" id="tabDoc" class="px-4 py-2 text-sm font-semibold rounded-md text-brand-text-muted hover:text-white transition-all">No Dokumen</button>
        </div>
        
        <textarea rows="1" maxlength="6" id="quickDocNumber" placeholder="No KT" class="w-20 h-[38px] bg-brand-input border border-brand-border rounded-lg px-2 py-2 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors text-center resize-none overflow-hidden whitespace-nowrap leading-tight"></textarea>
      </div>

      <div id="pdfSection" class="flex flex-col gap-2">
        <div class="relative">
          <input type="file" id="pdfUpload" accept=".pdf" class="hidden" />
          <label for="pdfUpload" class="w-full h-[140px] bg-brand-input hover:bg-brand-input/80 border border-brand-border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-brand-text-muted hover:text-white">
            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <span id="pdfFileName" class="text-sm font-medium">Klik untuk memilih file PDF</span>
          </label>
        </div>
      </div>

      <div id="docSection" class="flex flex-col gap-2 hidden relative">
        <textarea id="docNumber" placeholder="Masukan no KT" class="w-full h-[140px] bg-brand-input border border-brand-border rounded-lg p-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none focus:border-brand-accent transition-colors resize-none"></textarea>
        
        <!-- Loading Overlay -->
        <div id="docLoader" class="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 z-10">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-semibold text-brand-accent tracking-widest animate-pulse">MEMPROSES...</span>
          </div>
        </div>
      </div>

      <button type="button" id="processRevisiBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md mt-auto">
        Revisi Draft
      </button>

      <div class="flex flex-col gap-2 mt-4">
        <textarea id="revisiResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors h-32" readonly></textarea>
      </div>
    </div>
  `,F=()=>{let o=localStorage.getItem("revisiActiveTab")||"pdf";const t=document.getElementById("tabPdf"),e=document.getElementById("tabDoc"),i=document.getElementById("pdfSection"),s=document.getElementById("docSection"),d=document.getElementById("docLoader"),c=document.getElementById("quickDocNumber"),b=document.getElementById("pdfUpload"),g=document.getElementById("pdfFileName"),r=document.getElementById("docNumber"),_=document.getElementById("processRevisiBtn"),w=document.getElementById("revisiResults"),x=(l,u)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{u(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},l)},A=l=>{o=l,localStorage.setItem("revisiActiveTab",l),l==="pdf"?(t==null||t.classList.add("bg-brand-accent","text-white"),t==null||t.classList.remove("text-brand-text-muted","hover:text-white"),e==null||e.classList.remove("bg-brand-accent","text-white"),e==null||e.classList.add("text-brand-text-muted","hover:text-white"),i==null||i.classList.remove("hidden"),s==null||s.classList.add("hidden")):(e==null||e.classList.add("bg-brand-accent","text-white"),e==null||e.classList.remove("text-brand-text-muted","hover:text-white"),t==null||t.classList.remove("bg-brand-accent","text-white"),t==null||t.classList.add("text-brand-text-muted","hover:text-white"),s==null||s.classList.remove("hidden"),i==null||i.classList.add("hidden"))};if(A(o),t==null||t.addEventListener("click",()=>A("pdf")),e==null||e.addEventListener("click",()=>A("doc")),c&&r){c.addEventListener("focus",()=>{c.placeholder=""}),c.addEventListener("blur",()=>{c.placeholder="No KT"});let l,u="";c.addEventListener("input",()=>{let m=c.value.replace(/\D/g,"");m.length>6&&(m=m.slice(0,6)),c.value=m,m!==u&&(u=m,clearTimeout(l),m.length>0?l=setTimeout(()=>{const p=m.padStart(6,"0");x(600,()=>{r.value=`2026-T1.0-3200.2-K.1.1-${p}`})},400):r.value="")})}if(r){let l;r.addEventListener("input",()=>{clearTimeout(l);const u=r.value;if(!u)return;const m=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,p=u.match(m);if(p&&p.length>0){const n=p.map(a=>{const k=a.toUpperCase(),f=k.match(/\d{4,6}$/);return f?`2026-T1.0-3200.2-K.1.1-${f[0].padStart(6,"0")}`:k}).join(`
`);u.replace(m,"").trim().length>0&&x(600,()=>{r.value=n})}else l=setTimeout(()=>{const h=r.value.match(/\b\d{3,6}\b/g);if(h&&h.length>0){const v=h.map(a=>`2026-T1.0-3200.2-K.1.1-${a.padStart(6,"0")}`);x(600,()=>{r.value=v.join(`
`)})}},800)}),r.addEventListener("change",()=>{clearTimeout(l);const u=r.value;if(!/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi.test(u)){const p=u.match(/\b\d{3,6}\b/g);if(p&&p.length>0){const n=p.map(h=>`2026-T1.0-3200.2-K.1.1-${h.padStart(6,"0")}`);x(600,()=>{r.value=n.join(`
`)})}}})}b&&g&&b.addEventListener("change",l=>{const u=l.target;u.files&&u.files.length>0?(g.textContent=u.files[0].name,g.classList.remove("text-brand-text-muted"),g.classList.add("text-brand-accent")):(g.textContent="Klik untuk memilih file PDF",g.classList.add("text-brand-text-muted"),g.classList.remove("text-brand-accent"))}),_&&_.addEventListener("click",()=>{var u;let l="";if(o==="pdf"){const m=(u=b==null?void 0:b.files)==null?void 0:u[0];if(!m){w.value="Silakan pilih file PDF terlebih dahulu.",w.classList.add("text-red-500");return}w.classList.remove("text-red-500"),l=`File PDF yang dipilih: ${m.name}`}else{let m=r.value.trim();if(!m){w.value="Silakan masukkan Nomor Dokumen terlebih dahulu.",w.classList.add("text-red-500");return}w.classList.remove("text-red-500");let p=m;const n=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,h=m.match(n);if(h&&h.length>0)p=h.map(v=>{const a=v.toUpperCase(),k=a.match(/\d{4,6}$/);return k?`2026-T1.0-3200.2-K.1.1-${k[0].padStart(6,"0")}`:a}).join(`
`);else{const v=m.match(/\b\d{1,6}\b/g);if(v){const a=v.reverse().find(k=>k.length>=3&&k.length<=6)||v[0];a&&(p=`2026-T1.0-3200.2-K.1.1-${a.padStart(6,"0")}`)}}r.value=p,l=`Nomor Dokumen:
${p}`}w.value=l+`

Done`})},ee=()=>{let o=localStorage.getItem("activeMenu")||"Surtu 2";o==="Profile"&&(o="Surtu 2",localStorage.setItem("activeMenu","Surtu 2"));let t="";return o==="Draft"?t=q():o==="Revisi"?t=Z():o==="Surtu 2"?t=V():t=`<div class="text-white text-center mt-10">Fitur ${o} belum tersedia</div>`,`
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${X(o)}
      
      <main id="mainContent" class="w-full bg-brand-panel border border-white/5 rounded-xl md:flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${t}
      </main>
    </div>
  `},te=()=>{const o=document.getElementById("mainContent");let t=localStorage.getItem("activeMenu")||"Surtu 2";t==="Profile"&&(t="Surtu 2"),Y(e=>{localStorage.setItem("activeMenu",e),o&&(e==="Draft"?(o.innerHTML=q(),U()):e==="Revisi"?(o.innerHTML=Z(),F()):e==="Surtu 2"?(o.innerHTML=V(),z()):o.innerHTML=`<div class="text-white text-center mt-10">Fitur ${e} belum tersedia</div>`)}),t==="Draft"?U():t==="Revisi"?F():t==="Surtu 2"&&z()},ne=()=>`
    <div class="flex items-center justify-center min-h-screen bg-[#3b3b3b] w-full p-4">
      <div class="w-full max-w-md bg-brand-panel border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col gap-4">
        
        <div class="flex flex-col items-center gap-2">
          <img src="./barantin.png" alt="Barantin Logo" class="w-24 h-24 object-contain drop-shadow-xl" />
          <h1 class="text-2xl font-bold text-white">Barantin</h1>
        </div>

        <div id="loginFormContainer" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-white/80">Username</label>
            <div class="w-full h-[46px] bg-brand-input border border-brand-border rounded-lg focus-within:border-brand-accent transition-colors flex items-center overflow-hidden">
              <textarea 
                rows="1"
                id="username" 
                class="w-full h-full bg-transparent px-4 py-0 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none resize-none overflow-hidden whitespace-nowrap leading-[44px]"
                placeholder="Masukkan username"
                required
              ></textarea>
            </div>
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-white/80">Password</label>
            <div class="w-full h-[46px] bg-brand-input border border-brand-border rounded-lg focus-within:border-brand-accent transition-colors flex items-center overflow-hidden">
              <textarea 
                rows="1"
                id="password" 
                style="-webkit-text-security: disc;"
                class="w-full h-full bg-transparent pl-4 pr-2 py-0 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none resize-none overflow-hidden whitespace-nowrap leading-[44px]"
                placeholder="Masukkan password"
                required
              ></textarea>
              <button type="button" id="togglePasswordBtn" class="flex-shrink-0 pr-3 text-zinc-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center h-full" tabindex="-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <div class="h-[46px] flex items-center bg-white rounded-lg px-2 border border-brand-border">
                <img id="captchaImage" src="" class="h-full max-w-[120px] object-contain" alt="captcha" />
                <button type="button" id="refreshCaptchaBtn" class="ml-2 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer" title="Refresh Captcha">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </button>
              </div>
              <div class="flex-1 h-[46px] bg-brand-input border border-brand-border rounded-lg focus-within:border-brand-accent transition-colors flex items-center overflow-hidden">
                <input type="text" id="captchaInput" class="w-full h-full bg-transparent px-4 text-brand-text placeholder-zinc-500 font-mono text-sm outline-none" placeholder="Kode Captcha" required />
              </div>
            </div>
          </div>
          
          <div id="loginError" class="text-red-500 text-sm hidden"></div>

          <button 
            type="button" 
            id="loginSubmitBtn"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Masuk
          </button>
        </div>
        
      </div>
    </div>
  `,ae=o=>{const t=document.getElementById("loginSubmitBtn"),e=document.getElementById("loginError"),i=document.getElementById("username"),s=document.getElementById("password"),d=document.getElementById("captchaInput"),c=document.getElementById("captchaImage"),b=document.getElementById("refreshCaptchaBtn"),g=localStorage.getItem("savedUsername"),r=localStorage.getItem("savedPassword");g&&i&&(i.value=g),r&&s&&(s.value=r);let _="";const w=async()=>{try{const n=await fetch("https://api.karantinaindonesia.go.id/barantin-sys-v2/captcha?app=APP001");if(!n.ok)throw new Error("Failed to fetch captcha");const h=await n.json();h.status&&h.image&&(c==null||c.setAttribute("src",h.image),_=h.token)}catch(n){console.error("Error loading captcha:",n)}};w(),b&&b.addEventListener("click",w);let x="103.152.232.25";fetch("https://api.ipify.org/?format=json").then(n=>n.json()).then(n=>x=n.ip).catch(n=>console.error("Error fetching IP:",n));const A=()=>Promise.resolve({timestamp:Date.now(),coords:{accuracy:212,latitude:-6.577271,longitude:107.783081,altitude:null,altitudeAccuracy:null,heading:null,speed:null}}),l=async()=>{const n=i.value.trim(),h=s.value.trim(),v=d.value.trim();if(!n||!h||!v){e&&(e.classList.remove("hidden"),e.textContent="Harap isi semua kolom");return}t&&(t.disabled=!0,t.textContent="Memproses..."),e&&e.classList.add("hidden");try{const a=await A(),f=await(await fetch("https://api.karantinaindonesia.go.id/barantin-sys-v2/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:h,app:"APP001",ipaddress:x,captcha:v,captchaToken:_,location:a})})).json();f.status?(localStorage.setItem("savedUsername",n),localStorage.setItem("savedPassword",h),f.data&&(localStorage.setItem("accessToken",f.data.accessToken),localStorage.setItem("userData",JSON.stringify(f.data))),o()):(e&&(e.classList.remove("hidden"),e.textContent=f.message||"Login gagal"),s.value="",d.value="",w())}catch{e&&(e.classList.remove("hidden"),e.textContent="Terjadi kesalahan jaringan atau server tidak dapat dihubungi.")}finally{t&&(t.disabled=!1,t.textContent="Masuk")}};t&&t.addEventListener("click",n=>{n.preventDefault(),l()});const u=n=>{n.key==="Enter"&&(n.preventDefault(),l())};s&&s.addEventListener("keydown",u),d&&d.addEventListener("keydown",u);const m=n=>{const h=n.target;h.value.includes(" ")&&(h.value=h.value.replace(/\s/g,""))};i&&i.addEventListener("input",m),s&&s.addEventListener("input",m);const p=document.getElementById("togglePasswordBtn");p&&s&&p.addEventListener("click",()=>{const n=s.style.webkitTextSecurity==="disc";s.style.webkitTextSecurity=n?"none":"disc",p.innerHTML=n?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>'})},oe="modulepreload",ie=function(o,t){return new URL(o,t).href},H={},re=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){const c=document.getElementsByTagName("link"),b=document.querySelector("meta[property=csp-nonce]"),g=(b==null?void 0:b.nonce)||(b==null?void 0:b.getAttribute("nonce"));s=Promise.allSettled(e.map(r=>{if(r=ie(r,i),r in H)return;H[r]=!0;const _=r.endsWith(".css"),w=_?'[rel="stylesheet"]':"";if(!!i)for(let l=c.length-1;l>=0;l--){const u=c[l];if(u.href===r&&(!_||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${w}`))return;const A=document.createElement("link");if(A.rel=_?"stylesheet":oe,_||(A.as="script"),A.crossOrigin="",A.href=r,g&&A.setAttribute("nonce",g),document.head.appendChild(A),_)return new Promise((l,u)=>{A.addEventListener("load",l),A.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})}))}function d(c){const b=new Event("vite:preloadError",{cancelable:!0});if(b.payload=c,window.dispatchEvent(b),!b.defaultPrevented)throw c}return s.then(c=>{for(const b of c||[])b.status==="rejected"&&d(b.reason);return t().catch(d)})};function se(o={}){const{immediate:t=!1,onNeedReload:e,onNeedRefresh:i,onOfflineReady:s,onRegistered:d,onRegisteredSW:c,onRegisterError:b}=o;let g,r;const _=async(x=!0)=>{await r};async function w(){if("serviceWorker"in navigator){if(g=await re(async()=>{const{Workbox:x}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:x}},[],import.meta.url).then(({Workbox:x})=>new x("./sw.js",{scope:"./",type:"classic"})).catch(x=>{b==null||b(x)}),!g)return;g.addEventListener("activated",x=>{(x.isUpdate||x.isExternal)&&(e?e():window.location.reload())}),g.addEventListener("installed",x=>{x.isUpdate||s==null||s()}),g.register({immediate:t}).then(x=>{c?c("./sw.js",x):d==null||d(x)}).catch(x=>{b==null||b(x)})}}return r=w(),_}se({immediate:!0});const W=()=>{const o=document.getElementById("app");o&&(localStorage.getItem("isAuthenticated")==="true"?(o.innerHTML=ee(),te()):(o.innerHTML=ne(),ae(()=>{localStorage.setItem("isAuthenticated","true"),W()})))};document.addEventListener("DOMContentLoaded",W);

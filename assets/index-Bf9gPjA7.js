(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const d of i)if(d.type==="childList")for(const l of d.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const d={};return i.integrity&&(d.integrity=i.integrity),i.referrerPolicy&&(d.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?d.credentials="include":i.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(i){if(i.ep)return;i.ep=!0;const d=e(i);fetch(i.href,d)}})();const pe=(a="Surtu 2")=>{const t=[{id:"Surtu 2",label:"Surtu 2",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'},{id:"Draft",label:"Draft",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'},{id:"Revisi",label:"Revisi",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>'}];return`
    <aside class="fixed bottom-0 left-0 w-full md:relative md:w-[280px] bg-brand-panel border-t md:border border-white/5 md:rounded-xl p-2 md:p-6 flex flex-row md:flex-col shrink-0 shadow-2xl z-50">
      <div class="hidden md:flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold tracking-wide text-white text-left w-full">Barantin Tools</h2>
      </div>
      <nav id="sidebarNav" class="flex flex-row md:flex-col justify-around md:justify-start w-full md:gap-1.5 flex-1">
        ${t.map(o=>`
      <a href="#" class="nav-item flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all ${o.id===a?"active text-brand-accent md:bg-brand-accent-bg font-semibold":"text-brand-text-muted hover:text-white md:hover:bg-white/5"}" data-menu="${o.id}">
        ${o.icon}
        <span>${o.label}</span>
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
  `},he=a=>{const t=document.querySelectorAll(".nav-item");t.forEach(o=>{o.addEventListener("click",i=>{i.preventDefault();const d=o.getAttribute("data-menu");t.forEach(l=>{l.classList.remove("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),l.classList.add("text-brand-text-muted")}),o.classList.remove("text-brand-text-muted"),o.classList.add("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),a&&d&&a(d)})}),document.querySelectorAll(".logout-btn").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault(),localStorage.removeItem("isAuthenticated"),window.location.reload()})})};let X="",J="",ne=!1,ae=!0;function K(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var t=Math.random()*16|0,e=a=="x"?t:t&3|8;return e.toString(16)})}const ge=(a,t,e)=>{var m,f,c,p,b;const o=(t==null?void 0:t.DOKUMEN)||{},i=o.HEADER||{},d=i.PERUSAHAAN||{},l=d.PJAWAB||{},h=i.PENGIRIM||{},x=i.PEMASOK||i.PENERIMA||{},s=((m=o.GA)==null?void 0:m.KARANTINA)||{},k=s.INSTALASI||{},v=s.PEMERIKSAAN||{},g=(((f=o.ITEMS)==null?void 0:f.BARANG)||[]).map(n=>{var w,A,y,M,B,T,E,N,j,R,C;return{id:K(),ptk_id:"",kode_hs:n.KDHS||"",kode_hs10:n.KDHS10||"",klasifikasi_id:((A=(w=n.GA)==null?void 0:w.KARANTINA)==null?void 0:A.KLASIFIKASI)||"2C0",komoditas_id:((M=(y=n.GA)==null?void 0:y.KARANTINA)==null?void 0:M.ID_KOMODITI)||"1149",nama_umum_tercetak:n.URAIAN||"",nama_latin_tercetak:((T=(B=n.GA)==null?void 0:B.KARANTINA)==null?void 0:T.NMLATIN)||"",jenisMp:"Non Benih",jenisMpId:5,bentukMp:((N=(E=n.GA)==null?void 0:E.KARANTINA)==null?void 0:N.KLASIFIKASI)||"2C0",negaraAsalMp:n.NEGASALBRG||"ID",jantan:null,betina:null,negaraAsalMpId:99,volume_netto:parseFloat(n.NETTO)||0,volume_bruto:parseFloat(n.BRUTO)||0,satuan_bruto_id:"1356",satuan_netto_id:"1356",keterangan:"",sat_tercetak_netto:n.JNSSATUAN||"KGM",volume_lain:parseFloat(n.JMLSATUAN)||0,satuan_lain_id:1356,sat_tercetak_lain:n.JNSSATUAN||"KGM",jumlah_kemasan:parseFloat(n.JMLKEMAS)||0,kemasan_id:2,kemasan:n.JNSKEMAS||"BG",mata_uang:((j=n.KURS)==null?void 0:j.KODE)||"USD",kurs:parseFloat((R=n.KURS)==null?void 0:R.NILAI)||15e3,harga:parseFloat(n.HARGA)||0,harga_rp:(parseFloat(n.HARGA)||0)*(parseFloat((C=n.KURS)==null?void 0:C.NILAI)||15e3)*(parseFloat(n.JMLSATUAN)||0)}}),_=(((c=o.CONTLIST)==null?void 0:c.CONT)||[]).map(n=>({id:K(),ptk_id:"",nomor:n.NOCONT||"xxxxxx",size:(n.UKCONT||"20")+" feet",ukuran_kontainer_id:"2",stuff_kontainer_id:"1",stuff:n.TPCONT||"FCL",segel:n.NOSEAL||"",tipe_kontainer_id:"1"})),u=(((p=o.DOKUMENLAMPIRAN)==null?void 0:p.DOK)||[]).map(n=>({id:K(),ptk_id:"",jenis_dokumen_id:n.JENIS||"99",jenisDokumenUraian:"Lainnya",kategori_dokumen:"S",no_dokumen:n.NOMOR||"",instansi_penerbit:"",tanggal_dokumen:n.TANGGAL?n.TANGGAL.replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3"):"",negara_asal_id:"99",negaraAsalDokumen:n.NEGPENERBIT||"ID",kota_kab_asal_id:"",keterangan:"",efile:n.FILELINK||""})),r=K();return g.forEach(n=>n.ptk_id=r),_.forEach(n=>n.ptk_id=r),u.forEach(n=>n.ptk_id=r),{id:r,tssm_id:a.id,no_aju:a.noReg||a.noAju,jenis_dokumen:"PTK",jenis_karantina:a.jenis_karantina==="Tumbuhan"?"T":a.jenis_karantina==="Hewan"?"H":"I",jenis_media_pembawa_id:"5",stat_pemohon:"PEMILIK",is_guest:"0",user_id:(e==null?void 0:e.id)||"3267",pengguna_jasa_id:(e==null?void 0:e.pengguna_jasa_id)||"9e7347a8-ea62-4aee-899e-ea7087949eb7",calo_id:"0",upt_id:a.upt,kode_satpel:a.upt,nama_pemohon:d.NAMA||a.nmPerusahaan,jenis_identitas_pemohon:"NPWP",nomor_identitas_pemohon:d.ID||a.npwp,alamat_pemohon:d.ALAMAT||"",telepon_pemohon:"0",fax_pemohon:"0",provinsi_pemohon_id:"33",kota_kab_pemohon_id:"3328",nama_cp:l.NAMA||"",alamat_cp:l.ALAMAT||"",telepon_cp:l.EMAIL||"",nama_ttd:l.NAMA||"",jenis_identitas_ttd:"LAINNYA",nomor_identitas_ttd:d.ID||a.npwp,jabatan_ttd:l.JABATAN||"DIREKTUR",alamat_ttd:l.ALAMAT||"",jenis_permohonan:a.jnsAju==="EKSPOR"?"EX":a.jnsAju==="IMPOR"?"IM":"DP",nama_pengirim:h.NMPENGIRIM||d.NAMA||"",alamat_pengirim:h.ALPENGIRIM||d.ALAMAT||"",telepon_pengirim:"0",jenis_identitas_pengirim:"NPWP",nomor_identitas_pengirim:d.ID||a.npwp,provinsi_pengirim_id:"33",kota_kab_pengirim_id:"3328",negara_pengirim_id:"99",nama_penerima:x.NMPEMASOK||x.NMPENERIMA||"",alamat_penerima:x.ALPEMASOK||x.ALAMAT||"",telepon_penerima:"",jenis_identitas_penerima:"LAINNYA",nomor_identitas_penerima:"",provinsi_penerima_id:"",kota_kab_penerima_id:"",negara_penerima_id:"186",is_from_ptk:"2",tanggal_rencana_masuk:"",negara_muat_id:"99",negara_bongkar_id:"186",negara_transit_id:"",pelabuhan_muat_id:"134",pelabuhan_bongkar_id:"53427",moda_alat_angkut_transit_id:"0",tipe_alat_angkut_transit_id:"",nama_alat_angkut_transit:"",bendera_alat_angkut_transit_id:"0",no_voyage_transit:"",call_sign_transit:"NIHIL",tanggal_rencana_tiba_transit:"",tanggal_rencana_berangkat_transit:"",moda_alat_angkut_terakhir_id:1,moda_alat_angkut_lainnya:"",tipe_alat_angkut_terakhir_id:"3",nama_alat_angkut_terakhir:"-",bendera_alat_angkut_terakhir_id:"186",no_voyage_terakhir:"-",call_sign_terakhir:"NIHIL",tanggal_rencana_tiba_terakhir:"",tanggal_rencana_berangkat_terakhir:"2026-07-27",is_transit:"0",is_kontainer:"2",sumber_mp:"",area_tangkap_id:"",mutuIkan:"",peruntukan_id:s.PERUNTUKAN||"5",peruntukan_lainnya:"",kemasan_id:"2",merk_kemasan:"560 Bag",jumlah_kemasan:"560",tanda_khusus:"",nilai_barang:s.NILAI||"0",mata_uang:"IDR",negara_asal_id:"99",negara_tujuan_id:"186",kota_kab_asal_id:"3172",kota_kab_tujuan_id:"",tingkat_pengolahan:s.TINGKATPENGOLAHAN||"2",informasi_tambahan:"",tgl_pemeriksaan:v.TGPERIKSA||"",tempat_pemeriksaan:"D",kode_gudang:null,jenis_tempat:k.JNS||"IK",nama_tempat_pemeriksaan:k.NAMA||"",alamat_tempat_pemeriksaan:k.ALAMAT||"",instalasi_karantina_id:null,status_ptk:"1",tgl_dok_permohonan:((b=a.tglAju)==null?void 0:b.substring(0,16))||"",is_draft:"1",is_verifikasi:"1",petugas:(e==null?void 0:e.petugas)||"SUHERMAN",nip:(e==null?void 0:e.nip)||"196702031992031001",tgl_aju:a.tglAju||"",user_created:(e==null?void 0:e.id)||"3267",komoditi:g,kontainer:_,dokumen:u}},oe=()=>`
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
      <input type="checkbox" id="autoProcessPtk" class="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand-accent focus:ring-brand-accent focus:ring-offset-zinc-900" ${ne?"checked":""}>
      <label for="autoProcessPtk" class="text-sm text-zinc-300 select-none cursor-pointer">Otomatis Proses PTK & Verifikasi (GA)</label>
    </div>
    <div class="flex items-center gap-2 mt-1 mb-2">
      <input type="checkbox" id="autoSurtug" class="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand-accent focus:ring-brand-accent focus:ring-offset-zinc-900" ${ae?"checked":""}>
      <label for="autoSurtug" class="text-sm text-zinc-300 select-none cursor-pointer">Otomatis Buat Surtug (Cahyono, 08:00, Bandung)</label>
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

  `,Y=()=>{const a=document.getElementById("processBtn"),t=document.getElementById("cookieContent"),e=document.getElementById("processingResults"),o=document.getElementById("copyBtn"),i=document.getElementById("copyText"),d=document.getElementById("cookieLoader"),l=document.getElementById("autoProcessPtk"),h=document.getElementById("autoSurtug");l&&l.addEventListener("change",()=>{ne=l.checked}),h&&h.addEventListener("change",()=>{ae=h.checked}),t&&(t.value=X,t.addEventListener("input",()=>{X=t.value})),e&&(e.value=J),o&&(J?o.classList.remove("hidden"):o.classList.add("hidden"));const x=(s,k)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{k(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},s)};o&&o.addEventListener("click",async()=>{const s=e.value;if(s)try{await navigator.clipboard.writeText(s);const k=i.innerText;i.innerText="Tersalin!",o.classList.replace("bg-zinc-800","bg-green-600"),o.classList.replace("hover:bg-zinc-700","hover:bg-green-500"),o.classList.replace("border-zinc-700","border-green-500"),setTimeout(()=>{i.innerText=k,o.classList.replace("bg-green-600","bg-zinc-800"),o.classList.replace("hover:bg-green-500","hover:bg-zinc-700"),o.classList.replace("border-green-500","border-zinc-700")},2e3)}catch(k){console.error("Failed to copy text: ",k)}}),t&&t.addEventListener("input",()=>{const s=t.value,k=/([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g,v=s.match(k);if(v&&v.length>0){const g=v.join(`
`);s.replace(k,"").trim().length>0&&x(600,()=>{t.value=g})}}),a&&a.addEventListener("click",async()=>{const s=t.value;if(!s.trim()){e.value="Silakan masukan terlebih dahulu teks atau No SSM / PTK untuk diproses.",e.classList.add("text-red-500"),o&&o.classList.add("hidden");return}e.classList.remove("text-red-500");const k=/([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g,v=s.match(k);if(v&&v.length>0){a.disabled=!0,a.textContent="Mencari Data...",e.value="Sedang mengambil data dari server, mohon tunggu...";let g="";const _=async(c,p)=>{const b=new Date().toISOString().split("T")[0];let n="";const w=/(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/,A=c.match(w);if(A&&parseInt(A[1])>=2020)n=`${A[1]}-${A[2]}-${A[3]}`;else{const T=/(?:EXT|IMP|DOM)(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/,E=c.match(T);if(E)n=`20${E[1]}-${E[2]}-${E[3]}`;else{const N=new Date;N.setFullYear(N.getFullYear()-1),n=N.toISOString().split("T")[0]}}let y="3200";const M=localStorage.getItem("userData");if(M)try{y=JSON.parse(M).upt||"3200"}catch{}const B={dFrom:n,dTo:b,stat:"",karantina:"",upt:y,jnsAju:"EKSPOR",jeniscari:p,noAju:c};try{const T=await fetch("https://api.karantinaindonesia.go.id/ssm/getAju",{method:"POST",headers:{Authorization:"Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm","Content-Type":"application/json"},body:JSON.stringify(B)});if(!T.ok)return null;const E=await T.json();return E.status&&E.data&&E.data.length>0?E.data[0]:null}catch{return null}},r=await new Promise(c=>{const p=localStorage.getItem("accessToken")||localStorage.getItem("token");if(p){c(p);return}if(typeof chrome<"u"&&chrome.cookies)chrome.cookies.getAll({domain:"apps.karantinaindonesia.go.id"},b=>{const n=b.find(w=>w.name==="token");c(n?n.value:"")});else{const b=document.cookie.match(/(?:^|; )token=([^;]*)/);c(b?b[1]:"")}}),m=v.map(async c=>{var M,B,T,E,N,j;let p=`
--- MENCARI AJU: ${c} ---
`,b="",n="";const[w,A]=await Promise.all([_(c,"noAju"),_(c,"noReg")]);let y=w||A;if(y){if(n=y.ptk_id||y.id||"",y.noReg&&(b=y.noReg),n&&r)try{const L=await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk/${n}`,{headers:{Authorization:`Bearer ${r}`}});if(L.ok){const S=await L.json();(B=(M=S==null?void 0:S.data)==null?void 0:M.ptk)!=null&&B.no_dok_permohonan&&(b=S.data.ptk.no_dok_permohonan)}}catch(L){console.error("Failed to fetch PTK details",L)}let R="-",C="-",de="-",P=null;if(y.xml)try{P=JSON.parse(y.xml);const L=(E=(T=P==null?void 0:P.DOKUMEN)==null?void 0:T.ITEMS)==null?void 0:E.BARANG;if(L&&L.length>0){const S=L[0];R=S.URAIAN?S.URAIAN.trim():"-",C=`${S.NETTO||"-"} ${S.JNSSATUAN||""}`.trim(),de=`${S.JMLKEMAS||"-"} ${S.JNSKEMAS||""}`.trim(),L.length>1&&(R+=` (+${L.length-1} item lainnya)`)}}catch(L){console.error("Failed parsing xml",L)}let I="",O="";if(O+=`[DEBUG] Token      : ${r?"ADA":"KOSONG"}
`,O+=`[DEBUG] XML Parsed : ${P?"BERHASIL":"GAGAL/KOSONG"}
`,O+=`[DEBUG] Checkbox   : ${l&&l.checked?"DICENTANG":"TIDAK DICENTANG"}
`,l&&l.checked&&P)if(!r)I+=`Status PTK     : GAGAL (Sesi Token tidak ditemukan. Silakan ke menu Login terlebih dahulu)
`;else try{const L=localStorage.getItem("userData"),S=L?JSON.parse(L):{},z=ge(y,P,S),G=await fetch("https://api.karantinaindonesia.go.id/barantin-sys/ssm",{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify(z)});if(G.ok||G.status===201){const $=await G.json();if($.status==="201"||$.status===!0){I+=`Status PTK     : BERHASIL DIBUAT (ID: ${z.id})
`;const V=await fetch("https://api.karantinaindonesia.go.id/ssm/sendStatus/ptk",{method:"POST",headers:{Authorization:"Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm","Content-Type":"application/json"},body:JSON.stringify({id:y.id,ptk_id:z.id,noReg:y.noReg||y.noAju})});if(V.ok||V.status===201){I+=`Verifikasi     : BERHASIL (GA - PROSES VERIFIKASI)
`;const q=document.getElementById("autoSurtug");if(q&&q.checked)try{const U=K(),Z=new Date,le=Z.getTimezoneOffset()*6e4,W=new Date(Z.getTime()-le).toISOString().slice(0,19).replace("T"," "),ce=W.split(" ")[0],ue=((N=$.data)==null?void 0:N.nomor)||y.noReg||y.noAju,me={id:U,ptk_id:z.id,no_dok_permohonan:ue,ptk_analisis_id:"",nomor:"",tanggal:ce+"T08:00",perihal:"Pelaksanaan Tindakan Karantina",penanda_tangan_id:2085,diterbitkan_di:"BANDUNG",user_id:(S==null?void 0:S.id)||"3267",created_at:W},H=await fetch("https://api.karantinaindonesia.go.id/barantin-sys/surtug",{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify(me)});if(H.ok||H.status===201){const F=await H.json();F.status==="201"||F.status===!0?I+=`Status Surtug  : BERHASIL DIBUAT (${((j=F.data)==null?void 0:j.nomor)||U})
`:I+=`Status Surtug  : GAGAL (${F.message||"Unknown Error"})
`}else I+=`Status Surtug  : GAGAL (HTTP ${H.status})
`}catch(U){I+=`Status Surtug  : ERROR (${U.message})
`}}else I+=`Verifikasi     : GAGAL DIPROSES
`}else I+=`Status PTK     : GAGAL (${$.message||"Unknown Error"})
`}else I+=`Status PTK     : GAGAL (HTTP ${G.status})
`}catch(L){I+=`Status PTK     : ERROR (${L.message})
`}p+=I,p+=O,p+=`
--- DATA JSON LENGKAP ---
`;const D={...y};if(D.xml)try{D.xml=JSON.parse(D.xml)}catch{}p+=JSON.stringify(D,null,2)+`
`}else p+=`Status         : TIDAK DITEMUKAN / GAGAL
`;return p});g=(await Promise.all(m)).join(""),e.value=g.trim(),J=g.trim(),a.disabled=!1,a.textContent="Proses Data",o&&o.classList.remove("hidden")}else e.value="Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.",J=e.value,o&&o.classList.add("hidden")})},se=()=>`
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
  `,Q=()=>{let a=localStorage.getItem("draftActiveTab")||"pdf";const t=document.getElementById("tabPdf"),e=document.getElementById("tabDoc"),o=document.getElementById("pdfSection"),i=document.getElementById("docSection"),d=document.getElementById("docLoader"),l=document.getElementById("quickDocNumber"),h=document.getElementById("pdfUpload"),x=document.getElementById("pdfFileName"),s=document.getElementById("docNumber"),k=document.getElementById("processDraftBtn"),v=document.getElementById("draftResults"),g=(u,r)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{r(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},u)},_=u=>{a=u,localStorage.setItem("draftActiveTab",u),u==="pdf"?(t==null||t.classList.add("bg-brand-accent","text-white"),t==null||t.classList.remove("text-brand-text-muted","hover:text-white"),e==null||e.classList.remove("bg-brand-accent","text-white"),e==null||e.classList.add("text-brand-text-muted","hover:text-white"),o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden")):(e==null||e.classList.add("bg-brand-accent","text-white"),e==null||e.classList.remove("text-brand-text-muted","hover:text-white"),t==null||t.classList.remove("bg-brand-accent","text-white"),t==null||t.classList.add("text-brand-text-muted","hover:text-white"),i==null||i.classList.remove("hidden"),o==null||o.classList.add("hidden"))};if(_(a),t==null||t.addEventListener("click",()=>_("pdf")),e==null||e.addEventListener("click",()=>_("doc")),l&&s){l.addEventListener("focus",()=>{l.placeholder=""}),l.addEventListener("blur",()=>{l.placeholder="No KT"});let u,r="";l.addEventListener("input",()=>{let m=l.value.replace(/\D/g,"");m.length>6&&(m=m.slice(0,6)),l.value=m,m!==r&&(r=m,clearTimeout(u),m.length>0?u=setTimeout(()=>{const f=m.padStart(6,"0");g(600,()=>{s.value=`2026-T1.0-3200.2-K.1.1-${f}`})},400):s.value="")})}if(s){let u;s.addEventListener("input",()=>{clearTimeout(u);const r=s.value;if(!r)return;const m=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,f=r.match(m);if(f&&f.length>0){const c=f.map(n=>{const w=n.toUpperCase(),A=w.match(/\d{4,6}$/);return A?`2026-T1.0-3200.2-K.1.1-${A[0].padStart(6,"0")}`:w}).join(`
`);r.replace(m,"").trim().length>0&&g(600,()=>{s.value=c})}else u=setTimeout(()=>{const p=s.value.match(/\b\d{3,6}\b/g);if(p&&p.length>0){const b=p.map(n=>`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`);g(600,()=>{s.value=b.join(`
`)})}},800)}),s.addEventListener("change",()=>{clearTimeout(u);const r=s.value;if(!/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi.test(r)){const f=r.match(/\b\d{3,6}\b/g);if(f&&f.length>0){const c=f.map(p=>`2026-T1.0-3200.2-K.1.1-${p.padStart(6,"0")}`);g(600,()=>{s.value=c.join(`
`)})}}})}h&&x&&h.addEventListener("change",u=>{const r=u.target;r.files&&r.files.length>0?(x.textContent=r.files[0].name,x.classList.remove("text-brand-text-muted"),x.classList.add("text-brand-accent")):(x.textContent="Klik untuk memilih file PDF",x.classList.add("text-brand-text-muted"),x.classList.remove("text-brand-accent"))}),k&&k.addEventListener("click",()=>{var r;let u="";if(a==="pdf"){const m=(r=h==null?void 0:h.files)==null?void 0:r[0];if(!m){v.value="Silakan pilih file PDF terlebih dahulu.",v.classList.add("text-red-500");return}v.classList.remove("text-red-500"),u=`File PDF yang dipilih: ${m.name}`}else{let m=s.value.trim();if(!m){v.value="Silakan masukkan Nomor Dokumen terlebih dahulu.",v.classList.add("text-red-500");return}v.classList.remove("text-red-500");let f=m;const c=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,p=m.match(c);if(p&&p.length>0)f=p.map(b=>{const n=b.toUpperCase(),w=n.match(/\d{4,6}$/);return w?`2026-T1.0-3200.2-K.1.1-${w[0].padStart(6,"0")}`:n}).join(`
`);else{const b=m.match(/\b\d{1,6}\b/g);if(b){const n=b.reverse().find(w=>w.length>=3&&w.length<=6)||b[0];n&&(f=`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`)}}s.value=f,u=`Nomor Dokumen:
${f}`}v.value=u+`

Done`})},ie=()=>`
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
  `,ee=()=>{let a=localStorage.getItem("revisiActiveTab")||"pdf";const t=document.getElementById("tabPdf"),e=document.getElementById("tabDoc"),o=document.getElementById("pdfSection"),i=document.getElementById("docSection"),d=document.getElementById("docLoader"),l=document.getElementById("quickDocNumber"),h=document.getElementById("pdfUpload"),x=document.getElementById("pdfFileName"),s=document.getElementById("docNumber"),k=document.getElementById("processRevisiBtn"),v=document.getElementById("revisiResults"),g=(u,r)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{r(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},u)},_=u=>{a=u,localStorage.setItem("revisiActiveTab",u),u==="pdf"?(t==null||t.classList.add("bg-brand-accent","text-white"),t==null||t.classList.remove("text-brand-text-muted","hover:text-white"),e==null||e.classList.remove("bg-brand-accent","text-white"),e==null||e.classList.add("text-brand-text-muted","hover:text-white"),o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden")):(e==null||e.classList.add("bg-brand-accent","text-white"),e==null||e.classList.remove("text-brand-text-muted","hover:text-white"),t==null||t.classList.remove("bg-brand-accent","text-white"),t==null||t.classList.add("text-brand-text-muted","hover:text-white"),i==null||i.classList.remove("hidden"),o==null||o.classList.add("hidden"))};if(_(a),t==null||t.addEventListener("click",()=>_("pdf")),e==null||e.addEventListener("click",()=>_("doc")),l&&s){l.addEventListener("focus",()=>{l.placeholder=""}),l.addEventListener("blur",()=>{l.placeholder="No KT"});let u,r="";l.addEventListener("input",()=>{let m=l.value.replace(/\D/g,"");m.length>6&&(m=m.slice(0,6)),l.value=m,m!==r&&(r=m,clearTimeout(u),m.length>0?u=setTimeout(()=>{const f=m.padStart(6,"0");g(600,()=>{s.value=`2026-T1.0-3200.2-K.1.1-${f}`})},400):s.value="")})}if(s){let u;s.addEventListener("input",()=>{clearTimeout(u);const r=s.value;if(!r)return;const m=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,f=r.match(m);if(f&&f.length>0){const c=f.map(n=>{const w=n.toUpperCase(),A=w.match(/\d{4,6}$/);return A?`2026-T1.0-3200.2-K.1.1-${A[0].padStart(6,"0")}`:w}).join(`
`);r.replace(m,"").trim().length>0&&g(600,()=>{s.value=c})}else u=setTimeout(()=>{const p=s.value.match(/\b\d{3,6}\b/g);if(p&&p.length>0){const b=p.map(n=>`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`);g(600,()=>{s.value=b.join(`
`)})}},800)}),s.addEventListener("change",()=>{clearTimeout(u);const r=s.value;if(!/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi.test(r)){const f=r.match(/\b\d{3,6}\b/g);if(f&&f.length>0){const c=f.map(p=>`2026-T1.0-3200.2-K.1.1-${p.padStart(6,"0")}`);g(600,()=>{s.value=c.join(`
`)})}}})}h&&x&&h.addEventListener("change",u=>{const r=u.target;r.files&&r.files.length>0?(x.textContent=r.files[0].name,x.classList.remove("text-brand-text-muted"),x.classList.add("text-brand-accent")):(x.textContent="Klik untuk memilih file PDF",x.classList.add("text-brand-text-muted"),x.classList.remove("text-brand-accent"))}),k&&k.addEventListener("click",()=>{var r;let u="";if(a==="pdf"){const m=(r=h==null?void 0:h.files)==null?void 0:r[0];if(!m){v.value="Silakan pilih file PDF terlebih dahulu.",v.classList.add("text-red-500");return}v.classList.remove("text-red-500"),u=`File PDF yang dipilih: ${m.name}`}else{let m=s.value.trim();if(!m){v.value="Silakan masukkan Nomor Dokumen terlebih dahulu.",v.classList.add("text-red-500");return}v.classList.remove("text-red-500");let f=m;const c=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,p=m.match(c);if(p&&p.length>0)f=p.map(b=>{const n=b.toUpperCase(),w=n.match(/\d{4,6}$/);return w?`2026-T1.0-3200.2-K.1.1-${w[0].padStart(6,"0")}`:n}).join(`
`);else{const b=m.match(/\b\d{1,6}\b/g);if(b){const n=b.reverse().find(w=>w.length>=3&&w.length<=6)||b[0];n&&(f=`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`)}}s.value=f,u=`Nomor Dokumen:
${f}`}v.value=u+`

Done`})},fe=()=>{let a=localStorage.getItem("activeMenu")||"Surtu 2";a==="Profile"&&(a="Surtu 2",localStorage.setItem("activeMenu","Surtu 2"));let t="";return a==="Draft"?t=se():a==="Revisi"?t=ie():a==="Surtu 2"?t=oe():t=`<div class="text-white text-center mt-10">Fitur ${a} belum tersedia</div>`,`
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${pe(a)}
      
      <main id="mainContent" class="w-full bg-brand-panel border border-white/5 rounded-xl md:flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${t}
      </main>
    </div>
  `},be=()=>{const a=document.getElementById("mainContent");let t=localStorage.getItem("activeMenu")||"Surtu 2";t==="Profile"&&(t="Surtu 2"),he(e=>{localStorage.setItem("activeMenu",e),a&&(e==="Draft"?(a.innerHTML=se(),Q()):e==="Revisi"?(a.innerHTML=ie(),ee()):e==="Surtu 2"?(a.innerHTML=oe(),Y()):a.innerHTML=`<div class="text-white text-center mt-10">Fitur ${e} belum tersedia</div>`)}),t==="Draft"?Q():t==="Revisi"?ee():t==="Surtu 2"&&Y()},xe=()=>`
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
  `,ve=a=>{const t=document.getElementById("loginSubmitBtn"),e=document.getElementById("loginError"),o=document.getElementById("username"),i=document.getElementById("password"),d=document.getElementById("captchaInput"),l=document.getElementById("captchaImage"),h=document.getElementById("refreshCaptchaBtn"),x=localStorage.getItem("savedUsername"),s=localStorage.getItem("savedPassword");x&&o&&(o.value=x),s&&i&&(i.value=s);let k="";const v=async()=>{try{const c=await fetch("https://api.karantinaindonesia.go.id/barantin-sys-v2/captcha?app=APP001");if(!c.ok)throw new Error("Failed to fetch captcha");const p=await c.json();p.status&&p.image&&(l==null||l.setAttribute("src",p.image),k=p.token)}catch(c){console.error("Error loading captcha:",c)}};v(),h&&h.addEventListener("click",v);let g="103.152.232.25";fetch("https://api.ipify.org/?format=json").then(c=>c.json()).then(c=>g=c.ip).catch(c=>console.error("Error fetching IP:",c));const _=()=>Promise.resolve({timestamp:Date.now(),coords:{accuracy:212,latitude:-6.577271,longitude:107.783081,altitude:null,altitudeAccuracy:null,heading:null,speed:null}}),u=async()=>{const c=o.value.trim(),p=i.value.trim(),b=d.value.trim();if(!c||!p||!b){e&&(e.classList.remove("hidden"),e.textContent="Harap isi semua kolom");return}t&&(t.disabled=!0,t.textContent="Memproses..."),e&&e.classList.add("hidden");try{const n=await _(),A=await(await fetch("https://api.karantinaindonesia.go.id/barantin-sys-v2/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c,password:p,app:"APP001",ipaddress:g,captcha:b,captchaToken:k,location:n})})).json();A.status?(localStorage.setItem("savedUsername",c),localStorage.setItem("savedPassword",p),A.data&&(localStorage.setItem("accessToken",A.data.accessToken),localStorage.setItem("userData",JSON.stringify(A.data))),a()):(e&&(e.classList.remove("hidden"),e.textContent=A.message||"Login gagal"),i.value="",d.value="",v())}catch{e&&(e.classList.remove("hidden"),e.textContent="Terjadi kesalahan jaringan atau server tidak dapat dihubungi.")}finally{t&&(t.disabled=!1,t.textContent="Masuk")}};t&&t.addEventListener("click",c=>{c.preventDefault(),u()});const r=c=>{c.key==="Enter"&&(c.preventDefault(),u())};i&&i.addEventListener("keydown",r),d&&d.addEventListener("keydown",r);const m=c=>{const p=c.target;p.value.includes(" ")&&(p.value=p.value.replace(/\s/g,""))};o&&o.addEventListener("input",m),i&&i.addEventListener("input",m);const f=document.getElementById("togglePasswordBtn");f&&i&&f.addEventListener("click",()=>{const c=i.style.webkitTextSecurity==="disc";i.style.webkitTextSecurity=c?"none":"disc",f.innerHTML=c?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>'})},ke="modulepreload",we=function(a,t){return new URL(a,t).href},te={},_e=function(t,e,o){let i=Promise.resolve();if(e&&e.length>0){const l=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),x=(h==null?void 0:h.nonce)||(h==null?void 0:h.getAttribute("nonce"));i=Promise.allSettled(e.map(s=>{if(s=we(s,o),s in te)return;te[s]=!0;const k=s.endsWith(".css"),v=k?'[rel="stylesheet"]':"";if(!!o)for(let u=l.length-1;u>=0;u--){const r=l[u];if(r.href===s&&(!k||r.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${v}`))return;const _=document.createElement("link");if(_.rel=k?"stylesheet":ke,k||(_.as="script"),_.crossOrigin="",_.href=s,x&&_.setAttribute("nonce",x),document.head.appendChild(_),k)return new Promise((u,r)=>{_.addEventListener("load",u),_.addEventListener("error",()=>r(new Error(`Unable to preload CSS for ${s}`)))})}))}function d(l){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=l,window.dispatchEvent(h),!h.defaultPrevented)throw l}return i.then(l=>{for(const h of l||[])h.status==="rejected"&&d(h.reason);return t().catch(d)})};function Ae(a={}){const{immediate:t=!1,onNeedReload:e,onNeedRefresh:o,onOfflineReady:i,onRegistered:d,onRegisteredSW:l,onRegisterError:h}=a;let x,s;const k=async(g=!0)=>{await s};async function v(){if("serviceWorker"in navigator){if(x=await _e(async()=>{const{Workbox:g}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:g}},[],import.meta.url).then(({Workbox:g})=>new g("./sw.js",{scope:"./",type:"classic"})).catch(g=>{h==null||h(g)}),!x)return;x.addEventListener("activated",g=>{(g.isUpdate||g.isExternal)&&(e?e():window.location.reload())}),x.addEventListener("installed",g=>{g.isUpdate||i==null||i()}),x.register({immediate:t}).then(g=>{l?l("./sw.js",g):d==null||d(g)}).catch(g=>{h==null||h(g)})}}return s=v(),k}Ae({immediate:!0});const re=()=>{const a=document.getElementById("app");a&&(localStorage.getItem("isAuthenticated")==="true"?(a.innerHTML=fe(),be()):(a.innerHTML=xe(),ve(()=>{localStorage.setItem("isAuthenticated","true"),re()})))};document.addEventListener("DOMContentLoaded",re);

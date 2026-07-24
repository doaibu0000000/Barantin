(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const Q=(a="Surtu 2")=>{const t=[{id:"Surtu 2",label:"Surtu 2",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'},{id:"Draft",label:"Draft",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'},{id:"Revisi",label:"Revisi",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>'}];return`
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
  `},ee=a=>{const t=document.querySelectorAll(".nav-item");t.forEach(o=>{o.addEventListener("click",r=>{r.preventDefault();const s=o.getAttribute("data-menu");t.forEach(l=>{l.classList.remove("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),l.classList.add("text-brand-text-muted")}),o.classList.remove("text-brand-text-muted"),o.classList.add("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),a&&s&&a(s)})}),document.querySelectorAll(".logout-btn").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),localStorage.removeItem("isAuthenticated"),window.location.reload()})})};let U="",O="",q=!1;function D(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var t=Math.random()*16|0,e=a=="x"?t:t&3|8;return e.toString(16)})}const te=(a,t,e)=>{var m,p,c,h,x;const o=(t==null?void 0:t.DOKUMEN)||{},r=o.HEADER||{},s=r.PERUSAHAAN||{},l=s.PJAWAB||{},g=r.PENGIRIM||{},f=r.PEMASOK||r.PENERIMA||{},i=((m=o.GA)==null?void 0:m.KARANTINA)||{},_=i.INSTALASI||{},w=i.PEMERIKSAAN||{},b=(((p=o.ITEMS)==null?void 0:p.BARANG)||[]).map(n=>{var v,k,I,B,E,L,M,P,j,N,T;return{id:D(),ptk_id:"",kode_hs:n.KDHS||"",kode_hs10:n.KDHS10||"",klasifikasi_id:((k=(v=n.GA)==null?void 0:v.KARANTINA)==null?void 0:k.KLASIFIKASI)||"2C0",komoditas_id:((B=(I=n.GA)==null?void 0:I.KARANTINA)==null?void 0:B.ID_KOMODITI)||"1149",nama_umum_tercetak:n.URAIAN||"",nama_latin_tercetak:((L=(E=n.GA)==null?void 0:E.KARANTINA)==null?void 0:L.NMLATIN)||"",jenisMp:"Non Benih",jenisMpId:5,bentukMp:((P=(M=n.GA)==null?void 0:M.KARANTINA)==null?void 0:P.KLASIFIKASI)||"2C0",negaraAsalMp:n.NEGASALBRG||"ID",jantan:null,betina:null,negaraAsalMpId:99,volume_netto:parseFloat(n.NETTO)||0,volume_bruto:parseFloat(n.BRUTO)||0,satuan_bruto_id:"1356",satuan_netto_id:"1356",keterangan:"",sat_tercetak_netto:n.JNSSATUAN||"KGM",volume_lain:parseFloat(n.JMLSATUAN)||0,satuan_lain_id:1356,sat_tercetak_lain:n.JNSSATUAN||"KGM",jumlah_kemasan:parseFloat(n.JMLKEMAS)||0,kemasan_id:2,kemasan:n.JNSKEMAS||"BG",mata_uang:((j=n.KURS)==null?void 0:j.KODE)||"USD",kurs:parseFloat((N=n.KURS)==null?void 0:N.NILAI)||15e3,harga:parseFloat(n.HARGA)||0,harga_rp:(parseFloat(n.HARGA)||0)*(parseFloat((T=n.KURS)==null?void 0:T.NILAI)||15e3)*(parseFloat(n.JMLSATUAN)||0)}}),A=(((c=o.CONTLIST)==null?void 0:c.CONT)||[]).map(n=>({id:D(),ptk_id:"",nomor:n.NOCONT||"xxxxxx",size:(n.UKCONT||"20")+" feet",ukuran_kontainer_id:"2",stuff_kontainer_id:"1",stuff:n.TPCONT||"FCL",segel:n.NOSEAL||"",tipe_kontainer_id:"1"})),d=(((h=o.DOKUMENLAMPIRAN)==null?void 0:h.DOK)||[]).map(n=>({id:D(),ptk_id:"",jenis_dokumen_id:n.JENIS||"99",jenisDokumenUraian:"Lainnya",kategori_dokumen:"S",no_dokumen:n.NOMOR||"",instansi_penerbit:"",tanggal_dokumen:n.TANGGAL?n.TANGGAL.replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3"):"",negara_asal_id:"99",negaraAsalDokumen:n.NEGPENERBIT||"ID",kota_kab_asal_id:"",keterangan:"",efile:n.FILELINK||""})),u=D();return b.forEach(n=>n.ptk_id=u),A.forEach(n=>n.ptk_id=u),d.forEach(n=>n.ptk_id=u),{id:u,tssm_id:a.id,no_aju:a.noReg||a.noAju,jenis_dokumen:"PTK",jenis_karantina:a.jenis_karantina==="Tumbuhan"?"T":a.jenis_karantina==="Hewan"?"H":"I",jenis_media_pembawa_id:"5",stat_pemohon:"PEMILIK",is_guest:"0",user_id:(e==null?void 0:e.id)||"3267",pengguna_jasa_id:(e==null?void 0:e.pengguna_jasa_id)||"9e7347a8-ea62-4aee-899e-ea7087949eb7",calo_id:"0",upt_id:a.upt,kode_satpel:a.upt,nama_pemohon:s.NAMA||a.nmPerusahaan,jenis_identitas_pemohon:"NPWP",nomor_identitas_pemohon:s.ID||a.npwp,alamat_pemohon:s.ALAMAT||"",telepon_pemohon:"0",fax_pemohon:"0",provinsi_pemohon_id:"33",kota_kab_pemohon_id:"3328",nama_cp:l.NAMA||"",alamat_cp:l.ALAMAT||"",telepon_cp:l.EMAIL||"",nama_ttd:l.NAMA||"",jenis_identitas_ttd:"LAINNYA",nomor_identitas_ttd:s.ID||a.npwp,jabatan_ttd:l.JABATAN||"DIREKTUR",alamat_ttd:l.ALAMAT||"",jenis_permohonan:a.jnsAju==="EKSPOR"?"EX":a.jnsAju==="IMPOR"?"IM":"DP",nama_pengirim:g.NMPENGIRIM||s.NAMA||"",alamat_pengirim:g.ALPENGIRIM||s.ALAMAT||"",telepon_pengirim:"0",jenis_identitas_pengirim:"NPWP",nomor_identitas_pengirim:s.ID||a.npwp,provinsi_pengirim_id:"33",kota_kab_pengirim_id:"3328",negara_pengirim_id:"99",nama_penerima:f.NMPEMASOK||f.NMPENERIMA||"",alamat_penerima:f.ALPEMASOK||f.ALAMAT||"",telepon_penerima:"",jenis_identitas_penerima:"LAINNYA",nomor_identitas_penerima:"",provinsi_penerima_id:"",kota_kab_penerima_id:"",negara_penerima_id:"186",is_from_ptk:"2",tanggal_rencana_masuk:"",negara_muat_id:"99",negara_bongkar_id:"186",negara_transit_id:"",pelabuhan_muat_id:"134",pelabuhan_bongkar_id:"53427",moda_alat_angkut_transit_id:"0",tipe_alat_angkut_transit_id:"",nama_alat_angkut_transit:"",bendera_alat_angkut_transit_id:"0",no_voyage_transit:"",call_sign_transit:"NIHIL",tanggal_rencana_tiba_transit:"",tanggal_rencana_berangkat_transit:"",moda_alat_angkut_terakhir_id:1,moda_alat_angkut_lainnya:"",tipe_alat_angkut_terakhir_id:"3",nama_alat_angkut_terakhir:"-",bendera_alat_angkut_terakhir_id:"186",no_voyage_terakhir:"-",call_sign_terakhir:"NIHIL",tanggal_rencana_tiba_terakhir:"",tanggal_rencana_berangkat_terakhir:"2026-07-27",is_transit:"0",is_kontainer:"2",sumber_mp:"",area_tangkap_id:"",mutuIkan:"",peruntukan_id:i.PERUNTUKAN||"5",peruntukan_lainnya:"",kemasan_id:"2",merk_kemasan:"560 Bag",jumlah_kemasan:"560",tanda_khusus:"",nilai_barang:i.NILAI||"0",mata_uang:"IDR",negara_asal_id:"99",negara_tujuan_id:"186",kota_kab_asal_id:"3172",kota_kab_tujuan_id:"",tingkat_pengolahan:i.TINGKATPENGOLAHAN||"2",informasi_tambahan:"",tgl_pemeriksaan:w.TGPERIKSA||"",tempat_pemeriksaan:"D",kode_gudang:null,jenis_tempat:_.JNS||"IK",nama_tempat_pemeriksaan:_.NAMA||"",alamat_tempat_pemeriksaan:_.ALAMAT||"",instalasi_karantina_id:null,status_ptk:"1",tgl_dok_permohonan:((x=a.tglAju)==null?void 0:x.substring(0,16))||"",is_draft:"1",is_verifikasi:"1",petugas:(e==null?void 0:e.petugas)||"SUHERMAN",nip:(e==null?void 0:e.nip)||"196702031992031001",tgl_aju:a.tglAju||"",user_created:(e==null?void 0:e.id)||"3267",komoditi:b,kontainer:A,dokumen:d}},Z=()=>`
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
      <input type="checkbox" id="autoProcessPtk" class="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-brand-accent focus:ring-brand-accent focus:ring-offset-zinc-900" ${q?"checked":""}>
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

  `,F=()=>{const a=document.getElementById("processBtn"),t=document.getElementById("cookieContent"),e=document.getElementById("processingResults"),o=document.getElementById("copyBtn"),r=document.getElementById("copyText"),s=document.getElementById("cookieLoader"),l=document.getElementById("autoProcessPtk");l&&l.addEventListener("change",()=>{q=l.checked}),t&&(t.value=U,t.addEventListener("input",()=>{U=t.value})),e&&(e.value=O),o&&(O?o.classList.remove("hidden"):o.classList.add("hidden"));const g=(f,i)=>{s&&(s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100")),setTimeout(()=>{i(),s&&(s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none"))},f)};o&&o.addEventListener("click",async()=>{const f=e.value;if(f)try{await navigator.clipboard.writeText(f);const i=r.innerText;r.innerText="Tersalin!",o.classList.replace("bg-zinc-800","bg-green-600"),o.classList.replace("hover:bg-zinc-700","hover:bg-green-500"),o.classList.replace("border-zinc-700","border-green-500"),setTimeout(()=>{r.innerText=i,o.classList.replace("bg-green-600","bg-zinc-800"),o.classList.replace("hover:bg-green-500","hover:bg-zinc-700"),o.classList.replace("border-green-500","border-zinc-700")},2e3)}catch(i){console.error("Failed to copy text: ",i)}}),t&&t.addEventListener("input",()=>{const f=t.value,i=/([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g,_=f.match(i);if(_&&_.length>0){const w=_.join(`
`);f.replace(i,"").trim().length>0&&g(600,()=>{t.value=w})}}),a&&a.addEventListener("click",async()=>{const f=t.value;if(!f.trim()){e.value="Silakan masukan terlebih dahulu teks atau No SSM / PTK untuk diproses.",e.classList.add("text-red-500"),o&&o.classList.add("hidden");return}e.classList.remove("text-red-500");const i=/([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g,_=f.match(i);if(_&&_.length>0){a.disabled=!0,a.textContent="Mencari Data...",e.value="Sedang mengambil data dari server, mohon tunggu...";let w="";const b=async(p,c)=>{const h=new Date().toISOString().split("T")[0];let x="";const n=/(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/,v=p.match(n);if(v&&parseInt(v[1])>=2020)x=`${v[1]}-${v[2]}-${v[3]}`;else{const E=/(?:EXT|IMP|DOM)(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/,L=p.match(E);if(L)x=`20${L[1]}-${L[2]}-${L[3]}`;else{const M=new Date;M.setFullYear(M.getFullYear()-1),x=M.toISOString().split("T")[0]}}let k="3200";const I=localStorage.getItem("userData");if(I)try{k=JSON.parse(I).upt||"3200"}catch{}const B={dFrom:x,dTo:h,stat:"",karantina:"",upt:k,jnsAju:"EKSPOR",jeniscari:c,noAju:p};try{const E=await fetch("https://api.karantinaindonesia.go.id/ssm/getAju",{method:"POST",headers:{Authorization:"Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm","Content-Type":"application/json"},body:JSON.stringify(B)});if(!E.ok)return null;const L=await E.json();return L.status&&L.data&&L.data.length>0?L.data[0]:null}catch{return null}},d=await new Promise(p=>{const c=localStorage.getItem("accessToken")||localStorage.getItem("token");if(c){p(c);return}if(typeof chrome<"u"&&chrome.cookies)chrome.cookies.getAll({domain:"apps.karantinaindonesia.go.id"},h=>{const x=h.find(n=>n.name==="token");p(x?x.value:"")});else{const h=document.cookie.match(/(?:^|; )token=([^;]*)/);p(h?h[1]:"")}}),u=_.map(async p=>{var I,B,E,L;let c=`
--- MENCARI AJU: ${p} ---
`,h="",x="";const[n,v]=await Promise.all([b(p,"noAju"),b(p,"noReg")]);let k=n||v;if(k){if(x=k.ptk_id||k.id||"",k.noReg&&(h=k.noReg),x&&d)try{const y=await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk/${x}`,{headers:{Authorization:`Bearer ${d}`}});if(y.ok){const S=await y.json();(B=(I=S==null?void 0:S.data)==null?void 0:I.ptk)!=null&&B.no_dok_permohonan&&(h=S.data.ptk.no_dok_permohonan)}}catch(y){console.error("Failed to fetch PTK details",y)}let M="-",P="-",j="-",N=null;if(k.xml)try{N=JSON.parse(k.xml);const y=(L=(E=N==null?void 0:N.DOKUMEN)==null?void 0:E.ITEMS)==null?void 0:L.BARANG;if(y&&y.length>0){const S=y[0];M=S.URAIAN?S.URAIAN.trim():"-",P=`${S.NETTO||"-"} ${S.JNSSATUAN||""}`.trim(),j=`${S.JMLKEMAS||"-"} ${S.JNSKEMAS||""}`.trim(),y.length>1&&(M+=` (+${y.length-1} item lainnya)`)}}catch(y){console.error("Failed parsing xml",y)}let T="",R="";if(R+=`[DEBUG] Token      : ${d?"ADA":"KOSONG"}
`,R+=`[DEBUG] XML Parsed : ${N?"BERHASIL":"GAGAL/KOSONG"}
`,R+=`[DEBUG] Checkbox   : ${l&&l.checked?"DICENTANG":"TIDAK DICENTANG"}
`,l&&l.checked&&N)if(!d)T+=`Status PTK     : GAGAL (Sesi Token tidak ditemukan. Silakan ke menu Login terlebih dahulu)
`;else try{const y=localStorage.getItem("userData"),S=y?JSON.parse(y):{},G=te(k,N,S),C=await fetch("https://api.karantinaindonesia.go.id/barantin-sys/ssm",{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify(G)});if(C.ok||C.status===201){const $=await C.json();if($.status==="201"||$.status===!0){T+=`Status PTK     : BERHASIL DIBUAT (ID: ${G.id})
`;const z=await fetch("https://api.karantinaindonesia.go.id/ssm/sendStatus/ptk",{method:"POST",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify({id:k.id,ptk_id:G.id,noReg:k.noReg||k.noAju})});z.ok||z.status===201?T+=`Verifikasi     : BERHASIL (GA - PROSES VERIFIKASI)
`:T+=`Verifikasi     : GAGAL DIPROSES
`}else T+=`Status PTK     : GAGAL (${$.message||"Unknown Error"})
`}else T+=`Status PTK     : GAGAL (HTTP ${C.status})
`}catch(y){T+=`Status PTK     : ERROR (${y.message})
`}c+=T,c+=R,c+=`
--- DATA JSON LENGKAP ---
`;const K={...k};if(K.xml)try{K.xml=JSON.parse(K.xml)}catch{}c+=JSON.stringify(K,null,2)+`
`}else c+=`Status         : TIDAK DITEMUKAN / GAGAL
`;return c});w=(await Promise.all(u)).join(""),e.value=w.trim(),O=w.trim(),a.disabled=!1,a.textContent="Proses Data",o&&o.classList.remove("hidden")}else e.value="Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.",O=e.value,o&&o.classList.add("hidden")})},W=()=>`
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
  `,H=()=>{let a=localStorage.getItem("draftActiveTab")||"pdf";const t=document.getElementById("tabPdf"),e=document.getElementById("tabDoc"),o=document.getElementById("pdfSection"),r=document.getElementById("docSection"),s=document.getElementById("docLoader"),l=document.getElementById("quickDocNumber"),g=document.getElementById("pdfUpload"),f=document.getElementById("pdfFileName"),i=document.getElementById("docNumber"),_=document.getElementById("processDraftBtn"),w=document.getElementById("draftResults"),b=(d,u)=>{s&&(s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100")),setTimeout(()=>{u(),s&&(s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none"))},d)},A=d=>{a=d,localStorage.setItem("draftActiveTab",d),d==="pdf"?(t==null||t.classList.add("bg-brand-accent","text-white"),t==null||t.classList.remove("text-brand-text-muted","hover:text-white"),e==null||e.classList.remove("bg-brand-accent","text-white"),e==null||e.classList.add("text-brand-text-muted","hover:text-white"),o==null||o.classList.remove("hidden"),r==null||r.classList.add("hidden")):(e==null||e.classList.add("bg-brand-accent","text-white"),e==null||e.classList.remove("text-brand-text-muted","hover:text-white"),t==null||t.classList.remove("bg-brand-accent","text-white"),t==null||t.classList.add("text-brand-text-muted","hover:text-white"),r==null||r.classList.remove("hidden"),o==null||o.classList.add("hidden"))};if(A(a),t==null||t.addEventListener("click",()=>A("pdf")),e==null||e.addEventListener("click",()=>A("doc")),l&&i){l.addEventListener("focus",()=>{l.placeholder=""}),l.addEventListener("blur",()=>{l.placeholder="No KT"});let d,u="";l.addEventListener("input",()=>{let m=l.value.replace(/\D/g,"");m.length>6&&(m=m.slice(0,6)),l.value=m,m!==u&&(u=m,clearTimeout(d),m.length>0?d=setTimeout(()=>{const p=m.padStart(6,"0");b(600,()=>{i.value=`2026-T1.0-3200.2-K.1.1-${p}`})},400):i.value="")})}if(i){let d;i.addEventListener("input",()=>{clearTimeout(d);const u=i.value;if(!u)return;const m=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,p=u.match(m);if(p&&p.length>0){const c=p.map(n=>{const v=n.toUpperCase(),k=v.match(/\d{4,6}$/);return k?`2026-T1.0-3200.2-K.1.1-${k[0].padStart(6,"0")}`:v}).join(`
`);u.replace(m,"").trim().length>0&&b(600,()=>{i.value=c})}else d=setTimeout(()=>{const h=i.value.match(/\b\d{3,6}\b/g);if(h&&h.length>0){const x=h.map(n=>`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`);b(600,()=>{i.value=x.join(`
`)})}},800)}),i.addEventListener("change",()=>{clearTimeout(d);const u=i.value;if(!/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi.test(u)){const p=u.match(/\b\d{3,6}\b/g);if(p&&p.length>0){const c=p.map(h=>`2026-T1.0-3200.2-K.1.1-${h.padStart(6,"0")}`);b(600,()=>{i.value=c.join(`
`)})}}})}g&&f&&g.addEventListener("change",d=>{const u=d.target;u.files&&u.files.length>0?(f.textContent=u.files[0].name,f.classList.remove("text-brand-text-muted"),f.classList.add("text-brand-accent")):(f.textContent="Klik untuk memilih file PDF",f.classList.add("text-brand-text-muted"),f.classList.remove("text-brand-accent"))}),_&&_.addEventListener("click",()=>{var u;let d="";if(a==="pdf"){const m=(u=g==null?void 0:g.files)==null?void 0:u[0];if(!m){w.value="Silakan pilih file PDF terlebih dahulu.",w.classList.add("text-red-500");return}w.classList.remove("text-red-500"),d=`File PDF yang dipilih: ${m.name}`}else{let m=i.value.trim();if(!m){w.value="Silakan masukkan Nomor Dokumen terlebih dahulu.",w.classList.add("text-red-500");return}w.classList.remove("text-red-500");let p=m;const c=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,h=m.match(c);if(h&&h.length>0)p=h.map(x=>{const n=x.toUpperCase(),v=n.match(/\d{4,6}$/);return v?`2026-T1.0-3200.2-K.1.1-${v[0].padStart(6,"0")}`:n}).join(`
`);else{const x=m.match(/\b\d{1,6}\b/g);if(x){const n=x.reverse().find(v=>v.length>=3&&v.length<=6)||x[0];n&&(p=`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`)}}i.value=p,d=`Nomor Dokumen:
${p}`}w.value=d+`

Done`})},X=()=>`
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
  `,J=()=>{let a=localStorage.getItem("revisiActiveTab")||"pdf";const t=document.getElementById("tabPdf"),e=document.getElementById("tabDoc"),o=document.getElementById("pdfSection"),r=document.getElementById("docSection"),s=document.getElementById("docLoader"),l=document.getElementById("quickDocNumber"),g=document.getElementById("pdfUpload"),f=document.getElementById("pdfFileName"),i=document.getElementById("docNumber"),_=document.getElementById("processRevisiBtn"),w=document.getElementById("revisiResults"),b=(d,u)=>{s&&(s.classList.remove("opacity-0","pointer-events-none"),s.classList.add("opacity-100")),setTimeout(()=>{u(),s&&(s.classList.remove("opacity-100"),s.classList.add("opacity-0","pointer-events-none"))},d)},A=d=>{a=d,localStorage.setItem("revisiActiveTab",d),d==="pdf"?(t==null||t.classList.add("bg-brand-accent","text-white"),t==null||t.classList.remove("text-brand-text-muted","hover:text-white"),e==null||e.classList.remove("bg-brand-accent","text-white"),e==null||e.classList.add("text-brand-text-muted","hover:text-white"),o==null||o.classList.remove("hidden"),r==null||r.classList.add("hidden")):(e==null||e.classList.add("bg-brand-accent","text-white"),e==null||e.classList.remove("text-brand-text-muted","hover:text-white"),t==null||t.classList.remove("bg-brand-accent","text-white"),t==null||t.classList.add("text-brand-text-muted","hover:text-white"),r==null||r.classList.remove("hidden"),o==null||o.classList.add("hidden"))};if(A(a),t==null||t.addEventListener("click",()=>A("pdf")),e==null||e.addEventListener("click",()=>A("doc")),l&&i){l.addEventListener("focus",()=>{l.placeholder=""}),l.addEventListener("blur",()=>{l.placeholder="No KT"});let d,u="";l.addEventListener("input",()=>{let m=l.value.replace(/\D/g,"");m.length>6&&(m=m.slice(0,6)),l.value=m,m!==u&&(u=m,clearTimeout(d),m.length>0?d=setTimeout(()=>{const p=m.padStart(6,"0");b(600,()=>{i.value=`2026-T1.0-3200.2-K.1.1-${p}`})},400):i.value="")})}if(i){let d;i.addEventListener("input",()=>{clearTimeout(d);const u=i.value;if(!u)return;const m=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,p=u.match(m);if(p&&p.length>0){const c=p.map(n=>{const v=n.toUpperCase(),k=v.match(/\d{4,6}$/);return k?`2026-T1.0-3200.2-K.1.1-${k[0].padStart(6,"0")}`:v}).join(`
`);u.replace(m,"").trim().length>0&&b(600,()=>{i.value=c})}else d=setTimeout(()=>{const h=i.value.match(/\b\d{3,6}\b/g);if(h&&h.length>0){const x=h.map(n=>`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`);b(600,()=>{i.value=x.join(`
`)})}},800)}),i.addEventListener("change",()=>{clearTimeout(d);const u=i.value;if(!/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi.test(u)){const p=u.match(/\b\d{3,6}\b/g);if(p&&p.length>0){const c=p.map(h=>`2026-T1.0-3200.2-K.1.1-${h.padStart(6,"0")}`);b(600,()=>{i.value=c.join(`
`)})}}})}g&&f&&g.addEventListener("change",d=>{const u=d.target;u.files&&u.files.length>0?(f.textContent=u.files[0].name,f.classList.remove("text-brand-text-muted"),f.classList.add("text-brand-accent")):(f.textContent="Klik untuk memilih file PDF",f.classList.add("text-brand-text-muted"),f.classList.remove("text-brand-accent"))}),_&&_.addEventListener("click",()=>{var u;let d="";if(a==="pdf"){const m=(u=g==null?void 0:g.files)==null?void 0:u[0];if(!m){w.value="Silakan pilih file PDF terlebih dahulu.",w.classList.add("text-red-500");return}w.classList.remove("text-red-500"),d=`File PDF yang dipilih: ${m.name}`}else{let m=i.value.trim();if(!m){w.value="Silakan masukkan Nomor Dokumen terlebih dahulu.",w.classList.add("text-red-500");return}w.classList.remove("text-red-500");let p=m;const c=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,h=m.match(c);if(h&&h.length>0)p=h.map(x=>{const n=x.toUpperCase(),v=n.match(/\d{4,6}$/);return v?`2026-T1.0-3200.2-K.1.1-${v[0].padStart(6,"0")}`:n}).join(`
`);else{const x=m.match(/\b\d{1,6}\b/g);if(x){const n=x.reverse().find(v=>v.length>=3&&v.length<=6)||x[0];n&&(p=`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`)}}i.value=p,d=`Nomor Dokumen:
${p}`}w.value=d+`

Done`})},ne=()=>{let a=localStorage.getItem("activeMenu")||"Surtu 2";a==="Profile"&&(a="Surtu 2",localStorage.setItem("activeMenu","Surtu 2"));let t="";return a==="Draft"?t=W():a==="Revisi"?t=X():a==="Surtu 2"?t=Z():t=`<div class="text-white text-center mt-10">Fitur ${a} belum tersedia</div>`,`
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${Q(a)}
      
      <main id="mainContent" class="w-full bg-brand-panel border border-white/5 rounded-xl md:flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${t}
      </main>
    </div>
  `},ae=()=>{const a=document.getElementById("mainContent");let t=localStorage.getItem("activeMenu")||"Surtu 2";t==="Profile"&&(t="Surtu 2"),ee(e=>{localStorage.setItem("activeMenu",e),a&&(e==="Draft"?(a.innerHTML=W(),H()):e==="Revisi"?(a.innerHTML=X(),J()):e==="Surtu 2"?(a.innerHTML=Z(),F()):a.innerHTML=`<div class="text-white text-center mt-10">Fitur ${e} belum tersedia</div>`)}),t==="Draft"?H():t==="Revisi"?J():t==="Surtu 2"&&F()},oe=()=>`
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
  `,ie=a=>{const t=document.getElementById("loginSubmitBtn"),e=document.getElementById("loginError"),o=document.getElementById("username"),r=document.getElementById("password"),s=document.getElementById("captchaInput"),l=document.getElementById("captchaImage"),g=document.getElementById("refreshCaptchaBtn"),f=localStorage.getItem("savedUsername"),i=localStorage.getItem("savedPassword");f&&o&&(o.value=f),i&&r&&(r.value=i);let _="";const w=async()=>{try{const c=await fetch("https://api.karantinaindonesia.go.id/barantin-sys-v2/captcha?app=APP001");if(!c.ok)throw new Error("Failed to fetch captcha");const h=await c.json();h.status&&h.image&&(l==null||l.setAttribute("src",h.image),_=h.token)}catch(c){console.error("Error loading captcha:",c)}};w(),g&&g.addEventListener("click",w);let b="103.152.232.25";fetch("https://api.ipify.org/?format=json").then(c=>c.json()).then(c=>b=c.ip).catch(c=>console.error("Error fetching IP:",c));const A=()=>Promise.resolve({timestamp:Date.now(),coords:{accuracy:212,latitude:-6.577271,longitude:107.783081,altitude:null,altitudeAccuracy:null,heading:null,speed:null}}),d=async()=>{const c=o.value.trim(),h=r.value.trim(),x=s.value.trim();if(!c||!h||!x){e&&(e.classList.remove("hidden"),e.textContent="Harap isi semua kolom");return}t&&(t.disabled=!0,t.textContent="Memproses..."),e&&e.classList.add("hidden");try{const n=await A(),k=await(await fetch("https://api.karantinaindonesia.go.id/barantin-sys-v2/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c,password:h,app:"APP001",ipaddress:b,captcha:x,captchaToken:_,location:n})})).json();k.status?(localStorage.setItem("savedUsername",c),localStorage.setItem("savedPassword",h),k.data&&(localStorage.setItem("accessToken",k.data.accessToken),localStorage.setItem("userData",JSON.stringify(k.data))),a()):(e&&(e.classList.remove("hidden"),e.textContent=k.message||"Login gagal"),r.value="",s.value="",w())}catch{e&&(e.classList.remove("hidden"),e.textContent="Terjadi kesalahan jaringan atau server tidak dapat dihubungi.")}finally{t&&(t.disabled=!1,t.textContent="Masuk")}};t&&t.addEventListener("click",c=>{c.preventDefault(),d()});const u=c=>{c.key==="Enter"&&(c.preventDefault(),d())};r&&r.addEventListener("keydown",u),s&&s.addEventListener("keydown",u);const m=c=>{const h=c.target;h.value.includes(" ")&&(h.value=h.value.replace(/\s/g,""))};o&&o.addEventListener("input",m),r&&r.addEventListener("input",m);const p=document.getElementById("togglePasswordBtn");p&&r&&p.addEventListener("click",()=>{const c=r.style.webkitTextSecurity==="disc";r.style.webkitTextSecurity=c?"none":"disc",p.innerHTML=c?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>'})},re="modulepreload",se=function(a,t){return new URL(a,t).href},V={},de=function(t,e,o){let r=Promise.resolve();if(e&&e.length>0){const l=document.getElementsByTagName("link"),g=document.querySelector("meta[property=csp-nonce]"),f=(g==null?void 0:g.nonce)||(g==null?void 0:g.getAttribute("nonce"));r=Promise.allSettled(e.map(i=>{if(i=se(i,o),i in V)return;V[i]=!0;const _=i.endsWith(".css"),w=_?'[rel="stylesheet"]':"";if(!!o)for(let d=l.length-1;d>=0;d--){const u=l[d];if(u.href===i&&(!_||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${w}`))return;const A=document.createElement("link");if(A.rel=_?"stylesheet":re,_||(A.as="script"),A.crossOrigin="",A.href=i,f&&A.setAttribute("nonce",f),document.head.appendChild(A),_)return new Promise((d,u)=>{A.addEventListener("load",d),A.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${i}`)))})}))}function s(l){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=l,window.dispatchEvent(g),!g.defaultPrevented)throw l}return r.then(l=>{for(const g of l||[])g.status==="rejected"&&s(g.reason);return t().catch(s)})};function le(a={}){const{immediate:t=!1,onNeedReload:e,onNeedRefresh:o,onOfflineReady:r,onRegistered:s,onRegisteredSW:l,onRegisterError:g}=a;let f,i;const _=async(b=!0)=>{await i};async function w(){if("serviceWorker"in navigator){if(f=await de(async()=>{const{Workbox:b}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:b}},[],import.meta.url).then(({Workbox:b})=>new b("./sw.js",{scope:"./",type:"classic"})).catch(b=>{g==null||g(b)}),!f)return;f.addEventListener("activated",b=>{(b.isUpdate||b.isExternal)&&(e?e():window.location.reload())}),f.addEventListener("installed",b=>{b.isUpdate||r==null||r()}),f.register({immediate:t}).then(b=>{l?l("./sw.js",b):s==null||s(b)}).catch(b=>{g==null||g(b)})}}return i=w(),_}le({immediate:!0});const Y=()=>{const a=document.getElementById("app");a&&(localStorage.getItem("isAuthenticated")==="true"?(a.innerHTML=ne(),ae()):(a.innerHTML=oe(),ie(()=>{localStorage.setItem("isAuthenticated","true"),Y()})))};document.addEventListener("DOMContentLoaded",Y);

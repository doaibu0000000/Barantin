(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const d of i)if(d.type==="childList")for(const h of d.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function e(i){const d={};return i.integrity&&(d.integrity=i.integrity),i.referrerPolicy&&(d.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?d.credentials="include":i.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(i){if(i.ep)return;i.ep=!0;const d=e(i);fetch(i.href,d)}})();const de=(a="Surtu 2")=>{const t=[{id:"Surtu 2",label:"Surtu 2",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'},{id:"Draft",label:"Draft",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'},{id:"Revisi",label:"Revisi",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>'}];return`
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
  `},le=a=>{const t=document.querySelectorAll(".nav-item");t.forEach(o=>{o.addEventListener("click",i=>{i.preventDefault();const d=o.getAttribute("data-menu");t.forEach(h=>{h.classList.remove("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),h.classList.add("text-brand-text-muted")}),o.classList.remove("text-brand-text-muted"),o.classList.add("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),a&&d&&a(d)})}),document.querySelectorAll(".logout-btn").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault(),localStorage.removeItem("isAuthenticated"),window.location.reload()})})};let Z="",F="";function R(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var t=Math.random()*16|0,e=a=="x"?t:t&3|8;return e.toString(16)})}const ce=(a,t,e)=>{var s,g,u,p,v;const o=(t==null?void 0:t.DOKUMEN)||{},i=o.HEADER||{},d=i.PERUSAHAAN||{},h=d.PJAWAB||{},m=i.PENGIRIM||{},f=i.PEMASOK||i.PENERIMA||{},r=((s=o.GA)==null?void 0:s.KARANTINA)||{},_=r.INSTALASI||{},k=r.PEMERIKSAAN||{},x=(((g=o.ITEMS)==null?void 0:g.BARANG)||[]).map(n=>{var b,A,N,T,S,M,B,j,P,K,I;return{id:R(),ptk_id:"",kode_hs:n.KDHS||"",kode_hs10:n.KDHS10||"",klasifikasi_id:((A=(b=n.GA)==null?void 0:b.KARANTINA)==null?void 0:A.KLASIFIKASI)||"2C0",komoditas_id:((T=(N=n.GA)==null?void 0:N.KARANTINA)==null?void 0:T.ID_KOMODITI)||"1149",nama_umum_tercetak:n.URAIAN||"",nama_latin_tercetak:((M=(S=n.GA)==null?void 0:S.KARANTINA)==null?void 0:M.NMLATIN)||"",jenisMp:"Non Benih",jenisMpId:5,bentukMp:((j=(B=n.GA)==null?void 0:B.KARANTINA)==null?void 0:j.KLASIFIKASI)||"2C0",negaraAsalMp:n.NEGASALBRG||"ID",jantan:null,betina:null,negaraAsalMpId:99,volume_netto:parseFloat(n.NETTO)||0,volume_bruto:parseFloat(n.BRUTO)||0,satuan_bruto_id:"1356",satuan_netto_id:"1356",keterangan:"",sat_tercetak_netto:n.JNSSATUAN||"KGM",volume_lain:parseFloat(n.JMLSATUAN)||0,satuan_lain_id:1356,sat_tercetak_lain:n.JNSSATUAN||"KGM",jumlah_kemasan:parseFloat(n.JMLKEMAS)||0,kemasan_id:2,kemasan:n.JNSKEMAS||"BG",mata_uang:((P=n.KURS)==null?void 0:P.KODE)||"USD",kurs:parseFloat((K=n.KURS)==null?void 0:K.NILAI)||15e3,harga:parseFloat(n.HARGA)||0,harga_rp:(parseFloat(n.HARGA)||0)*(parseFloat((I=n.KURS)==null?void 0:I.NILAI)||15e3)*(parseFloat(n.JMLSATUAN)||0)}}),w=(((u=o.CONTLIST)==null?void 0:u.CONT)||[]).map(n=>({id:R(),ptk_id:"",nomor:n.NOCONT||"xxxxxx",size:(n.UKCONT||"20")+" feet",ukuran_kontainer_id:"2",stuff_kontainer_id:"1",stuff:n.TPCONT||"FCL",segel:n.NOSEAL||"",tipe_kontainer_id:"1"})),l=(((p=o.DOKUMENLAMPIRAN)==null?void 0:p.DOK)||[]).map(n=>({id:R(),ptk_id:"",jenis_dokumen_id:n.JENIS||"99",jenisDokumenUraian:"Lainnya",kategori_dokumen:"S",no_dokumen:n.NOMOR||"",instansi_penerbit:"",tanggal_dokumen:n.TANGGAL?n.TANGGAL.replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3"):"",negara_asal_id:"99",negaraAsalDokumen:n.NEGPENERBIT||"ID",kota_kab_asal_id:"",keterangan:"",efile:n.FILELINK||""})),c=R();return x.forEach(n=>n.ptk_id=c),w.forEach(n=>n.ptk_id=c),l.forEach(n=>n.ptk_id=c),{id:c,tssm_id:a.id,no_aju:a.noReg||a.noAju,jenis_dokumen:"PTK",jenis_karantina:a.jenis_karantina==="Tumbuhan"?"T":a.jenis_karantina==="Hewan"?"H":"I",jenis_media_pembawa_id:"5",stat_pemohon:"PEMILIK",is_guest:"0",user_id:(e==null?void 0:e.id)||"3267",pengguna_jasa_id:(e==null?void 0:e.pengguna_jasa_id)||"9e7347a8-ea62-4aee-899e-ea7087949eb7",calo_id:"0",upt_id:a.upt,kode_satpel:a.upt,nama_pemohon:d.NAMA||a.nmPerusahaan,jenis_identitas_pemohon:"NPWP",nomor_identitas_pemohon:d.ID||a.npwp,alamat_pemohon:d.ALAMAT||"",telepon_pemohon:"0",fax_pemohon:"0",provinsi_pemohon_id:"33",kota_kab_pemohon_id:"3328",nama_cp:h.NAMA||"",alamat_cp:h.ALAMAT||"",telepon_cp:h.EMAIL||"",nama_ttd:h.NAMA||"",jenis_identitas_ttd:"LAINNYA",nomor_identitas_ttd:d.ID||a.npwp,jabatan_ttd:h.JABATAN||"DIREKTUR",alamat_ttd:h.ALAMAT||"",jenis_permohonan:a.jnsAju==="EKSPOR"?"EX":a.jnsAju==="IMPOR"?"IM":"DP",nama_pengirim:m.NMPENGIRIM||d.NAMA||"",alamat_pengirim:m.ALPENGIRIM||d.ALAMAT||"",telepon_pengirim:"0",jenis_identitas_pengirim:"NPWP",nomor_identitas_pengirim:d.ID||a.npwp,provinsi_pengirim_id:"33",kota_kab_pengirim_id:"3328",negara_pengirim_id:"99",nama_penerima:f.NMPEMASOK||f.NMPENERIMA||"",alamat_penerima:f.ALPEMASOK||f.ALAMAT||"",telepon_penerima:"",jenis_identitas_penerima:"LAINNYA",nomor_identitas_penerima:"",provinsi_penerima_id:"",kota_kab_penerima_id:"",negara_penerima_id:"186",is_from_ptk:"2",tanggal_rencana_masuk:"",negara_muat_id:"99",negara_bongkar_id:"186",negara_transit_id:"",pelabuhan_muat_id:"134",pelabuhan_bongkar_id:"53427",moda_alat_angkut_transit_id:"0",tipe_alat_angkut_transit_id:"",nama_alat_angkut_transit:"",bendera_alat_angkut_transit_id:"0",no_voyage_transit:"",call_sign_transit:"NIHIL",tanggal_rencana_tiba_transit:"",tanggal_rencana_berangkat_transit:"",moda_alat_angkut_terakhir_id:1,moda_alat_angkut_lainnya:"",tipe_alat_angkut_terakhir_id:"3",nama_alat_angkut_terakhir:"-",bendera_alat_angkut_terakhir_id:"186",no_voyage_terakhir:"-",call_sign_terakhir:"NIHIL",tanggal_rencana_tiba_terakhir:"",tanggal_rencana_berangkat_terakhir:"2026-07-27",is_transit:"0",is_kontainer:"2",sumber_mp:"",area_tangkap_id:"",mutuIkan:"",peruntukan_id:r.PERUNTUKAN||"5",peruntukan_lainnya:"",kemasan_id:"2",merk_kemasan:"560 Bag",jumlah_kemasan:"560",tanda_khusus:"",nilai_barang:r.NILAI||"0",mata_uang:"IDR",negara_asal_id:"99",negara_tujuan_id:"186",kota_kab_asal_id:"3172",kota_kab_tujuan_id:"",tingkat_pengolahan:r.TINGKATPENGOLAHAN||"2",informasi_tambahan:"",tgl_pemeriksaan:k.TGPERIKSA||"",tempat_pemeriksaan:"D",kode_gudang:null,jenis_tempat:_.JNS||"IK",nama_tempat_pemeriksaan:_.NAMA||"",alamat_tempat_pemeriksaan:_.ALAMAT||"",instalasi_karantina_id:null,status_ptk:"1",tgl_dok_permohonan:((v=a.tglAju)==null?void 0:v.substring(0,16))||"",is_draft:"1",is_verifikasi:"1",petugas:(e==null?void 0:e.petugas)||"SUHERMAN",nip:(e==null?void 0:e.nip)||"196702031992031001",tgl_aju:a.tglAju||"",user_created:(e==null?void 0:e.id)||"3267",komoditi:x,kontainer:w,dokumen:l}},ee=()=>`
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

    <br>
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

  `,W=()=>{const a=document.getElementById("processBtn"),t=document.getElementById("cookieContent"),e=document.getElementById("processingResults"),o=document.getElementById("copyBtn"),i=document.getElementById("copyText"),d=document.getElementById("cookieLoader");t&&(t.value=Z,t.addEventListener("input",()=>{Z=t.value})),e&&(e.value=F),o&&(F?o.classList.remove("hidden"):o.classList.add("hidden"));const h=(m,f)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{f(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},m)};o&&o.addEventListener("click",async()=>{const m=e.value;if(m)try{await navigator.clipboard.writeText(m);const f=i.innerText;i.innerText="Tersalin!",o.classList.replace("bg-zinc-800","bg-green-600"),o.classList.replace("hover:bg-zinc-700","hover:bg-green-500"),o.classList.replace("border-zinc-700","border-green-500"),setTimeout(()=>{i.innerText=f,o.classList.replace("bg-green-600","bg-zinc-800"),o.classList.replace("hover:bg-green-500","hover:bg-zinc-700"),o.classList.replace("border-green-500","border-zinc-700")},2e3)}catch(f){console.error("Failed to copy text: ",f)}}),t&&t.addEventListener("input",()=>{const m=t.value,f=/([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g,r=m.match(f);if(r&&r.length>0){const _=r.join(`
`);m.replace(f,"").trim().length>0&&h(600,()=>{t.value=_})}}),a&&a.addEventListener("click",async()=>{const m=t.value;if(!m.trim()){e.value="Silakan masukan terlebih dahulu teks atau No SSM / PTK untuk diproses.",e.classList.add("text-red-500"),o&&o.classList.add("hidden");return}e.classList.remove("text-red-500");const f=/([a-zA-Z0-9]{26}|202[0-9]-[A-Z0-9.-]+)/g,r=m.match(f);if(r&&r.length>0){a.disabled=!0,a.textContent="Mencari Data...",e.value="Sedang mengambil data dari server, mohon tunggu...";let _="";const k=async(s,g)=>{const u=new Date().toISOString().split("T")[0];let p="";const v=/(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/,n=s.match(v);if(n&&parseInt(n[1])>=2020)p=`${n[1]}-${n[2]}-${n[3]}`;else{const T=/(?:EXT|IMP|DOM)(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/,S=s.match(T);if(S)p=`20${S[1]}-${S[2]}-${S[3]}`;else{const M=new Date;M.setFullYear(M.getFullYear()-1),p=M.toISOString().split("T")[0]}}let b="3200";const A=localStorage.getItem("userData");if(A)try{b=JSON.parse(A).upt||"3200"}catch{}const N={dFrom:p,dTo:u,stat:"",karantina:"",upt:b,jnsAju:"EKSPOR",jeniscari:g,noAju:s};try{const T=await fetch("https://api.karantinaindonesia.go.id/ssm/getAju",{method:"POST",headers:{Authorization:"Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm","Content-Type":"application/json"},body:JSON.stringify(N)});if(!T.ok)return null;const S=await T.json();return S.status&&S.data&&S.data.length>0?S.data[0]:null}catch{return null}},w=await new Promise(s=>{const g=localStorage.getItem("accessToken")||localStorage.getItem("token");if(g){s(g);return}if(typeof chrome<"u"&&chrome.cookies)chrome.cookies.getAll({domain:"apps.karantinaindonesia.go.id"},u=>{const p=u.find(v=>v.name==="token");s(p?p.value:"")});else{const u=document.cookie.match(/(?:^|; )token=([^;]*)/);s(u?u[1]:"")}}),l=r.map(async s=>{var A,N,T,S,M,B;let g=`
--- MENCARI AJU: ${s} ---
`,u="",p="";const[v,n]=await Promise.all([k(s,"noAju"),k(s,"noReg")]);let b=v||n;if(b){if(p=b.ptk_id||b.id||"",b.noReg&&(u=b.noReg),p&&w)try{const y=await fetch(`https://api.karantinaindonesia.go.id/barantin-sys/ptk/${p}`,{headers:{Authorization:`Bearer ${w}`}});if(y.ok){const L=await y.json();(N=(A=L==null?void 0:L.data)==null?void 0:A.ptk)!=null&&N.no_dok_permohonan&&(u=L.data.ptk.no_dok_permohonan)}}catch(y){console.error("Failed to fetch PTK details",y)}let j="-",P="-",K="-",I=null;if(b.xml)try{I=JSON.parse(b.xml);const y=(S=(T=I==null?void 0:I.DOKUMEN)==null?void 0:T.ITEMS)==null?void 0:S.BARANG;if(y&&y.length>0){const L=y[0];j=L.URAIAN?L.URAIAN.trim():"-",P=`${L.NETTO||"-"} ${L.JNSSATUAN||""}`.trim(),K=`${L.JMLKEMAS||"-"} ${L.JNSKEMAS||""}`.trim(),y.length>1&&(j+=` (+${y.length-1} item lainnya)`)}}catch(y){console.error("Failed parsing xml",y)}let E="",O="";if(O+=`[DEBUG] Token      : ${w?"ADA":"KOSONG"}
`,O+=`[DEBUG] XML Parsed : ${I?"BERHASIL":"GAGAL/KOSONG"}
`,O+=`[DEBUG] Automasi   : OTOMATIS BERJALAN
`,I)if(!w)E+=`Status PTK     : GAGAL (Sesi Token tidak ditemukan. Silakan ke menu Login terlebih dahulu)
`;else try{const y=localStorage.getItem("userData"),L=y?JSON.parse(y):{},D=ce(b,I,L),G=await fetch("https://api.karantinaindonesia.go.id/barantin-sys/ssm",{method:"POST",headers:{Authorization:`Bearer ${w}`,"Content-Type":"application/json"},body:JSON.stringify(D)});if(G.ok||G.status===201){const $=await G.json();if($.status==="201"||$.status===!0){E+=`Status PTK     : BERHASIL DIBUAT (ID: ${D.id})
`;const J=await fetch("https://api.karantinaindonesia.go.id/ssm/sendStatus/ptk",{method:"POST",headers:{Authorization:"Basic bXJpZHdhbjpaPnV5JCx+NjR7KF42WDQm","Content-Type":"application/json"},body:JSON.stringify({id:b.id,ptk_id:D.id,noReg:b.noReg||b.noAju})});if(J.ok||J.status===201){E+=`Verifikasi     : BERHASIL (GA - PROSES VERIFIKASI)
`;try{const U=R(),V=new Date,oe=V.getTimezoneOffset()*6e4,q=new Date(V.getTime()-oe).toISOString().slice(0,19).replace("T"," "),ie=q.split(" ")[0],re=((M=$.data)==null?void 0:M.nomor)||b.noReg||b.noAju,se={id:U,ptk_id:D.id,no_dok_permohonan:re,ptk_analisis_id:"",nomor:"",tanggal:ie+"T08:00",perihal:"Pelaksanaan Tindakan Karantina",penanda_tangan_id:2085,diterbitkan_di:"BANDUNG",user_id:(L==null?void 0:L.id)||"3267",created_at:q},z=await fetch("https://api.karantinaindonesia.go.id/barantin-sys/surtug",{method:"POST",headers:{Authorization:`Bearer ${w}`,"Content-Type":"application/json"},body:JSON.stringify(se)});if(z.ok||z.status===201){const H=await z.json();H.status==="201"||H.status===!0?E+=`Status Surtug  : BERHASIL DIBUAT (${((B=H.data)==null?void 0:B.nomor)||U})
`:E+=`Status Surtug  : GAGAL (${H.message||"Unknown Error"})
`}else E+=`Status Surtug  : GAGAL (HTTP ${z.status})
`}catch(U){E+=`Status Surtug  : ERROR (${U.message})
`}}else E+=`Verifikasi     : GAGAL DIPROSES
`}else E+=`Status PTK     : GAGAL (${$.message||"Unknown Error"})
`}else E+=`Status PTK     : GAGAL (HTTP ${G.status})
`}catch(y){E+=`Status PTK     : ERROR (${y.message})
`}g+=E,g+=O,g+=`
--- DATA JSON LENGKAP ---
`;const C={...b};if(C.xml)try{C.xml=JSON.parse(C.xml)}catch{}g+=JSON.stringify(C,null,2)+`
`}else g+=`Status         : TIDAK DITEMUKAN / GAGAL
`;return g});_=(await Promise.all(l)).join(""),e.value=_.trim(),F=_.trim(),a.disabled=!1,a.textContent="Proses Data",o&&o.classList.remove("hidden")}else e.value="Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.",F=e.value,o&&o.classList.add("hidden")})},te=()=>`
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
  `,X=()=>{let a=localStorage.getItem("draftActiveTab")||"pdf";const t=document.getElementById("tabPdf"),e=document.getElementById("tabDoc"),o=document.getElementById("pdfSection"),i=document.getElementById("docSection"),d=document.getElementById("docLoader"),h=document.getElementById("quickDocNumber"),m=document.getElementById("pdfUpload"),f=document.getElementById("pdfFileName"),r=document.getElementById("docNumber"),_=document.getElementById("processDraftBtn"),k=document.getElementById("draftResults"),x=(l,c)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{c(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},l)},w=l=>{a=l,localStorage.setItem("draftActiveTab",l),l==="pdf"?(t==null||t.classList.add("bg-brand-accent","text-white"),t==null||t.classList.remove("text-brand-text-muted","hover:text-white"),e==null||e.classList.remove("bg-brand-accent","text-white"),e==null||e.classList.add("text-brand-text-muted","hover:text-white"),o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden")):(e==null||e.classList.add("bg-brand-accent","text-white"),e==null||e.classList.remove("text-brand-text-muted","hover:text-white"),t==null||t.classList.remove("bg-brand-accent","text-white"),t==null||t.classList.add("text-brand-text-muted","hover:text-white"),i==null||i.classList.remove("hidden"),o==null||o.classList.add("hidden"))};if(w(a),t==null||t.addEventListener("click",()=>w("pdf")),e==null||e.addEventListener("click",()=>w("doc")),h&&r){h.addEventListener("focus",()=>{h.placeholder=""}),h.addEventListener("blur",()=>{h.placeholder="No KT"});let l,c="";h.addEventListener("input",()=>{let s=h.value.replace(/\D/g,"");s.length>6&&(s=s.slice(0,6)),h.value=s,s!==c&&(c=s,clearTimeout(l),s.length>0?l=setTimeout(()=>{const g=s.padStart(6,"0");x(600,()=>{r.value=`2026-T1.0-3200.2-K.1.1-${g}`})},400):r.value="")})}if(r){let l;r.addEventListener("input",()=>{clearTimeout(l);const c=r.value;if(!c)return;const s=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,g=c.match(s);if(g&&g.length>0){const u=g.map(n=>{const b=n.toUpperCase(),A=b.match(/\d{4,6}$/);return A?`2026-T1.0-3200.2-K.1.1-${A[0].padStart(6,"0")}`:b}).join(`
`);c.replace(s,"").trim().length>0&&x(600,()=>{r.value=u})}else l=setTimeout(()=>{const p=r.value.match(/\b\d{3,6}\b/g);if(p&&p.length>0){const v=p.map(n=>`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`);x(600,()=>{r.value=v.join(`
`)})}},800)}),r.addEventListener("change",()=>{clearTimeout(l);const c=r.value;if(!/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi.test(c)){const g=c.match(/\b\d{3,6}\b/g);if(g&&g.length>0){const u=g.map(p=>`2026-T1.0-3200.2-K.1.1-${p.padStart(6,"0")}`);x(600,()=>{r.value=u.join(`
`)})}}})}m&&f&&m.addEventListener("change",l=>{const c=l.target;c.files&&c.files.length>0?(f.textContent=c.files[0].name,f.classList.remove("text-brand-text-muted"),f.classList.add("text-brand-accent")):(f.textContent="Klik untuk memilih file PDF",f.classList.add("text-brand-text-muted"),f.classList.remove("text-brand-accent"))}),_&&_.addEventListener("click",()=>{var c;let l="";if(a==="pdf"){const s=(c=m==null?void 0:m.files)==null?void 0:c[0];if(!s){k.value="Silakan pilih file PDF terlebih dahulu.",k.classList.add("text-red-500");return}k.classList.remove("text-red-500"),l=`File PDF yang dipilih: ${s.name}`}else{let s=r.value.trim();if(!s){k.value="Silakan masukkan Nomor Dokumen terlebih dahulu.",k.classList.add("text-red-500");return}k.classList.remove("text-red-500");let g=s;const u=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,p=s.match(u);if(p&&p.length>0)g=p.map(v=>{const n=v.toUpperCase(),b=n.match(/\d{4,6}$/);return b?`2026-T1.0-3200.2-K.1.1-${b[0].padStart(6,"0")}`:n}).join(`
`);else{const v=s.match(/\b\d{1,6}\b/g);if(v){const n=v.reverse().find(b=>b.length>=3&&b.length<=6)||v[0];n&&(g=`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`)}}r.value=g,l=`Nomor Dokumen:
${g}`}k.value=l+`

Done`})},ne=()=>`
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
  `,Y=()=>{let a=localStorage.getItem("revisiActiveTab")||"pdf";const t=document.getElementById("tabPdf"),e=document.getElementById("tabDoc"),o=document.getElementById("pdfSection"),i=document.getElementById("docSection"),d=document.getElementById("docLoader"),h=document.getElementById("quickDocNumber"),m=document.getElementById("pdfUpload"),f=document.getElementById("pdfFileName"),r=document.getElementById("docNumber"),_=document.getElementById("processRevisiBtn"),k=document.getElementById("revisiResults"),x=(l,c)=>{d&&(d.classList.remove("opacity-0","pointer-events-none"),d.classList.add("opacity-100")),setTimeout(()=>{c(),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-0","pointer-events-none"))},l)},w=l=>{a=l,localStorage.setItem("revisiActiveTab",l),l==="pdf"?(t==null||t.classList.add("bg-brand-accent","text-white"),t==null||t.classList.remove("text-brand-text-muted","hover:text-white"),e==null||e.classList.remove("bg-brand-accent","text-white"),e==null||e.classList.add("text-brand-text-muted","hover:text-white"),o==null||o.classList.remove("hidden"),i==null||i.classList.add("hidden")):(e==null||e.classList.add("bg-brand-accent","text-white"),e==null||e.classList.remove("text-brand-text-muted","hover:text-white"),t==null||t.classList.remove("bg-brand-accent","text-white"),t==null||t.classList.add("text-brand-text-muted","hover:text-white"),i==null||i.classList.remove("hidden"),o==null||o.classList.add("hidden"))};if(w(a),t==null||t.addEventListener("click",()=>w("pdf")),e==null||e.addEventListener("click",()=>w("doc")),h&&r){h.addEventListener("focus",()=>{h.placeholder=""}),h.addEventListener("blur",()=>{h.placeholder="No KT"});let l,c="";h.addEventListener("input",()=>{let s=h.value.replace(/\D/g,"");s.length>6&&(s=s.slice(0,6)),h.value=s,s!==c&&(c=s,clearTimeout(l),s.length>0?l=setTimeout(()=>{const g=s.padStart(6,"0");x(600,()=>{r.value=`2026-T1.0-3200.2-K.1.1-${g}`})},400):r.value="")})}if(r){let l;r.addEventListener("input",()=>{clearTimeout(l);const c=r.value;if(!c)return;const s=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,g=c.match(s);if(g&&g.length>0){const u=g.map(n=>{const b=n.toUpperCase(),A=b.match(/\d{4,6}$/);return A?`2026-T1.0-3200.2-K.1.1-${A[0].padStart(6,"0")}`:b}).join(`
`);c.replace(s,"").trim().length>0&&x(600,()=>{r.value=u})}else l=setTimeout(()=>{const p=r.value.match(/\b\d{3,6}\b/g);if(p&&p.length>0){const v=p.map(n=>`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`);x(600,()=>{r.value=v.join(`
`)})}},800)}),r.addEventListener("change",()=>{clearTimeout(l);const c=r.value;if(!/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi.test(c)){const g=c.match(/\b\d{3,6}\b/g);if(g&&g.length>0){const u=g.map(p=>`2026-T1.0-3200.2-K.1.1-${p.padStart(6,"0")}`);x(600,()=>{r.value=u.join(`
`)})}}})}m&&f&&m.addEventListener("change",l=>{const c=l.target;c.files&&c.files.length>0?(f.textContent=c.files[0].name,f.classList.remove("text-brand-text-muted"),f.classList.add("text-brand-accent")):(f.textContent="Klik untuk memilih file PDF",f.classList.add("text-brand-text-muted"),f.classList.remove("text-brand-accent"))}),_&&_.addEventListener("click",()=>{var c;let l="";if(a==="pdf"){const s=(c=m==null?void 0:m.files)==null?void 0:c[0];if(!s){k.value="Silakan pilih file PDF terlebih dahulu.",k.classList.add("text-red-500");return}k.classList.remove("text-red-500"),l=`File PDF yang dipilih: ${s.name}`}else{let s=r.value.trim();if(!s){k.value="Silakan masukkan Nomor Dokumen terlebih dahulu.",k.classList.add("text-red-500");return}k.classList.remove("text-red-500");let g=s;const u=/2026-[A-Z0-9\.-]{10,30}-\d{4,6}/gi,p=s.match(u);if(p&&p.length>0)g=p.map(v=>{const n=v.toUpperCase(),b=n.match(/\d{4,6}$/);return b?`2026-T1.0-3200.2-K.1.1-${b[0].padStart(6,"0")}`:n}).join(`
`);else{const v=s.match(/\b\d{1,6}\b/g);if(v){const n=v.reverse().find(b=>b.length>=3&&b.length<=6)||v[0];n&&(g=`2026-T1.0-3200.2-K.1.1-${n.padStart(6,"0")}`)}}r.value=g,l=`Nomor Dokumen:
${g}`}k.value=l+`

Done`})},ue=()=>{let a=localStorage.getItem("activeMenu")||"Surtu 2";a==="Profile"&&(a="Surtu 2",localStorage.setItem("activeMenu","Surtu 2"));let t="";return a==="Draft"?t=te():a==="Revisi"?t=ne():a==="Surtu 2"?t=ee():t=`<div class="text-white text-center mt-10">Fitur ${a} belum tersedia</div>`,`
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${de(a)}
      
      <main id="mainContent" class="w-full bg-brand-panel border border-white/5 rounded-xl md:flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${t}
      </main>
    </div>
  `},me=()=>{const a=document.getElementById("mainContent");let t=localStorage.getItem("activeMenu")||"Surtu 2";t==="Profile"&&(t="Surtu 2"),le(e=>{localStorage.setItem("activeMenu",e),a&&(e==="Draft"?(a.innerHTML=te(),X()):e==="Revisi"?(a.innerHTML=ne(),Y()):e==="Surtu 2"?(a.innerHTML=ee(),W()):a.innerHTML=`<div class="text-white text-center mt-10">Fitur ${e} belum tersedia</div>`)}),t==="Draft"?X():t==="Revisi"?Y():t==="Surtu 2"&&W()},pe=()=>`
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
  `,he=a=>{const t=document.getElementById("loginSubmitBtn"),e=document.getElementById("loginError"),o=document.getElementById("username"),i=document.getElementById("password"),d=document.getElementById("captchaInput"),h=document.getElementById("captchaImage"),m=document.getElementById("refreshCaptchaBtn"),f=localStorage.getItem("savedUsername"),r=localStorage.getItem("savedPassword");f&&o&&(o.value=f),r&&i&&(i.value=r);let _="";const k=async()=>{try{const u=await fetch("https://api.karantinaindonesia.go.id/barantin-sys-v2/captcha?app=APP001");if(!u.ok)throw new Error("Failed to fetch captcha");const p=await u.json();p.status&&p.image&&(h==null||h.setAttribute("src",p.image),_=p.token)}catch(u){console.error("Error loading captcha:",u)}};k(),m&&m.addEventListener("click",k);let x="103.152.232.25";fetch("https://api.ipify.org/?format=json").then(u=>u.json()).then(u=>x=u.ip).catch(u=>console.error("Error fetching IP:",u));const w=()=>Promise.resolve({timestamp:Date.now(),coords:{accuracy:212,latitude:-6.577271,longitude:107.783081,altitude:null,altitudeAccuracy:null,heading:null,speed:null}}),l=async()=>{const u=o.value.trim(),p=i.value.trim(),v=d.value.trim();if(!u||!p||!v){e&&(e.classList.remove("hidden"),e.textContent="Harap isi semua kolom");return}t&&(t.disabled=!0,t.textContent="Memproses..."),e&&e.classList.add("hidden");try{const n=await w(),A=await(await fetch("https://api.karantinaindonesia.go.id/barantin-sys-v2/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:u,password:p,app:"APP001",ipaddress:x,captcha:v,captchaToken:_,location:n})})).json();A.status?(localStorage.setItem("savedUsername",u),localStorage.setItem("savedPassword",p),A.data&&(localStorage.setItem("accessToken",A.data.accessToken),localStorage.setItem("userData",JSON.stringify(A.data))),a()):(e&&(e.classList.remove("hidden"),e.textContent=A.message||"Login gagal"),i.value="",d.value="",k())}catch{e&&(e.classList.remove("hidden"),e.textContent="Terjadi kesalahan jaringan atau server tidak dapat dihubungi.")}finally{t&&(t.disabled=!1,t.textContent="Masuk")}};t&&t.addEventListener("click",u=>{u.preventDefault(),l()});const c=u=>{u.key==="Enter"&&(u.preventDefault(),l())};i&&i.addEventListener("keydown",c),d&&d.addEventListener("keydown",c);const s=u=>{const p=u.target;p.value.includes(" ")&&(p.value=p.value.replace(/\s/g,""))};o&&o.addEventListener("input",s),i&&i.addEventListener("input",s);const g=document.getElementById("togglePasswordBtn");g&&i&&g.addEventListener("click",()=>{const u=i.style.webkitTextSecurity==="disc";i.style.webkitTextSecurity=u?"none":"disc",g.innerHTML=u?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>'})},ge="modulepreload",fe=function(a,t){return new URL(a,t).href},Q={},be=function(t,e,o){let i=Promise.resolve();if(e&&e.length>0){const h=document.getElementsByTagName("link"),m=document.querySelector("meta[property=csp-nonce]"),f=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));i=Promise.allSettled(e.map(r=>{if(r=fe(r,o),r in Q)return;Q[r]=!0;const _=r.endsWith(".css"),k=_?'[rel="stylesheet"]':"";if(!!o)for(let l=h.length-1;l>=0;l--){const c=h[l];if(c.href===r&&(!_||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${k}`))return;const w=document.createElement("link");if(w.rel=_?"stylesheet":ge,_||(w.as="script"),w.crossOrigin="",w.href=r,f&&w.setAttribute("nonce",f),document.head.appendChild(w),_)return new Promise((l,c)=>{w.addEventListener("load",l),w.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${r}`)))})}))}function d(h){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=h,window.dispatchEvent(m),!m.defaultPrevented)throw h}return i.then(h=>{for(const m of h||[])m.status==="rejected"&&d(m.reason);return t().catch(d)})};function xe(a={}){const{immediate:t=!1,onNeedReload:e,onNeedRefresh:o,onOfflineReady:i,onRegistered:d,onRegisteredSW:h,onRegisterError:m}=a;let f,r;const _=async(x=!0)=>{await r};async function k(){if("serviceWorker"in navigator){if(f=await be(async()=>{const{Workbox:x}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:x}},[],import.meta.url).then(({Workbox:x})=>new x("./sw.js",{scope:"./",type:"classic"})).catch(x=>{m==null||m(x)}),!f)return;f.addEventListener("activated",x=>{(x.isUpdate||x.isExternal)&&(e?e():window.location.reload())}),f.addEventListener("installed",x=>{x.isUpdate||i==null||i()}),f.register({immediate:t}).then(x=>{h?h("./sw.js",x):d==null||d(x)}).catch(x=>{m==null||m(x)})}}return r=k(),_}xe({immediate:!0});const ae=()=>{const a=document.getElementById("app");a&&(localStorage.getItem("isAuthenticated")==="true"?(a.innerHTML=ue(),me()):(a.innerHTML=pe(),he(()=>{localStorage.setItem("isAuthenticated","true"),ae()})))};document.addEventListener("DOMContentLoaded",ae);

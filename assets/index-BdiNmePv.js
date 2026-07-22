(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(n){if(n.ep)return;n.ep=!0;const t=s(n);fetch(n.href,t)}})();const v=()=>{const l=[{id:"Surtu 2",label:"Surtu 2",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'},{id:"Draft",label:"Draft",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'},{id:"Revisi",label:"Revisi",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>'}];return`
    <aside class="fixed bottom-0 left-0 w-full md:relative md:w-[280px] bg-brand-panel border-t md:border border-white/5 md:rounded-xl p-2 md:p-6 flex flex-row md:flex-col shrink-0 shadow-2xl z-50">
      <div class="hidden md:flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold tracking-wide text-white text-left w-full">Barantin Tools</h2>
      </div>
      <nav id="sidebarNav" class="flex flex-row md:flex-col justify-around md:justify-start w-full md:gap-1.5">
        ${l.map(s=>`
      <a href="#" class="nav-item flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all ${s.id==="Surtu 2"?"active text-brand-accent md:bg-brand-accent-bg font-semibold":"text-brand-text-muted hover:text-white md:hover:bg-white/5"}" data-menu="${s.id}">
        ${s.icon}
        <span>${s.label}</span>
      </a>
    `).join("")}
      </nav>
    </aside>
  `},g=()=>{const l=document.querySelectorAll(".nav-item");l.forEach(a=>{a.addEventListener("click",s=>{s.preventDefault(),l.forEach(r=>{r.classList.remove("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),r.classList.add("text-brand-text-muted")}),a.classList.remove("text-brand-text-muted"),a.classList.add("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold")})})},x=()=>`
    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-sm font-semibold text-white">Nomor AJU SSM / PTK</label>
      <textarea id="cookieContent" placeholder="Contoh :&#10;30104S14616EA2026071000009&#10;32002EXT260709130318MBZS1S" class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
    </div>

    <button id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md">
      Proses Data
    </button>

    <div class="flex flex-col gap-2">
      <label for="processingResults" class="text-sm font-semibold text-white">Done</label>
      <textarea id="processingResults" placeholder="Hasil pemrosesan ditampilkan di sini..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
      
      <button id="copyBtn" class="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md flex items-center justify-center gap-2 mt-2 hidden">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        <span id="copyText">Salin Text</span>
      </button>
    </div>
  `,w=()=>{const l=document.getElementById("processBtn"),a=document.getElementById("cookieContent"),s=document.getElementById("processingResults"),r=document.getElementById("copyBtn"),n=document.getElementById("copyText");r&&r.addEventListener("click",async()=>{const t=s.value;if(t)try{await navigator.clipboard.writeText(t);const o=n.innerText;n.innerText="Tersalin!",r.classList.replace("bg-zinc-800","bg-green-600"),r.classList.replace("hover:bg-zinc-700","hover:bg-green-500"),r.classList.replace("border-zinc-700","border-green-500"),setTimeout(()=>{n.innerText=o,r.classList.replace("bg-green-600","bg-zinc-800"),r.classList.replace("hover:bg-green-500","hover:bg-zinc-700"),r.classList.replace("border-green-500","border-zinc-700")},2e3)}catch(o){console.error("Failed to copy text: ",o)}}),a&&a.addEventListener("input",()=>{const t=a.value,o=/[a-zA-Z0-9]{26}/g,e=t.match(o);if(e&&e.length>0){const c=e.join(`
`);t.replace(o,"").trim().length>0&&(a.value=c)}}),l&&l.addEventListener("click",()=>{const t=a.value;if(!t.trim()){s.value="Silakan masukan terlebih dahulu teks atau No SSM / PTK untuk diproses.",s.classList.add("text-red-500"),r&&r.classList.add("hidden");return}s.classList.remove("text-red-500");const o=/[a-zA-Z0-9]{26}/g,e=t.match(o);e&&e.length>0?(s.value=e.join(`
`)+`
Done`,r&&r.classList.remove("hidden")):(s.value="Tidak ditemukan Nomor AJU SSM / PTK (26 karakter) yang valid pada teks.",r&&r.classList.add("hidden"))})},y=()=>`
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${v()}
      
      <main class="w-full bg-brand-panel border border-white/5 rounded-xl md:flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${x()}
      </main>
    </div>
  `,k=()=>{g(),w()},L="modulepreload",E=function(l,a){return new URL(l,a).href},b={},S=function(a,s,r){let n=Promise.resolve();if(s&&s.length>0){const o=document.getElementsByTagName("link"),e=document.querySelector("meta[property=csp-nonce]"),c=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));n=Promise.allSettled(s.map(d=>{if(d=E(d,r),d in b)return;b[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!r)for(let f=o.length-1;f>=0;f--){const p=o[f];if(p.href===d&&(!u||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${h}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":L,u||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((f,p)=>{m.addEventListener("load",f),m.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${d}`)))})}))}function t(o){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=o,window.dispatchEvent(e),!e.defaultPrevented)throw o}return n.then(o=>{for(const e of o||[])e.status==="rejected"&&t(e.reason);return a().catch(t)})};function T(l={}){const{immediate:a=!1,onNeedReload:s,onNeedRefresh:r,onOfflineReady:n,onRegistered:t,onRegisteredSW:o,onRegisterError:e}=l;let c,d;const u=async(i=!0)=>{await d};async function h(){if("serviceWorker"in navigator){if(c=await S(async()=>{const{Workbox:i}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:i}},[],import.meta.url).then(({Workbox:i})=>new i("./sw.js",{scope:"./",type:"classic"})).catch(i=>{e==null||e(i)}),!c)return;c.addEventListener("activated",i=>{(i.isUpdate||i.isExternal)&&(s?s():window.location.reload())}),c.addEventListener("installed",i=>{i.isUpdate||n==null||n()}),c.register({immediate:a}).then(i=>{o?o("./sw.js",i):t==null||t(i)}).catch(i=>{e==null||e(i)})}}return d=h(),u}T({immediate:!0});document.addEventListener("DOMContentLoaded",()=>{const l=document.getElementById("app");l&&(l.innerHTML=y(),k())});

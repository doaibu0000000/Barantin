(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const v=()=>{const s=[{id:"Surtu 2",label:"Surtu 2",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'},{id:"Draft",label:"Draft",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'},{id:"Revisi",label:"Revisi",icon:'<svg class="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>'}];return`
    <aside class="fixed bottom-0 left-0 w-full md:relative md:w-[280px] bg-brand-panel border-t md:border border-white/5 md:rounded-xl p-2 md:p-6 flex flex-row md:flex-col shrink-0 shadow-2xl z-50">
      <div class="hidden md:flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold tracking-wide text-white text-left w-full">Barantin Tools</h2>
      </div>
      <nav id="sidebarNav" class="flex flex-row md:flex-col justify-around md:justify-start w-full md:gap-1.5">
        ${s.map(n=>`
      <a href="#" class="nav-item flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl md:rounded-lg text-[11px] md:text-base transition-all ${n.id==="Surtu 2"?"active text-brand-accent md:bg-brand-accent-bg font-semibold":"text-brand-text-muted hover:text-white md:hover:bg-white/5"}" data-menu="${n.id}">
        ${n.icon}
        <span>${n.label}</span>
      </a>
    `).join("")}
      </nav>
    </aside>
  `},x=()=>{const s=document.querySelectorAll(".nav-item");s.forEach(a=>{a.addEventListener("click",n=>{n.preventDefault(),s.forEach(l=>{l.classList.remove("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold"),l.classList.add("text-brand-text-muted")}),a.classList.remove("text-brand-text-muted"),a.classList.add("active","md:bg-brand-accent-bg","text-brand-accent","font-semibold")})})},g=()=>`
    <div class="flex flex-col gap-2">
      <label for="cookieContent" class="text-xs font-semibold text-white">Nomor AJU SSM / PTK</label>
      <textarea id="cookieContent" placeholder="Input cookie contents..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8"></textarea>
    </div>

    <button id="processBtn" class="w-full bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg py-3 text-sm font-semibold cursor-pointer transition-colors shadow-md">
      Proses Data
    </button>

    <div class="flex flex-col gap-2">
      <label for="processingResults" class="text-xs font-semibold text-white">Processing Results</label>
      <textarea id="processingResults" placeholder="The processing results are shown here..." class="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-brand-text placeholder-zinc-500 font-mono text-sm resize-none outline-none focus:border-brand-accent transition-colors" rows="8" readonly></textarea>
    </div>
  `,w=()=>{const s=document.getElementById("processBtn"),a=document.getElementById("cookieContent"),n=document.getElementById("processingResults");s&&s.addEventListener("click",()=>{const l=a.value;if(!l.trim()){n.value="Please enter some cookies to process.";return}let e=`Processing...

`;e+=`Input Length: ${l.length} characters.
`,e+=`
(Cookie parsing logic goes here)`,n.value=e})},y=()=>`
    <div class="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1600px] mx-auto p-4 md:p-8 min-h-screen pb-24 md:pb-8">
      ${v()}
      
      <main class="w-full bg-brand-panel border border-white/5 rounded-xl flex-1 p-6 md:p-8 flex flex-col gap-5 shadow-2xl">
        ${g()}
      </main>
    </div>
  `,k=()=>{x(),w()},E="modulepreload",L=function(s,a){return new URL(s,a).href},h={},P=function(a,n,l){let e=Promise.resolve();if(n&&n.length>0){const i=document.getElementsByTagName("link"),t=document.querySelector("meta[property=csp-nonce]"),c=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));e=Promise.allSettled(n.map(d=>{if(d=L(d,l),d in h)return;h[d]=!0;const f=d.endsWith(".css"),b=f?'[rel="stylesheet"]':"";if(!!l)for(let m=i.length-1;m>=0;m--){const p=i[m];if(p.href===d&&(!f||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${b}`))return;const u=document.createElement("link");if(u.rel=f?"stylesheet":E,f||(u.as="script"),u.crossOrigin="",u.href=d,c&&u.setAttribute("nonce",c),document.head.appendChild(u),f)return new Promise((m,p)=>{u.addEventListener("load",m),u.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(i){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=i,window.dispatchEvent(t),!t.defaultPrevented)throw i}return e.then(i=>{for(const t of i||[])t.status==="rejected"&&r(t.reason);return a().catch(r)})};function S(s={}){const{immediate:a=!1,onNeedReload:n,onNeedRefresh:l,onOfflineReady:e,onRegistered:r,onRegisteredSW:i,onRegisterError:t}=s;let c,d;const f=async(o=!0)=>{await d};async function b(){if("serviceWorker"in navigator){if(c=await P(async()=>{const{Workbox:o}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:o}},[],import.meta.url).then(({Workbox:o})=>new o("./sw.js",{scope:"./",type:"classic"})).catch(o=>{t==null||t(o)}),!c)return;c.addEventListener("activated",o=>{(o.isUpdate||o.isExternal)&&(n?n():window.location.reload())}),c.addEventListener("installed",o=>{o.isUpdate||e==null||e()}),c.register({immediate:a}).then(o=>{i?i("./sw.js",o):r==null||r(o)}).catch(o=>{t==null||t(o)})}}return d=b(),f}S({immediate:!0});document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("app");s&&(s.innerHTML=y(),k())});
